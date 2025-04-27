import { Outlet } from "react-router";
import Footer from "./footer";

export default function MainLayout() {
  return (
    <div className="bg-white dark:bg-gray-950 flex flex-col min-h-screen">
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
