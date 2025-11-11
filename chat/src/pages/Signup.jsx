
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({ first_name: "", last_name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Sending OTP...");
    try {
      const res = await fetch("http://127.0.0.1:8000/signup/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(data.message);
        navigate("/verify-otp", { state: { email: form.email } });
      } else {
        setMessage(data.message || "Error signing up");
      }
    } catch (err) {
      setMessage("Server error.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <form className="flex flex-col gap-3 w-80" onSubmit={handleSubmit}>
        <input name="first_name" placeholder="First Name" onChange={handleChange} required />
        <input name="last_name" placeholder="Last Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Get OTP</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default Signup;
