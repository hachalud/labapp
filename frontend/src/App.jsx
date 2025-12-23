import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardHomeRedirect from "./pages/dashboard/DashboardIndex";


// Dashboard pages
import SearchBook from "./pages/dashboard/SearchBook";
import ApplyRent from "./pages/dashboard/ApplyRent";
import ReturnBook from "./pages/dashboard/ReturnBook";
import ApplicationStatus from "./pages/dashboard/ApplicationStatus";
import SearchCustomer from "./pages/dashboard/SearchCustomer";
import CheckRequests from "./pages/dashboard/CheckRequests";
import AddBook from "./pages/dashboard/AddBook";
import ReferToAdmin from "./pages/dashboard/ReferToAdmin";
import ApproveAddBook from "./pages/dashboard/ApproveAddBook";
import ApproveRent from "./pages/dashboard/ApproveRent";
import Create_user from "./pages/dashboard/Create_user";
function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<Landing />} />

        {/* Signup Page */}
        <Route path="/signup" element={<Signup />} />

        {/* Login Page */}
        <Route path="/login" element={<Login />} />

        {/* Dashboard Pages (Protected) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["customer", "employee", "admin"]}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          {/* 🔑 DEFAULT DASHBOARD ROUTE */}
          <Route index element={<DashboardHomeRedirect />} />

          {/* Customer + Employee */}
          <Route
            path="search-book"
            element={
              <ProtectedRoute allowedRoles={["customer", "employee"]}>
                <SearchBook />
              </ProtectedRoute>
            }
          />

          {/* Customer only */}
          <Route
            path="apply-rent"
            element={
              <ProtectedRoute allowedRoles={["customer"]}>
                <ApplyRent />
              </ProtectedRoute>
            }
          />
          <Route
            path="return-book"
            element={
              <ProtectedRoute allowedRoles={["customer"]}>
                <ReturnBook />
              </ProtectedRoute>
            }
          />
          <Route
            path="application-status"
            element={
              <ProtectedRoute allowedRoles={["customer"]}>
                <ApplicationStatus />
              </ProtectedRoute>
            }
          />

          {/* Employee only */}
          <Route
            path="search-customer"
            element={
              <ProtectedRoute allowedRoles={["employee"]}>
                <SearchCustomer />
              </ProtectedRoute>
            }
          />
          <Route
            path="check-requests"
            element={
              <ProtectedRoute allowedRoles={["employee"]}>
                <CheckRequests />
              </ProtectedRoute>
            }
          />
          <Route
            path="add-book"
            element={
              <ProtectedRoute allowedRoles={["employee"]}>
                <AddBook />
              </ProtectedRoute>
            }
          />
          <Route
            path="refer-to-admin"
            element={
              <ProtectedRoute allowedRoles={["employee"]}>
                <ReferToAdmin />
              </ProtectedRoute>
            }
          />

          {/* Admin only */}
          <Route
            path="approve-add-book"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <ApproveAddBook />
              </ProtectedRoute>
            }
          />
          <Route
            path="create-user"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Create_user/>
              </ProtectedRoute>
            }
          />
          <Route
            path="approve-rent"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <ApproveRent />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
