import { Post, SortType } from '@/types/Post';

export const mapToPost = (raw: any): Post => ({
  id: raw.communityUuid,
  type: raw.type.toLowerCase(), // "QUESTION" → "question"
  title: raw.title,
  content: raw.content,
  imageUrl: raw.image,
  createdAt: raw.createdAt,
  updatedAt: raw.updatedAt,
  author: {
    nickname: raw.nickname,
  },
  isOwner: raw.isOwner,
  likes: raw.likes,
  comments: 0, 
  views: raw.views,
  isLiked: raw.isLiked,
});

export const sortPosts = (posts : Post[], SortType : SortType) => {
  const copied = [...posts];
  if (SortType === 'recent') {
    return copied.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
  return copied.sort((a, b) => (b.likes ?? 0) - (a.likes ?? 0));
}