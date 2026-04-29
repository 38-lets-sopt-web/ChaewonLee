import { getExpenseData } from './storage.js';
import { renderExpenseList } from './render.js';

/* 검색 필터 적용 함수 */
export const applyFilter = (e) => {
  e.preventDefault(); // 폼 제출 시 페이지 새로고침 방지
  const allData = getExpenseData();

  // 필터 입력값 가져오기
  const titleInput = document.querySelector("#filter-name").value.toLowerCase().trim(); // 공백 제거하기
  const selects = document.querySelectorAll(".search-filter__select");

  const typeSelect = document.getElementById("filter-type").value;
  const categorySelect = document.getElementById("filter-category").value;
  const paymentSelect = document.getElementById("filter-payment").value;

  // AND를 이용한 필터링
  const filteredData = allData.filter((item) => {
    // 제목은 검색어가 포함되어 있는지 검사
    const matchesTitle = item.title.toLowerCase().includes(titleInput);

    // 유형은 전체거나 데이터의 유형이 선택값과 같은지
    const itemType = item.amount > 0 ? "수입" : "지출";
    const matchesType = typeSelect === "전체" || itemType === typeSelect;

    // 카테고리는 전체거나 데이터의 카테고리가 일치하는지
    const matchesCategory = categorySelect === "전체" || item.category === categorySelect;

    // 결제수단은 전체거나 데이터의 결제수단이 일치하는지
    const matchesPayment = paymentSelect === "전체" || item.payment === paymentSelect;

    return matchesTitle && matchesType && matchesCategory && matchesPayment;
  });

  // 필터링된 결과로 다시 그리기
  renderExpenseList(filteredData);
};

/* 필터 초기화 함수 */
export const resetFilter = () => {
  const form = document.querySelector(".search-filter__form");
  form.reset(); // 모든 입력 필드 초기화
  renderExpenseList(); // 전체 데이터 다시 렌더링
};


