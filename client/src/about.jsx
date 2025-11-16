export default function About() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        //backgroundColor: "#000", // Fondo oscuro general
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "#111", // Box color
          borderRadius: "12px",
          padding: "40px",
          maxWidth: "800px",
          textAlign: "center",
          color: "white",
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.5)",
        }}
      >
        {/* Foto de perfil */}
        <img
          src="/Daylin.png"
          alt="Daylin Sisniega"
          style={{
            width: "160px",
            height: "160px",
            borderRadius: "50%",
            marginBottom: "20px",
            objectFit: "cover",
            border: "4px solid #7b2cbf", // Borde azul como en la referencia
          }}
        />

        {/* Título */}
        <h1 style={{ color: "#7b2cbf", marginBottom: "20px" }}>
          Hi, I'm Daylin — Developer, AI Enthusiast, and Problem Solver.
        </h1>

        {/* Descripción */}
        <p
          style={{
            maxWidth: "700px",
            margin: "0 auto",
            lineHeight: "1.6",
            fontSize: "16px",
          }}
        >
          I am currently pursuing{" "}
          <strong>
            Software Engineering Technology – Artificial Intelligence
          </strong>{" "}
          at Centennial College. I am passionate about creating scalable
          applications and applying
          <strong>
            {" "}
            problem-solving, debugging, and full-stack development
          </strong>{" "}
          skills to real-world projects.
          <br />
          <br />
          Proficient in{" "}
          <strong>JavaScript, Python, C++, SQL, React, and TensorFlow</strong>,
          I enjoy bridging the gap between software engineering and AI systems.
          I also thrive in team collaboration, and continuous
          learning to sharpen my technical expertise.
        </p>

        {/* Botón para descargar CV */}
        <a
          href="/DAYLIN SISNIEGA RESUME 2025.pdf"
          download
          style={{
            display: "inline-block",
            marginTop: "30px",
            padding: "12px 24px",
            backgroundColor: "#7b2cbf",
            color: "white",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Download Resume
        </a>
      </div>
    </div>
  );
}
