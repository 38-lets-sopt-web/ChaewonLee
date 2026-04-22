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

/* 렌더링 */
const renderExpenseList = (targetData = getExpenseData()) => {
  const listBody = document.querySelector("#expense-list-body");
  const totalAmountDisplay = document.querySelector("#total-amount");

  if (!listBody) return;

  let total = 0;

  const listHTML = targetData.map((item) => {
    const isIncome = item.amount > 0;
    total += item.amount;

    return `
      <tr class="account-table__row">
        <td><input type="checkbox" class="item-checkbox" data-id="${item.id}"></td>
        <td class="table-title">${item.title}</td>
        <td class="table-amount ${isIncome ? 'income' : 'expense'}">
          ${isIncome ? '+' : ''}${item.amount.toLocaleString()}
        </td>
        <td>${item.date}</td>
        <td>${item.category}</td>
        <td>${item.payment}</td>
      </tr>
    `;
  }).join('');

  listBody.innerHTML = listHTML;

  if (totalAmountDisplay) {
    totalAmountDisplay.textContent = `${total >= 0 ? '+' : ''}${total.toLocaleString()}`;
    totalAmountDisplay.className = `table-amount ${total >= 0 ? 'income' : 'expense'}`;
  }
};

/* 검색 필터 적용 함수 */
const applyFilter = (e) => {
  e.preventDefault(); // 폼 제출 시 페이지 새로고침 방지

  const allData = getExpenseData();
  
  // 필터 입력값 가져오기 
  const titleInput = document.querySelector("#filter-name").value.toLowerCase().trim(); // 공백 제거하기
  const selects = document.querySelectorAll(".search-filter__select");
  
  const typeSelect = selects[0].value;     // 유형
  const categorySelect = selects[1].value; // 카테고리
  const paymentSelect = selects[2].value;  // 결제수단

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

/* 초기화 함수 */
const resetFilter = () => {
  const form = document.querySelector(".search-filter__form");
  form.reset(); // 모든 입력 필드 초기화
  renderExpenseList(); // 전체 데이터 다시 렌더링
};

/* 초기화 및 이벤트 리스너 */
const init = () => {
  initData();
  renderExpenseList();

  // 필터 적용 버튼 이벤트
  const filterForm = document.querySelector(".search-filter__form");
  filterForm.addEventListener("submit", applyFilter);

  // 초기화 버튼 이벤트
  filterForm.addEventListener("reset", resetFilter);

  /* 새로고침 아이콘 이벤트 */
  const icon = document.getElementById("header__icon");
  if (icon) {
    icon.addEventListener("click", () => location.reload());
  }
};

window.onload = init;