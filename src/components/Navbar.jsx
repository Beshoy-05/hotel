// src/components/Navbar.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("user"));
    setUser(stored);
    const onLogin = () => setUser(JSON.parse(localStorage.getItem("user")));
    window.addEventListener("user-login", onLogin);
    return () => window.removeEventListener("user-login", onLogin);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("jwt_token");
    setUser(null);
    navigate("/signin");
  };

  return (
    <>
      <nav className="hotel-nav">
        <div className="container nav-inner">
          <div className="brand" onClick={() => navigate("/")}>
            <div className="logo-circle">H</div>
            <div className="brand-text">
              <div className="brand-title">Al-Rawad Hotel</div>
              <div className="brand-sub">Premium Stays</div>
            </div>
          </div>

          <ul className="nav-links">
            <li><Link to="/rooms">Rooms</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>

          <div className="nav-actions">
            {user ? (
              <>
                {user.role === "admin" && (
                  <button className="btn btn-ghost admin-btn" onClick={() => navigate("/admin-dashboard")}>
                    Admin
                  </button>
                )}

                <div className="user-box" onClick={() => setOpenMenu(v => !v)}>
                  <div className="user-initial">{(user.fullName || user.email || "U").slice(0,1).toUpperCase()}</div>
                  <div className="user-name">{user.fullName || user.email}</div>
                </div>

                {openMenu && (
                  <div className="dropdown">
                    <button className="dropdown-item" onClick={() => { setOpenMenu(false); navigate("/my-bookings"); }}>
                      My Bookings
                    </button>
                    <button className="dropdown-item" onClick={() => { setOpenMenu(false); handleLogout(); }}>
                      Logout
                    </button>
                  </div>
                )}
              </>
            ) : (
              <Link to="/signin" className="btn btn-primary">Sign In</Link>
            )}
          </div>

          <button
            className="mobile-toggle"
            onClick={() => document.body.classList.toggle("mobile-open")}
            aria-label="menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Styles specific for this Navbar (copy to global CSS if you prefer) */}
      <style>{`
        /* fonts: add Google font link in index.html: Playfair Display + Inter */
        :root{
          --navy:#0b2545;
          --gold:#d4af37;
          --muted:#6b7280;
        }

        .hotel-nav{
          position: sticky;
          top: 0;
          z-index: 1100;
          backdrop-filter: blur(6px);
          background: linear-gradient(180deg, rgba(11,37,69,0.92), rgba(11,37,69,0.80));
          box-shadow: 0 6px 18px rgba(6,10,20,0.25);
          border-bottom: 1px solid rgba(255,255,255,0.04);
          animation: slideDown .32s ease both;
        }

        @keyframes slideDown {
          from { transform: translateY(-8px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .nav-inner{
          display:flex;
          gap:1rem;
          align-items:center;
          justify-content:space-between;
          padding: 14px 18px;
        }

        .brand{
          display:flex;
          gap:12px;
          align-items:center;
          cursor:pointer;
        }
        .logo-circle{
          width:46px;
          height:46px;
          border-radius:10px;
          display:flex;
          align-items:center;
          justify-content:center;
          background: linear-gradient(135deg, rgba(212,175,55,0.95), rgba(180,140,40,0.9));
          color: #07122a;
          font-weight:700;
          font-family: 'Playfair Display', serif;
          font-size:20px;
          box-shadow: 0 6px 18px rgba(3,6,12,0.4);
        }
        .brand-title{
          color: #fff;
          font-weight:700;
          font-family: 'Playfair Display', serif;
          font-size: 16px;
          line-height:1;
        }
        .brand-sub{
          color: var(--gold);
          font-size:12px;
          margin-top:2px;
        }

        .nav-links{
          list-style:none;
          display:flex;
          gap:14px;
          align-items:center;
          margin:0;
          padding:0;
        }
        .nav-links a{
          color: rgba(255,255,255,0.92);
          text-decoration:none;
          font-weight:600;
          padding:8px 10px;
          border-radius:8px;
          transition: all .18s ease;
        }
        .nav-links a:hover{
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(12,20,36,0.35);
          background: rgba(255,255,255,0.03);
        }

        .nav-actions{
          display:flex;
          gap:12px;
          align-items:center;
          position:relative;
        }

        .btn{
          padding:8px 14px;
          border-radius:10px;
          font-weight:600;
          border: none;
          cursor:pointer;
        }
        .btn-primary{
          background: linear-gradient(90deg,var(--gold), #f0d47a);
          color: #07122a;
          box-shadow: 0 6px 18px rgba(212,175,55,0.12);
        }
        .btn-ghost{
          background: transparent;
          color: rgba(255,255,255,0.9);
          border: 1px solid rgba(255,255,255,0.06);
          padding:7px 12px;
        }
        .admin-btn{
          background: rgba(255,255,255,0.03);
          color: var(--gold);
          border: 1px solid rgba(212,175,55,0.12);
        }

        .user-box{
          display:flex;
          align-items:center;
          gap:8px;
          cursor:pointer;
          padding:6px 8px;
          border-radius:10px;
          background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
        }
        .user-initial{
          width:34px;
          height:34px;
          border-radius:8px;
          background: rgba(212,175,55,0.95);
          display:flex;
          align-items:center;
          justify-content:center;
          color:#07122a;
          font-weight:700;
        }
        .user-name{
          color: rgba(255,255,255,0.9);
          font-size:14px;
          max-width:140px;
          white-space:nowrap;
          overflow:hidden;
          text-overflow:ellipsis;
        }

        .dropdown{
          position:absolute;
          right:0;
          top:64px;
          background: linear-gradient(180deg, #07132a, #081a33);
          border:1px solid rgba(255,255,255,0.04);
          padding:8px;
          border-radius:10px;
          box-shadow: 0 12px 30px rgba(3,6,12,0.6);
          display:flex;
          flex-direction:column;
          gap:6px;
        }
        .dropdown-item{
          background:transparent;
          border:none;
          color: #fff;
          padding:8px 12px;
          text-align:left;
          cursor:pointer;
          border-radius:8px;
        }
        .dropdown-item:hover{ background: rgba(255,255,255,0.03); }

        /* mobile */
        .mobile-toggle{
          display:none;
          width:44px;
          height:36px;
          background:transparent;
          border:none;
          position:relative;
        }
        .mobile-toggle span{
          display:block;
          height:3px;
          margin:5px 0;
          width:22px;
          background: rgba(255,255,255,0.85);
          border-radius:3px;
          transition: all .18s ease;
        }

        @media (max-width: 880px){
          .nav-links{ display:none; }
          .mobile-toggle{ display:block; }
          .nav-inner{ gap:8px; }

          body.mobile-open .nav-links{
            display:flex;
            position:absolute;
            left:12px;
            right:12px;
            top:66px;
            background: linear-gradient(180deg, rgba(7,18,42,0.98), rgba(3,10,22,0.97));
            border-radius:10px;
            padding:12px;
            flex-direction:column;
            z-index:1200;
            box-shadow: 0 20px 60px rgba(2,6,12,0.6);
          }
        }

      `}</style>
    </>
  );
}
