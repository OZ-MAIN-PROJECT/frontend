// Community 타입 정의
export type Community = {
  id: number;
  writer: string; // 게시글을 작성한 사람
  categoryId: number; // 카테고리의 ID
  type: 'info' | 'Q&A' | 'notice'; // 게시글의 타입
  title: string; // 제목
  content: string; // 내용
  createdAt: Date; // 작성 시간
  updatedAt: Date; // 수정 시간
  views?: number; // 조회수
  saves?: number; // 저장수
  comments?: number; // 댓글수
};

// Comment 타입 정의
export type Comment = {
  id: number;
  communityId: number; // 게시글의 ID
  writer: string; // 댓글을 작성한 사람
  parentId: number | null; // 답글인 경우 부모 댓글의 ID, 최상위 댓글은 null
  content: string; // 댓글 내용
  createdAt: Date; // 댓글 작성 시간
  updatedAt: Date; // 댓글 수정 시간
};
