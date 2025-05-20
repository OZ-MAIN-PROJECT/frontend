export const BASE_URL = import.meta.env.VITE_API_URL

/**
 * @example
 * axios.get(END_POINT.WALLET);
 * axios.get(END_POINT.NOTICE_DETAIL(noticeId));
 * axios.patch(END_POINT.NOTICE_UPDATE(noticeId), body);
 */

export const END_POINT = {
  // wallet : 가계부 관련 api
  WALLET: '/api/wallet/', // 가계부
  WALLET_DAILY: '/api/wallet/daily/', // 가계부 일별 내역
  WALLET_ENTRIES: '/api/wallet/entries', // 가계부 수입/지출 전체 내역
  WALLET_DETAIL: (walletUuid: string | number) => `/api/wallet/${walletUuid}`, // 가계부 상세 내역 접근
  WALLET_TOTAL: '/api/wallet/total', // 월별 총 수입/지출 조회

  // statistics : 통계 관련 api
  STATISTICS_MONTHLY: '/api/wallet/statistics/monthly/',
  STATISTICS_EMOTION: '/api/wallet/statistics/emotion/',
  STATISTICS_CATEGORY: '/api/wallet/statistics/category/',

  // users : 회원 관련 api
  USERS_SIGNUP: '/api/users/signup/',
  USERS_DUPLICATE_CHECK: '/api/users/mypage/check-duplicate/',
  USERS_LOGIN: '/api/users/login/',
  USERS_MYPAGE: '/api/users/mypage/',
  USERS_LOGOUT: '/api/users/logout/',
  MYPAGE_POSTS: '/api/mypage/posts/',
  USERS_FIND_PASSWORD: '/api/users/find-password/',
  USERS_CHANGE_PASSWORD : '/api/users/mypage/change-password/',
  USERS_RESET_PASSWORD : '/api/users/reset-password/',
  TOKEN_REFRESH : '/api/token/refresh/',

  // community : 커뮤니티 관련 api
  COMMUNITY: '/api/community/',
  COMMUNITY_LIST: ({ type, page, size }: { type: string; page: number; size: number }) =>
    `/api/community?type=${type}&page=${page}&size=${size}`,
  COMMUNITY_DETAIL: (communityUuid: string) => `/api/community/${communityUuid}/`,
  COMMUNITY_LIKE: (communityUuid: string) => `/api/community/${communityUuid}/like`,

  // comment : 커뮤니티 댓글 관련 api
  COMMENT: (communityUuid: string) => `/api/community/${communityUuid}/comment/`,
  COMMENT_DETAIL: (communityUuid: string, commentId: number) => `/api/community/${communityUuid}/comment/${commentId}/`,
};
