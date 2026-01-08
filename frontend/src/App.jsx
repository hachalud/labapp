import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardHomeRedirect from "./pages/dashboard/DashboardIndex";


// Dashboard pages
import ApplyRent from "./pages/dashboard/ApplyRent";
import ApplicationStatus from "./pages/dashboard/ApplicationStatus";
import ReturnBook from "./pages/dashboard/ReturnBook";
import AddBook from "./pages/dashboard/AddBook";
import CheckRequests from "./pages/dashboard/CheckRequests";
import SearchCustomer from "./pages/dashboard/SearchCustomer";
import ApproveRent from "./pages/dashboard/ApproveRent";
import Create_user from "./pages/dashboard/Create_user";
import ApproveAddBook from "./pages/dashboard/ApproveAddBook";
import BookManager from "./pages/dashboard/BookManager";
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
            path="application-status"
            element={
              <ProtectedRoute allowedRoles={["customer"]}>
                <ApplicationStatus />
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
          

          {/* Employee only */}
          
          <Route
            path="add-book"
            element={
              <ProtectedRoute allowedRoles={["employee"]}>
                <AddBook />
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
            path="book-manager"
            element={
              <ProtectedRoute allowedRoles={["employee"]}>
                <BookManager />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="search-customer"
            element={
              <ProtectedRoute allowedRoles={["employee"]}>
                <SearchCustomer />
              </ProtectedRoute>
            }
          />

          {/* Admin only */}
          <Route
            path="approve-rent"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <ApproveRent />
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
            path="approve-add-book"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <ApproveAddBook />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
