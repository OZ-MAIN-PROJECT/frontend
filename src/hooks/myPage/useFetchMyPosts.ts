import { useEffect, useState } from 'react';
import { getMyPosts } from '@/apis/authApi';
import { Post } from '@/types/Post';
import { mapToPost } from '@/utils/communityUtils';

export const useFetchMyPosts = (
  type: 'written' | 'liked',
  page: number,
  size: number
) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getMyPosts({ type, page, size });
        setPosts(res.results.map(mapToPost));
        setTotalPages(res.totalPages);
      } catch (err) {
        console.error('내 포스트 조회 실패', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type, page, size]);

  return { posts, totalPages, loading };
};
