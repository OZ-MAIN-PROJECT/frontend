import { useState } from 'react';
import AlertModal from '../components/common/Modal/AlertModal';
import BlankModal from '../components/common/Modal/BlankModal';

const TestModal = () => {
  const [modalOpen, setModalOpen] = useState(false);

  // 여기서 타입 바꿔서 테스트
  const testModalType = 'alert'; // 'alert' 또는 'blank'
  const alertStatus = 'forbidden'; // 'success' | 'error' | 'forbidden'

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 bg-gray-100">
      <h1 className="text-2xl font-bold">🧪 Modal 테스트 페이지</h1>

      <button onClick={openModal} className="px-6 py-3 bg-primary-800 text-white rounded-md">
        모달 열기
      </button>

      {/* 여기서 어떤 모달을 열지 결정 */}
      {modalOpen && testModalType === 'alert' && (
        <AlertModal
          isOpen
          onClose={closeModal}
          status={alertStatus}
          title="회원가입이 완료되었습니다."
          description=""
          confirmText="홈으로"
          onConfirm={closeModal}
        />
      )}

      {modalOpen && testModalType === 'blank' && (
        <BlankModal isOpen={true} onClose={closeModal} title="Blank Modal">
          {/* children 아예 없음 */}
        </BlankModal>
      )}
    </div>
  );
};

export default TestModal;
