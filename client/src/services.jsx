import { FaLaptopCode, FaBrain, FaDatabase, FaTools } from "react-icons/fa";

export default function Services() {
  return (
    <div
      style={{
        minHeight: "100vh",
      //  background: "linear-gradient(135deg, #000000ff, #000000ff, #000000ff)",
        padding: "120px 20px 50px", // <-- más espacio arriba por el navbar
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "white",
      }}
    >
      <h1 style={{ color: "#e0aaff", marginBottom: "40px" }}>My Services</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          width: "100%",
          maxWidth: "1000px",
        }}
      >
        {/* Full-Stack Development */}
        <div
          style={card}
          onMouseOver={hoverOn}
          onMouseOut={hoverOff}
        >
          <FaLaptopCode size={36} style={icon} />
          <h3 style={{ marginBottom: "10px" }}>Full-Stack Development</h3>
          <p>
            Building responsive web applications with React, Node.js, and modern
            technologies for seamless user experiences.
          </p>
        </div>

        {/* AI & Machine Learning */}
        <div
          style={card}
          onMouseOver={hoverOn}
          onMouseOut={hoverOff}
        >
          <FaBrain size={36} style={icon} />
          <h3 style={{ marginBottom: "10px" }}>AI & Machine Learning</h3>
          <p>
            Implementing intelligent solutions with Python, TensorFlow, and data
            analysis for predictive insights.
          </p>
        </div>

        {/* Database Management */}
        <div
          style={card}
          onMouseOver={hoverOn}
          onMouseOut={hoverOff}
        >
          <FaDatabase size={36} style={icon} />
          <h3 style={{ marginBottom: "10px" }}>Database Management</h3>
          <p>
            Designing and optimizing SQL databases with a focus on performance,
            scalability, and data integrity.
          </p>
        </div>

        {/* Debugging & Problem Solving */}
        <div
          style={card}
          onMouseOver={hoverOn}
          onMouseOut={hoverOff}
        >
          <FaTools size={36} style={icon} />
          <h3 style={{ marginBottom: "10px" }}>Debugging & Problem Solving</h3>
          <p>
            Identifying issues, fixing bugs, and improving overall system
            performance with efficient solutions.
          </p>
        </div>
      </div>
    </div>
  );
}

// 🎨 estilos reutilizables
const card = {
  backgroundColor: "#111",
  borderRadius: "12px",
  padding: "30px 20px",
  textAlign: "center",
  boxShadow: "0px 4px 12px rgba(0,0,0,0.5)",
  transition: "transform 0.2s, background 0.3s",
};

const icon = {
  color: "#c77dff",
  marginBottom: "15px",
};

// efectos hover
const hoverOn = (e) => {
  e.currentTarget.style.background = "#6a0dad";
  e.currentTarget.style.transform = "scale(1.05)";
};

const hoverOff = (e) => {
  e.currentTarget.style.background = "#111";
  e.currentTarget.style.transform = "scale(1)";
};
