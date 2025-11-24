// src/components/Rooms.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRooms } from "../api";

export default function RoomsSection() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const res = await getRooms();
        if (mounted) setRooms(res.data || []);
      } catch (err) {
        console.error("Failed to load rooms:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => (mounted = false);
  }, []);

  return (
    <section className="rooms-elite container py-5">
      <div className="section-head">
        <h2>Featured Rooms</h2>
        <p className="muted">Handpicked rooms for a comfortable premium stay</p>
      </div>

      {loading ? (
        <div className="rooms-grid">
          {Array.from({ length: 3 }).map((_, i) => (
            <div className="card-skeleton" key={i}>
              <div className="s-img" />
              <div className="s-line short" />
              <div className="s-line" />
              <div className="s-line tiny" />
            </div>
          ))}
        </div>
      ) : rooms.length === 0 ? (
        <div className="empty">No rooms available.</div>
      ) : (
        <div className="rooms-grid">
          {rooms.map((r, idx) => {
            const imageUrl = r?.imageUrl
              ? (r.imageUrl.startsWith("http") ? r.imageUrl : `https://hotel-booking.runasp.net${r.imageUrl}`)
              : "/rooms/default.jpg";

            return (
              <article className="room-card" key={r.id || idx} style={{ animationDelay: `${idx * 80}ms` }}>
                <div className="room-media">
                  <img loading="lazy" src={imageUrl} alt={r.type || r.number || "Room"} />
                </div>

                <div className="room-body">
                  <div className="meta">
                    <h5 className="room-title">{r.number || r.type || "Room"}</h5>
                    <div className="room-type">{r.type || "—"}</div>
                  </div>

                  <p className="price">{r.pricePerNight ? `${r.pricePerNight} EGP / night` : "Price N/A"}</p>

                  <div className="room-actions">
                    <Link className="btn-outline" to={`/rooms/${r.id}`}>Details</Link>
                    <Link className="btn-solid" to={`/book/${r.id}`}>Book</Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      <style>{`
        :root{
          --navy:#07122a;
          --muted:#9aa4b2;
          --gold:#d4af37;
        }

        .rooms-elite .section-head{ margin-bottom:18px; }
        .rooms-elite h2{ font-family: 'Playfair Display', serif; color: #fff; margin:0 0 6px 0; }
        .rooms-elite .muted{ color: var(--muted); margin:0 0 18px 0; }

        .rooms-grid{
          display:grid;
          grid-template-columns: repeat(3, 1fr);
          gap:18px;
        }

        /* card */
        .room-card{
          background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
          border: 1px solid rgba(255,255,255,0.04);
          border-radius:12px;
          overflow:hidden;
          display:flex;
          flex-direction:column;
          transition: transform .28s ease, box-shadow .28s ease;
          box-shadow: 0 18px 44px rgba(2,6,12,0.45);
          will-change: transform;
          animation: fadeUp .36s ease both;
        }
        .room-card:hover{
          transform: translateY(-8px) scale(1.01);
          box-shadow: 0 30px 70px rgba(2,6,12,0.6);
        }

        .room-media{ height:180px; overflow:hidden; background: #091326; }
        .room-media img{ width:100%; height:100%; object-fit:cover; display:block; transition: transform .5s ease; }
        .room-card:hover .room-media img{ transform: scale(1.04); }

        .room-body{ padding:14px 14px 18px 14px; display:flex; flex-direction:column; gap:10px; }
        .meta{ display:flex; justify-content:space-between; align-items:center; gap:8px; }
        .room-title{ margin:0; color: #fff; font-size:16px; font-weight:700; font-family: 'Playfair Display', serif; }
        .room-type{ color: var(--muted); font-size:13px; }

        .price{ color: var(--gold); font-weight:700; margin:0; }

        .room-actions{ display:flex; gap:8px; margin-top:6px; }
        .btn-outline{
          padding:8px 12px;
          border-radius:8px;
          border:1px solid rgba(255,255,255,0.06);
          color: #fff;
          text-decoration:none;
          font-weight:600;
          background: transparent;
        }
        .btn-solid{
          padding:8px 12px;
          border-radius:8px;
          border:none;
          background: linear-gradient(90deg,var(--gold), #f0d47a);
          color:#07122a;
          text-decoration:none;
          font-weight:700;
        }

        /* skeleton */
        .card-skeleton{
          border-radius:12px;
          background: linear-gradient(180deg, rgba(255,255,255,0.015), rgba(255,255,255,0.01));
          padding:12px;
          display:flex;
          flex-direction:column;
          gap:10px;
          box-shadow: 0 12px 30px rgba(2,6,12,0.35);
        }
        .s-img{ height:140px; background: linear-gradient(90deg,#0d1b2b, #082033); border-radius:8px; }
        .s-line{ height:12px; background: linear-gradient(90deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01)); border-radius:6px; }
        .s-line.short{ width:60%; }
        .s-line.tiny{ width:30%; height:10px; }

        .empty{ color: var(--muted); padding:18px; }

        @keyframes fadeUp {
          from { transform: translateY(8px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        @media (max-width: 1024px){
          .rooms-grid{ grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 620px){
          .rooms-grid{ grid-template-columns: 1fr; }
          .hero-elite .container{ padding:12px; }
        }
      `}</style>
    </section>
  );
}
