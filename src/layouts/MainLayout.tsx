import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Sidebar from "../components/layout/Sidebar";
import { useEffect, useState } from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(false);

  // 화면 크기에 따라 사이드바의 초기 상태 설정
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024) {
        setIsSidebarVisible(false); // 화면 크기가 1024 이하일 때 사이드바 숨기기
      } else {
        setIsSidebarVisible(true); // 화면 크기가 1024 이상일 때 사이드바 표시
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // 화면 크기 초기 로드 시 실행

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible); // 햄버거 메뉴 클릭 시 사이드바 열기/닫기
  };

  return (
    <div className="flex bg-gray-200">
      <Sidebar isVisible={isSidebarVisible} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col h-screen">
        <Header toggleSidebar={toggleSidebar} />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;