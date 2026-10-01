import "./styles/Work.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const caseStudies = [
  {
    title: "UtilityDeals",
    category: "Energy comparison · Australia",
    services: "Technical SEO · Google & Meta Ads · Email · GA4",
    detail:
      "Technical SEO, blog optimisation and a structured content programme across electricity, gas, solar and broadband verticals.",
    metric: "+80%",
    metricLabel: "Organic search traffic",
  },
  {
    title: "Global Funded Traders",
    category: "Prop trading · USA / UAE",
    services: "SEO programme · Funnel strategy",
    detail:
      "Owned the full SEO programme and shifted lead generation toward organic search, cutting paid-media dependence by 30%.",
    metric: "+65%",
    metricLabel: "Organic traffic in 6 months",
  },
  {
    title: "Play Sweeps",
    category: "Sweepstakes gaming · USA",
    services: "Email lifecycle · Meta Ads · Tracking",
    detail:
      "End-to-end email programme with automated flows, plus Meta ads that cut cost-per-signup 18% and tracking that lifted attribution accuracy 35%.",
    metric: "+22%",
    metricLabel: "Email-driven signups",
  },
  {
    title: "iGraft Global Hair Services",
    category: "Healthcare · Pune",
    services: "Local SEO · Meta Ads",
    detail:
      "SEO, local search visibility and Meta campaigns with ongoing audience and creative optimisation, lowering cost-per-lead by 20%.",
    metric: "+40%",
    metricLabel: "Consultation enquiries",
  },
  {
    title: "Tuda Shashidhar",
    category: "Political campaign · Karnataka",
    services: "Social media · Content",
    detail:
      "Managed official social channels and awareness content — followers grew from 1,000 to 7,000 and engagement rate rose 50%.",
    metric: "7×",
    metricLabel: "Followers in two months",
  },
  {
    title: "American Energy Deals",
    category: "Energy comparison · USA",
    services: "SEO · Content",
    detail:
      "Keyword research, on-page optimisation and content support for an energy comparison site.",
    metric: "+55%",
    metricLabel: "Organic traffic",
  },
  {
    title: "Deepal Santoor",
    category: "D2C wellness brand",
    services: "WordPress build · On-page SEO",
    detail:
      "Designed and built the brand website end to end on WordPress — site structure, layout and on-page SEO foundations.",
    metric: "45%",
    metricLabel: "Faster page load at launch",
  },
  {
    title: "MJSPR Pvt. Ltd.",
    category: "Agency · Client accounts",
    services: "SEO · SEM · Social · HubSpot",
    detail:
      "Targeted content and community strategy that grew social engagement 25%, alongside SEO and Google Ads for client accounts.",
    metric: "+200%",
    metricLabel: "Organic social reach",
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
          Client <span>Results</span>
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
                <h4>What I did</h4>
                <p>{item.detail}</p>
                <p className="work-services">{item.services}</p>
              </div>
              <div className="work-metric">
                <span className="work-metric-value">{item.metric}</span>
                <span className="work-metric-label">{item.metricLabel}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
