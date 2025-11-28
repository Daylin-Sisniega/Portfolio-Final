import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import auth from "./auth/auth-helper.js";   // 🔹 NUEVO
import {
  FaPhone,
  FaWhatsapp,
  FaEnvelope,
  FaLinkedin,
  FaMapMarkerAlt,
  FaGithub,
} from "react-icons/fa";


const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";


export default function Contact() {
  const jwt = auth.isAuthenticated();
  const isAdmin = jwt && jwt.user && jwt.user.role === "admin";

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contactNumber: "",
    email: "",
    message: "",
  });

  const [msg, setMsg] = useState("");

  // lista de contactos guardados
  const [contacts, setContacts] = useState([]);

  // 🔹 nuevo: id del contacto que se está editando (null = create)
  const [editingId, setEditingId] = useState(null);

  const navigate = useNavigate();

  // leer contactos del backend al cargar la página
  useEffect(() => {
    async function loadContacts() {
      try {
        const res = await fetch(`${API}/api/contacts`);
        const data = await res.json();
        setContacts(data);
      } catch (err) {
        console.error(err);
      }
    }
    loadContacts();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    if (!isAdmin) {
      setMsg("You are not authorized to modify contacts.");
      return;
    }

    // payload con los nombres que usa el backend
    const payload = {
      firstname: formData.firstName,
      lastname: formData.lastName,
      contactnumber: formData.contactNumber,
      email: formData.email,
      message: formData.message,
    };

    // 🔹 si hay editingId -> PUT, si no -> POST
    const method = editingId ? "PUT" : "POST";
    const url = editingId
      ? `${API}/api/contacts/${editingId}`
      : `${API}/api/contacts`;

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: jwt ? "Bearer " + jwt.token : undefined,   // 🔹 token
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      if (editingId) {
        // 🔹 UPDATE local
        setContacts((prev) =>
          prev.map((c) => (c._id === data._id ? data : c))
        );
        setMsg("Contact updated successfully!");
        setEditingId(null);
      } else {
        //  CREATE local
        setContacts((prev) => [...prev, data]);
        setMsg("Thanks for your message!");
      }

      // limpiar formulario
      setFormData({
        firstName: "",
        lastName: "",
        contactNumber: "",
        email: "",
        message: "",
      });
    } catch (err) {
      setMsg(err.message);
      console.error(err);
    }
  };

  // cargar contacto en el form para editar
  const handleEdit = (contact) => {
    if (!isAdmin) return;
    setEditingId(contact._id);
    setFormData({
      firstName: contact.firstname || "",
      lastName: contact.lastname || "",
      contactNumber: contact.contactnumber || "",
      email: contact.email || "",
      message: contact.message || "",
    });
    setMsg("Editing contact...");
  };

  // borrar contacto
  const handleDelete = async (id) => {
    if (!isAdmin) return;

    try {
      const res = await fetch(`${API}/api/contacts/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: jwt ? "Bearer " + jwt.token : undefined,
        },
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to delete contact");
      }
      setContacts((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error(err);
      setMsg(err.message);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "50px 20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Título */}
      <div style={{ paddingTop: "60px", textAlign: "center" }}>
        <h1 style={{ color: "#e0aaff", marginBottom: "30px" }}>Contact Me</h1>
      </div>

      {/* Grid de boxes */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
          flexWrap: "wrap",
          marginTop: "20px",
        }}
      >
        {/* Phone */}
        <a href="tel:+16476429395" style={{ textDecoration: "none" }}>
          <div style={boxStyle}>
            <div style={{ marginBottom: "10px", color: "#c77dff" }}>
              <FaPhone size={28} />
            </div>
            <h3 style={{ margin: 0, fontSize: "16px" }}>Phone</h3>
          </div>
        </a>

        {/* WhatsApp */}
        <a
          href="https://api.whatsapp.com/send/?phone=528119036455"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }}
        >
          <div style={boxStyle}>
            <div style={{ marginBottom: "10px", color: "#c77dff" }}>
              <FaWhatsapp size={28} />
            </div>
            <h3 style={{ margin: 0, fontSize: "16px" }}>WhatsApp</h3>
          </div>
        </a>

        {/* Email */}
        <a href="mailto:daylintax@otulook.com" style={{ textDecoration: "none" }}>
          <div style={boxStyle}>
            <div style={{ marginBottom: "10px", color: "#c77dff" }}>
              <FaEnvelope size={28} />
            </div>
            <h3 style={{ margin: 0, fontSize: "16px" }}>Email</h3>
          </div>
        </a>

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/daylin-sisniega-1ab179300/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }}
        >
          <div style={boxStyle}>
            <div style={{ marginBottom: "10px", color: "#c77dff" }}>
              <FaLinkedin size={28} />
            </div>
            <h3 style={{ margin: 0, fontSize: "16px" }}>LinkedIn</h3>
          </div>
        </a>

        {/* Location */}
        <a
          href="https://www.google.ca/maps/place/Toronto,+ON/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }}
        >
          <div style={boxStyle}>
            <div style={{ marginBottom: "10px", color: "#c77dff" }}>
              <FaMapMarkerAlt size={28} />
            </div>
            <h3 style={{ margin: 0, fontSize: "16px" }}>Location</h3>
          </div>
        </a>

        {/* GitHub */}
        <a
          href="https://github.com/Daylin-Sisniega"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }}
        >
          <div style={boxStyle}>
            <div style={{ marginBottom: "10px", color: "#c77dff" }}>
              <FaGithub size={28} />
            </div>
            <h3 style={{ margin: 0, fontSize: "16px" }}>GitHub</h3>
          </div>
        </a>
      </div>

      {/* === FORMULARIO DE CONTACTO (solo admin) === */}
      {isAdmin && (
        <form
          onSubmit={handleSubmit}
          style={{
            marginTop: "50px",
            backgroundColor: "#111",
            padding: "30px",
            borderRadius: "12px",
            maxWidth: "500px",
            width: "100%",
            boxShadow: "0px 4px 15px rgba(0,0,0,0.5)",
          }}
        >
          <h2
            style={{
              color: "#c77dff",
              marginBottom: "20px",
              textAlign: "center",
            }}
          >
            {editingId ? "Edit Contact" : "Send me a Message"}
          </h2>

          {/* First + Last Name */}
          <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
              style={inputStyle}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          {/* Contact Number */}
          <input
            type="tel"
            name="contactNumber"
            placeholder="Contact Number"
            value={formData.contactNumber}
            onChange={handleChange}
            required
            style={inputStyleFull}
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            style={inputStyleFull}
          />

          {/* Message */}
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            style={{
              ...inputStyleFull,
              minHeight: "120px",
            }}
          />

          {/* Submit Button */}
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              backgroundColor: "#7b2cbf",
              color: "white",
              fontWeight: "bold",
              border: "none",
              cursor: "pointer",
            }}
          >
            {editingId ? "Update Contact" : "Submit"}
          </button>

          {msg && (
            <p style={{ marginTop: 12, color: "#e0aaff", textAlign: "center" }}>
              {msg}
            </p>
          )}
        </form>
      )}

      {/* === LISTA DE CONTACTOS GUARDADOS (READ para todos, acciones solo admin) === */}
      {contacts.length > 0 && (
        <div
          style={{
            marginTop: "40px",
            maxWidth: "900px",
            width: "100%",
            background: "#111",
            borderRadius: "12px",
            padding: "20px",
            color: "#fff",
            boxShadow: "0px 4px 15px rgba(0,0,0,0.5)",
          }}
        >
          <h2 style={{ color: "#c77dff", marginBottom: "15px" }}>
            Saved Contacts
          </h2>

          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "14px",
              }}
            >
              <thead>
                <tr>
                  <th style={thTdStyle}>Name</th>
                  <th style={thTdStyle}>Email</th>
                  <th style={thTdStyle}>Contact</th>
                  <th style={thTdStyle}>Message</th>
                  {isAdmin && <th style={thTdStyle}>Actions</th>}
                </tr>
              </thead>
              <tbody>
                {contacts.map((c) => (
                  <tr key={c._id}>
                    <td style={thTdStyle}>
                      {c.firstname} {c.lastname}
                    </td>
                    <td style={thTdStyle}>{c.email}</td>
                    <td style={thTdStyle}>{c.contactnumber}</td>
                    <td style={thTdStyle}>{c.message}</td>
                    {isAdmin && (
                      <td style={thTdStyle}>
                        <button
                          onClick={() => handleEdit(c)}
                          style={{
                            marginRight: 8,
                            padding: "4px 10px",
                            borderRadius: 6,
                            border: "none",
                            background: "#6a0dad",
                            color: "#fff",
                            cursor: "pointer",
                            fontSize: "12px",
                          }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(c._id)}
                          style={{
                            padding: "4px 10px",
                            borderRadius: 6,
                            border: "none",
                            background: "#c92a2a",
                            color: "#fff",
                            cursor: "pointer",
                            fontSize: "12px",
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

/* === estilos reutilizables === */
const boxStyle = {
  backgroundColor: "#111",
  borderRadius: "12px",
  padding: "20px 15px",
  width: "180px",
  textAlign: "center",
  color: "#e0aaff",
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.5)",
  transition: "transform 0.2s, background 0.3s",
};

const inputStyle = {
  flex: 1,
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #6a0dad",
  background: "#000",
  color: "white",
};

const inputStyleFull = {
  width: "100%",
  marginBottom: "15px",
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #6a0dad",
  background: "#000",
  color: "white",
};

const thTdStyle = {
  borderBottom: "1px solid #333",
  padding: "8px",
  textAlign: "left",
};
