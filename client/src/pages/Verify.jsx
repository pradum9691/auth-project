import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../utils/api";
import AuthLayout from "../layouts/AuthLayout";

export default function Verify() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get(`/auth/verify/${token}`)
      .then(() => {
        setSuccess(true);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Verification failed");
        setLoading(false);
      });
  }, []);

  return (
    <AuthLayout title="EMAIL VERIFICATION">
      <div className="text-center space-y-6">
        {loading && (
          <>
            <div className="mx-auto w-12 h-12 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            <p className="text-white/50 text-sm">
              Verifying your email…
            </p>
          </>
        )}
        {!loading && success && (
          <>
            <div className="mx-auto w-14 h-14 rounded-full border border-green-300 text-green-300 flex items-center justify-center text-2xl">
              ✓
            </div>

            <h2 className="text-white text-lg font-semibold">
              Email Verified
            </h2>

            <p className="text-white/50 text-sm">
              Your account is now active. You can login.
            </p>

            <button
              onClick={() => navigate("/")}
              className="w-full mt-4 py-3 border border-white/40 text-white hover:bg-white hover:text-black transition"
            >
              Go to Login
            </button>
          </>
        )}
        {!loading && error && (
          <>
            <div className="mx-auto w-14 h-14 rounded-full border border-red-300 text-red-300 flex items-center justify-center text-xl">
              !
            </div>

            <h2 className="text-white text-lg font-semibold">
              Verification Failed
            </h2>

            <p className="text-red-300 text-sm">
              {error}
            </p>

            <button
              onClick={() => navigate("/")}
              className="w-full mt-4 py-3 border border-white/40 text-white hover:bg-white hover:text-black transition"
            >
              Back to Login
            </button>
          </>
        )}

      </div>
    </AuthLayout>
  );
}
