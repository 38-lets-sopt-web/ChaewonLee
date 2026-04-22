import { getExpenseData, saveExpenseData } from './storage.js';
import { renderExpenseList } from './render.js';

/* 날짜 정렬 기능 */
export const handleSort = () => {
  const sortSelect = document.querySelector(".account-list__sort");

  sortSelect.addEventListener("change", (e) => {
    const sortType = e.target.value;
    const currentData = getExpenseData();

    const sortedData = [...currentData].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortType === "latest" ? dateB - dateA : dateA - dateB;
    });

    renderExpenseList(sortedData);
  });
};

/* 전체 체크박스 기능 관리 */
export const handleCheckboxLogic = () => {
  const checkAll = document.querySelector("#check-all"); // 헤더 체크박스

  // 헤더 체크박스 클릭 시 모든 개별 체크박스 체크됨
  checkAll.addEventListener("change", (e) => {
    const isChecked = e.target.checked;
    const itemCheckboxes = document.querySelectorAll(".item-checkbox");
    itemCheckboxes.forEach((box) => {
      box.checked = isChecked;
    });
  });

  // 개별 체크박스 클릭 시 헤더 체크박스 상태 결정
  const listBody = document.querySelector("#expense-list-body");
  listBody.addEventListener("change", (e) => {
    if (e.target.classList.contains("item-checkbox")) {
      const allItems = document.querySelectorAll(".item-checkbox");
      const checkedItems = document.querySelectorAll(".item-checkbox:checked");

      // 모든 항목이 체크되어 있으면 헤더도 체크, 하나라도 아니면 해제
      checkAll.checked = allItems.length === checkedItems.length;
    }
  });
};

/* 선택 삭제 기능 */
export const handleDelete = () => {
  const deleteBtn = document.querySelector(".btn-action--delete");

  deleteBtn.addEventListener("click", () => {
    const checkedBoxes = document.querySelectorAll(".item-checkbox:checked");

    if (checkedBoxes.length === 0) {
      alert("삭제할 항목을 선택해주세요!");
      return;
    }

    if (confirm("선택한 항목을 삭제하시겠습니까?")) {
      const allData = getExpenseData();

      // 체크된 체크박스의 data-id 값들을 가져옴
      const idsToDelete = Array.from(checkedBoxes).map(box => Number(box.dataset.id));

      // 삭제할 ID를 제외한 나머지 데이터만 필터링
      const remainData = allData.filter(item => !idsToDelete.includes(item.id));

      // localStorage 업데이트 및 화면 다시 그리기
      saveExpenseData(remainData);
      renderExpenseList();

      // 전체 선택 체크박스 해제
      const checkAll = document.querySelector("#check-all");
      if (checkAll) checkAll.checked = false;
    }
  });
};
