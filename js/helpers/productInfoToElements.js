import swiperStructureForImage from "./swiperStructureForImage.js";
import {updateProductQuantity} from "../utils/fetchDataForHomePage.js";

const productInfoToElements = (product) => {
  // IMG BLOCK
  const {swiperId, swiperMainElement:swiperBlock} = swiperStructureForImage(product.images);

  // TITLE
  const productSlideTitle = document.createElement('h4')
  productSlideTitle.textContent = product.title

  // FEEDBACK SECTION
  const feedbackSectionLink = document.createElement('a')
  feedbackSectionLink.href = '#';
  feedbackSectionLink.classList.add('slide__feedback-link')

  const feedbackSection = document.createElement('div')
  feedbackSection.classList.add('slide__feedback')

  // RATING
  const productSlideRating = document.createElement('p')
  productSlideRating.textContent = product.rating
  productSlideRating.classList.add('slide__rating')

  // REVIEWS
  const productSlideReviews = document.createElement('p')
  productSlideReviews.textContent = product.reviews.length
  productSlideReviews.classList.add('slide__reviews')

  feedbackSection.append(productSlideRating, productSlideReviews)
  feedbackSectionLink.appendChild(feedbackSection)

  // BUY GROUP
  const buyGroup = document.createElement('div')
  buyGroup.classList.add('slide__buy-group')

  // PRICE
  const productSlidePrice = document.createElement('p')
  productSlidePrice.textContent = product.price
  productSlidePrice.classList.add('slide__price')
  productSlidePrice.innerHTML += '<span class="price-currency">$</span>'

  // CART BUTTON
  const cartBtn = document.createElement('button')
  cartBtn.classList.add('buy-control__btn-cart')
  cartBtn.onclick = async () => {await updateProductQuantity(product.id, (quantity) => quantity + 1)}

  buyGroup.append(productSlidePrice, cartBtn)

  return {
    swiperId,
    elements: [swiperBlock, productSlideTitle, feedbackSectionLink, buyGroup]
  }
}

export default productInfoToElements;