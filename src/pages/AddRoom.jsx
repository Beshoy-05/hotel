import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaCloudUploadAlt, FaSave } from "react-icons/fa";

export default function AddRoom() {
  const [number, setNumber] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!number || !type || !price) { setError("Please fill all required fields"); return; }

    const form = new FormData();
    form.append("Number", number);
    form.append("Type", type);
    form.append("Price", price);
    if (image) form.append("Image", image);

    try {
      setLoading(true);
      // Ensure baseURL matches your API
      await axios.post("https://hotel-booking.runasp.net/api/rooms", form);
      navigate("/rooms");
    } catch (err) {
      setError(err.response?.data?.message || `Failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5 d-flex justify-content-center">
      <div className="card border-0 shadow-lg rounded-4 overflow-hidden w-100" style={{ maxWidth: "600px" }}>
        <div className="card-header bg-primary text-white p-4 text-center border-0">
           <h4 className="fw-bold mb-0">Add New Room</h4>
        </div>
        <div className="card-body p-5 bg-white">
          {error && <div className="alert alert-danger mb-4">{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="row g-3 mb-3">
               <div className="col-md-4">
                  <label className="fw-bold small mb-1">Room No.</label>
                  <input className="form-control bg-light border-0 py-2" type="number" value={number} onChange={e => setNumber(e.target.value)} placeholder="101" />
               </div>
               <div className="col-md-8">
                  <label className="fw-bold small mb-1">Type</label>
                  <select className="form-select bg-light border-0 py-2" value={type} onChange={e => setType(e.target.value)}>
                     <option value="">Select...</option>
                     <option value="Single">Single</option>
                     <option value="Double">Double</option>
                     <option value="Suite">Suite</option>
                  </select>
               </div>
            </div>

            <div className="mb-4">
               <label className="fw-bold small mb-1">Price (EGP)</label>
               <input className="form-control bg-light border-0 py-2" type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="0.00" />
            </div>

            <div className="mb-4">
               <label className="d-block w-100 p-4 border-2 border-dashed rounded-3 text-center cursor-pointer bg-light text-muted" style={{borderStyle: 'dashed'}}>
                  <input type="file" className="d-none" accept="image/*" onChange={(e) => {
                     const file = e.target.files[0];
                     setImage(file);
                     setPreview(URL.createObjectURL(file));
                  }} />
                  <FaCloudUploadAlt size={30} className="mb-2 text-primary" />
                  <div className="small fw-bold">Click to upload image</div>
               </label>
               {preview && <img src={preview} alt="Preview" className="mt-3 rounded-3 w-100 shadow-sm" style={{height: 200, objectFit: 'cover'}} />}
            </div>

            <button className="btn btn-primary w-100 py-3 fw-bold rounded-3" type="submit" disabled={loading}>
               {loading ? "Uploading..." : <><FaSave className="me-2"/> Save Room</>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}