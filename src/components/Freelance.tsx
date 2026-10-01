import "./styles/Freelance.css";

const projects = [
  {
    client: "Global Funded Traders",
    industry: "Proprietary trading firm",
    region: "USA / UAE",
    points: [
      "Owned the full SEO programme — keyword research, on-page optimisation and technical fixes.",
      "Restructured the acquisition funnel to shift lead generation toward organic search.",
    ],
    metrics: [
      { value: "+65%", label: "Organic traffic in 6 months" },
      { value: "−30%", label: "Paid-media dependence" },
    ],
    tags: ["SEO", "Technical SEO", "Funnel strategy"],
  },
  {
    client: "Play Sweeps",
    industry: "Sweepstakes gaming platform",
    region: "USA",
    points: [
      "Ran the email programme end to end — segmentation, scheduling and automated lifecycle flows.",
      "Implemented conversion and event tracking for accurate cross-channel attribution.",
      "Managed Meta ads on a USD 500 monthly budget with audience and creative testing.",
    ],
    metrics: [
      { value: "+22%", label: "Email-driven signups" },
      { value: "+35%", label: "Attribution accuracy" },
      { value: "−18%", label: "Cost per signup" },
    ],
    tags: ["Email marketing", "Meta Ads", "Event tracking"],
  },
  {
    client: "iGraft Global Hair Services",
    industry: "Healthcare / clinical services",
    region: "Pune",
    points: [
      "Managed SEO and paid marketing — on-page optimisation, local search visibility and campaign execution.",
      "Ran Meta ads on a ~₹30,000 monthly budget with ongoing audience and creative optimisation.",
    ],
    metrics: [
      { value: "+40%", label: "Consultation enquiries" },
      { value: "−20%", label: "Cost per lead" },
    ],
    tags: ["Local SEO", "Meta Ads", "Lead generation"],
  },
  {
    client: "Deepal Santoor",
    industry: "D2C consumer wellness brand",
    region: "India",
    points: [
      "Designed and built the brand website end to end on WordPress.",
      "Set up site structure, page layout and on-page SEO foundations.",
    ],
    metrics: [{ value: "45%", label: "Faster page load at launch" }],
    tags: ["WordPress", "Web design", "On-page SEO"],
  },
  {
    client: "Tuda Shashidhar",
    industry: "Political campaign",
    region: "Karnataka",
    points: [
      "Managed the official social media channels for the campaign.",
      "Planned and produced awareness-focused social content.",
    ],
    metrics: [
      { value: "1K → 7K", label: "Followers in two months" },
      { value: "+50%", label: "Post engagement rate" },
    ],
    tags: ["Social media", "Content", "Community"],
  },
  {
    client: "American Energy Deals",
    industry: "Energy comparison",
    region: "USA",
    points: [
      "Delivered SEO and content support for the comparison site.",
      "Covered keyword research and on-page optimisation.",
    ],
    metrics: [{ value: "+55%", label: "Organic traffic" }],
    tags: ["SEO", "Content", "Keyword research"],
  },
];

const Freelance = () => {
  return (
    <div className="freelance-section section-container" id="freelance">
      <div className="freelance-head">
        <h2>
          Freelance <span>projects</span>
        </h2>
        <p>
          Independent consulting since Jan 2023 — engaged directly by brands
          across fintech, gaming, healthcare, D2C and political campaigning in
          the US, UAE and India.
        </p>
      </div>
      <div className="freelance-grid">
        {projects.map((project, index) => (
          <div className="freelance-card" key={project.client}>
            <div className="freelance-card-top">
              <span className="freelance-index">0{index + 1}</span>
              <span className="freelance-region">{project.region}</span>
            </div>
            <h3>{project.client}</h3>
            <h5>{project.industry}</h5>
            <div className="freelance-metrics">
              {project.metrics.map((metric) => (
                <div className="freelance-metric" key={metric.label}>
                  <b>{metric.value}</b>
                  <small>{metric.label}</small>
                </div>
              ))}
            </div>
            <ul>
              {project.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <div className="freelance-tags">
              {project.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Freelance;
