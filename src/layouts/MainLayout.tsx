import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Sidebar from '../components/layout/Sidebar';
import { useEffect, useState } from 'react';
import IconButton from '../components/common/IconButton';
import { BanknoteArrowDown, BanknoteArrowUp, Plus } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import SelectLayer from '../components/common/SelectLayer';
import WalletFormModal from '@/components/wallet/walletModal/WalletFormModal';
import { useModalStore } from '@/stores/useModalStore';
import WalletDetailModal from '@/components/wallet/walletModal/WalletDetailModal';
import ThemeSettingModal from '@/components/layout/ThemeSettingModal';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(false);
  const [layerOpen, setLayerOpen] = useState(false);

  const location = useLocation();

  const currentPath = location.pathname;
  const showWalletButton = !currentPath.includes('/community');

  const {openModal} = useModalStore();

  // 화면 크기에 따라 사이드바의 초기 상태 설정
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024) {
        setIsSidebarVisible(false); // 화면 크기가 1024 이하일 때 사이드바 숨기기
      } else {
        setIsSidebarVisible(true); // 화면 크기가 1024 이상일 때 사이드바 표시
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // 화면 크기 초기 로드 시 실행

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible); // 햄버거 메뉴 클릭 시 사이드바 열기/닫기
  };

  return (
    <div className="flex bg-gray-200 dark:bg-dark-900 justify-end">
      <Sidebar isVisible={isSidebarVisible} toggleSidebar={toggleSidebar} />
      <div className="w-full lg:w-[calc(100%-250px)] flex flex-col min-h-screen">
        <Header toggleSidebar={toggleSidebar} />
        <main className="flex-1 p-5 lg:p-10">{children}</main>
        <Footer />
      </div>
      {showWalletButton && (
        <div className="fixed bottom-6 right-6 flex flex-col items-end gap-3 z-50">
          {layerOpen && (
            <SelectLayer
              options={[
                {
                  icon: BanknoteArrowUp,
                  label: '수입 추가',
                  onClick: () => {
                    openModal('walletForm', { type: 'INCOME' });
                  },
                  className: 'text-primary-500 hover:text-accent-blue',
                },
                {
                  icon: BanknoteArrowDown,
                  label: '지출 추가',
                  onClick: () => {
                    openModal('walletForm', { type: 'EXPENSE' });
                  },
                  className: 'text-primary-500 hover:text-accent-red',
                },
              ]}
              onSelect={option => {
                option.onClick();
                setLayerOpen(false);
              }}
            />
          )}
          <IconButton
            icon={Plus}
            onClick={() => setLayerOpen(!layerOpen)}
            className="bg-accent-blue hover:bg-primary-800"
          />
        </div>
      )}
      <WalletDetailModal />
      <WalletFormModal />
      <ThemeSettingModal />
    </div>
  );
};

export default MainLayout;
