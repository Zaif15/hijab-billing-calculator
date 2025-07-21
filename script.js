const productList = {
  "Georgette Hijab": 169,
  "Satin Hijab": 249,
  "Shimmer Georgette Hijab": 229,
  "Modal Hijab": 219,
  "Soft Organza Hijab": 239,
  "Premium Modal Hijab": 229,
  "Viscose Hijab": 199,
  "Round Magnetic Pin": 70,
  "Heart Magnetic Pin": 25,
  "Hijab Cap": 60,
};

const productInput = document.getElementById("product");
const quantityInput = document.getElementById("quantity");
const suggestions = document.getElementById("suggestions");
const billBody = document.getElementById("bill-body");
const grandTotalElement = document.getElementById("grand-total");
let grandTotal = 0;

// Show suggestions
productInput.addEventListener("input", () => {
  const input = productInput.value.toLowerCase();
  suggestions.innerHTML = "";

  if (input.trim() === "") return;

  Object.keys(productList).forEach((product) => {
    if (product.toLowerCase().includes(input)) {
      const div = document.createElement("div");
      div.classList.add("suggestion");
      div.innerText = `${product} - ₹${productList[product]}`;
      div.onclick = () => {
        productInput.value = product;
        suggestions.innerHTML = "";
        quantityInput.focus();
      };
      suggestions.appendChild(div);
    }
  });
});

// Handle Enter key for navigation
productInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    quantityInput.focus();
  }
});

quantityInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    addToBill();
  }
});

// Add to bill
function addToBill() {
  const product = productInput.value.trim();
  const quantity = parseInt(quantityInput.value);

  if (!product || !quantity || !productList[product]) {
    alert("Please select a valid product and quantity.");
    return;
  }

  const unitPrice = productList[product];
  const total = unitPrice * quantity;

  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${product}</td>
    <td>${quantity}</td>
    <td>₹${unitPrice}</td>
    <td>₹${total}</td>
  `;

  billBody.appendChild(row);
  grandTotal += total;
  grandTotalElement.innerText = `Grand Total: ₹${grandTotal}`;

  // Reset
  productInput.value = "";
  quantityInput.value = "";
  productInput.focus();
}
