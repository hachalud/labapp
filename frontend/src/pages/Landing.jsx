import { useNavigate } from "react-router-dom";

 function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-10 flex flex-col items-center gap-6">
        <h1 className="text-3xl font-bold text-center">Welcome to Book Rental System</h1>
        <p className="text-center text-gray-600">
          Rent books easily and track your rentals online.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <button
            onClick={() => navigate("/signup")}
            className="px-8 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
          >
            Sign Up
          </button>

          <button
            onClick={() => navigate("/login")}
            className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
          >
            Already a Member? Login
          </button>
        </div>
      </div>
    </div>
  );
}
export default Landing;