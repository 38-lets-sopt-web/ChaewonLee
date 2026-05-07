import { getExpenseData } from './storage.js';
import { renderExpenseList } from './render.js';
import { TRANSACTION_TYPE, FILTER_DEFAULT } from './constant.js';

/* 검색 필터 로직 수행 함수 */
export const executeFilter = () => {
  const allData = getExpenseData();

  // 필터 입력값 가져오기
  const titleInput = document.querySelector("#filter-name")?.value.toLowerCase().trim() || "";
  const typeSelect = document.getElementById("filter-type")?.value;
  const categorySelect = document.getElementById("filter-category")?.value;
  const paymentSelect = document.getElementById("filter-payment")?.value;

  // AND를 이용한 필터링
  const filteredData = allData.filter((item) => {
    const matchesTitle = item.title.toLowerCase().includes(titleInput);

    const itemType = item.amount > 0 ? TRANSACTION_TYPE.INCOME : TRANSACTION_TYPE.EXPENSE;
    const matchesType = typeSelect === FILTER_DEFAULT || itemType === typeSelect;

    const matchesCategory = categorySelect === FILTER_DEFAULT || item.category === categorySelect;

    const matchesPayment = paymentSelect === FILTER_DEFAULT || item.payment === paymentSelect;

    return matchesTitle && matchesType && matchesCategory && matchesPayment;
  });

  renderExpenseList(filteredData);
};

/* 필터 초기화 로직 수행 함수 */
export const clearFilter = () => {
  const form = document.querySelector(".search-filter__form");
  if (form) {
    form.reset(); // 모든 입력 필드 초기화
    renderExpenseList(); // 전체 데이터 다시 렌더링
  }
};