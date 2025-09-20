document.addEventListener("DOMContentLoaded", () => {
  const orderSummary = document.getElementById("order-summary");
  const cartData = JSON.parse(localStorage.getItem("cartData"));

  if (cartData.length === 0) {
    orderSummary.innerHTML = "Your cart is empty!!!";
    return;
  }

  let totalPrice = 0;
  let totalItems = 0;

  const listItems = cartData
    .map((item) => {
      const itemTotal = item.price * item.quantity;
      totalPrice += itemTotal;
      totalItems += item.quantity;

      return `
            <li class="list-group-item">${item.itemName} * ${item.quantity} = 
            <span>Rs. ${itemTotal.toFixed(2)}</span>
            </li>
        `;
    })
    .join("");

  orderSummary.innerHTML = `
        <ul class="list-group">
        ${listItems}
        </ul>
        <div id="summary-total">
            <span id="summary-total-items">Total Items: ${totalItems}</span>
            <span id="summary-total-price">Total Price: Rs. ${totalPrice.toFixed(2)}</span>
        </div>
    `;

    // ============= PAY BUTTON =================
    const payNowButton = document.getElementById("payButton");
    payNowButton.addEventListener("click", () => {
        window.location.href = "payment.html";
    });
});
