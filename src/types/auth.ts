// 마이페이지 조회 시 가져오는 User 타입
export type User = {
  id: string; // 사용자 uuid
  name: string; // 이름
  nickname: string; // 닉네임
  email: string; // 이메일
  writtenCount: number; // 내가 작성한 글
  likedCount: number; // 좋아요 표시한 글
  role: string; // 관리자 여부
};

// 로그인 시 가져오는 User 타입
export type SimpleUser = {
  nickname: string;
  role: 'user' | 'admin';
};

// 내가 작성한 글 타입
export type MyPostType = 'written' | 'liked';