/**
 * 날짜 형식 통일 함수
 * Date 객체를 `YYYY-MM-DD` 형식의 문자열로 변환
 *
 * @param {Date} date - 변환할 Date 객체
 * @returns {string} `YYYY-MM-DD` 형식의 날짜 문자열
 */
export const formatDate = (value: string | Date): string => {
    const date = new Date(value);
  
    // 유효한 날짜인지 체크
    if (isNaN(date.getTime())) return 'Invalid Date';
  
    return date.toISOString().split('T')[0]; // YYYY-MM-DD 형식
  };
/**
 * 숫자 회계형식 포맷팅 함수
 * @param data - 숫자 값
 * @returns 쉼표가 포함된 문자열 (예: "1,000")
 */
export const formatNumber = (data : number | null | undefined) : string => {
    if (data === null || data === undefined || isNaN(data)) return '0';
    return data.toLocaleString('ko-KR'); 
}
/**
 * 쉼표 포함된 문자열에서 숫자만 추출하여 number로 반환
 * @param data - 사용자 입력 문자열
 * @returns 숫자 (예: "1,000원" → 1000)
 */
export const toNumber = (data : string) : number => {
    const raw = data.replace(/[^0-9]/g, '');
    return Number(raw);
}