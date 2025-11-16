import { useState } from "react";

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
  eyeBtn: {
    position: "absolute",
    right: 10,
    top: 8,
    background: "transparent",
    border: "none",
    color: "#bbb",
    cursor: "pointer",
    fontSize: 16,
  },
  icon: { width: 22, height: 22 },
};

function validatePassword(pw) {
  // ≥8 chars, 1 uppercase, 1 digit, 1 special
  return /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(pw);
}

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    if (!form.name || !form.email || !form.password) {
      setMsg("All fields are required.");
      return;
    }
    if (!validatePassword(form.password)) {
      setMsg(
        "Password must be at least 8 characters, include one uppercase letter, one number, and one special symbol."
      );
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${API}/api/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unable to sign up");
      setMsg(`Account created for ${form.email} ✅`);
    } catch (err) {
      setMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", padding: "120px 20px 50px" }}>
      <h1 style={{ color: "#e0aaff", textAlign: "center", marginBottom: 20 }}>
        Sign Up
      </h1>

      <form onSubmit={onSubmit} style={styles.card}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={onChange}
          style={styles.input}
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={onChange}
          style={styles.input}
        />

        <div style={{ position: "relative" }}>
          <input
            name="password"
            type={showPw ? "text" : "password"}
            placeholder="Password"
            value={form.password}
            onChange={onChange}
            style={{ ...styles.input, marginBottom: 0 }}
          />
          <button
            type="button"
            onClick={() => setShowPw((v) => !v)}
            style={styles.eyeBtn}
            aria-label={showPw ? "Hide password" : "Show password"}
            title={showPw ? "Hide password" : "Show password"}
          >
            {showPw ? (
              // eye-off
              <svg
                xmlns="http://www.w3.org/2000/svg"
                style={styles.icon}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3l18 18M9.88 9.88A3 3 0 0012 15a3 3 0 002.12-.88M6.18 6.18A10.94 10.94 0 0012 5c5.25 0 9.75 3.75 11 8a10.97 10.97 0 01-4.12 5.09m-3.38-1.25A10.94 10.94 0 0112 19c-5.25 0-9.75-3.75-11-8a10.97 10.97 0 014.12-5.09"
                />
              </svg>
            ) : (
              // eye
              <svg
                xmlns="http://www.w3.org/2000/svg"
                style={styles.icon}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            )}
          </button>
        </div>

        <div style={{ marginTop: 10 }}>
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Creating..." : "Create Account"}
          </button>
        </div>

        {msg && <p style={{ marginTop: 10 }}>{msg}</p>}
      </form>
    </div>
  );
}
