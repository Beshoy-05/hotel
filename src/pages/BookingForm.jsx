import React, { useState } from "react";
import { createBooking } from "../api";
import { useNavigate, useParams } from "react-router-dom";
import { FaCalendarCheck, FaArrowRight } from "react-icons/fa";

export default function BookingForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg("");
    if (!startDate || !endDate) return setMsg("Please choose valid dates");
    
    setLoading(true);
    try {
      await createBooking({ roomId: id, startDate: new Date(startDate).toISOString(), endDate: new Date(endDate).toISOString() });
      setMsg("success");
      setTimeout(() => navigate("/my-bookings"), 1500);
    } catch (err) {
      setMsg(err?.response?.data?.message || "Booking failed. Try different dates.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center py-5" style={{ minHeight: "80vh", background: "#f8f9fa" }}>
      <div className="bg-white p-5 rounded-4 shadow-lg w-100" style={{ maxWidth: "500px" }}>
        <div className="text-center mb-4">
           <div className="bg-primary bg-opacity-10 text-primary p-3 rounded-circle d-inline-block mb-3">
              <FaCalendarCheck size={30} />
           </div>
           <h3 className="fw-bold">Secure Your Stay</h3>
           <p className="text-muted">Book Room #{id}</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="fw-bold small mb-1 text-muted">Check-in Date</label>
            <input type="datetime-local" className="form-control bg-light border-0 py-3" value={startDate} onChange={e => setStartDate(e.target.value)} required />
          </div>
          <div className="mb-4">
            <label className="fw-bold small mb-1 text-muted">Check-out Date</label>
            <input type="datetime-local" className="form-control bg-light border-0 py-3" value={endDate} onChange={e => setEndDate(e.target.value)} required />
          </div>

          <button className="btn btn-primary w-100 py-3 fw-bold rounded-3 shadow-sm d-flex justify-content-center align-items-center gap-2" disabled={loading}>
            {loading ? "Processing..." : <>Confirm Booking <FaArrowRight/></>}
          </button>

          {msg === "success" && <div className="alert alert-success mt-3 text-center">Booking confirmed! Redirecting...</div>}
          {msg && msg !== "success" && <div className="alert alert-danger mt-3 text-center">{msg}</div>}
        </form>
      </div>
    </div>
  );
}