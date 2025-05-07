// 게시글 타입 (질문 게시판, 감정 소비 이야기, 공지사항)
export type PostType = 'question' | 'emotion' | 'notice';

// 작성자 정보 타입
export interface Author {
  id: string; // 작성자 고유 ID
  nickname: string; // 작성자 닉네임
  profileImageUrl?: string; // 프로필 이미지 URL
}

// 게시글 데이터 구조 정의
export interface Post {
  id: string; // 게시글 고유 ID
  type: string; // 게시글 유형
  title: string; // 제목
  content: string; // 본문 내용
  imageUrl?: string; // 첨부 이미지 URL (선택)
  createdAt: string; // 생성일
  updatedAt: string; // 수정일
  author: Author; // 작성자 정보
  isMine: boolean; // '내가 쓴 글' 여부
  likes?: number; // 좋아요
  comments?: number; // 댓글
  views?: number; // 조회
}
// 댓글 데이터 구조 정의
export interface Comment {
  id: string; // 댓글 고유 ID
  content: string; // 댓글 내용
  createdAt: string; // 작성일
  author: Author; // 작성자
  isMine?: boolean; // 본인이 작성한 댓글인지 여부 (옵션)
}

// PostCard 컴포넌트에 전달할 props 타입
export interface PostCardProps {
  post: Post; // 게시글 정보
  onClick?: (postId: string) => void; // 카드 클릭 시 실행될 함수
}
