import "./styles/Career.css";

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
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Digital Marketing Intern</h4>
                <h5>Shreedhan Packers and Movers</h5>
              </div>
              <h3>2022</h3>
            </div>
            <p>
              Supported SEO tasks including keyword research and on-page
              optimization, created content for web and social, and assisted
              in campaign execution and performance tracking.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Digital Marketing Executive</h4>
                <h5>MJSPR Pvt Limited</h5>
              </div>
              <h3>2022–24</h3>
            </div>
            <p>
              Led SEO strategy and SEM campaigns on Google Ads, grew social
              engagement by 25% and organic reach by 200%, and ran
              HubSpot-powered email marketing and lead nurturing.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Marketing Manager (Performance Marketing)</h4>
                <h5>UtilityDeals — Australia</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Driving 80%+ growth in organic traffic through SEO and content,
              running Google & Meta Ads performance campaigns, and managing a
              monthly budget of ₹3.2L–3.5L across channels.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
