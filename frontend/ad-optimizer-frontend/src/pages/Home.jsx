import { useEffect } from "react";
import "../styles/home.css";
import { Link } from "react-router-dom";
export default function Home() {
  useEffect(() => {
    const sections = document.querySelectorAll(".section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    sections.forEach((sec) => observer.observe(sec));
  }, []);

  return (
    <div className="home">

      {/* HERO */}
      <section className="section hero">
        <div className="hero-content">
          <h1>Ad Spend Optimization, Powered by Intelligence</h1>
          <p>
            Make confident decisions on ad budgets, discounts, and growth
            strategies using data-driven insights instead of guesswork.
          </p>

          <div className="hero-buttons">
          <Link to="/analyze"> <button className="primary-btn">Start Analyzing</button></Link> 
           <Link to="/strategies"><button className="secondary-btn">See Strategies</button></Link> 
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="section">
        <h2 className="section-title">The Problem</h2>
        <p className="section-subtitle">
          Businesses lose money every day due to unclear ad decisions
        </p>

        <div className="grid">
          <div className="card">
            <h3>❌ Guess-Based Spending</h3>
            <p>
              Most ad decisions are made without knowing where ROI actually
              peaks or when spending becomes wasteful.
            </p>
          </div>
          <div className="card">
            <h3>📉 Diminishing Returns</h3>
            <p>
              Increasing ad spend does not always increase profit — beyond a
              point, returns start to drop silently.
            </p>
          </div>
          <div className="card">
            <h3>⚠️ No Clear Stop Signal</h3>
            <p>
              Businesses rarely know when to stop spending or which strategy is
              safer.
            </p>
          </div>
        </div>
      </section>

      {/* SOLUTION */}
      <section className="section">
        <h2 className="section-title">What This Platform Does</h2>
        <p className="section-subtitle">
          Turns ad data into actionable decisions
        </p>

        <div className="grid">
          <div className="card">
            <h3>🔍 What-If Analysis</h3>
            <p>
              Change ad spend, discount, targeting, or creative strategy and
              instantly see impact on sales, profit, and ROI.
            </p>
          </div>
          <div className="card">
            <h3>📊 ROI & Profit Curves</h3>
            <p>
              Visualize exactly where ROI peaks and where spending becomes
              inefficient.
            </p>
          </div>
          <div className="card">
            <h3>🧠 Decision Intelligence</h3>
            <p>
              Receive smart warnings, budget caps, and stop-spend signals to
              protect profitability.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section">
        <h2 className="section-title">How It Works</h2>
        <p className="section-subtitle">
          Simple inputs, powerful insights
        </p>

        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <p>Adjust sliders for ad spend, discount, targeting, and creatives.</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <p>
              Machine learning models simulate outcomes across multiple
              scenarios.
            </p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <p>
              Visual dashboards highlight optimal ranges, risks, and strategies.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section cta">
        <h2>Make Smarter Ad Decisions Today</h2>
        <p>
          Stop guessing. Start optimizing with confidence-backed insights.
        </p>
       <Link to="/analyze"><button className="primary-btn">Go to Analyzer</button></Link> 
      </section>

    </div>
  );
}
