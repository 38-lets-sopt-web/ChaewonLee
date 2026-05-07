import { getExpenseData, saveExpenseData } from './storage.js';
import { renderExpenseList } from './render.js';
import { TRANSACTION_TYPE } from './constant.js';

const modal = document.querySelector("#add-modal");
const addForm = document.querySelector("#add-form");

/* 모달 열기 */
export const openModal = () => {
  modal.classList.add("show");
};

/* 모달 닫기 */
export const closeModal = () => {
  modal.classList.remove("show");
  addForm?.reset();
};

/* 데이터 추가 로직 */
export const addNewExpense = () => {
  // 값 가져오기
  const title = document.querySelector("#add-title").value.trim();
  const amount = document.querySelector("#add-amount").value;
  const date = document.querySelector("#add-date").value;
  const category = document.querySelector("#add-category").value;
  const payment = document.querySelector("#add-payment").value;
  const type = document.querySelector('input[name="add-type"]:checked')?.value;

  // 빈 값 체크
  if (!title || !amount || !date || !category || !payment) {
    alert("모든 항목을 입력해주세요!");
    return;
  }

  // 금액 처리 (수입/지출 상수에 따른 부호 결정)
  let finalAmount = Number(amount);
  finalAmount = (type === TRANSACTION_TYPE.EXPENSE) ? -Math.abs(finalAmount) : Math.abs(finalAmount);

  // 새로운 데이터 객체 생성
  const allData = getExpenseData();
  const newData = {
    id: Date.now(),
    title,
    amount: finalAmount,
    date,
    category,
    payment
  };

  // 저장 및 갱신
  allData.push(newData);
  saveExpenseData(allData);
  renderExpenseList();

  // 마무리
  closeModal();
};