import { create } from 'zustand';

interface PostStats {
  [postId: string]: {
    views: number;
    comments: number;
  };
}

interface PostStatsState {
  postStats: PostStats;
  incrementView: (postId: string) => void;
  setComments: (postId: string, count: number) => void;
  incrementComment: (postId: string) => void;
  decrementComment: (postId: string, amount?: number) => void;
}

export const usePostStatsStore = create<PostStatsState>(set => ({
  postStats: {},

  incrementView: postId =>
    set(state => {
      const current = state.postStats[postId] || { views: 0, comments: 0 };
      return {
        postStats: {
          ...state.postStats,
          [postId]: {
            ...current,
            views: current.views + 1,
          },
        },
      };
    }),

  setComments: (postId, count) =>
    set(state => {
      const current = state.postStats[postId] || { views: 0, comments: 0 };
      return {
        postStats: {
          ...state.postStats,
          [postId]: {
            ...current,
            comments: count,
          },
        },
      };
    }),

  incrementComment: postId =>
    set(state => {
      const current = state.postStats[postId] || { views: 0, comments: 0 };
      return {
        postStats: {
          ...state.postStats,
          [postId]: {
            ...current,
            comments: current.comments + 1,
          },
        },
      };
    }),

  decrementComment: (postId, amount = 1) =>
    set(state => {
      const current = state.postStats[postId] || { views: 0, comments: 0 };
      return {
        postStats: {
          ...state.postStats,
          [postId]: {
            ...current,
            comments: Math.max(0, current.comments - amount),
          },
        },
      };
    }),
}));
