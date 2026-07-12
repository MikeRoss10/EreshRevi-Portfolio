import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const caseStudies = [
  {
    title: "Organic Traffic Growth",
    category: "SEO",
    detail: "80%+ increase in organic search traffic via technical SEO",
  },
  {
    title: "Google & Meta Ads Funnel",
    category: "Paid Advertising",
    detail: "Increased qualified leads while reducing cost-per-acquisition",
  },
  {
    title: "WordPress Landing Pages",
    category: "Web & CMS",
    detail: "Rebuilt site/landing pages to improve UX and conversion rate",
  },
  {
    title: "Email Nurture Sequences",
    category: "Email Marketing",
    detail: "8% lift in engagement & conversions via segmentation, A/B testing",
  },
  {
    title: "Google Ads Quality Score",
    category: "SEM",
    detail: "Improved Quality Score through bid, copy & landing page alignment",
  },
  {
    title: "Social & Content Growth",
    category: "Social Media",
    detail: "25% follower engagement growth, 200% organic reach increase",
  },
];

const Work = () => {
  useGSAP(() => {
  let translateX: number = 0;

  function setTranslateX() {
    const box = document.getElementsByClassName("work-box");
    const rectLeft = document
      .querySelector(".work-container")!
      .getBoundingClientRect().left;
    const rect = box[0].getBoundingClientRect();
    const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
    let padding: number =
      parseInt(window.getComputedStyle(box[0]).padding) / 2;
    translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
  }

  setTranslateX();

  let timeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".work-section",
      start: "top top",
      end: `+=${translateX}`, // Use actual scroll width
      scrub: true,
      pin: true,
      id: "work",
    },
  });

  timeline.to(".work-flex", {
    x: -translateX,
    ease: "none",
  });

  // Clean up (optional, good practice)
  return () => {
    timeline.kill();
    ScrollTrigger.getById("work")?.kill();
  };
}, []);
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          Campaign <span>Case Studies</span>
        </h2>
        <div className="work-flex">
          {caseStudies.map((item, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>

                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.category}</p>
                  </div>
                </div>
                <h4>Result</h4>
                <p>{item.detail}</p>
              </div>
              <WorkImage image="/images/placeholder.webp" alt="" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
