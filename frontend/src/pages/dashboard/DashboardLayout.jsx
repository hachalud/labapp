import Menu from "./Menu";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen">
      <Menu />
      <div className="flex-1 p-6 pt-16 bg-gray-50">
        <Outlet /> {/* Nested dashboard page renders here */}
      </div>
    </div>
  );
}
