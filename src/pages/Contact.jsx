import React, { useState } from "react";
import api from "../api";
import { FaPaperPlane, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaPhone } from "react-icons/fa";

export default function Contact() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", message: "" });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");
    try {
      await api.post("/Contact", form);
      setStatus("success");
    } catch (err) {
      if (err?.response?.status === 404) setStatus("success"); // fallback logic from original
      else setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row g-5">
        {/* Info Column */}
        <div className="col-lg-5">
          <div className="pe-lg-4">
            <h6 className="text-primary fw-bold text-uppercase">Contact Us</h6>
            <h1 className="fw-bold mb-4">Let's start a conversation</h1>
            <p className="text-secondary mb-5">
              Ask us anything about our rooms, services, or pricing. We are here to help you plan the perfect trip.
            </p>

            <div className="d-flex align-items-center gap-3 mb-4">
               <div className="bg-primary bg-opacity-10 p-3 rounded-circle text-primary"><FaEnvelope size={20}/></div>
               <div><h6 className="fw-bold mb-0">Email Us</h6><small className="text-muted">info@grandhotel.com</small></div>
            </div>
            <div className="d-flex align-items-center gap-3 mb-5">
               <div className="bg-primary bg-opacity-10 p-3 rounded-circle text-primary"><FaPhone size={20}/></div>
               <div><h6 className="fw-bold mb-0">Call Us</h6><small className="text-muted">+20 123 456 7890</small></div>
            </div>

            <h6 className="fw-bold mb-3">Follow Us</h6>
            <div className="d-flex gap-3">
               <SocialBtn icon={<FaFacebook/>} color="#3b5998" link="#" />
               <SocialBtn icon={<FaTwitter/>} color="#1da1f2" link="#" />
               <SocialBtn icon={<FaInstagram/>} color="#c13584" link="#" />
               <SocialBtn icon={<FaLinkedin/>} color="#0077b5" link="#" />
            </div>
          </div>
        </div>

        {/* Form Column */}
        <div className="col-lg-7">
          <div className="bg-white p-5 rounded-5 shadow-lg border-0">
            <form onSubmit={handleSubmit}>
              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="fw-bold small mb-1">First Name</label>
                  <input name="firstName" value={form.firstName} onChange={handleChange} className="form-control bg-light border-0 py-2" placeholder="John" required />
                </div>
                <div className="col-md-6">
                  <label className="fw-bold small mb-1">Last Name</label>
                  <input name="lastName" value={form.lastName} onChange={handleChange} className="form-control bg-light border-0 py-2" placeholder="Doe" />
                </div>
              </div>
              
              <div className="mb-3">
                <label className="fw-bold small mb-1">Email Address</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} className="form-control bg-light border-0 py-2" placeholder="name@example.com" required />
              </div>
              
              <div className="mb-4">
                <label className="fw-bold small mb-1">Message</label>
                <textarea name="message" rows="4" value={form.message} onChange={handleChange} className="form-control bg-light border-0 py-2" placeholder="How can we help?" required></textarea>
              </div>

              <button type="submit" className="btn btn-primary w-100 py-3 fw-bold rounded-3" disabled={loading}>
                {loading ? "Sending..." : <><FaPaperPlane className="me-2" /> Send Message</>}
              </button>

              {status === "success" && <div className="alert alert-success mt-3 text-center">Message sent successfully! ✅</div>}
              {status === "error" && <div className="alert alert-danger mt-3 text-center">Failed to send message.</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

const SocialBtn = ({icon, color, link}) => (
  <a href={link} className="d-flex align-items-center justify-content-center text-white rounded-circle shadow-sm" 
     style={{width:40, height:40, backgroundColor: color, textDecoration: 'none', transition: 'transform 0.2s'}}>
     {icon}
  </a>
);