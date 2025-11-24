import React from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section
      className="text-white d-flex align-items-center"
      style={{
        minHeight: "75vh",
        background: "linear-gradient(135deg, #0f172a, #1e293b)",
        padding: "80px 0",
      }}
    >
      <div className="container text-center">
        <h1
          className="display-3 fw-bold"
          style={{
            letterSpacing: "1px",
            marginBottom: "20px",
          }}
        >
          Welcome to Our Hotel
        </h1>

        <p
          className="lead mb-4"
          style={{
            fontSize: "1.35rem",
            opacity: 0.9,
            maxWidth: "600px",
            margin: "0 auto 40px",
          }}
        >
          Comfortable rooms, exceptional service, and a luxury experience crafted
          for your relaxation.
        </p>

        <Link
          to="/rooms"
          className="btn btn-light px-5 py-3"
          style={{
            borderRadius: "30px",
            fontSize: "1.1rem",
            fontWeight: "600",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "#ffffffd9";
            e.target.style.transform = "translateY(-3px)";
            e.target.style.boxShadow = "0 8px 20px rgba(0,0,0,0.3)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "#fff";
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "none";
          }}
        >
          Browse Rooms
        </Link>
      </div>
    </section>
  );
}
