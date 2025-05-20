import { useState } from 'react';
import { postLike, deleteLike } from '@/apis/communityApi';

export const useLike = (initialLiked: boolean, initialCount: number, postId: string) => {
  const [isLiked, setIsLiked] = useState(initialLiked);
  const [likes, setLikes] = useState(initialCount);

  // 안전 가드: postId가 유효하지 않으면 noop 반환
  if (!postId) return { isLiked: false, likes: 0, toggleLike: async () => {} };

  const toggleLike = async () => {
    const nextLiked = !isLiked;

    // optimistic update
    setIsLiked(nextLiked);
    setLikes(prev => prev + (nextLiked ? 1 : -1));

    try {
      if (nextLiked) {
        await postLike({ communityUuid: postId });
      } else {
        await deleteLike({ communityUuid: postId });
      }
    } catch (err) {
      console.error('좋아요 처리 실패:', err);
      // rollback
      setIsLiked(!nextLiked);
      setLikes(prev => prev + (nextLiked ? -1 : 1));
    }
  };

  return { isLiked, likes, toggleLike };
};
