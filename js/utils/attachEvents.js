import {createCartList} from "./createCartList.js";

export const modalAttachEvents = () => {

  const modalBg = document.getElementsByClassName('modal')[0]
  const cartBtn = document.getElementById('cartBtn')
  const cartCloseBtn = document.getElementById('close-btn')
  const modalCard = document.getElementsByClassName('modal__cart')[0]

  cartCloseBtn.addEventListener('click', () => {
    modalBg.classList.add('hidden')
    document.body.style.overflow = '';
  })

  cartBtn.addEventListener('click', () => {
    modalBg.classList.remove('hidden')
    createCartList();
    document.body.style.overflow = 'hidden';
  })

  modalBg.addEventListener('click', () => {
    modalBg.classList.add('hidden')
    document.body.style.overflow = '';
  })

  modalCard.addEventListener('click', (e) => {
    e.stopPropagation();
  })
}