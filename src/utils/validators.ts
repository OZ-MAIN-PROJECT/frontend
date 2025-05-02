// 유효성 검사 함수

// 이메일 형식 검사
export const isValidEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// 비밀번호 형식 검사 (영문 + 숫자 + 대문자 + 특수문자 + 8자 이상)
export const isValidPassword = (password: string): boolean => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?]).{8,}$/;
  return regex.test(password);
};
