import "./styles/Impact.css";

const stats = [
  { value: "4+", label: "Years in performance marketing" },
  { value: "80%+", label: "Organic traffic growth at UtilityDeals" },
  { value: "₹3.5L", label: "Monthly ad budget managed" },
  { value: "8+", label: "Brands across AU, US, UAE & India" },
  { value: "−30%", label: "Paid-media dependence cut via SEO" },
  { value: "7×", label: "Social following growth in 2 months" },
];

const Impact = () => {
  return (
    <div className="impact-section section-container" id="impact">
      <h2>
        Impact in <span>numbers</span>
      </h2>
      <div className="impact-grid">
        {stats.map((stat) => (
          <div className="impact-card" key={stat.label}>
            <span className="impact-value">{stat.value}</span>
            <span className="impact-label">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Impact;
