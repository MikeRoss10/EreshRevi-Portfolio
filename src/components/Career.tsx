import "./styles/Career.css";

const roles = [
  {
    title: "Digital Marketing Intern",
    company: "Shreedhan Packers and Movers",
    year: "2022",
    summary:
      "Supported keyword research, on-page SEO and content, built backlink and blog strategies, and managed Google Search, Display and Remarketing campaigns with weekly KPI reporting.",
  },
  {
    title: "Digital Marketing Executive",
    company: "MJSPR Pvt. Ltd.",
    year: "2022–24",
    summary:
      "Led SEO strategy and technical audits across client accounts, ran Google Ads SEM with improved Quality Score, grew social engagement 25% and organic reach 200%, and automated HubSpot nurture flows.",
  },
  {
    title: "Freelance Marketing Consultant",
    company: "Independent — US, UAE & India",
    year: "2023+",
    summary:
      "Engaged directly by brands across fintech, gaming, healthcare, D2C and political campaigning — owning SEO, paid social, email lifecycle and tracking end to end.",
  },
  {
    title: "Marketing Executive",
    company: "UtilityDeals — Australia",
    year: "NOW",
    summary:
      "Driving 80%+ organic traffic growth, managing a ₹3.2L–₹3.5L monthly budget across Google & Meta, building WordPress landing pages, and lifting conversions 8% through A/B-tested email sequences.",
  },
];

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          {roles.map((role) => (
            <div className="career-info-box" key={role.title}>
              <div className="career-info-in">
                <div className="career-role">
                  <h4>{role.title}</h4>
                  <h5>{role.company}</h5>
                </div>
                <h3>{role.year}</h3>
              </div>
              <p>{role.summary}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Career;
