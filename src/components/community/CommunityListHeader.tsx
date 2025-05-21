import { useState } from 'react';
import CommunityTitle from './CommunityTitle';
import ViewToggleButton from './ViewToggleButton';

interface Props {
  title: string;
}

const CommunityListHeader = ({ title }: Props) => {
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
  const [sortType, setSortType] = useState<'recent' | 'popular'>('recent');

  return (
    <>
      <div className="relative w-full max-w-[800px] mx-auto px-4 sm:px-6">
        <CommunityTitle title={title} />

        {/* 정렬 및 뷰토글 */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-sm text-primary-500">
            <button
              className={`${sortType === 'recent' ? 'font-semibold text-primary-800 dark:text-white' : ''}`}
              onClick={() => setSortType('recent')}
            >
              최신순
            </button>
            <span className="text-gray-400">·</span>
            <button
              className={`${sortType === 'popular' ? 'font-semibold text-primary-800 dark:text-white' : ''}`}
              onClick={() => setSortType('popular')}
            >
              인기순
            </button>
          </div>

          <ViewToggleButton viewType={viewType} onChange={setViewType} />
        </div>
      </div>
    </>
  );
};

export default CommunityListHeader;
