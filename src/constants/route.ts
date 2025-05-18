export const BASE_URL = 'https://sussyoo.kro.kr';

/**
 * @example
 * axios.get(END_POINT.WALLET);
 * axios.get(END_POINT.NOTICE_DETAIL(noticeId));
 * axios.patch(END_POINT.NOTICE_UPDATE(noticeId), body);
 */

export const END_POINT = {
  // wallet : 가계부 관련 api
  WALLET: '/api/wallet', // 가계부
  WALLET_DAILY: '/api/wallet/daily', // 가계부 일별 내역
  WALLET_ENTRIES: '/api/wallet/entries', // 가계부 수입/지출 전체 내역
  WALLET_DETAIL: (walletUuid: string | number) => `/api/wallet/${walletUuid}`, // 가계부 상세 내역 접근
  WALLET_TOTAL: '/api/wallet/total', // 월별 총 수입/지출 조회

  // statistics : 통계 관련 api
  STATISTICS_MONTHLY: '/api/wallet/statistics/monthly',
  STATISTICS_EMOTION: '/api/wallet/statistics/emotion',
  STATISTICS_CATEGORY: '/api/wallet/statistics/category',
  STATISTICS_SUMMARY: '/api/wallet/statistics/summary',

  // users : 회원 관련 api
  USERS_SIGNUP: '/api/users/signup/',
  USERS_DUPLICATE_CHECK: '/api/users/mypage/check-duplicate/',
  USERS_LOGIN: '/api/users/login/',
  USERS_MYPAGE: '/api/users/mypage/',
  USERS_LOGOUT: '/api/users/logout/',
  MYPAGE_POSTS: '/api/mypage/posts/',
  USERS_FIND_PASSWORD: '/api/users/find-password/',
  USERS_CHANGE_PASSWORD: '/api/users/mypage/change-password/',
  TOKEN_REFRESH: '/api/token/refresh/',

  //community : 커뮤니티 관련 api
  COMMUNITY: '/api/community', // 게시글 등록 (POST), 목록 조회 (GET)
  COMMUNITY_LIST: ({ type, page, size }: { type: string; page: number; size: number }) =>
    `/api/community?type=${type}&page=${page}&size=${size}`, // 게시글 목록 조회

  COMMUNITY_DETAIL: (communityUuid: string) => `/api/community/${communityUuid}`, // 상세조회, 수정, 삭제
  COMMUNITY_LIKE: (communityUuid: string) => `/api/community/${communityUuid}/like`, // 좋아요 등록/취소

  // comment : 커뮤니티 댓글 관련 api
  COMMENT: (communityUuid: string) => `/api/community/${communityUuid}/comment`, // 댓글 등록/조회
  COMMENT_DETAIL: (communityUuid: string, commentId: number) => `/api/community/${communityUuid}/comment/${commentId}`, // 댓글 수정/삭제

  // reply : 월요일에 내용 공유 후 추가
};
