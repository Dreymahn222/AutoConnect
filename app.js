// Global Cart Badge Update
function updateCartBadge(){
  const cartCount = localStorage.getItem('cartCount') || 0;
  const badge = document.getElementById('cart-badge');
  if(badge) badge.textContent = cartCount > 0 ? cartCount : '';
}

// Example: Adding to cart (simulate)
function addToCart(itemName){
  alert(itemName + ' added to cart (JS placeholder)');
  let cartCount = parseInt(localStorage.getItem('cartCount') || 0);
  cartCount += 1;
  localStorage.setItem('cartCount', cartCount);
  updateCartBadge();
}

// Page-specific JS example
document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
  const page = document.body.dataset.page;

  switch(page){
    case 'search':
      // Initialize search filters (placeholder)
      break;
    case 'mechanic':
      // Initialize mechanic page specific JS
      break;
    case 'dashboard-motorist':
      // Initialize motorist dashboard JS
      break;
    case 'dashboard-mechanic':
      // Initialize mechanic dashboard JS
      break;
    case 'messages':
      // Initialize messaging JS
      break;
    default:
      break;
  }
});