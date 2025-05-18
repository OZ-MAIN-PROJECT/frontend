import closeIcon from '@/assets/icons/modal-close.svg';

const CloseButton = ({ onClick }: { onClick: () => void }) => (
  <button onClick={onClick} className="absolute top-6 right-6 w-[32px] h-[32px] p-1" aria-label="닫기">
    <img src={closeIcon} alt="닫기 아이콘" width={32} height={32} />
  </button>
);

export default CloseButton;
