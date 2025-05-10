import { useParams } from 'react-router-dom';
import CommunityTitle from '@/components/community/CommunityTitle';
import CommunityNewPostButton from '@/components/community/CommunityNewPostButton';

const CommunityList = () => {
  const { type } = useParams();

  const getBoardTitle = () => {
    switch (type) {
      case 'question':
        return '질문 게시판';
      case 'emotion':
        return '감정 소비 이야기';
      case 'notice':
        return '공지사항';
      default:
        return '알 수 없는 게시판';
    }
  };

  const getWritePageLink = () => {
    if (type === 'notice') {
      return '/community/notice/write'; // (혹시 필요 없으면 /community/write로 통일)
    }
    return '/community/write';
  };

  return (
    <div className="relative w-full max-w-[800px] mx-auto px-4 sm:px-6">
      <CommunityTitle title={getBoardTitle()} />

      {/* 게시글 목록 map 영역 */}

      {/* 글쓰기 플로팅 버튼 */}
      {type !== 'notice' && type && ( // notice 아니고, type 존재할 때만 노출
        <div className="fixed bottom-8 right-8 z-50">
          <CommunityNewPostButton to={getWritePageLink()} postType={type as 'emotion' | 'question' | 'notice'} />
        </div>
      )}
    </div>
  );
};

export default CommunityList;
