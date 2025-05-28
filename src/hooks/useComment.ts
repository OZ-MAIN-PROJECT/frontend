import { getComments } from '@/apis/communityApi';
import { useQuery } from '@tanstack/react-query';
import { Comment } from '@/types/Post';

export const useFetchComment = (communityUuid: string) => {
  return useQuery<Comment[]>({
    queryKey: ['comments', communityUuid],
    queryFn: () => getComments(communityUuid),
  });
};
