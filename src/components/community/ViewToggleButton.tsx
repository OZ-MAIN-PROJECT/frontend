import { LayoutList, TvMinimal } from 'lucide-react';
import IconWrapper from './IconWrapper';

interface ViewToggleButtonProps {
  viewType: 'grid' | 'list';
  onChange: (view: 'grid' | 'list') => void;
}

const ViewToggleButton = ({ viewType, onChange }: ViewToggleButtonProps) => {
  return (
    <div className="flex items-center gap-[7px]">
      <IconWrapper
        icon={TvMinimal}
        size={24}
        color={viewType === 'grid' ? '#343C6A' : '#9C9FB4'}
        onClick={() => onChange('grid')}
        ariaLabel="피드 뷰로 보기"
        className="hover:bg-gray-100 rounded p-1"
      />
      <span className="w-px h-[12px] bg-gray-400"></span>
      <IconWrapper
        icon={LayoutList}
        size={24}
        color={viewType === 'list' ? '#343C6A' : '#9C9FB4'}
        onClick={() => onChange('list')}
        ariaLabel="리스트 뷰로 보기"
        className="hover:bg-gray-100 rounded p-1"
      />
    </div>
  );
};

export default ViewToggleButton;