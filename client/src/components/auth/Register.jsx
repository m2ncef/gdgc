import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../services/auth";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token || user) {
      window.location.href = "/dashboard";
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullName || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await register(email, password, (name = fullName));
      if (response.token) {
        nav("/dashboard");
      }
    } catch (err) {
      console.error("Error during registration:", err);
      setError(
        err.response?.data?.message ||
          "An error occurred. Please try again later."
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-[400px] bg-white rounded-md shadow-md p-8">
        <h2 className="text-2xl font-bold text-center mb-4">Create Account</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full name"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800"
          >
            Create Account
          </button>
        </form>

        <div className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <button
            className="text-blue-500 hover:underline"
            onClick={() => nav("/login")}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
