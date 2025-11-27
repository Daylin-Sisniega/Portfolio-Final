import { useState, useEffect } from "react";
import auth from "./auth/auth-helper.js";   // AJUSTE DE RUTA
const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const baseProjects = [
  {
    id: 'p1',
    title: "Pixar Movie Gallery",
    description: "A movie gallery web app that displays Pixar movies with details and images.",
    image: "/pixar.png",
    link: "https://github.com/Daylin-Sisniega/Projects/tree/main/Pixar",
  },
  {
    id: 'p2',
    title: "Pokeball Project",
    description: "Pokémon project with images and interactive elements from the PokéAPI.",
    image: "/pokemon.png",
    link: "https://github.com/Daylin-Sisniega/Projects/tree/main/Pokeball",
  },
];

export default function Project() {
  // Leer role del usuario logueado
  const jwt = auth.isAuthenticated();
  const isAdmin = jwt && jwt.user && jwt.user.role === "admin";

  const [projects, setProjects] = useState(baseProjects);
  const [form, setForm] = useState({ title: "", description: "", image: "", link: "" });
useEffect(() => {
  // si NO es admin, no cargamos proyectos del backend
  if (!isAdmin) return;

  async function fetchProjects() {
    try {
      const res = await fetch(`${API}/api/projects`);
      if (!res.ok) {
        console.error("Error al cargar proyectos del backend:", res.status);
        return;
      }

      const data = await res.json();
      const backendProjects = data.map((p) => ({
        id: p._id,
        title: p.title,
        description: p.description,
        image: p.image || "",
        link: p.link || "",
      }));

      setProjects((prev) => [...prev, ...backendProjects]);
    } catch (err) {
      console.error("Error cargando proyectos del backend", err);
    }
  }

  fetchProjects();
}, [isAdmin]);

  //  NUEVO: id del proyecto que estamos editando (null = creando uno nuevo)
  const [editingId, setEditingId] = useState(null);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (!isAdmin) return; // seguridad extra

    if (editingId) {
      // UPDATE
      const updated = projects.map((pr) =>
        pr.id === editingId ? { ...pr, ...form } : pr
      );
      setProjects(updated);
      setEditingId(null); // salir del modo edición
    } else {
      //  CREATE (lo que ya hacías)
      const newProject = { ...form, id: 'p' + Date.now() };
      setProjects((p) => [...p, newProject]);
    }

    setForm({ title: "", description: "", image: "", link: "" });
  };

  const removeProject = (id) => {
    if (!isAdmin) return;
    setProjects(p => p.filter(x => x.id !== id));
  };

  // NUEVO: cargar proyecto al formulario para editar
  const startEdit = (project) => {
    if (!isAdmin) return;
    setEditingId(project.id);
    setForm({
      title: project.title || "",
      description: project.description || "",
      image: project.image || "",
      link: project.link || "",
    });
  };

  return (
    <div style={{ minHeight: "100vh", padding: "120px 20px 50px", textAlign: "center" }}>
      <h1 style={{ color: "#e0aaff", marginBottom: "20px" }}>Projects</h1>

      {/* --- Formulario controlado con tu estilo (solo admin) --- */}
      {isAdmin && (
        <form
          onSubmit={onSubmit}
          style={{
            maxWidth: 900, margin: "0 auto 30px", background: "#111", color: "#fff",
            padding: 20, borderRadius: 12, boxShadow: "0 4px 12px rgba(0,0,0,.5)", textAlign: "left",
          }}
        >
          <h3 style={{ marginTop: 0 }}>
            {editingId ? "Edit Project" : "Add Project"}
          </h3>
          <input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={onChange}
            style={{
              width: "100%", marginBottom: 10, padding: "10px 12px",
              borderRadius: 8, background: "#222", color: "#fff", border: "1px solid #333"
            }}
          />
          <input
            name="image"
            placeholder="Image path (optional)"
            value={form.image}
            onChange={onChange}
            style={{
              width: "100%", marginBottom: 10, padding: "10px 12px",
              borderRadius: 8, background: "#222", color: "#fff", border: "1px solid #333"
            }}
          />
          <input
            name="link"
            placeholder="GitHub/URL (optional)"
            value={form.link}
            onChange={onChange}
            style={{
              width: "100%", marginBottom: 10, padding: "10px 12px",
              borderRadius: 8, background: "#222", color: "#fff", border: "1px solid #333"
            }}
          />
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={onChange}
            rows={3}
            style={{
              width: "100%", marginBottom: 10, padding: "10px 12px",
              borderRadius: 8, background: "#222", color: "#fff", border: "1px solid #333"
            }}
          />
          <button
            type="submit"
            style={{
              padding: "10px 16px", borderRadius: 8, border: "none",
              background: "#6a0dad", color: "#fff", cursor: "pointer"
            }}
          >
            {editingId ? "Update" : "Add"}
          </button>
        </form>
      )}

      {/* --- Cards (todos las pueden ver) --- */}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px" }}>
        {projects.map((project) => (
          <div
            key={project.id}
            style={{
              width: "300px", backgroundColor: "#111", borderRadius: "12px", padding: "20px",
              boxShadow: "0px 4px 12px rgba(0,0,0,0.5)", transition: "transform 0.2s, background 0.3s",
              position: "relative"
            }}
            onMouseOver={(e) => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.background = "#6a0dad"; }}
            onMouseOut={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.background = "#111"; }}
          >
            {/* Botones solo si es admin */}
            {isAdmin && (
              <>
                <button
                  onClick={() => removeProject(project.id)}
                  style={{
                    position: "absolute", top: 8, right: 8, border: "none", borderRadius: 8,
                    background: "#2b2b2b", color: "#fff", padding: "6px 10px", cursor: "pointer"
                  }}
                  title="Delete"
                >
                  ✕
                </button>

                <button
                  onClick={() => startEdit(project)}
                  style={{
                    position: "absolute", top: 8, left: 8, border: "none", borderRadius: 8,
                    background: "#6a0dad", color: "#fff", padding: "6px 10px", cursor: "pointer"
                  }}
                  title="Edit"
                >
                  ✎
                </button>
              </>
            )}

            {project.link ? (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                {project.image && (
                  <img
                    src={project.image}
                    alt={project.title}
                    style={{
                      width: "200px",
                      height: "150px",
                      objectFit: "contain",
                      marginBottom: "15px"
                    }}
                  />
                )}
                <h3 style={{ color: "#c77dff" }}>{project.title}</h3>
                <p>{project.description}</p>
              </a>
            ) : (
              <>
                {project.image && (
                  <img
                    src={project.image}
                    alt={project.title}
                    style={{
                      width: "200px",
                      height: "150px",
                      objectFit: "contain",
                      marginBottom: "15px"
                    }}
                  />
                )}
                <h3 style={{ color: "#c77dff" }}>{project.title}</h3>
                <p>{project.description}</p>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
