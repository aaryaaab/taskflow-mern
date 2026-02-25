import "./Home.css";

export default function Home() {
  return (
    <div className="landing">

      {/* NAVBAR */}
      <nav className="navbar">
        <h2 className="logo">TaskFlow</h2>
        <a href="/login" className="login-btn">Login</a>
      </nav>

      {/* HERO */}
      <section className="hero">
        <h1 className="hero-title">
          Organize your work.<br/>Focus on what matters.
        </h1>

        <p className="hero-sub">
          A calm workspace for thinkers, planners, and disciplined minds.
        </p>

        <div className="cta">
          <a href="/login" className="primary">Get Started</a>
          <a href="/login" className="secondary">Try Demo</a>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features">

        <div className="feature-card">
          <div className="icon">📜</div>
          <h3>Track daily tasks</h3>
          <p>Write, manage and complete tasks like a personal planner.</p>
        </div>

        <div className="feature-card">
          <div className="icon">🕯</div>
          <h3>Stay productive</h3>
          <p>A distraction-free environment designed for deep focus.</p>
        </div>

        <div className="feature-card">
          <div className="icon">⏳</div>
          <h3>Never forget deadlines</h3>
          <p>Your work stays organized and always within reach.</p>
        </div>

      </section>

    </div>
  );
}