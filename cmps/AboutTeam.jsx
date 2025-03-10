export function AboutTeam() {
  return (
    <section className="about-team">
      <h2>The Team</h2>
      <ul>
        <li>
          <span>
            Hey! I'm Alon Mintz 😀 I’m an enthusiastic software developer diving
            into the world of the MERN stack, where I’m eager to build dynamic
            web applications and enhance my skills. I'm extremely motivated to
            learn and grow every day. I invite you to come see my progress on:{" "}
          </span>
          <div style={{ textAlign: "center" }}>
            <a
              href="https://github.com/alonmintz"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <i class="fa fa-github"></i>
            </a>
            <a
              href="https://linkedin.com/in/alon-mintz"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <i class="fa fa-linkedin-square"></i>
            </a>
          </div>
        </li>
      </ul>
    </section>
  );
}
