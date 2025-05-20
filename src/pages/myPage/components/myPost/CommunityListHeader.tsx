import CommunityTitle from '../../../../components/community/CommunityTitle';
import ViewToggleButton from '../../../../components/community/ViewToggleButton';
import { SortType, ViewType } from '@/types/Post';

interface Props {
  title: string;
  controls : {
    viewType : ViewType;
    sortType : SortType;
  }
  onViewTypeChange : (v : ViewType) => void;
  onSortTypeChange : (v : SortType) => void
}

const CommunityListHeader = ({ title, controls, onViewTypeChange, onSortTypeChange }: Props) => {
  const {viewType, sortType} = controls;

  return (
    <>
      <div>
        <CommunityTitle title={title} />

        {/* 정렬 및 뷰토글 */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-sm text-primary-500 dark:text-primary-700">
            <button
              className={`${sortType === 'recent' ? 'font-semibold text-primary-800 dark:text-primary-300' : ''}`}
              onClick={() => onSortTypeChange('recent')}
            >
              최신순
            </button>
            <span className="text-gray-400">·</span>
            <button
              className={`${sortType === 'popular' ? 'font-semibold text-primary-800 dark:text-primary-300' : ''}`}
              onClick={() => onSortTypeChange('popular')}
            >
              인기순
            </button>
          </div>

          <ViewToggleButton viewType={viewType} onChange={onViewTypeChange} />
        </div>
      </div>
    </>
  );
};

export default CommunityListHeader;
