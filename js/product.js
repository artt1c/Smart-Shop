import ApiService from "./services/api.service.js"
import swiperStructureForImage from "./helpers/swiperStructureForImage.js"
import {updateProductQuantity} from "./utils/fetchDataForHomePage.js";
import {modalAttachEvents} from "./utils/attachEvents.js";

(() => {

  const mainImageSwiper = document.getElementsByClassName('images-gallery__main-image')[0]
  const thumbnailContainer = document.getElementsByClassName('thumbnail-images')[0]
  const titleElement = document.getElementById('product__title')
  const skuElement = document.getElementsByClassName('product__sku')[0]
  const stockElement = document.getElementsByClassName('product__stock')[0]
  const ratingElement = document.getElementsByClassName('product__rating')[0]
  const reviewsCountElement = document.getElementsByClassName('product__reviews-count')[0]

  const priceElement = document.getElementById('product-price')
  const originalPriceElement = document.getElementById('product-original-price')
  const discountElement = document.getElementById('product-discount')
  const addToCartBtn = document.getElementById('add-to-cart-btn')

  // const categoryElement = document.getElementById('product-category')
  // const descriptionElement = document.getElementById('product-description')
  // const brandElement = document.getElementById('product-brand')
  //
  // const weightElement = document.getElementById('product-weight')
  // const dimensionsElement = document.getElementById('product-dimensions')
  // const warrantyElement = document.getElementById('product-warranty')
  // const shippingElement = document.getElementById('product-shipping')
  // const returnPolicyElement = document.getElementById('product-return-policy')
  // const minOrderElement = document.getElementById('product-min-order')
  //
  // const reviewsContainer = document.getElementById('reviews-container')

  const getProductIdFromUrl = () => {
    const params = new URLSearchParams(window.location.search)
    return params.get('id')
  }

  const renderRatingStars = (rating) => {
    const maxRating = 5;
    const starFull = '&#9733;'; // ★
    const starHalf = '&#11240;'; // ⭒ (U+2BE8 LEFT HALF BLACK STAR)
    const starEmpty = '&#9734;'; // ☆

    const roundedRating = Math.round(rating * 2) / 2; // Округлення до найближчих 0.5

    let starsHTML = '';
    const fullStarsCount = Math.floor(roundedRating);
    const hasHalfStar = (roundedRating % 1 !== 0);
    const emptyStarsCount = maxRating - fullStarsCount - (hasHalfStar ? 1 : 0);

    starsHTML += starFull.repeat(fullStarsCount);
    if (hasHalfStar) {
      starsHTML += starHalf;
    }
    starsHTML += starEmpty.repeat(emptyStarsCount);

    return starsHTML;
  }


  const renderProductData = (product) => {
    if (!product) {

      // todo refactor this shit

      document.title = "Товар не знайдено | ОТАК"
      titleElement.textContent = 'Продукт не знайдено'
      document.querySelector('.product__container')?.classList.add('hidden')
      document.querySelector('.product-additional-info')?.classList.add('hidden')
      document.querySelector('.product-reviews')?.classList.add('hidden')
      return
    }

    // PRODUCT IMG BLOCK --------------------------------------------------------

    // MAIN SWIPER
    const {swiperId:mainSwiperId, swiperMainElement} = swiperStructureForImage(product.images)
    mainImageSwiper.appendChild(swiperMainElement)

    if (mainSwiperId) {
      // THUMBS SWIPER
      const {swiperId:swiperThumbsID,swiperMainElement:swiperThumbsElement} = swiperStructureForImage(product.images)
      thumbnailContainer.appendChild(swiperThumbsElement)

      const thumbsSwiper = new Swiper('#'+swiperThumbsID.id, {
        slidesPerView: 3,
        spaceBetween: 10,
        watchSlidesProgress: true,
        navigation: {
          enabled: false,
        }
      })

      new Swiper('#' + mainSwiperId.id, {
        slidesPerView: '1',
        spaceBetween: 0,
        loop: true,
        navigation: {
          nextEl: '#' + mainSwiperId.nextIdBtn,
          prevEl: '#' + mainSwiperId.prevIdBtn,
        },
        thumbs: {
          swiper: thumbsSwiper,
        },
      })
    }


    // PRODUCT INFO BLOCK --------------------------------------------------------

    document.title = `${product.title || 'Назва товару'} | ОТАК`

    titleElement.textContent = product.title || 'Назва товару відсутня'
    skuElement.innerHTML = `
        Код:
        <span>${product.sku || 'Не вказано'}</span>
      `

    stockElement.innerHTML = `
        В наявності:
        <span>${product.stock || '0'}</span>
      `
    if(product.stock) stockElement.classList.add('inStock')

    if (product.rating) {
      ratingElement.innerHTML = renderRatingStars(product.rating);
    } else {
      ratingElement.textContent = 'Рейтинг відсутній';
    }
    reviewsCountElement.innerText = product.reviews.length

    //   categoryElement.textContent = product.category || 'Категорія не вказана'
  //   descriptionElement.textContent = product.description || 'Опис відсутній'
  //
    if (product.price) {
      const discountedPrice = product.price * (1 - (product.discountPercentage || 0) / 100)
      priceElement.textContent = `${discountedPrice.toFixed(2)} $`

      if (product.discountPercentage && product.discountPercentage > 0) {
        originalPriceElement.textContent = `${product.price.toFixed(2)} $`
        discountElement.textContent = `-${product.discountPercentage.toFixed(2)}%`
        originalPriceElement.style.display = 'inline'
        discountElement.style.display = 'inline-block'
      } else {
        originalPriceElement.style.display = 'none'
        discountElement.style.display = 'none'
      }
    } else {
      priceElement.textContent = 'Ціна не вказана'
    }

    addToCartBtn.onclick = async () => {await updateProductQuantity(product.id, (quantity) => quantity + 1)}
  //
  //
  //   brandElement.textContent = product.brand || 'Не вказано'


  //   weightElement.textContent = product.weight ? `${product.weight} kg` : 'Не вказано'
  //   if (product.dimensions) {
  //     dimensionsElement.textContent = `${product.dimensions.width} x ${product.dimensions.height} x ${product.dimensions.depth}`
  //   } else {
  //     dimensionsElement.textContent = 'Не вказано'
  //   }
  //   warrantyElement.textContent = product.warrantyInformation || 'Не вказано'
  //   shippingElement.textContent = product.shippingInformation || 'Не вказано'
  //   returnPolicyElement.textContent = product.returnPolicy || 'Не вказано'
  //   minOrderElement.textContent = product.minimumOrderQuantity || '1'
  //
  //   reviewsContainer.innerHTML = ''
  //   if (product.reviews && product.reviews.length > 0) {
  //     product.reviews.forEach(review => {
  //       const reviewCard = document.createElement('div')
  //       reviewCard.classList.add('review-card')
  //       reviewCard.innerHTML = `
  //                   <p class="reviewer-info">${review.reviewerName || 'Анонім'}</p>
  //                   <p class="review-rating">Рейтинг: ${'&#9733'.repeat(review.rating)}${'&#9734'.repeat(5 - review.rating)}</p>
  //                   <p class="review-comment">${review.comment || 'Без коментаря'}</p>
  //                   <p class="review-date">${new Date(review.date).toLocaleDateString('uk-UA')}</p>
  //               `
  //       reviewsContainer.appendChild(reviewCard)
  //     })
  //   } else {
  //     reviewsContainer.innerHTML = '<p>Відгуків про цей товар ще немає.</p>'
  //   }
  //

  }

  const initPage = async () => {
    const productId = getProductIdFromUrl()
    modalAttachEvents();
    if (productId) {
      try {
        const productData = await ApiService.product.getSingle(productId)


        renderProductData(productData)
      } catch (error) {
        console.error('Failed to load product:', error)
        document.title = "Помилка завантаження | ОТАК"
        titleElement.textContent = 'Не вдалося завантажити дані про продукт.'
        document.querySelector('.product-container')?.classList.add('hidden')
      }
    } else {
      document.title = "ID товару не вказано | ОТАК"
      document.querySelector('.product__main').innerHTML = `
                <h1>Помилка: ID продукту не вказано в URL.</h1>
                <p><a href="index.html">Повернутися на головну</a></p>
            `
    }
  }

  initPage()
})()