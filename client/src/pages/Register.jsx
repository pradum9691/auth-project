import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import AuthLayout from "../layouts/AuthLayout";
import { Mail, Lock, User } from "lucide-react";

export default function Register() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const submit = async () => {
    await api.post("/auth/register", form);
    setForm("")
    navigate("/")
    alert("Verification email sent");
  };

  return (
    <AuthLayout title="SIGN UP">
      <div className="space-y-8">

        <div className="relative">
          <User size={16} className="absolute left-0 top-1/2 -translate-y-1/2 text-white/40"/>
          <input
            placeholder="Full Name"
            className="w-full bg-transparent border-b border-white/30 pl-7 pb-2 text-sm text-white placeholder-white/40 outline-none focus:border-white"
            onChange={(e)=>setForm({...form,name:e.target.value})}
          />
        </div>

        <div className="relative">
          <Mail size={16} className="absolute left-0 top-1/2 -translate-y-1/2 text-white/40"/>
          <input
            placeholder="Email"
            className="w-full bg-transparent border-b border-white/30 pl-7 pb-2 text-sm text-white placeholder-white/40 outline-none focus:border-white"
            onChange={(e)=>setForm({...form,email:e.target.value})}
          />
        </div>

        <div className="relative">
          <Lock size={16} className="absolute left-0 top-1/2 -translate-y-1/2 text-white/40"/>
          <input
            type="password"
            placeholder="Password"
            className="w-full bg-transparent border-b border-white/30 pl-7 pb-2 text-sm text-white placeholder-white/40 outline-none focus:border-white"
            onChange={(e)=>setForm({...form,password:e.target.value})}
          />
        </div>

        <button onClick={submit} className="w-full py-3 border border-white/40 text-white hover:bg-white hover:text-black transition">
          SIGN UP
        </button>

        <p onClick={()=>navigate("/")} className="text-xs text-center text-white/50 cursor-pointer hover:text-white">
          Already have account? Login
        </p>

      </div>
    </AuthLayout>
  );
}
