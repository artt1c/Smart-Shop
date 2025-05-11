import ApiService from "./services/api.service.js";
import { modalAttachEvents } from "./utils/attachEvents.js";
import searchInit from "./utils/search.js";
import productInfoToElements from "./helpers/productInfoToElements.js";
import initImgSwiper from "./helpers/initImgSwiper.js";

const getCategoryNameFromUrl = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get('category');
}

const renderProducts = (products, categoryName) => {
  const productsContainer = document.getElementById('products-container');
  const categoryTitleElement = document.getElementById('category-title');

  if (categoryName) {
    const displayName = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
    if (categoryTitleElement) categoryTitleElement.textContent = `Товари з категорії: ${displayName}`;
  } else {
    if (categoryTitleElement) categoryTitleElement.textContent = 'Продукти Категорії';
  }

  if (!productsContainer) {
    console.error('Елемент products-container не знайдено!');
    return;
  }

  productsContainer.innerHTML = '';

  if (!products || products.length === 0) {
    productsContainer.innerHTML = '<p class="products__empty-message">У цій категорії товари відсутні.</p>';
    return;
  }

  products.forEach(product => {
    const productTemplate = document.createElement('div')
    productTemplate.classList.add('products__item')

    // CREATE PRODUCT INFO ELEMENTS
    const productsInfo = productInfoToElements(product);

    productTemplate.append(
      ...productsInfo.elements
    )
    productsContainer.appendChild(productTemplate)

    // IMAGE SWIPER INIT WHERE SEVERAL IMAGES
    if (productsInfo.swiperId) {
      initImgSwiper(productsInfo.swiperId, productTemplate)
    }
  })
}

(async () => {
  const categoryName = getCategoryNameFromUrl();
  const categoryTitleElement = document.getElementById('category-title');

  modalAttachEvents();
  searchInit();

  if (!categoryName) {
    console.error('Назву категорії не знайдено в URL!');
    if (categoryTitleElement) categoryTitleElement.textContent = 'Категорію не вказано';
    renderProducts([], null);
    return;
  }

  document.title = `ОТАК | ${categoryName}`

  try {
    const categoryData = await ApiService.categories.getCategory(categoryName);
    const products = categoryData && categoryData.products ? categoryData.products : [];

    renderProducts(products, categoryName);
  } catch (error) {
    console.error('Не вдалося завантажити продукти:', error);
    if (categoryTitleElement) categoryTitleElement.textContent = `Помилка завантаження товарів для категорії: ${categoryName}`;
    renderProducts([], categoryName);
  }
})()