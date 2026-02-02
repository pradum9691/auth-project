import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import AuthLayout from "../layouts/AuthLayout";
import { Mail, Lock } from "lucide-react";

export default function Login() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const login = async () => {
      try {
    const res = await api.post("/auth/login", form);
    localStorage.setItem("token", res.data.token);
    navigate("/profile");
  } catch (err) {
    console.log("error in login", err);
    alert("Please register and verify")
  }
  };

  return (
    <AuthLayout title="MEMBER LOGIN" subtitle="Enter your credentials">
      <div className="space-y-8">
        <div className="relative">
          <Mail
            size={16}
            className="absolute left-0 top-1/2 -translate-y-1/2 text-white/40"
          />
          <input
            placeholder="Email"
            className="w-full bg-transparent border-b border-white/30 pl-7 pb-2 text-sm text-white placeholder-white/40 outline-none focus:border-white"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div className="relative">
          <Lock
            size={16}
            className="absolute left-0 top-1/2 -translate-y-1/2 text-white/40"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full bg-transparent border-b border-white/30 pl-7 pb-2 text-sm text-white placeholder-white/40 outline-none focus:border-white"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>

        <button
          onClick={login}
          className="w-full py-3 border border-white/40 text-sm tracking-widest text-white hover:bg-white hover:text-black transition"
        >
          LOGIN
        </button>
        <p
          onClick ={() => navigate("/register")}
          className="text-xs text-center text-white/50 cursor-pointer hover:text-white"
        >
          Don’t have an account? Register
        </p>
      </div>
    </AuthLayout>
  );
}
