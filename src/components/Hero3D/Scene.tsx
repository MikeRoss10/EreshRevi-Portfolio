import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLoading } from "../../context/LoadingProvider";
import { setProgress } from "../Loading";
import { setAllTimeline, setHeroTimeline } from "../utils/GsapScroll";
import { createHero, ORB_RADIUS } from "./heroObjects";

const FOV = 30;

// Keep the whole piece (orb + orbit labels) inside narrow/portrait canvases.
function fitCamera(camera: THREE.PerspectiveCamera, aspect: number) {
  const halfTan = Math.tan(THREE.MathUtils.degToRad(FOV / 2));
  const neededWidth = ORB_RADIUS * 4.6;
  camera.aspect = aspect;
  camera.position.z = Math.max(11, neededWidth / (2 * halfTan * aspect));
  camera.updateProjectionMatrix();
}

const Scene = () => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const { setLoading } = useLoading();

  useEffect(() => {
    const container = canvasDiv.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(rect.width, rect.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 100);
    fitCamera(camera, rect.width / rect.height);

    // scrollRig is driven by scroll timelines, mouseRig by the pointer.
    const scrollRig = new THREE.Group();
    const mouseRig = new THREE.Group();
    const hero = createHero();
    mouseRig.add(hero.root);
    scrollRig.add(mouseRig);
    scrollRig.scale.setScalar(0.001);
    scene.add(scrollRig);

    const progress = setProgress((value) => setLoading(value));
    let disposed = false;

    renderer.compileAsync(scene, camera).then(() => {
      if (disposed) return;
      setHeroTimeline(scrollRig);
      setAllTimeline();
      progress.loaded().then(() => {
        setTimeout(() => {
          gsap.to(scrollRig.scale, {
            x: 1,
            y: 1,
            z: 1,
            duration: 2.2,
            ease: "elastic.out(1, 0.6)",
          });
          gsap.to(".character-rim", {
            y: "55%",
            opacity: 0.45,
            delay: 0.2,
            duration: 2,
          });
        }, 2500);
      });
    });

    const mouse = { x: 0, y: 0 };
    let energy = 0;
    const onPointer = (clientX: number, clientY: number) => {
      const x = (clientX / window.innerWidth) * 2 - 1;
      const y = -(clientY / window.innerHeight) * 2 + 1;
      energy = Math.min(1, energy + Math.hypot(x - mouse.x, y - mouse.y) * 2);
      mouse.x = x;
      mouse.y = y;
    };
    const onMouseMove = (e: MouseEvent) => onPointer(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) =>
      onPointer(e.touches[0].clientX, e.touches[0].clientY);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("touchmove", onTouchMove, { passive: true });

    const onResize = () => {
      const r = container.getBoundingClientRect();
      renderer.setSize(r.width, r.height);
      fitCamera(camera, r.width / r.height);
      const workTrigger = ScrollTrigger.getById("work");
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger !== workTrigger) trigger.kill();
      });
      setHeroTimeline(scrollRig);
      setAllTimeline();
    };
    window.addEventListener("resize", onResize);

    const clock = new THREE.Clock();
    let frame = 0;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();
      energy *= 0.96;
      mouseRig.rotation.y = THREE.MathUtils.lerp(
        mouseRig.rotation.y,
        mouse.x * 0.45,
        0.05
      );
      mouseRig.rotation.x = THREE.MathUtils.lerp(
        mouseRig.rotation.x,
        -mouse.y * 0.3,
        0.05
      );
      hero.update(time, energy);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("resize", onResize);
      scene.clear();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="character-container">
      <div className="character-model" ref={canvasDiv}>
        <div className="character-rim"></div>
      </div>
    </div>
  );
};

export default Scene;
