import storage from "../services/storage.service.js";
import ApiService from "../services/api.service.js";
import swiperStructureForImage from "../helpers/swiperStructureForImage.js";


const createProductsItemsForList = async () => {
  const wrapper = document.getElementById('top-products-wrapper');

  // GET FROM STORAGE
  const topProducts = storage.topProducts.get();
  if (!topProducts) {
    const topProducts = await ApiService.product.getTopProductByRating();
    storage.topProducts.set(topProducts.products)
  }

  // BUILD SLIDES
  topProducts.forEach(product => {
    const productSlide = document.createElement('a')
    productSlide.classList.add('swiper-slide', 'top-products__slide')

    // IMG BLOCK
    const {swiperId, swiperMainElement:swiperBlock} = swiperStructureForImage(product.images);

    // TITLE
    const productSlideTitle = document.createElement('h4')
    productSlideTitle.textContent = product.title

    // RATING
    const productSlideRating = document.createElement('p')
    productSlideRating.textContent = product.rating

    // REVIEWS
    const productSlideReviews = document.createElement('p')
    productSlideReviews.textContent = product.reviews.length

    // PRICE
    const productSlidePrice = document.createElement('p')
    productSlidePrice.textContent = product.price + ' $'
    

    productSlide.append(
      swiperBlock,
      productSlideTitle,
      productSlideRating,
      productSlideReviews,
      productSlidePrice
    )
    wrapper.appendChild(productSlide)


    // IMAGE SWIPER INIT
    if (swiperId) {
      new Swiper('#' + swiperId.id, {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        // cssMode: true,
        navigation: {
          nextEl: '#' + swiperId.nextIdBtn,
          prevEl: '#' + swiperId.prevIdBtn,
        },
      })
    }
  })

  // TOP PRODUCT SWIPER INIT
  const topProductSwiper = new Swiper('.top-products__list', {
    slidesPerView: 4,
    spaceBetween: 0,
    allowTouchMove: false,
    loop: true,
    // cssMode: true,
    autoplay: {
      delay: 5000,
    },
    navigation: {
      nextEl: '.top-products__pag-next',
      prevEl: '.top-products__pag-prev',
    },
  });

  document.getElementById('top-products-wrapper').addEventListener('mouseout', () => {
    topProductSwiper.autoplay.start();
  })
  document.getElementById('top-products-wrapper').addEventListener('mouseover', () => {
    topProductSwiper.autoplay.stop();
  })
}

export default createProductsItemsForList;