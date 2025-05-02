import { Post } from '../types/Post';

export const dummyPosts: Post[] = [
  {
    id: '1',
    type: 'emotion',
    title: '눈물나던 날, 케이크 하나가 날 살렸어요 (정방형)',
    imageUrl: 'https://picsum.photos/600/',
    content:
      '회의 자리에서 상처되는 말을 들어서 달달한 케이크 사먹고 기분이 좀 풀렸어요. 갑작스러운 충동소비라 아쉽긴하지만 그럼에도 기분은 한결 나아지는 선택이라 만족합니다.',
    createdAt: '2025-04-23T10:00:00',
    updatedAt: '2025-04-23T10:00:00',
    author: {
      id: 'user123',
      nickname: 'User',
    },
    likes: 200,
    comments: 200,
    views: 200,
  },
  {
    id: '2',
    type: 'emotion',
    title: '또 다른 날의 이야기 (직방형)',
    imageUrl: 'https://picsum.photos/600/400',
    content: '비슷한 날이지만 감정은 또 다르더라고요. 글을 남기며 정리해봅니다.',
    createdAt: '2025-04-24T12:00:00',
    updatedAt: '2025-04-24T12:00:00',
    author: {
      id: 'user456',
      nickname: 'AnotherUser',
    },
    likes: 123,
    comments: 50,
    views: 150,
  },
  {
    id: '3',
    type: 'emotion',
    title: '이미지가 없는 경우',
    imageUrl: '',
    content: '이미지 없는 게시글. (이미지 조건 분기 테스트)',
    createdAt: '2025-04-25T09:00:00',
    updatedAt: '2025-04-25T09:00:00',
    author: {
      id: 'user789',
      nickname: 'NoImageUser',
    },
    likes: 33,
    comments: 5,
    views: 77,
  },
];
