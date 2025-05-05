import storage from "./services/storage.service.js";

function renderOrderItem(item) {
  const itemDiv = document.createElement('div');
  itemDiv.className = 'order-item';

  itemDiv.innerHTML = `
        <img src="${item.images}" alt="${item.title}">
        <div class="item-details">
            <h3>${item.title}</h3>
            <p>Кількість: ${item.quantity}</p>
        </div>
        <div class="item-price">${(item.price * item.quantity).toFixed(2)} $</div>
    `;

  return itemDiv;
}

function renderOrderItems() {
  const orderItems = document.getElementById('orderItems');
  const totalAmount = document.getElementById('totalAmount');
  const cartItems = storage.cart.get() || [];

  orderItems.innerHTML = '';
  let total = 0;

  cartItems.forEach(item => {
    const itemElement = renderOrderItem(item);
    orderItems.appendChild(itemElement);
    total += item.price * item.quantity;
  });

  totalAmount.textContent = `${total.toFixed(2)} $`;
}

async function handleSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const cartItems = storage.cart.get() || [];
  const totalAmount = document.getElementById('totalAmount');

  const orderData = {
    customerInfo: {
      name: formData.get('name'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      city: formData.get('city'),
      address: formData.get('address')
    },
    items: cartItems,
    totalAmount: parseFloat(totalAmount.textContent)
  };

  try {
    const response = await fetch('https://dummyjson.com/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderData)
    });

    if (!response.ok) {
      throw new Error('Помилка при відправці замовлення');
    }

    const result = await response.json();
    console.log('Замовлення успішно створено:', result);
    alert('Замовлення успішно оформлено!');

    // Очищуємо кошик та перенаправляємо на головну
    storage.cart.remove('cart');
    window.location.href = '/';

  } catch (error) {
    console.error('Помилка:', error);
    alert('Виникла помилка при оформленні замовлення. Спробуйте пізніше.');
  }
}

function validateForm(event) {
  const form = event.target;
  const phone = form.phone.value;

  // Базова валідація телефону
  const phoneRegex = /^\+?\d{10,13}$/;
  if (!phoneRegex.test(phone)) {
    alert('Будь ласка, введіть коректний номер телефону');
    event.preventDefault();
    return false;
  }

  return true;
}

function initOrderPage() {
  const form = document.getElementById('orderForm');

  // Рендеримо товари з кошика
  renderOrderItems();

  // Додаємо обробники подій
  form.addEventListener('submit', async (event) => {
    if (validateForm(event)) {
      await handleSubmit(event);
    }
  });
}

// Ініціалізуємо сторінку
document.addEventListener('DOMContentLoaded', initOrderPage);