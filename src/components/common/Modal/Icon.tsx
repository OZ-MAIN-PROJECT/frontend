import successIcon from '@/assets/icons/modal-success.svg';
import errorIcon from '@/assets/icons/modal-error.svg';
import forbiddenIcon from '@/assets/icons/modal-forbidden.svg';

const iconMap = {
  success: successIcon,
  error: errorIcon,
  forbidden: forbiddenIcon,
};

const Icon = ({ status }: { status: 'success' | 'error' | 'forbidden' }) => {
  const icon = iconMap[status];
  return <img src={icon} alt={`${status} 아이콘`} className="w-[90px] h-[90px] mx-auto" />;
};

export default Icon;
