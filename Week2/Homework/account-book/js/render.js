import { getExpenseData } from './storage.js';

/* 렌더링 */
export const renderExpenseList = (targetData = getExpenseData()) => {
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
