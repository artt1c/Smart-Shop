import storage from "../services/storage.service.js";
import totalPriceInCard from "../helpers/totalPriceInCard.js";
import {handleCartItemUpdate} from "../helpers/handleCartItemUpdate.js";

export const createCartList = () => {

  const cartList = document.getElementsByClassName('cart__list')[0]
  cartList.innerHTML = '';
  const totalPriceElement = document.getElementsByClassName('price-block__total')[0];
  const totalPriceBlock = document.getElementsByClassName('cart__price-block')[0];


  const products = storage.cart.get();
  if (!products) return;

  products.forEach(product => {
    const cartItem = document.createElement('li')
    cartItem.classList.add('cart__item')

    // IMG
    const cartItemImg = document.createElement('img')
    cartItemImg.src = product.images
    cartItemImg.loading = 'lazy'
    cartItemImg.classList.add('item__img')

    // DETAILS
    const cartItemDetails = document.createElement('div')
    cartItemDetails.classList.add('item__details')

    const cartItemTitle = document.createElement('h3')
    cartItemTitle.classList.add('details__title')
    cartItemTitle.innerText = product.title

    cartItemDetails.append(cartItemTitle)

    // ACTIONS
    const cartItemActions = document.createElement('div')
    cartItemActions.classList.add('item__actions')

    const cartItemPrice = document.createElement('span')
    cartItemPrice.classList.add('actions__price')
    cartItemPrice.innerText = (product.price * product.quantity).toFixed(2) + ' $'

    const cartItemQuantityActionsBlock = document.createElement('div')
    cartItemQuantityActionsBlock.classList.add('actions__quantity-actions')

    const cartItemQuantityDecrease = document.createElement('button')
    cartItemQuantityDecrease.classList.add('actions__quantity-decrease')

    // Decrease
    cartItemQuantityDecrease.addEventListener('click', async () => {
      cartItemQuantity.value--
      if (cartItemQuantity.value < 1) cartItem.remove()
      await handleCartItemUpdate(product, cartItemQuantity, cartItemPrice, products, totalPriceElement, totalPriceBlock);
    })

    // cartItemQuantity
    const cartItemQuantity = document.createElement('input')
    cartItemQuantity.classList.add('actions__quantity')
    cartItemQuantity.type = 'number'
    cartItemQuantity.value = product.quantity
    cartItemQuantity.min = '1'

    cartItemQuantity.addEventListener('change', async () => {
      if (cartItemQuantity.value < 1) cartItem.remove()
      await handleCartItemUpdate(product, cartItemQuantity, cartItemPrice, products, totalPriceElement, totalPriceBlock);
    })

    // Increase
    const cartItemQuantityIncrease = document.createElement('button')
    cartItemQuantityIncrease.classList.add('actions__quantity-increase')

    cartItemQuantityIncrease.addEventListener('click', async () => {
      cartItemQuantity.value++
      await handleCartItemUpdate(product, cartItemQuantity, cartItemPrice, products, totalPriceElement, totalPriceBlock);
    })

    // Append elements
    cartItemQuantityActionsBlock.append(cartItemQuantityDecrease, cartItemQuantity, cartItemQuantityIncrease)

    cartItemActions.append(cartItemPrice, cartItemQuantityActionsBlock)

    cartItem.append(cartItemImg, cartItemDetails, cartItemActions)
    cartList.appendChild(cartItem)

  })

  totalPriceElement.innerText = totalPriceInCard(products).toFixed(2);
  totalPriceElement.innerText === '0.00' ? totalPriceBlock.style.display = 'none' : totalPriceBlock.style.display = 'flex';
}