import { useEffect, useState } from "react";
import TopNav from "./components/Admin/TopNav";
import Sidebar from "./components/Admin/Sidebar";
import { Outlet } from "react-router-dom";


export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (sidebarOpen) {
      document.body.classList.add('sidebar-open');
    } else {
      document.body.classList.remove('sidebar-open');
    }
  }, [sidebarOpen]);

  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  return (
    <>
    
      <TopNav toggleSidebar={toggleSidebar} />
      <Sidebar />
      <div className="flex-grow-1">
        <div className="admin-content p-3 pt-5 mt-5">
          <Outlet />
        </div>
      </div>
    </>
  );
}
