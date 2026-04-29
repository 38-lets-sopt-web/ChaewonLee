import { getExpenseData, saveExpenseData } from './storage.js';
import { renderExpenseList } from './render.js';

/* 날짜 정렬 로직 */
export const sortData = (sortType) => {
  const currentData = getExpenseData();
  const sortedData = [...currentData].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return sortType === "latest" ? dateB - dateA : dateA - dateB;
  });
  renderExpenseList(sortedData);
};

/* 체크박스 전체 선택/해제 로직 */
export const toggleAllCheckboxes = (isChecked) => {
  const itemCheckboxes = document.querySelectorAll(".item-checkbox");
  itemCheckboxes.forEach((box) => {
    box.checked = isChecked;
  });
};

/* 개별 체크박스 상태에 따른 전체 체크박스 업데이트 */
export const updateMasterCheckbox = () => {
  const checkAll = document.querySelector("#check-all");
  const allItems = document.querySelectorAll(".item-checkbox");
  const checkedItems = document.querySelectorAll(".item-checkbox:checked");
  
  if (checkAll && allItems.length > 0) {
    checkAll.checked = allItems.length === checkedItems.length;
  }
};

/* 선택 삭제 로직 */
export const deleteSelectedItems = () => {
  const checkedBoxes = document.querySelectorAll(".item-checkbox:checked");

  if (checkedBoxes.length === 0) {
    alert("삭제할 항목을 선택해주세요!");
    return;
  }

  if (confirm("선택한 항목을 삭제하시겠습니까?")) {
    const allData = getExpenseData();
    const idsToDelete = Array.from(checkedBoxes).map(box => Number(box.dataset.id));
    const remainData = allData.filter(item => !idsToDelete.includes(item.id));

    saveExpenseData(remainData);
    renderExpenseList();

    const checkAll = document.querySelector("#check-all");
    if (checkAll) checkAll.checked = false;
  }
};