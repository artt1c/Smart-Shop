import storage from "../services/storage.service.js";
import {updateProductQuantity} from "./fetchDataForHomePage.js";

export const createCartList = () => {

  const cartList = document.getElementsByClassName('cart__list')[0]
  cartList.innerHTML = '';

  const products = storage.cart.get();
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
    cartItemQuantityDecrease.innerText = '-'
    cartItemQuantityDecrease.addEventListener('click', async () => {

      cartItemQuantity.value--
      if (cartItemQuantity.value < 1) cartItem.remove()

      cartItemPrice.innerText = (product.price * cartItemQuantity.value).toFixed(2) + ' $'
      await updateProductQuantity(product.id, () => cartItemQuantity.value)
    })

    const cartItemQuantity = document.createElement('input')
    cartItemQuantity.classList.add('actions__quantity')
    cartItemQuantity.type = 'number'
    cartItemQuantity.value = product.quantity
    cartItemQuantity.min = '1'
    cartItemQuantity.addEventListener('change', async () => {

      if (cartItemQuantity.value < 1) cartItem.remove()

      cartItemPrice.innerText = (product.price * cartItemQuantity.value).toFixed(2) + ' $'
      await updateProductQuantity(product.id, () => cartItemQuantity.value)
    })


    const cartItemQuantityIncrease = document.createElement('button')
    cartItemQuantityIncrease.classList.add('actions__quantity-increase')
    cartItemQuantityIncrease.innerText = '+'
    cartItemQuantityIncrease.addEventListener('click', async () => {
      cartItemQuantity.value++
      cartItemPrice.innerText = (product.price * cartItemQuantity.value).toFixed(2) + ' $'
      await updateProductQuantity(product.id, () => cartItemQuantity.value)
    })

    cartItemQuantityActionsBlock.append(cartItemQuantityDecrease, cartItemQuantity, cartItemQuantityIncrease)

    cartItemActions.append(cartItemPrice, cartItemQuantityActionsBlock)

    cartItem.append(cartItemImg, cartItemDetails, cartItemActions)
    cartList.appendChild(cartItem)
  })

}