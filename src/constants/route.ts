
export const BASE_URL = 'https://sussyoo.kro.kr';

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
  USERS_DUPLICATE_CHECK : '/api/users/mypage/check-duplicate/',
  USERS_LOGIN: '/api/users/login/',
  USERS_MYPAGE: '/api/users/mypage/',
  USERS_LOGOUT: '/api/users/logout/',
  MYPAGE_POSTS: '/api/mypage/posts/',
  USERS_FIND_PASSWORD: '/api/users/find-password/',
  USERS_CHANGE_PASSWORD : '/api/users/mypage/change-password/',
  USERS_RESET_PASSWORD : '/api/users/reset-password/',
  TOKEN_REFRESH : '/api/token/refresh/',

  // notice : 공지사항 관련 api
  NOTICE: '/notice', // 공지사항 목록 조회
  NOTICE_CREATE: '/notice/create', // 공지사항 등록 (관리자만 가능)
  NOTICE_DETAIL: (noticeId: string | number) => `/notice/${noticeId}`, // 공지사항 상세 조회
  NOTICE_UPDATE: (noticeId: string | number) => `/notice/${noticeId}/update`,    // 공지사항 수정
  NOTICE_DELETE: (noticeId: string | number) => `/notice/${noticeId}/delete`,    // 공지사항 삭제
  NOTICE_LIKE: (noticeId: string | number) => `/notice/${noticeId}/like`,    // 공지사항 좋아요 관리

  //community : 커뮤니티 관련 api
  COMMUNITY : '/community', // 커뮤니티 게시글 등록
  COMMUNITY_LIST: (type: 'INFORMATION' | 'QNA') => `/community?type=${type}`,  // 커뮤니티 게시글 목록 조회 (정보 공유, 질문게시판)
  COMMUNITY_DETAIL : (communityId: string | number) => `/community/${communityId}`, // 커뮤니티 개별 게시글 조회/수정/삭제
  COMMUNITY_LIKE : (communityId: string | number) => `/community/${communityId}/like`,   // 게시글 좋아요 등록/취소

  // comment : 커뮤니티 댓글 관련 api
  COMMENT : (communityId: string | number) => `/community/${communityId}/comment`, // 댓글 등록/조회
  COMMENT_DETAIL : (commentId: string | number) => `/community/comment/${commentId}`, // 개별 댓글 수정/삭제
  COMMENT_LIKE :  (commentId: string | number) => `/community/comment/${commentId}/like`, // 개별 댓글 수정/삭제

  // reply : 월요일에 내용 공유 후 추가
};
