import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signin } from "./api-auth";
import auth from "./auth-helper";

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
    fontWeight: "bold",
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

export default function Signin() {
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    if (!form.email || !form.password) {
      setMsg("Email and password are required.");
      return;
    }

    try {
      setLoading(true);
      const data = await signin(form); // { token, user } or { error }
      if (data?.error) throw new Error(data.error);
      auth.authenticate(data, () => nav("/profile"));
    } catch (err) {
      setMsg(err.message || "Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", padding: "120px 20px 50px" }}>
      <h1 style={{ color: "#e0aaff", textAlign: "center", marginBottom: 20 }}>
        Sign In
      </h1>

      <form onSubmit={onSubmit} autoComplete="off" style={styles.card}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={onChange}
          style={styles.input}
          autoComplete="off"
          inputMode="email"
        />

        <div style={{ position: "relative" }}>
          <input
            name="password"
            type={showPw ? "text" : "password"}
            placeholder="Password"
            value={form.password}
            onChange={onChange}
            style={{ ...styles.input, marginBottom: 0 }}
            autoComplete="new-password"
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
            {loading ? "Logging in..." : "Sign In"}
          </button>
        </div>

        {msg && <p style={{ color: "#e0aaff", marginTop: 10 }}>{msg}</p>}

        <p style={{ marginTop: 12 }}>
          Don’t have an account?{" "}
          <Link to="/signup" style={{ color: "#e0aaff" }}>
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}
