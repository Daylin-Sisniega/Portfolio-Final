// client/src/components/Layout.jsx
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import auth from "../auth/auth-helper";

// NUEVO: base URL para backend (local o Render)
const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export default function Layout() {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("My Portfolio");
  const nav = useNavigate();
  useLocation(); // fuerza re-render en cambios de ruta
  const jwt = auth.isAuthenticated();

  const handleTitleClick = () => {
    setTitle((prev) =>
      prev === "My Portfolio" ? "Daylin Sisniega" : "My Portfolio"
    );
  };

  async function onSignout() {
    try {
      //  CAMBIADO: antes estaba fijo "http://localhost:3000"
      await fetch(`${API}/auth/signout`);
    } catch {}
    auth.clearJWT(() => {
      setIsOpen(false);
      nav("/signin");
    });
  }

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        background: "#000",
        color: "#fff",
        padding: "15px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      {/* IZQ: Logo + título */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          cursor: "pointer",
        }}
        onClick={handleTitleClick}
      >
        <img
          src="/logo.png"
          alt="Logo"
          style={{ width: 40, height: 40, borderRadius: "50%" }}
        />
        <h1 style={{ margin: 0, fontSize: 20, color: "#e0aaff" }}>{title}</h1>
      </div>

      {/* Der: botón hamburguesa */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: "transparent",
          border: "none",
          color: "#e0aaff",
          fontSize: 28,
          cursor: "pointer",
        }}
      >
        {isOpen ? "✕" : "☰"}
      </button>

      {/* Menú */}
      {isOpen && (
        <nav
          style={{
            position: "absolute",
            top: 60,
            right: 20,
            background: "#111",
            borderRadius: 12,
            padding: 20,
            boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
          }}
        >
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            <li style={{ margin: "10px 0" }}>
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                style={{ color: "#e0aaff" }}
              >
                Home
              </Link>
            </li>
            <li style={{ margin: "10px 0" }}>
              <Link
                to="/about"
                onClick={() => setIsOpen(false)}
                style={{ color: "#e0aaff" }}
              >
                About
              </Link>
            </li>
            <li style={{ margin: "10px 0" }}>
              <Link
                to="/education"
                onClick={() => setIsOpen(false)}
                style={{ color: "#e0aaff" }}
              >
                Education
              </Link>
            </li>
            <li style={{ margin: "10px 0" }}>
              <Link
                to="/project"
                onClick={() => setIsOpen(false)}
                style={{ color: "#e0aaff" }}
              >
                Project
              </Link>
            </li>
            <li style={{ margin: "10px 0" }}>
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                style={{ color: "#e0aaff" }}
              >
                Contact
              </Link>
            </li>
            <li style={{ margin: "10px 0" }}>
              <Link
                to="/services"
                onClick={() => setIsOpen(false)}
                style={{ color: "#e0aaff" }}
              >
                Services
              </Link>
            </li>

            {/* SIEMPRE visible */}
            <li style={{ margin: "10px 0" }}>
              <Link
                to="/profile"
                onClick={() => setIsOpen(false)}
                style={{ color: "#e0aaff" }}
              >
                Profile
              </Link>
            </li>

            {/* Alterna Sign In/Up vs Sign Out */}
            {!jwt ? (
              <>
                <li style={{ margin: "10px 0" }}>
                  <Link
                    to="/signin"
                    onClick={() => setIsOpen(false)}
                    style={{ color: "#e0aaff" }}
                  >
                    Sign In
                  </Link>
                </li>
                <li style={{ margin: "10px 0" }}>
                  <Link
                    to="/signup"
                    onClick={() => setIsOpen(false)}
                    style={{ color: "#e0aaff" }}
                  >
                    Sign Up
                  </Link>
                </li>
              </>
            ) : (
              <li style={{ margin: "10px 0" }}>
                <button
                  onClick={onSignout}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "#e0aaff",
                    cursor: "pointer",
                  }}
                >
                  Sign Out
                </button>
              </li>
            )}
          </ul>
        </nav>
      )}
    </header>
  );
}
