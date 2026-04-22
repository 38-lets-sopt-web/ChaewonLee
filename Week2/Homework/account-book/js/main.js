import { expenses } from './data.js';

/* 초기 데이터 저장하기 */
const initData = () => {
  if (!localStorage.getItem("expenseData")) {
    localStorage.setItem("expenseData", JSON.stringify(expenses));
  }
};

/* 데이터 불러오기 */
const getExpenseData = () => {
  return JSON.parse(localStorage.getItem("expenseData")) || [];
};

/* 헤더 아이콘 클릭 시 새로고침 */
const icon = document.getElementById("header__icon");

icon.addEventListener("click", () => {
  location.reload();
});