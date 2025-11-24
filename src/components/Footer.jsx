import React from "react";

export default function Footer() {
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <div className="container">
        <div className="d-flex justify-content-between">
          <div>© {new Date().getFullYear()} Hotel</div>
          <div>Contact: info@hotel.com</div>
        </div>
      </div>
    </footer>
  );
}
