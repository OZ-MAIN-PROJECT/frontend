import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Sidebar from "../components/layout/Sidebar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex bg-gray-200">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
