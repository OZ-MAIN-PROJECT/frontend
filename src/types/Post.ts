import { User } from '@/types/auth';

export type ServerPostType = 'NOTICE' | 'QUESTION' | 'EMOTION';
export type ClientPostType = 'notice' | 'question' | 'emotion';
export type PostType = ClientPostType;

export const toServerPostType = (type: ClientPostType): ServerPostType => {
  switch (type) {
    case 'notice':
      return 'NOTICE';
    case 'question':
      return 'QUESTION';
    case 'emotion':
      return 'EMOTION';
  }
};

export const toClientPostType = (type: ServerPostType): ClientPostType => {
  switch (type) {
    case 'NOTICE':
      return 'notice';
    case 'QUESTION':
      return 'question';
    case 'EMOTION':
      return 'emotion';
  }
};

export const getPostTypeLabel = (type: PostType): string => {
  switch (type) {
    case 'emotion':
      return '감정 소비 이야기';
    case 'question':
      return '질문 게시판';
    case 'notice':
      return '공지사항';
    default:
      return '';
  }
};

// 작성자 정보 타입 (사용자 정보 중 일부만 사용)
export type Author = Pick<User, 'nickname' | 'profileImage'>;


// 게시글 타입
export interface Post {
  id: string; // communityUuid
  type: PostType;
  title: string;
  content: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
  author: Author;
  isOwner: boolean;
  likes: number;
  comments: number;
  views: number;
  isLiked: boolean;
}

// 게시글 생성용
export interface CommunityCreateRequest {
  title: string;
  content: string;
  type: ServerPostType;
  image?: File;
}

// 게시글 목록 응답
export interface CommunityListResponse {
  results: Post[];
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;
}

export interface Comment {
  id: number;
  author: Author;
  parentCommentId: number | null;
  content: string;
  createdAt: string;
  updatedAt?: string;
  deletedAt?: string | null;
  children: Comment[];
}

export interface PostCardProps {
  post: Post;
  onClick?: (postId: string) => void;
}

export type ViewType = 'grid' | 'list';
export type SortType = 'recent' | 'popular';
