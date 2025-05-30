import storage from "./services/storage.service.js";
import {modalAttachEvents} from "./utils/attachEvents.js";
import apiService from "./services/api.service.js";

const renderOrderItem = (item) => {
  const itemLi = document.createElement('li');
  itemLi.className = 'order__item';

  itemLi.innerHTML = `
        <img src="${item.images}" alt="${item.title}">
        <div class="item__details">
            <h4>${item.title}</h4>
            <p>Кількість: ${item.quantity}</p>
        </div>
        <div class="item__price">${item.price.toFixed(2)} $</div>
    `;

  return itemLi;
}

const renderOrderItems = () => {
  const orderItems = document.getElementsByClassName('order__list')[0];
  const totalPriceElement = document.getElementsByClassName('total__amount')[0];
  const totalQuantityElement = document.getElementsByClassName('total__quantity')[0];
  const cartItems = storage.cart.get() || [];

  orderItems.innerHTML = '';
  let totalPrice = 0;
  let totalQuantity = 0;

  cartItems.forEach(item => {
    const itemElement = renderOrderItem(item);
    orderItems.appendChild(itemElement);

    totalPrice += item.price * item.quantity;
    totalQuantity += item.quantity;
  });

  totalPriceElement.textContent = `${totalPrice.toFixed(2)} $`;
  totalQuantityElement.textContent = totalQuantity;
}

const handleSubmit = async (event) => {
  event.preventDefault();
  const cartItems = storage.cart.get() || [];
  console.log(cartItems);

  await apiService.order.postOrder({userId: 1, products: cartItems})
}

const validateForm = (event) => {
  const form = event.target;
  const phone = form.phone.value;

  const phoneRegex = /^\+?\d{10,13}$/;
  if (!phoneRegex.test(phone)) {
    alert('Будь ласка, введіть коректний номер телефону');
    event.preventDefault();
    return false;
  }

  return true;
}

(() => {
  const form = document.getElementById('orderForm');

  modalAttachEvents();
  renderOrderItems();

  document.getElementsByClassName('modal')[0].addEventListener('click', () => {
    renderOrderItems();
  })
  document.getElementById('close-btn').addEventListener('click', () => {
    renderOrderItems();
  })

  form.addEventListener('submit', async (event) => {
    if (validateForm(event)) {
      await handleSubmit(event);
      storage.cart.deleteCart();
    }
  });
})()

