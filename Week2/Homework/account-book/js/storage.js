import { expenses } from './data.js';
import { STORAGE_KEY } from './constant.js'
/* 초기 데이터 저장하기 */
export const initData = () => {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  }
};

/* 데이터 불러오기 */
export const getExpenseData = () => {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  // 기본으로 날짜 내림차순 정렬하기
  return data.sort((a, b) => new Date(b.date) - new Date(a.date));
};

/* 데이터 저장하기 */
export const saveExpenseData = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};
