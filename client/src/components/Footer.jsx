import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer
      style={{
        background: "#000",
        color: "#ccc",
        textAlign: "center",
        padding: "30px 20px",
        marginTop: "40px",
        borderTop: "1px solid #222",
      }}
    >
      {/* Copyright */}
      <p style={{ marginBottom: "10px" }}>
        © 2025 <span style={{ color: "#e0aaff" }}>Daylin Sisniega</span> | All
        Rights Reserved
      </p>

      {/* Créditos */}
      <p style={{ fontSize: "14px", marginBottom: "20px" }}>
        Inspired by Jerophin’s Portfolio Design ✨
      </p>

      {/* Info de contacto */}
      <p style={{ marginBottom: "15px" }}>
        📍 Toronto, Ontario | 📧{" "}
        <a
          href="mailto:daylintax@outlook.com"
          style={{ color: "#e0aaff", textDecoration: "none" }}
        >
          daylintax@outlook.com
        </a>{" "}
        | 📱 +1 6476429395
      </p>

      {/* Iconos con links */}
      <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/daylin-sisniega-1ab179300/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#e0aaff", fontSize: "28px" }}
        >
          <FaLinkedin />
        </a>

        {/* GitHub */}
        <a
          href="https://github.com/Daylin-Sisniega"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#e0aaff", fontSize: "28px" }}
        >
          <FaGithub />
        </a>

        {/* Email */}
        <a
          href="mailto:daylintax@outlook.com"
          style={{ color: "#e0aaff", fontSize: "28px" }}
        >
          <FaEnvelope />
        </a>
      </div>
    </footer>
  );
}
