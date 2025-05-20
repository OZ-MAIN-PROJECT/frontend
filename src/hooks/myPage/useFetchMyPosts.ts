import { getMyPosts } from '@/apis/authApi';
import { MyPostType } from '@/types/auth';
import { Post } from '@/types/Post';
import { mapToPost } from '@/utils/communityUtils';
import { useEffect, useState } from 'react';

export const useFetchMyPosts = (type: MyPostType) => {
  const [postList, setPostList] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async (type : MyPostType) => {
        try {
          const data = await getMyPosts(type);
          const mapped = data.map(mapToPost);
          setPostList(mapped);
        } catch (err) {
          console.error('게시글 조회 실패', err);
        } finally {
          setLoading(false);
        }
      };
    fetchPosts(type);
  }, [type]);

  return { postList, loading };
};
