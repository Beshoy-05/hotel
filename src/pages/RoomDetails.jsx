import React, { useEffect, useState } from "react";
import { getRoom } from "../api";
import { useParams, Link } from "react-router-dom";
import { FaBed, FaWifi, FaCoffee, FaCheck, FaArrowLeft } from "react-icons/fa";

export default function RoomDetails() {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const res = await getRoom(id);
        if (mounted) setRoom(res.data);
      } catch (e) {
        setErr("Failed to load room details.");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    if (id) load();
    return () => (mounted = false);
  }, [id]);

  if (loading) return <div className="text-center py-5"><div className="spinner-border text-primary"></div></div>;
  if (err || !room) return <div className="container py-5 text-center text-danger"><h3>{err || "Room not found"}</h3></div>;

  const imageUrl = room.imageUrl?.startsWith("http") ? room.imageUrl : `https://hotel-booking.runasp.net${room.imageUrl}`;

  return (
    <div className="container py-5">
      <Link to="/rooms" className="text-decoration-none text-muted mb-4 d-inline-block fw-bold"><FaArrowLeft className="me-2"/> Back to Rooms</Link>
      
      <div className="row g-5">
        {/* Left: Image */}
        <div className="col-lg-7">
          <div className="rounded-4 overflow-hidden shadow-lg position-relative" style={{ minHeight: "400px" }}>
             <img src={imageUrl} alt="Room" className="w-100 h-100 object-fit-cover" onError={(e) => e.target.src="/rooms/default.jpg"} />
             <div className="position-absolute bottom-0 start-0 p-4 bg-gradient-dark text-white w-100" style={{background: 'linear-gradient(transparent, rgba(0,0,0,0.8))'}}>
                <h2 className="fw-bold mb-0">Room {room.number}</h2>
                <p className="mb-0 opacity-75">{room.type} Suite</p>
             </div>
          </div>
        </div>

        {/* Right: Info */}
        <div className="col-lg-5">
          <div className="p-4 bg-white rounded-4 shadow-sm border h-100">
            <h4 className="fw-bold text-primary mb-3">{room.pricePerNight} EGP <span className="text-muted fs-6 fw-normal">/ Night</span></h4>
            
            <hr className="my-4 text-muted opacity-25" />
            
            <h6 className="fw-bold mb-3">Description</h6>
            <p className="text-secondary lh-lg mb-4">
              {room.description || "Experience luxury and comfort in this beautifully designed room. Perfect for relaxation after a long day of travel."}
            </p>

            <h6 className="fw-bold mb-3">Amenities</h6>
            <div className="row g-2 mb-5">
              <div className="col-6 d-flex align-items-center gap-2 text-muted"><FaWifi className="text-primary"/> Free Wifi</div>
              <div className="col-6 d-flex align-items-center gap-2 text-muted"><FaCoffee className="text-primary"/> Breakfast</div>
              <div className="col-6 d-flex align-items-center gap-2 text-muted"><FaBed className="text-primary"/> King Bed</div>
              <div className="col-6 d-flex align-items-center gap-2 text-muted"><FaCheck className="text-primary"/> Daily Cleaning</div>
            </div>

            <Link to={`/book/${room.id}`} className="btn btn-primary w-100 py-3 fw-bold rounded-3 shadow-sm hover-scale">
              Book This Room Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}