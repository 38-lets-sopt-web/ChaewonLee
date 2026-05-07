import { initData } from './storage.js';
import { renderExpenseList } from './render.js';
import { executeFilter, clearFilter } from './filter.js';
import { openModal, closeModal, addNewExpense } from './modal.js';
import { 
  sortData, 
  deleteSelectedItems, 
  toggleAllCheckboxes, 
  updateMasterCheckbox 
} from './handlers.js';

const init = () => {
  /* 1. 초기 데이터 및 렌더링 */
  initData();
  renderExpenseList();

  /* 2. 필터 관련 이벤트 */
  const filterForm = document.querySelector(".search-filter__form");
  filterForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    executeFilter();
  });
  filterForm?.addEventListener("reset", clearFilter);

  /* 3. 정렬 이벤트 */
  document.querySelector(".account-list__sort")
    ?.addEventListener("change", (e) => sortData(e.target.value));

  /* 4. 삭제 이벤트 */
  document.querySelector(".btn-action--delete")
    ?.addEventListener("click", deleteSelectedItems);

  /* 5. 체크박스 관련 이벤트 */
  document.querySelector("#check-all")
    ?.addEventListener("change", (e) => toggleAllCheckboxes(e.target.checked));

  document.querySelector("#expense-list-body")
    ?.addEventListener("change", (e) => {
      if (e.target.classList.contains("item-checkbox")) updateMasterCheckbox();
    });

  /* 6. 모달 관련 이벤트 */
  // 모달 열기 버튼
  document.querySelector(".btn-action--add")
    ?.addEventListener("click", openModal);

  // 모달 닫기 버튼
  document.querySelector("#modal-close")
    ?.addEventListener("click", closeModal);

  // 데이터 추가 버튼
  document.querySelector("#add-form")
    ?.addEventListener("submit", (e) => {
      e.preventDefault();
      addNewExpense();
    });

  /* 7. 기타 UI 이벤트 */
  document.getElementById("header__icon")
    ?.addEventListener("click", () => location.reload());
};

document.addEventListener("DOMContentLoaded", init);