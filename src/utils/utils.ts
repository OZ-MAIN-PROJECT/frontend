//날짜 형식 통일 함수
export const formatDate = (date: Date) => date.toISOString().split("T")[0];