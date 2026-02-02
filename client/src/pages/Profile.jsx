import { useEffect, useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/auth/profile").then((res) => setUser(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200">

      {/* TOP BAR */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="font-semibold tracking-wide">Dashboard</h1>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/");
            }}
            className="text-sm px-4 py-2 rounded-lg border hover:bg-black hover:text-white transition"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8">
        <div className="bg-white rounded-2xl shadow p-8 text-center space-y-4">

          <div className="mx-auto w-20 h-20 rounded-full bg-indigo-600 text-white flex items-center justify-center text-2xl font-bold">
            {user?.name?.[0]}
          </div>

          <h2 className="text-lg font-semibold">{user?.name}</h2>
          <p className="text-gray-500 text-sm">{user?.email}</p>

          {user?.isVerified ? (
            <span className="inline-block px-4 py-1 text-xs rounded-full bg-green-100 text-green-600">
              Verified Account
            </span>
          ) : (
            <span className="inline-block px-4 py-1 text-xs rounded-full bg-red-100 text-red-600">
              Not Verified
            </span>
          )}

        </div>
        <div className="md:col-span-2 space-y-6">

          <div className="bg-white rounded-2xl shadow p-8">
            <h3 className="font-semibold mb-4">Account Information</h3>

            <div className="grid sm:grid-cols-2 gap-6 text-sm">
              <div>
                <p className="text-gray-400">Full Name</p>
                <p className="font-medium">{user?.name}</p>
              </div>

              <div>
                <p className="text-gray-400">Email Address</p>
                <p className="font-medium">{user?.email}</p>
              </div>

              <div>
                <p className="text-gray-400">Account Status</p>
                <p className="font-medium">
                  {user?.isVerified ? "Active" : "Pending Verification"}
                </p>
              </div>

              <div>
                <p className="text-gray-400">Role</p>
                <p className="font-medium">User</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow p-8">
            <h3 className="font-semibold mb-4">Actions</h3>

            <div className="flex gap-4 flex-wrap">
              <button className="px-5 py-2 rounded-lg border hover:bg-black hover:text-white transition">
                Edit Profile
              </button>

              <button className="px-5 py-2 rounded-lg border hover:bg-black hover:text-white transition">
                Change Password
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
