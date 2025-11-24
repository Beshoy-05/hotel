// src/App.jsx
import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import RoomsSection from "./components/Rooms"; // component on the home page
import Offers from "./components/Offers";
import Footer from "./components/Footer";

// Pages (routes)
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import Contact from "./pages/Contact";
import About from "./pages/About";
import AdminDashboard from "./pages/AdminDashboard";
import RoomsPage from "./pages/Rooms";         // صفحة عرض كل الغرف (route /rooms)
import RoomDetails from "./pages/RoomDetails";
import BookingForm from "./pages/BookingForm";
import MyBookings from "./pages/MyBookings";

function App() {
  return (
    <Router>
      <Routes>
        {/* الصفحة الرئيسية */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Hero />
              <RoomsSection />
              <Offers />
              <About />
              <Contact />
              <Footer />
            </>
          }
        />

        {/* صفحات مصادقة */}
        <Route
          path="/signin"
          element={
            <>
              <Navbar />
              <SignIn />
              <Footer />
            </>
          }
        />
        <Route
          path="/signup"
          element={
            <>
              <Navbar />
              <SignUp />
              <Footer />
            </>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <>
              <Navbar />
              <ForgotPassword />
              <Footer />
            </>
          }
        />

        {/* صفحات معلومات */}
        <Route
          path="/contact"
          element={
            <>
              <Navbar />
              <Contact />
              <Footer />
            </>
          }
        />
        <Route
          path="/about"
          element={
            <>
              <Navbar />
              <About />
              <Footer />
            </>
          }
        />

        {/* صفحات الغرف و الحجز */}
        <Route
          path="/rooms"
          element={
            <>
              <Navbar />
              <RoomsPage />
              <Footer />
            </>
          }
        />
        <Route
          path="/rooms/:id"
          element={
            <>
              <Navbar />
              <RoomDetails />
              <Footer />
            </>
          }
        />
        <Route
          path="/book/:id"
          element={
            <>
              <Navbar />
              <BookingForm />
              <Footer />
            </>
          }
        />
        <Route
          path="/book"
          element={
            <>
              <Navbar />
              <BookingForm />
              <Footer />
            </>
          }
        />
        <Route
          path="/my-bookings"
          element={
            <>
              <Navbar />
              <MyBookings />
              <Footer />
            </>
          }
        />

        {/* لوحة تحكم الأدمن */}
        <Route
          path="/admin-dashboard"
          element={
            <>
              <Navbar />
              <AdminDashboard />
              <Footer />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
