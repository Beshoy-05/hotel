import React, { useEffect, useState } from "react";
import { getRooms } from "../api";
import { Link } from "react-router-dom";
import { FaBed, FaArrowRight, FaPlus } from "react-icons/fa";

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const res = await getRooms();
        setRooms(res.data || []);
      } catch (err) {
        setError("Failed to load rooms");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const safeImageSrc = (room) => {
    const raw = room?.imageUrl ?? room?.image ?? null;
    if (!raw) return "/rooms/default.jpg";
    if (raw.startsWith("http")) return raw;
    return `https://hotel-booking.runasp.net${raw}`;
  };

  return (
    <>
      <style>{`
        .room-card { transition: all 0.3s ease; border: 1px solid #eee; }
        .room-card:hover { transform: translateY(-5px); box-shadow: 0 10px 20px rgba(0,0,0,0.1); }
        .room-img-container { overflow: hidden; height: 220px; position: relative; }
        .room-img { transition: transform 0.5s ease; width: 100%; height: 100%; object-fit: cover; }
        .room-card:hover .room-img { transform: scale(1.05); }
        .price-badge { position: absolute; top: 15px; right: 15px; background: rgba(255,255,255,0.9); padding: 5px 12px; border-radius: 20px; font-weight: bold; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
      `}</style>

      <div className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-5">
          <div>
            <h2 className="fw-bold mb-1">Our <span className="text-primary">Rooms</span></h2>
            <p className="text-muted mb-0">Find your perfect stay</p>
          </div>
          {/* Optional: Add Room button if Admin logic is present, otherwise remove */}
           {/* <Link className="btn btn-outline-primary rounded-pill px-4" to="/rooms/add"><FaPlus className="me-2"/> Add Room</Link> */}
        </div>

        {loading && <div className="text-center py-5"><div className="spinner-border text-primary"></div></div>}
        {error && <div className="alert alert-danger">{error}</div>}

        <div className="row g-4">
          {rooms.map((room) => (
            <div className="col-md-6 col-lg-4" key={room.id}>
              <div className="card room-card h-100 border-0 rounded-4 overflow-hidden bg-white">
                <div className="room-img-container">
                  <img
                    src={safeImageSrc(room)}
                    alt={room.number}
                    className="room-img"
                    onError={(e) => { e.currentTarget.src = '/rooms/default.jpg'; }}
                  />
                  <div className="price-badge text-primary">
                    {room.pricePerNight} EGP <small className="text-muted fw-normal">/ night</small>
                  </div>
                </div>
                
                <div className="card-body p-4 d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="card-title fw-bold mb-0">Room {room.number}</h5>
                    <span className="badge bg-light text-secondary border">{room.type}</span>
                  </div>
                  
                  <div className="mt-auto pt-3 d-flex gap-2">
                    <Link to={`/rooms/${room.id}`} className="btn btn-light flex-grow-1 fw-bold text-dark">
                      Details
                    </Link>
                    <Link to={`/book/${room.id}`} className="btn btn-primary flex-grow-1 fw-bold">
                      Book Now <FaArrowRight className="ms-1" size={12} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}