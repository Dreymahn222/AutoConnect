// =========================
// MOBILE MENU TOGGLE
// =========================
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if(menuToggle){
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });
}

// =========================
// CART MANAGEMENT WITH LOCALSTORAGE
// =========================
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Add item to cart
function addToCart(itemName, price){
  cart.push({name: itemName, price: price});
  saveCart();
  updateCartBadge();
  alert(`${itemName} added to cart!`);
}

// Save cart to localStorage
function saveCart(){
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Update cart badge
function updateCartBadge(){
  const cartBadge = document.getElementById('cart-badge');
  if(cartBadge){
    cartBadge.textContent = cart.length > 0 ? cart.length : '';
  }
}

// Remove item from cart by index
function removeFromCart(index){
  if(index >= 0 && index < cart.length){
    const removed = cart.splice(index, 1);
    saveCart();
    updateCartBadge();
    alert(`${removed[0].name} removed from cart`);
    renderCartItems();
    renderCheckoutItems();
  }
}

// =========================
// RENDER CART ITEMS ON CART PAGE
// =========================
function renderCartItems(){
  const cartContainer = document.querySelector('.container .card');
  if(!cartContainer) return;

  cartContainer.innerHTML = '<h2>Your Cart</h2>';

  if(cart.length === 0){
    cartContainer.innerHTML += '<p>Your cart is empty.</p>';
    return;
  }

  cart.forEach((item, index) => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('cart-item', 'center');
    itemDiv.innerHTML = `
      <div>${item.name}</div>
      <div>Price: $${item.price}</div>
      <button class="btn" onclick="removeFromCart(${index})">Remove</button>
    `;
    cartContainer.appendChild(itemDiv);
  });

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const totalDiv = document.createElement('p');
  totalDiv.innerHTML = `<strong>Total: $${total}</strong>`;
  cartContainer.appendChild(totalDiv);

  const checkoutBtn = document.createElement('button');
  checkoutBtn.classList.add('btn');
  checkoutBtn.textContent = 'Proceed to Checkout';
  checkoutBtn.onclick = () => { window.location.href = 'checkout.html'; };
  cartContainer.appendChild(checkoutBtn);
}

// =========================
// RENDER CHECKOUT PAGE ITEMS
// =========================
function renderCheckoutItems(){
  const container = document.getElementById('checkout-items');
  if(!container) return;

  container.innerHTML = '';
  if(cart.length === 0){
    container.innerHTML = '<p>Your cart is empty.</p>';
    return;
  }

  cart.forEach((item) => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('cart-item', 'center');
    itemDiv.innerHTML = `
      <div>${item.name}</div>
      <div>Price: $${item.price}</div>
    `;
    container.appendChild(itemDiv);
  });

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const totalDiv = document.createElement('p');
  totalDiv.innerHTML = `<strong>Total: $${total}</strong>`;
  container.appendChild(totalDiv);
}

// Checkout place order
const placeOrderBtn = document.getElementById('place-order-btn');
if(placeOrderBtn){
  placeOrderBtn.addEventListener('click', () => {
    if(cart.length === 0){
      alert('Your cart is empty!');
      return;
    }
    const name = document.getElementById('name').value.trim();
    const address = document.getElementById('address').value.trim();
    if(!name || !address){
      alert('Please fill in your name and address!');
      return;
    }
    alert(`Thank you ${name}! Your order totaling $${cart.reduce((sum, i) => sum + i.price, 0)} has been placed.`);
    cart = [];
    saveCart();
    updateCartBadge();
    renderCartItems();
    renderCheckoutItems();
  });
}

// =========================
// MESSAGES PAGE FUNCTIONALITY
// =========================
function sendMessage(){
  const input = document.querySelector('.messages-container + .form-group input');
  if(input && input.value.trim() !== ''){
    const container = document.querySelector('.messages-container');
    const newMsg = document.createElement('div');
    newMsg.classList.add('message', 'sender');
    newMsg.textContent = input.value;
    container.appendChild(newMsg);
    input.value = '';
    container.scrollTop = container.scrollHeight;
  }
}

const sendBtn = document.querySelector('.form-group .btn');
if(sendBtn){
  sendBtn.addEventListener('click', sendMessage);
}

// =========================
// VIEW BOOKINGS / PARTS PLACEHOLDERS
// =========================
function viewBooking(id){
  alert(`View booking ${id}`);
}

function viewPart(id){
  alert(`View part ${id}`);
}

// =========================
// SEARCH FUNCTIONALITY
// =========================
const searchInput = document.getElementById('search-input');
const searchResults = document.querySelectorAll('.search-result-item');

if(searchInput){
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    searchResults.forEach(item => {
      const name = item.querySelector('p').textContent.toLowerCase();
      if(name.includes(query)){
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
}

// =========================
// INITIALIZE
// =========================
updateCartBadge();
renderCartItems();
renderCheckoutItems();