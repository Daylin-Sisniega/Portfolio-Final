// client/src/user/Profile.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import auth from "../auth/auth-helper";

const API = "http://localhost:3000";

const styles = {
  card: {
    maxWidth: 900,
    margin: "0 auto",
    background: "#111",
    color: "#fff",
    padding: 20,
    borderRadius: 12,
    boxShadow: "0 4px 12px rgba(0,0,0,.5)",
  },
  input: {
    width: "100%",
    marginBottom: 10,
    padding: "10px 12px",
    borderRadius: 8,
    background: "#222",
    color: "#fff",
    border: "1px solid #333",
    outline: "none",
  },
  button: {
    padding: "10px 16px",
    borderRadius: 8,
    border: "none",
    background: "#6a0dad",
    color: "#fff",
    cursor: "pointer",
  },
  danger: {
    padding: "10px 16px",
    borderRadius: 8,
    border: "none",
    background: "#ff4d4d",
    color: "#fff",
    cursor: "pointer",
  },
};

export default function Profile() {
  const nav = useNavigate();
  const jwt = auth.isAuthenticated(); // { token, user }

  const [form, setForm] = useState({ name: "", email: "" });
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (!jwt) return;
    (async () => {
      try {
        const res = await fetch(`${API}/api/users/${jwt.user._id}`, {
          headers: {
            Authorization: `Bearer ${jwt.token}`,
          },
        });
        const data = await res.json();
        setForm({ name: data.name || "", email: data.email || "" });
      } catch (e) {
        setMsg("Could not load profile");
      }
    })();
  }, [jwt]);

  if (!jwt) {
    return (
      <div style={{ minHeight: "100vh", padding: "120px 20px 50px" }}>
        <h1 style={{ color: "#e0aaff", textAlign: "center" }}>Profile</h1>
        <div style={styles.card}>You must sign in.</div>
      </div>
    );
  }

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function onSave(e) {
    e.preventDefault();
    setMsg("");
    try {
      const res = await fetch(`${API}/api/users/${jwt.user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt.token}`,
        },
        body: JSON.stringify({ name: form.name }),
      });
      const data = await res.json();
      if (data.error) return setMsg(data.error);
      // sincroniza el nombre en localStorage
      auth.authenticate({ token: jwt.token, user: { ...jwt.user, name: data.name } }, () => {});
      setMsg("Profile updated");
    } catch (err) {
      setMsg("Update failed");
    }
  }

  async function onLogout() {
    try {
      await fetch(`${API}/auth/signout`);
    } catch {}
    auth.clearJWT(() => nav("/signin"));
  }

  return (
    <div style={{ minHeight: "100vh", padding: "120px 20px 50px" }}>
      <h1 style={{ color: "#e0aaff", textAlign: "center", marginBottom: 20 }}>My Profile</h1>

      <form onSubmit={onSave} style={styles.card}>
        <label>Name</label>
        <input name="name" value={form.name} onChange={onChange} style={styles.input} />
        <label>Email</label>
        <input name="email" value={form.email} readOnly style={styles.input} />
        <div style={{ display: "flex", gap: 10 }}>
          <button style={styles.button}>Save changes</button>
          <button type="button" style={styles.danger} onClick={onLogout}>
            Sign out
          </button>
        </div>
        {msg && <p style={{ marginTop: 10 }}>{msg}</p>}
      </form>
    </div>
  );
}
