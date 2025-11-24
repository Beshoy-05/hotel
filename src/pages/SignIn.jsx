// src/pages/SignIn.jsx
import React, { useState, useEffect } from "react";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api"; 

export default function SignIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 🛠️ دالة فك تشفير التوكن (JWT Decoder)
  const parseJwt = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        window.atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      return null;
    }
  };

  // 1. التحقق عند فتح الصفحة
  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("jwt_token");

      if (token && storedUser) {
        // هنا نتأكد أن الدور مخزن بحروف صغيرة
        const currentRole = storedUser.role ? String(storedUser.role).toLowerCase().trim() : "user";
        
        if (currentRole === "admin") {
          navigate("/admin-dashboard", { replace: true });
        } else {
          navigate("/", { replace: true });
        }
      }
    } catch (e) {
      localStorage.clear();
    }
  }, [navigate]);

  // 2. دالة تسجيل الدخول
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password");
      setLoading(false);
      return;
    }

    try {
      const res = await login({ email, password });

      // استخراج التوكن
      const token = res?.data?.token || res?.data?.accessToken || res?.data;
      const tokenString = typeof token === 'string' ? token : token?.token;

      if (!tokenString) {
        throw new Error("Login success but no token returned");
      }

      localStorage.setItem("jwt_token", tokenString);

      // 🔓 فك التوكن
      const decodedData = parseJwt(tokenString);
      console.log("🔓 Decoded Data:", decodedData);

      // 🚨 الحل السحري لمشكلة .NET Identity 🚨
      // استخراج البيانات باستخدام المفاتيح الطويلة التي ظهرت في الصورة
      
      // 1. استخراج الدور (Role)
      const rawRole = 
        decodedData["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || // المفتاح الطويل من الصورة
        decodedData["role"] || 
        "user";

      // 2. استخراج الاسم (Name)
      const rawName = 
        decodedData["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] || 
        decodedData["unique_name"] || 
        "";

      // 3. استخراج الإيميل (Email)
      const rawEmail = 
        decodedData["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"] || 
        decodedData["email"] || 
        email;

      // توحيد الدور ليكون حروف صغيرة (admin)
      let finalRole = "user";
      if (String(rawRole).toLowerCase() === "admin") {
        finalRole = "admin";
      }

      // تجهيز الكائن النظيف للحفظ
      const userObj = {
        name: rawName,
        email: rawEmail,
        role: finalRole // سيتم حفظه كـ admin أو user فقط
      };

      console.log("💾 Saving Clean User:", userObj);
      localStorage.setItem("user", JSON.stringify(userObj));
      window.dispatchEvent(new Event("user-login"));

      // التوجيه النهائي
      if (finalRole === "admin") {
        navigate("/admin-dashboard", { replace: true });
      } else {
        navigate("/", { replace: true });
      }

    } catch (err) {
      console.error("Login Error:", err);
      const msg = err?.response?.data?.message || err.message || "Login failed.";
      setError(msg);
      localStorage.removeItem("user");
      localStorage.removeItem("jwt_token");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh", backgroundColor: "#f9fafb", overflowX: "hidden" }}>
      <div className="bg-white p-5 rounded-4 shadow-sm" style={{ width: "500px", maxWidth: "90%", margin: "0 auto" }}>
        <h3 className="fw-bold text-center mb-1">Welcome Back</h3>
        <p className="text-center text-secondary mb-4">Sign in to your account</p>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email Address</label>
            <input type="email" className="form-control" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={loading} />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input type="password" className="form-control" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required disabled={loading} />
          </div>
          <button type="submit" className="btn w-100 text-white fw-semibold mb-3" style={{ backgroundColor: "#1e40af" }} disabled={loading}>
            {loading ? <span>Loading...</span> : "Sign In"}
          </button>
        </form>
        {error && <div className="alert alert-danger text-center">{error}</div>}
        <p className="text-center mb-0">Don't have an account? <Link to="/signup" className="text-primary fw-semibold">Sign up</Link></p>
        <div className="d-flex align-items-center my-3"><hr className="flex-grow-1" /> <span className="text-muted small px-2">Or continue with</span> <hr className="flex-grow-1" /></div>
        <div className="d-flex gap-3">
          <button className="btn btn-outline-secondary w-50 d-flex align-items-center justify-content-center" disabled={loading}><FaGoogle className="text-danger me-2" /> Google</button>
          <button className="btn btn-outline-secondary w-50 d-flex align-items-center justify-content-center" disabled={loading}><FaFacebook className="text-primary me-2" /> Facebook</button>
        </div>
      </div>
    </div>
  );
}