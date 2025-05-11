import storage from "../services/storage.service.js";
import ApiService from "../services/api.service.js";
import initImgSwiper from "../helpers/initImgSwiper.js";
import productInfoToElements from "../helpers/productInfoToElements.js";


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
    const productTemplate = document.createElement('div')
    productTemplate.classList.add('swiper-slide', 'products__slide', 'top-products__slide')

    // CREATE PRODUCT INFO ELEMENTS
    const productsInfo = productInfoToElements(product);

    productTemplate.append(
      ...productsInfo.elements
    )
    wrapper.appendChild(productTemplate)


    // IMAGE SWIPER INIT WHERE SEVERAL IMAGES
    if (productsInfo.swiperId) {
      initImgSwiper(productsInfo.swiperId, productTemplate)
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