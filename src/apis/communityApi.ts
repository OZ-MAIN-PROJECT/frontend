import { CommunityCreateRequest, CommunityListResponse, Post, Comment, ClientPostType } from '@/types/Post';
import { END_POINT } from '@/constants/route';
import api from './api';

/////////////////////////////////////////////////
// ✅ 추가: 원시 응답 타입 정의
/////////////////////////////////////////////////

export interface CommunityListRaw {
  communityUuid: string;
  title: string;
  content: string;
  type: string;
  nickname: string;
  profileImage?: string;
  createdAt: string;
  updatedAt: string;
  likes: number;
  views: number;
  comments?: number;
  isLiked: boolean;
  isOwner: boolean;
  userUuid: string;
  image?: string;
}

export interface CommentRaw {
  commentId: number;
  parentCommentId?: number | null;
  content: string;
  createdAt: string;
  updatedAt?: string;
  deletedAt?: string | null;
  isOwner: boolean;
  isLiked?: boolean;
  likes?: number;
  userUuid?: string;
  nickname: string;
  profileImage?: string;
  children?: CommentRaw[];
  commentReplies?: CommentRaw[];
}

//////////////////////////////////////////////
// 📝 게시글 관련 API
//////////////////////////////////////////////

export const createCommunityPost = async (data: CommunityCreateRequest): Promise<{ id: string }> => {
  const formData = new FormData();
  formData.append('title', data.title);
  formData.append('content', data.content);
  formData.append('type', data.type);
  if (data.image) formData.append('image', data.image);

  const response = await api.post(END_POINT.COMMUNITY, formData);
  const id = response.data?.communityUuid || response.data?.id;
  if (!id) throw new Error('게시글 ID가 응답에 없습니다.');
  return { id };
};

// export const createCommunityPost = async(data : CommunityCreateRequest) =>{
//   const response = await api.post(END_POINT.COMMUNITY, {data}) 
//   return response.data
// }

export const updateCommunityPost = async (communityUuid: string, data: CommunityCreateRequest): Promise<void> => {
  const formData = new FormData();
  formData.append('title', data.title);
  formData.append('content', data.content);
  formData.append('type', data.type);
  if (data.image) formData.append('image', data.image);

  await api.patch(END_POINT.COMMUNITY_DETAIL(communityUuid), formData);
};

export const deleteCommunityPost = async (communityUuid: string) => {
  await api.delete(END_POINT.COMMUNITY_DETAIL(communityUuid));
};

export const getCommunityList = async ({
  type,
  page,
  size,
}: {
  type: string;
  page: number;
  size: number;
}): Promise<CommunityListResponse> => {
  const response = await api.get(END_POINT.COMMUNITY_LIST({ type, page, size }));

  const converted = response.data.results.map(
    (item: CommunityListRaw): Post => ({
      id: item.communityUuid,
      type: item.type.toLowerCase() as ClientPostType,
      title: item.title,
      content: item.content,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      imageUrl: item.image || '',
      isOwner: item.isOwner,
      isLiked: item.isLiked,
      likes: item.likes,
      views: item.views,
      comments: item.comments ?? 0,
      author: {
        nickname: item.nickname,
        profileImage: item.profileImage ?? '',
      },
    }),
  );

  return {
    ...response.data,
    results: converted,
  };
};

export const getCommunityDetail = async (communityUuid: string): Promise<Post> => {
  const response = await api.get(END_POINT.COMMUNITY_DETAIL(communityUuid));
  const item = response.data;

  return {
    id: item.communityUuid,
    type: item.type.toLowerCase(),
    title: item.title,
    content: item.content,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    imageUrl: item.image || '',
    isOwner: item.isOwner,
    isLiked: item.isLiked,
    likes: item.likes,
    views: item.views,
    comments: item.comments ?? 0,
    author: {
      nickname: item.nickname,
      profileImage: item.profileImage ?? '',
    },
  };
};

export const likeCommunityPost = async (communityUuid: string) => {
  const response = await api.post(END_POINT.COMMUNITY_LIKE(communityUuid));
  return response.data;
};

export const unlikeCommunityPost = async (communityUuid: string) => {
  await api.delete(END_POINT.COMMUNITY_LIKE(communityUuid));
};

//////////////////////////////////////////////
// 💬 댓글 관련 API
//////////////////////////////////////////////

export const createComment = async ({
  communityUuid,
  content,
  parentCommentId = null,
}: {
  communityUuid: string;
  content: string;
  parentCommentId?: number | null;
}): Promise<Comment> => {
  const response = await api.post(END_POINT.COMMENT(communityUuid), {
    content,
    parentCommentId,
  });

  return mapCommentResponse(response.data);
};

export const getComments = async (communityUuid: string): Promise<Comment[]> => {
  const response = await api.get(END_POINT.COMMENT(communityUuid));
  const flatCommentResponses: CommentRaw[] = response.data.commentReplies || [];

  return flatCommentResponses.map((parent: CommentRaw) => {
    const parentComment = mapCommentResponse(parent);

    if (parent.commentReplies && Array.isArray(parent.commentReplies)) {
      parentComment.children = parent.commentReplies.map(mapCommentResponse);
    } else {
      parentComment.children = [];
    }

    return parentComment;
  });
};

export const updateComment = async ({
  communityUuid,
  commentId,
  content,
}: {
  communityUuid: string;
  commentId: number;
  content: string;
}): Promise<Comment> => {
  const response = await api.patch(END_POINT.COMMENT_DETAIL(communityUuid, commentId), { content });
  return mapCommentResponse(response.data);
};

export const deleteComment = async ({ communityUuid, commentId }: { communityUuid: string; commentId: number }) => {
  await api.delete(END_POINT.COMMENT_DETAIL(communityUuid, commentId));
};

const mapCommentResponse = (data: CommentRaw): Comment => ({
  id: data.commentId,
  parentCommentId: data.parentCommentId ?? null,
  content: data.content,
  createdAt: data.createdAt,
  updatedAt: data.updatedAt,
  deletedAt: data.deletedAt ?? null,
  author: {
    nickname: data.nickname,
    profileImage: data.profileImage ?? '',
  },
  children: [],
});

// 좋아요 추가
export const postLike = async ({ communityUuid }: { communityUuid: string }) => {
  const response = await api.post(END_POINT.COMMUNITY_LIKE(communityUuid));
  return response.data;
};

// 좋아요 취소
export const deleteLike = async ({ communityUuid }: { communityUuid: string }) => {
  const response = await api.delete(END_POINT.COMMUNITY_LIKE(communityUuid));
  return response.data;
};
