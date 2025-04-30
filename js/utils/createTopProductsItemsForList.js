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

    // PRODUCT BUY CONTROL
    const productControl = document.createElement('div')
    productControl.classList.add('slide__buy-control')

    const scalesBtn = document.createElement('button')
    scalesBtn.classList.add('buy-control__btn-scales')

    const cartBtn = document.createElement('button')
    cartBtn.classList.add('buy-control__btn-cart')

    productControl.append(scalesBtn, cartBtn)
    buyGroup.append(productSlidePrice, productControl)
    

    productSlide.append(
      swiperBlock,
      productSlideTitle,
      feedbackSectionLink,
      buyGroup,
    )
    wrapper.appendChild(productSlide)


    // IMAGE SWIPER INIT
    if (swiperId) {
      const imgSwiper = new Swiper('#' + swiperId.id, {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        // cssMode: true,
        navigation: {
          nextEl: '#' + swiperId.nextIdBtn,
          prevEl: '#' + swiperId.prevIdBtn,
        },
      });

      // CHANGE IMG ON HOVER
      document.getElementById(swiperId.id).addEventListener('mouseenter', () => {
        imgSwiper.slideNext(400, false)
      })

      document.getElementById(swiperId.id).addEventListener('mouseleave', () => {
        imgSwiper.slideTo(0, 400, false)
      })

      //VISIBLE PAGINATION
      const prevBtn = document.getElementById(swiperId.prevIdBtn);
      prevBtn.style.opacity = 0;
      prevBtn.style.pointerEvents = 'none';
      prevBtn.style.transition = 'opacity 0.3s ease-in-out';

      const nextBtn = document.getElementById(swiperId.nextIdBtn);
      nextBtn.style.opacity = 0;
      nextBtn.style.pointerEvents = 'none';
      nextBtn.style.transition = 'opacity 0.3s ease-in-out';

      productSlide.addEventListener('mouseover', () => {
        prevBtn.style.opacity = 1;
        prevBtn.style.pointerEvents = 'auto';
        nextBtn.style.opacity = 1;
        nextBtn.style.pointerEvents = 'auto';
      })
      productSlide.addEventListener('mouseout', () => {
        prevBtn.style.opacity = 0;
        prevBtn.style.pointerEvents = 'none';
        nextBtn.style.opacity = 0;
        nextBtn.style.pointerEvents = 'none';
      })
    }
  })

  // TOP PRODUCT SWIPER INIT
  const topProductSwiper = new Swiper('.top-products__list', {
    slidesPerView: 5,
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