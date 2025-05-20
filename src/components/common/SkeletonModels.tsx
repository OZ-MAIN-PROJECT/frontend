import { ViewType } from '@/types/Post';
import { Skeleton, SkeletonWrapper } from './Skeleton';
import CommunityTitle from '../community/CommunityTitle';

interface MyPostSkeletonProps {
  viewType: ViewType;
}

export const PostCardSkeleton = ({ viewType }: MyPostSkeletonProps) => {
  return (
    <SkeletonWrapper
      className="w-full bg-white rounded-md border p-5 shadow-sm"
      height={viewType === 'list' ? 'h-[220px]' : 'h-[620px]'}
    >
      {/* 작성자 및 날짜 */}
      <div className="flex items-center gap-2 mb-2">
        <Skeleton width="w-[30px] h-[30px]" rounded="rounded-full" />
        <Skeleton width="w-24" height="h-[20px]" />
      </div>

      {/* 리스트 뷰 */}
      {viewType === 'list' ? (
        <div className="flex gap-4 items-start">
          <div className="flex flex-col flex-1 gap-2">
            <Skeleton width="w-3/4" height="h-5" />
            <Skeleton width="w-full" height="h-4" />
            <Skeleton width="w-1/2" height="h-4" />
          </div>
          <Skeleton width="w-[100px]" height="h-[100px]" rounded="rounded-md" />
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <Skeleton width="w-3/4" height="h-5" />
          <Skeleton width="w-full" height="h-[400px]" rounded="rounded-md" />
          <Skeleton width="w-full" height="h-4" />
          <Skeleton width="w-1/2" height="h-4" />
        </div>
      )}

      {/* 좋아요, 댓글, 조회수 */}
      <div className="flex items-center gap-4 mt-3 ">
        <Skeleton width="w-6" height="h-5" />
        <Skeleton width="w-6" height="h-5" />
        <div className="ml-auto flex gap-2">
          <Skeleton width="w-6" height="h-5" />
          <Skeleton width="w-6" height="h-5" />
        </div>
      </div>
    </SkeletonWrapper>
  );
};

export const PostDetailSkeleton = () => {
  return (
    <div className="w-full max-w-[800px] mx-auto px-4 sm:px-6">
      {/* 게시판 제목 */}
      <CommunityTitle title="게시글 로딩 중..." />

      {/* 카드 영역 */}
      <SkeletonWrapper className="w-full mx-auto px-4 sm:px-6 h-[660px] p-[30px] shadow-sm" rounded="rounded-md">
        {/* 작성자 정보 & 더보기 버튼 */}
        <div className="flex items-center justify-between mb-5 h-[72px]">
          <div className="flex items-center gap-2">
            <Skeleton width="w-[30px]" height="h-[30px]" rounded="rounded-full" />
            <Skeleton width="w-24" height="h-[16px]" />
          </div>
          <Skeleton width="w-6" height="h-6" />
        </div>
        <Skeleton width="w-1/2" height="h-6" className="mb-3" />

        {/* 이미지 */}
        <div className="w-full bg-gray-200 rounded mb-6 h-auto sm:h-[400px]" />

        {/* 내용 */}
        <div className="flex flex-col gap-2 mb-6">
          <Skeleton width="w-full" height="h-4" />
          <Skeleton width="w-5/6" height="h-4" />
          <Skeleton width="w-2/3" height="h-4" />
        </div>

        {/* 좋아요/댓글/조회수 */}
        <div className="flex items-center justify-between text-xs mt-4">
          <div className="flex items-center gap-4">
            <Skeleton width="w-5" height="h-4" />
            <Skeleton width="w-5" height="h-4" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton width="w-5" height="h-4" />
            <Skeleton width="w-5" height="h-4" />
          </div>
        </div>
      </SkeletonWrapper>
    </div>
  );
};

export const ProfileSkeleton = () => {
  return (
    <div className="flex flex-col min-h-screen items-center">
      <div className="w-[500px] h-[120px] flex flex-col min-h-screen items-start gap-4">
        <Skeleton width="w-[90px]" height="h-[28px]" rounded="rounded-full" />
        <div className="flex items-center justify-between gap-4">
          <Skeleton width="w-[60px]" height="h-[60px]" rounded="rounded-full" />
          <div className="flex flex-col gap-2">
            <Skeleton width="w-[140px]" height="h-[28px]" rounded="rounded-md" />
            <Skeleton width="w-[200px]" height="h-5" rounded="rounded-md" />
          </div>
        </div>
        <div className="flex gap-4">
          <Skeleton width="w-[240px]" height="h-[102px]" rounded="rounded-md" />
          <Skeleton width="w-[240px]" height="h-[102px]" rounded="rounded-md" />
        </div>
      </div>
    </div>
  );
};

export const WalletModalSkeleton = () => {
  // const dummyArray = []
  return (
    <div className="h-[458px] space-y-2">
      <div className="flex flex-col gap-2">
        <div className="flex items-center mb-1 gap-2">
          <Skeleton width="w-[112px]" height="h-6" rounded="rounded-md" />
          <Skeleton width="w-6" height="h-6" rounded="rounded-md" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-4 items-start mb-3">
          <Skeleton width="w-[58px]" height="h-6" rounded="rounded-full" />
        </div>
        <div className="py-3">
          <Skeleton width="w-full" height="h-[50px]" rounded="rounded-md" />
        </div>
        <div className="flex flex-col gap-4">
          <Skeleton width="w-full" height="h-7" rounded="rounded-md" />
          <Skeleton width="w-full" height="h-[160px]" rounded="rounded-md" />
        </div>
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <Skeleton width="w-[200px]" height="h-[60px]" rounded="rounded-md" />
          <Skeleton width="w-[200px]" height="h-[60px]" rounded="rounded-md" />
        </div>
      </div>
    </div>
  );
};
