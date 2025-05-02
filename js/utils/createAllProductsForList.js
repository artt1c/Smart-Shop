import storage from "../services/storage.service.js";
import initImgSwiper from "../helpers/initImgSwiper.js";
import productInfoToElements from "../helpers/productInfoToElements.js";

let productListPart = 0;

const createAllProductsForList = async () => {

  // VISIBLE PRODUCTS COUNT
  const itemInPart = 30
  productListPart++;

  // FIRST PRODUCTS ON NEW PART
  const productAddingPart = productListPart * itemInPart - itemInPart;

  // GOT LIST ELEMENT
  const allProductsList = document.getElementById('all-products__list');

  // GET DATA FROM STORAGE AND ADD NEW PART OF PRODUCTS TO THE LIST
  const allProductsData = (storage.allProducts.get()).value;
  const newestProductsData = allProductsData.slice(productAddingPart, productAddingPart + itemInPart)

  // BUILD SLIDES
  newestProductsData.forEach(product => {
    const productTemplate = document.createElement('a')
    productTemplate.classList.add('all-products__item', 'products__slide')

    // CREATE PRODUCT INFO ELEMENTS
    const productsInfo = productInfoToElements(product);

    productTemplate.append(
      ...productsInfo.elements
    )
    allProductsList.appendChild(productTemplate)

    // IMAGE SWIPER INIT WHERE SEVERAL IMAGES
    if (productsInfo.swiperId) {
      initImgSwiper(productsInfo.swiperId, productTemplate)
    }
  })

}

export default createAllProductsForList;