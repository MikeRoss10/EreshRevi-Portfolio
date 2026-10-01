import "./styles/Credentials.css";

const certifications = [
  { name: "Google Digital Marketing Certification", issuer: "Google" },
  { name: "Inbound Marketing Certification", issuer: "HubSpot Academy" },
  { name: "Fundamentals of Digital Marketing", issuer: "Coursera" },
  { name: "Advanced Digital Marketing", issuer: "PIIDM" },
];

const education = [
  {
    name: "B.Com (Costing & Marketing)",
    school: "Savitribai Phule Pune University",
    score: "86%",
  },
  { name: "HSC (Science)", school: "Amrita Vidyalayam", score: "80%" },
  { name: "SSC", school: "Amrita Vidyalayam", score: "95%" },
];

const languages = ["English", "Hindi", "Kannada", "Marathi"];

const Credentials = () => {
  return (
    <div className="credentials-section section-container" id="credentials">
      <h2>
        Credentials <span>&amp; education</span>
      </h2>
      <div className="credentials-grid">
        <div className="credentials-card">
          <h4>Certifications</h4>
          <ul>
            {certifications.map((cert) => (
              <li key={cert.name}>
                <span>{cert.name}</span>
                <small>{cert.issuer}</small>
              </li>
            ))}
          </ul>
        </div>
        <div className="credentials-card">
          <h4>Education</h4>
          <ul>
            {education.map((item) => (
              <li key={item.name}>
                <span>
                  {item.name}
                  <b>{item.score}</b>
                </span>
                <small>{item.school}</small>
              </li>
            ))}
          </ul>
        </div>
        <div className="credentials-card">
          <h4>Languages</h4>
          <div className="credentials-tags">
            {languages.map((lang) => (
              <span key={lang}>{lang}</span>
            ))}
          </div>
          <h4 className="credentials-sub">Based in</h4>
          <p>Pune, Maharashtra, India</p>
        </div>
      </div>
    </div>
  );
};

export default Credentials;
