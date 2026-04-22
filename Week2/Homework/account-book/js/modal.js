import { getExpenseData, saveExpenseData } from './storage.js';
import { renderExpenseList } from './render.js';

/* 추가 모달 */
export const handleAddModal = () => {
  const addBtn = document.querySelector(".btn-action--add");
  const modal = document.querySelector("#add-modal");
  const closeBtn = document.querySelector("#modal-close");
  const addForm = document.querySelector("#add-form");

  // 모달 열기
  addBtn.addEventListener("click", () => modal.classList.add("show"));

  // 모달 닫기
  closeBtn.addEventListener("click", () => {
    modal.classList.remove("show");
    addForm.reset(); // 입력 내용 초기화
  });

  // 데이터 추가 버튼 클릭 시
  addForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // 값 가져오기
    const title = document.querySelector("#add-title").value.trim();
    const amount = document.querySelector("#add-amount").value;
    const date = document.querySelector("#add-date").value;
    const category = document.querySelector("#add-category").value;
    const payment = document.querySelector("#add-payment").value;

    // 빈 값 체크 - 하나라도 비어있으면 alert 띄우기
    if (!title || !amount || !date || !category || !payment) {
      alert("모든 항목을 입력해주세요!");
      return;
    }

    // 새로운 데이터 객체 생성
    const allData = getExpenseData();
    const newData = {
      id: Date.now(),
      title,
      amount: Number(amount),
      date,
      category,
      payment
    };

    // 데이터 저장 및 업데이트
    allData.push(newData);
    saveExpenseData(allData);

    // 리스트 갱신 -> 모달 닫기 -> 폼 초기화 순서
    renderExpenseList();
    modal.classList.remove("show");
    addForm.reset();
  });
};
