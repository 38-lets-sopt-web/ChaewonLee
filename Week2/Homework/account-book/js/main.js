import { initData } from './storage.js';
import { renderExpenseList } from './render.js';
import { applyFilter, resetFilter } from './filter.js';
import { handleCheckboxLogic, handleDelete, handleSort } from './handlers.js';
import { handleAddModal } from './modal.js';

/* 초기화 및 이벤트 연결 */
const init = () => {
  initData();
  renderExpenseList();
  handleCheckboxLogic();
  handleSort();
  handleDelete();
  handleAddModal();

  // 필터 적용 & 초기화 버튼 이벤트
  const filterForm = document.querySelector(".search-filter__form");
  filterForm.addEventListener("submit", applyFilter);
  filterForm.addEventListener("reset", resetFilter);

  // 새로고침 아이콘 이벤트
  const icon = document.getElementById("header__icon");
  if (icon) {
    icon.addEventListener("click", () => location.reload());
  }
};

window.onload = init;
