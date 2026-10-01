import * as THREE from "three";

// Ashima Arts 3D simplex noise (MIT) — drives the orb's organic morphing.
const simplexNoise = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(
    i.z+vec4(0.0,i1.z,i2.z,1.0))
    +i.y+vec4(0.0,i1.y,i2.y,1.0))
    +i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
`;

const orbVertex = /* glsl */ `
uniform float uTime;
uniform float uDistort;
varying vec3 vNormal;
varying vec3 vViewPos;
varying float vDisp;
varying vec3 vWorldNormal;
${simplexNoise}
void main(){
  float t = uTime * 0.2;
  float n = snoise(position * 0.7 + vec3(t)) * 0.8
          + snoise(position * 1.6 - vec3(t * 1.3)) * 0.2;
  vWorldNormal = normalize(mat3(modelMatrix) * normal);
  vDisp = n;
  vec3 displaced = position + normal * n * uDistort;
  vec4 mv = modelViewMatrix * vec4(displaced, 1.0);
  vViewPos = mv.xyz;
  vNormal = normalize(normalMatrix * normal);
  gl_Position = projectionMatrix * mv;
}
`;

const orbFragment = /* glsl */ `
uniform float uTime;
uniform vec3 uAmber;
uniform vec3 uOrange;
uniform vec3 uPink;
uniform vec3 uDeep;
varying vec3 vNormal;
varying vec3 vViewPos;
varying float vDisp;
varying vec3 vWorldNormal;
void main(){
  vec3 n = normalize(vNormal);
  vec3 viewDir = normalize(-vViewPos);
  float fres = pow(1.0 - max(dot(n, viewDir), 0.0), 2.5);

  // Vertical amber -> orange -> pink gradient, gently warped by the noise
  float g = clamp(vWorldNormal.y * 0.5 + 0.5 + vDisp * 0.22, 0.0, 1.0);
  vec3 col = mix(uPink, uOrange, smoothstep(0.2, 0.6, g));
  col = mix(col, uAmber, smoothstep(0.6, 0.95, g));

  // Soft key light from the top-left with a deep plum core shadow
  vec3 lightDir = normalize(vec3(-0.5, 0.8, 0.6));
  float diff = max(dot(n, lightDir), 0.0);
  col *= mix(0.55, 1.1, diff);
  col = mix(uDeep, col, smoothstep(-0.2, 0.5, diff + 0.35));

  // Glossy highlight and warm rim
  vec3 h = normalize(lightDir + viewDir);
  col += pow(max(dot(n, h), 0.0), 48.0) * 0.65;
  col += fres * mix(uPink, uAmber, 0.4) * 0.9;
  gl_FragColor = vec4(col, 1.0);
}
`;

const PALETTE = {
  amber: new THREE.Color("#ffc23d"),
  orange: new THREE.Color("#ff7a3d"),
  pink: new THREE.Color("#ff3d8b"),
  deep: new THREE.Color("#3a0b2e"),
};

const LABELS = ["Google Ads", "Meta Ads", "SEO", "GA4", "SEMrush", "HubSpot"];

function makeLabelTexture(text: string) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;
  const font = "600 52px Geist, Helvetica, Arial, sans-serif";
  ctx.font = font;
  const padX = 42;
  const width = Math.ceil(ctx.measureText(text).width + padX * 2);
  const height = 104;
  canvas.width = width;
  canvas.height = height;
  const r = height / 2;

  const pill = () => {
    ctx.beginPath();
    ctx.roundRect(3, 3, width - 6, height - 6, r - 3);
  };
  pill();
  ctx.fillStyle = "rgba(20, 10, 26, 0.82)";
  ctx.fill();
  const border = ctx.createLinearGradient(0, 0, width, 0);
  border.addColorStop(0, "#ffc23d");
  border.addColorStop(0.5, "#ff7a3d");
  border.addColorStop(1, "#ff3d8b");
  ctx.lineWidth = 5;
  ctx.strokeStyle = border;
  pill();
  ctx.stroke();

  ctx.font = font;
  ctx.fillStyle = "#fff4ec";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  ctx.fillText(text, width / 2, height / 2 + 3);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return { texture, aspect: width / height };
}

function makeHaloTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 256;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  g.addColorStop(0, "rgba(255,122,61,0.55)");
  g.addColorStop(0.35, "rgba(255,61,139,0.28)");
  g.addColorStop(0.7, "rgba(255,61,139,0.06)");
  g.addColorStop(1, "rgba(255,61,139,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 256);
  return new THREE.CanvasTexture(canvas);
}

function makeDotTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 64;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.35, "rgba(255,255,255,0.6)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(canvas);
}

export const ORB_RADIUS = 0.9;
const ORBIT_RADIUS = 1.55;

/**
 * Builds the hero piece: a morphing gradient orb with a soft glow, two
 * orbit rings, a particle halo and marketing-channel labels circling it.
 */
export function createHero() {
  const root = new THREE.Group();

  const orbUniforms = {
    uTime: { value: 0 },
    uDistort: { value: 0.14 },
    uAmber: { value: PALETTE.amber },
    uOrange: { value: PALETTE.orange },
    uPink: { value: PALETTE.pink },
    uDeep: { value: PALETTE.deep },
  };
  const orb = new THREE.Mesh(
    new THREE.IcosahedronGeometry(ORB_RADIUS, 48),
    new THREE.ShaderMaterial({
      uniforms: orbUniforms,
      vertexShader: orbVertex,
      fragmentShader: orbFragment,
    })
  );
  root.add(orb);

  const halo = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: makeHaloTexture(),
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
  );
  halo.scale.setScalar(ORB_RADIUS * 5);
  halo.renderOrder = -1;
  root.add(halo);

  const orbit = new THREE.Group();
  orbit.rotation.set(1.22, 0, -0.32);
  root.add(orbit);

  const ringMaterial = (color: string, opacity: number) =>
    new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  const ring1 = new THREE.Mesh(
    new THREE.TorusGeometry(ORBIT_RADIUS, 0.006, 8, 256),
    ringMaterial("#ff9a5c", 0.75)
  );
  orbit.add(ring1);
  const ring2 = new THREE.Mesh(
    new THREE.TorusGeometry(ORBIT_RADIUS * 1.22, 0.004, 8, 256),
    ringMaterial("#ff3d8b", 0.45)
  );
  ring2.rotation.set(0.35, 0.25, 0);
  orbit.add(ring2);

  // Particle halo
  const count = 900;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const swatches = [PALETTE.amber, PALETTE.orange, PALETTE.pink];
  for (let i = 0; i < count; i++) {
    const r = ORB_RADIUS * 1.6 + Math.pow(Math.random(), 1.8) * 2.6;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.75;
    positions[i * 3 + 2] = r * Math.cos(phi);
    const c = swatches[i % swatches.length];
    colors.set([c.r, c.g, c.b], i * 3);
  }
  const particleGeo = new THREE.BufferGeometry();
  particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  particleGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  const particles = new THREE.Points(
    particleGeo,
    new THREE.PointsMaterial({
      size: 0.045,
      map: makeDotTexture(),
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
  );
  root.add(particles);

  // Orbiting channel labels
  const labels = LABELS.map((text, i) => {
    const { texture, aspect } = makeLabelTexture(text);
    const sprite = new THREE.Sprite(
      new THREE.SpriteMaterial({ map: texture, transparent: true })
    );
    const h = 0.17;
    sprite.scale.set(h * aspect, h, 1);
    sprite.userData.offset = (i / LABELS.length) * Math.PI * 2;
    orbit.add(sprite);
    return sprite;
  });

  const tmp = new THREE.Vector3();
  const update = (time: number, energy: number) => {
    orbUniforms.uTime.value = time;
    orbUniforms.uDistort.value = THREE.MathUtils.lerp(
      orbUniforms.uDistort.value,
      0.12 + energy * 0.12,
      0.05
    );
    orb.rotation.y = time * 0.08;
    particles.rotation.y = time * 0.03;
    particles.rotation.x = Math.sin(time * 0.1) * 0.1;
    ring2.rotation.z = time * 0.05;

    labels.forEach((sprite) => {
      const a = sprite.userData.offset + time * 0.22;
      sprite.position.set(
        Math.cos(a) * ORBIT_RADIUS,
        Math.sin(a) * ORBIT_RADIUS,
        Math.sin(time * 0.8 + sprite.userData.offset) * 0.06
      );
      // Fade labels as they pass behind the orb
      sprite.getWorldPosition(tmp);
      const material = sprite.material as THREE.SpriteMaterial;
      material.opacity = THREE.MathUtils.clamp(0.6 + tmp.z * 0.35, 0.4, 1);
    });
  };

  return { root, update };
}
