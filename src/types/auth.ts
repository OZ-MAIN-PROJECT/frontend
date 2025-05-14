// 마이페이지 조회 시 가져오는 User 타입
export type User = {
  id: string; // 사용자 uuid
  name: string; // 이름
  nickname: string; // 닉네임
  email: string; // 이메일
  phone: string; // 휴대전화번호
  profileImage?: string;
  role?:string; // 관리자 여부
};

// 로그인 시 가져오는 User 타입
export type SimpleUser = {
  nickname : string;
  role : string;
}