
import { useState } from "react";
import auth from "./auth/auth-helper.js";   // 🔹 NUEVO

// Colores que combinan con tu Project:
const ACCENT = "#e0aaff";   // títulos
const ACCENT2 = "#c77dff";  // detalles
const CARD_BG = "#111";
const INPUT_BG = "#222";
const BTN = "#6a0dad";

const baseItems = [
  {
    id: "e1",
    title: "Software Engineering Technology – Artificial Intelligence",
    institution: "Centennial College, Toronto, ON",
    completion: "Expected Graduation: 2028",
    description: "GPA: 4.0",
    logo: "/centennialcollege.png",
  },
];

export default function Education() {
  const jwt = auth.isAuthenticated();
  const isAdmin = jwt && jwt.user && jwt.user.role === "admin";

  const [items, setItems] = useState(baseItems);
  const [form, setForm] = useState({
    title: "",
    institution: "",
    completion: "",
    description: "",
    logo: "",
  });

  // 🔹 NUEVO: id que estamos editando (null = creando)
  const [editingId, setEditingId] = useState(null);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (!isAdmin) return;

    if (editingId) {
      // 🔹 UPDATE
      const updated = items.map((it) =>
        it.id === editingId ? { ...it, ...form } : it
      );
      setItems(updated);
      setEditingId(null); // salimos del modo edición
    } else {
      // 🔹 CREATE
      const newItem = { ...form, id: "e" + Date.now() };
      setItems((arr) => [...arr, newItem]);
    }

    setForm({
      title: "",
      institution: "",
      completion: "",
      description: "",
      logo: "",
    });
  };

  const removeItem = (id) => {
    if (!isAdmin) return;
    setItems((arr) => arr.filter((x) => x.id !== id));
  };

  // 🔹 NUEVO: cargar datos en el form para editar
  const startEdit = (item) => {
    if (!isAdmin) return;
    setEditingId(item.id);
    setForm({
      title: item.title || "",
      institution: item.institution || "",
      completion: item.completion || "",
      description: item.description || "",
      logo: item.logo || "",
    });
  };

  return (
    <div style={{ minHeight: "100vh", padding: "120px 20px 50px", textAlign: "center" }}>
      <h1 style={{ color: ACCENT, marginBottom: "20px" }}>Education</h1>

      {/* --- Formulario controlado (solo admin) --- */}
      {isAdmin && (
        <form
          onSubmit={onSubmit}
          style={{
            maxWidth: 900,
            margin: "0 auto 30px",
            background: CARD_BG,
            color: "#fff",
            padding: 20,
            borderRadius: 12,
            boxShadow: "0 4px 12px rgba(0,0,0,.5)",
            textAlign: "left",
          }}
        >
          <h3 style={{ marginTop: 0, color: ACCENT }}>
            {editingId ? "Edit Education" : "Add Education"}
          </h3>

          <input
            name="title"
            placeholder="Program / Title"
            value={form.title}
            onChange={onChange}
            style={{
              width: "100%", marginBottom: 10, padding: "10px 12px",
              borderRadius: 8, background: INPUT_BG, color: "#fff", border: "1px solid #333",
            }}
          />
          <input
            name="institution"
            placeholder="Institution"
            value={form.institution}
            onChange={onChange}
            style={{
              width: "100%", marginBottom: 10, padding: "10px 12px",
              borderRadius: 8, background: INPUT_BG, color: "#fff", border: "1px solid #333",
            }}
          />
          <input
            name="completion"
            placeholder="Completion (e.g., 2028)"
            value={form.completion}
            onChange={onChange}
            style={{
              width: "100%", marginBottom: 10, padding: "10px 12px",
              borderRadius: 8, background: INPUT_BG, color: "#fff", border: "1px solid #333",
            }}
          />
          <input
            name="logo"
            placeholder="Logo path (optional) e.g., /centennialcollege.png"
            value={form.logo}
            onChange={onChange}
            style={{
              width: "100%", marginBottom: 10, padding: "10px 12px",
              borderRadius: 8, background: INPUT_BG, color: "#fff", border: "1px solid #333",
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
              borderRadius: 8, background: INPUT_BG, color: "#fff", border: "1px solid #333",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "10px 16px", borderRadius: 8, border: "none",
              background: BTN, color: "#fff", cursor: "pointer",
            }}
          >
            {editingId ? "Update" : "Save"}
          </button>
        </form>
      )}

      {/* --- Tarjetas (todos leen) --- */}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 20 }}>
        {items.map((it) => (
          <div
            key={it.id}
            style={{
              width: 320,
              backgroundColor: CARD_BG,
              padding: "24px 20px",
              borderRadius: 12,
              color: "white",
              boxShadow: "0px 4px 12px rgba(0,0,0,0.5)",
              position: "relative",
              transition: "transform .2s, background .3s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "scale(1.03)";
              e.currentTarget.style.background = "#1a1024";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.background = CARD_BG;
            }}
          >
            {/* Botones solo admin */}
            {isAdmin && (
              <>
                <button
                  onClick={() => removeItem(it.id)}
                  style={{
                    position: "absolute", top: 8, right: 8,
                    border: "none", borderRadius: 8, background: "#2b2b2b",
                    color: "#fff", padding: "6px 10px", cursor: "pointer",
                  }}
                  title="Delete"
                >
                  ✕
                </button>

                <button
                  onClick={() => startEdit(it)}
                  style={{
                    position: "absolute", top: 8, left: 8,
                    border: "none", borderRadius: 8, background: "#6a0dad",
                    color: "#fff", padding: "6px 10px", cursor: "pointer",
                  }}
                  title="Edit"
                >
                  ✎
                </button>
              </>
            )}

            {it.logo && (
              <img
                src={it.logo}
                alt={it.institution || it.title}
                style={{
                  width: 120, height: 120, borderRadius: 12,
                  marginBottom: 16, objectFit: "cover",
                }}
              />
            )}

            <h3 style={{ marginBottom: 10 }}>
              {it.title}{" "}
              {it.description && <span style={{ color: ACCENT2 }}>({it.description})</span>}
            </h3>
            {it.institution && <p style={{ marginBottom: 6 }}>{it.institution}</p>}
            {it.completion && (
              <p>
                <span style={{ color: ACCENT }}>{it.completion}</span>
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
