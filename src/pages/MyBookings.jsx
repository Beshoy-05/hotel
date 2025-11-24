import React, { useEffect, useState } from "react";
import { myBookings, cancelBooking } from "../api";
import { FaCalendarAlt, FaDoorOpen, FaTimesCircle, FaCheckCircle, FaSpinner } from "react-icons/fa";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const res = await myBookings();
        if (mounted) setBookings(res.data || []);
      } catch (e) {
        setErr("Failed to load your bookings.");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => (mounted = false);
  }, []);

  async function handleCancel(id) {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
    try {
      await cancelBooking(id);
      setBookings(prev => prev.filter(b => b.id !== id)); // Optimistic update
    } catch (e) {
      alert("Failed to cancel booking.");
    }
  }

  if (loading) return <div className="text-center py-5"><FaSpinner className="fa-spin text-primary fs-3"/></div>;

  return (
    <div className="container py-5" style={{ maxWidth: "900px" }}>
      <div className="d-flex align-items-center gap-3 mb-5">
         <div className="bg-primary text-white p-3 rounded-circle"><FaCalendarAlt size={24}/></div>
         <div>
            <h2 className="fw-bold mb-0">My Bookings</h2>
            <p className="text-muted mb-0">Manage your upcoming and past stays</p>
         </div>
      </div>

      {err && <div className="alert alert-danger">{err}</div>}
      
      {bookings.length === 0 ? (
         <div className="text-center py-5 bg-light rounded-4">
            <p className="text-muted fs-5">You haven't made any bookings yet.</p>
         </div>
      ) : (
        <div className="d-flex flex-column gap-3">
          {bookings.map(b => (
            <div key={b.id} className="card border-0 shadow-sm rounded-4 overflow-hidden">
              <div className="card-body p-4 d-flex flex-column flex-md-row justify-content-between align-items-center gap-4">
                
                {/* Info */}
                <div className="d-flex align-items-center gap-4">
                  <div className="text-center bg-light p-3 rounded-3" style={{minWidth: '100px'}}>
                     <h5 className="mb-0 fw-bold text-primary">Room</h5>
                     <h3 className="mb-0 fw-bold">{b.roomId}</h3>
                  </div>
                  <div>
                    <div className="d-flex align-items-center gap-2 mb-1 text-muted">
                        <FaDoorOpen /> <span>Booking #{String(b.id).substring(0,8)}</span>
                    </div>
                    <h6 className="fw-bold mb-1">
                      {new Date(b.startDate).toLocaleDateString()} — {new Date(b.endDate).toLocaleDateString()}
                    </h6>
                    <Badge status={b.status} />
                  </div>
                </div>

                {/* Actions */}
                <div>
                  {b.status !== "cancelled" && b.status !== "rejected" && (
                    <button 
                      onClick={() => handleCancel(b.id)} 
                      className="btn btn-outline-danger rounded-pill fw-bold px-4 d-flex align-items-center gap-2"
                    >
                      <FaTimesCircle /> Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const Badge = ({ status }) => {
   let color = "bg-warning text-dark"; // Pending
   let text = status || "Pending";
   
   if (status === "approved") color = "bg-success text-white";
   if (status === "rejected" || status === "cancelled") color = "bg-danger text-white";
   if (status === "completed") color = "bg-primary text-white";

   return <span className={`badge ${color} rounded-pill px-3 py-2 fw-normal text-uppercase`} style={{fontSize: '0.7rem'}}>{text}</span>
}