// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

// export default function Home() {
//   const roles = ["Full Stack Developer", "AI & Machine Learning Enthusiast"];
//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setIndex((prevIndex) => (prevIndex + 1) % roles.length);
//     }, 10000); // cambia cada 10 segundos
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div style={{ textAlign: "center", marginTop: "100px" }}>
//       <h1>Hi, I'm Daylin</h1>
//       <h2>{roles[index]}</h2>
//       <p>
//         Skilled at programming systems using JavaScript, Python, and C++.
//         Strong troubleshooting and debugging abilities applied in academic and
//         professional projects.
//       </p>
//       <div style={{ marginTop: "20px" }}>
//         {/* Botón que redirige a About */}
//         <Link to="/about">
//           <button
//             style={{
//               margin: "10px",
//               padding: "10px 20px",
//               borderRadius: "8px",
//               border: "none",
//               backgroundColor: "#007bff",
//               color: "white",
//               cursor: "pointer",
//             }}
//           >
//             Explore More
//           </button>
//         </Link>

//         {/* Botón que redirige a Projects */}
//         <Link to="/project">
//           <button
//             style={{
//               margin: "10px",
//               padding: "10px 20px",
//               borderRadius: "8px",
//               border: "1px solid #007bff",
//               backgroundColor: "white",
//               color: "#007bff",
//               cursor: "pointer",
//             }}
//           >
//             See Projects
//           </button>
//         </Link>
//       </div>
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const roles = ["Full Stack Developer", "AI & Machine Learning Enthusiast"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % roles.length);
    }, 10000); // cambia cada 10 segundos
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh", // toda la altura de la pantalla
        display: "flex",
        flexDirection: "column",
        justifyContent: "center", // centra verticalmente
        alignItems: "center", // centra horizontalmente
        textAlign: "center",
        padding: "20px",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", marginBottom: "10px" }}>Hi, I'm Daylin</h1>
      <h2 style={{ fontSize: "1.8rem", marginBottom: "20px", color: "#e0aaff" }}>
        {roles[index]}
      </h2>
      <p
        style={{
          maxWidth: "700px",
          lineHeight: "1.6",
          marginBottom: "30px",
        }}
      >
        Skilled at programming systems using JavaScript, Python, and C++.
        Strong troubleshooting and debugging abilities applied in academic
        and professional projects.
      </p>
      <div>
        {/* Botón que redirige a About */}
        <Link to="/about">
          <button
            style={{
              margin: "10px",
              padding: "12px 24px",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#007bff",
              color: "white",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Explore More
          </button>
        </Link>

        {/* Botón que se puede usar para Projects */}
        <Link to="/project">
          <button
            style={{
              margin: "10px",
              padding: "12px 24px",
              borderRadius: "8px",
              border: "1px solid #007bff",
              backgroundColor: "white",
              color: "#007bff",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            See Projects
          </button>
        </Link>
      </div>
    </div>
  );
}
