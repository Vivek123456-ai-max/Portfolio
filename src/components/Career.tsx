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
                <h4>3D Artist & Animator</h4>
                <h5>Self Projects</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Designed 3D models and animations using Blender for creative and
              gaming projects. Successfully developed and delivered multiple web,
              3D, and video projects independently.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>SEO Specialist</h4>
                <h5>Self Projects</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Implemented SEO strategies, increasing website visibility and
              performance metrics. Improved website search rankings through
              effective on-page and off-page SEO implementation.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Game Developer</h4>
                <h5>Self Projects</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Developed game prototypes demonstrating strong understanding of
              game mechanics and design. Designed and developed interactive game
              prototypes showcasing core game design and development skills.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
