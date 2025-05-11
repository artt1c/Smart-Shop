import ApiService from "./services/api.service.js";
import swiperStructureForImage from "./helpers/swiperStructureForImage.js";

(() => {

  const mainImageSwiper = document.getElementsByClassName('images-gallery__main-image')[0];
  const thumbnailContainer = document.getElementsByClassName('thumbnail-images')[0];

  const titleElement = document.getElementById('product-title');
  // const categoryElement = document.getElementById('product-category');
  // const descriptionElement = document.getElementById('product-description');
  // const priceElement = document.getElementById('product-price');
  // const originalPriceElement = document.getElementById('product-original-price');
  // const discountElement = document.getElementById('product-discount');
  // const ratingElement = document.getElementById('product-rating');
  // const stockElement = document.getElementById('product-stock');
  // const availabilityElement = document.getElementById('product-availability');
  // const brandElement = document.getElementById('product-brand');
  // const skuElement = document.getElementById('product-sku');
  // const addToCartBtn = document.getElementById('add-to-cart-btn');
  //
  // const weightElement = document.getElementById('product-weight');
  // const dimensionsElement = document.getElementById('product-dimensions');
  // const warrantyElement = document.getElementById('product-warranty');
  // const shippingElement = document.getElementById('product-shipping');
  // const returnPolicyElement = document.getElementById('product-return-policy');
  // const minOrderElement = document.getElementById('product-min-order');
  //
  // const reviewsContainer = document.getElementById('reviews-container');

  const getProductIdFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
  };

  const displayProductData = (product) => {
  //   if (!product) {
  //     document.title = "Товар не знайдено | ОТАК";
  //     titleElement.textContent = 'Продукт не знайдено';
  //     document.querySelector('.product-container')?.classList.add('hidden');
  //     document.querySelector('.product-additional-info')?.classList.add('hidden');
  //     document.querySelector('.product-reviews')?.classList.add('hidden');
  //     return;
  //   }
  //
  //   document.title = `${product.title || 'Назва товару'} | ОТАК`;
  //
  //   titleElement.textContent = product.title || 'Назва товару відсутня';
  //   categoryElement.textContent = product.category || 'Категорія не вказана';
  //   descriptionElement.textContent = product.description || 'Опис відсутній';
  //
  //   if (product.price) {
  //     const discountedPrice = product.price * (1 - (product.discountPercentage || 0) / 100);
  //     priceElement.textContent = `${discountedPrice.toFixed(2)} $`;
  //
  //     if (product.discountPercentage && product.discountPercentage > 0) {
  //       originalPriceElement.textContent = `${product.price.toFixed(2)} $`;
  //       discountElement.textContent = `-${product.discountPercentage.toFixed(2)}%`;
  //       originalPriceElement.style.display = 'inline';
  //       discountElement.style.display = 'inline-block';
  //     } else {
  //       originalPriceElement.style.display = 'none';
  //       discountElement.style.display = 'none';
  //     }
  //   } else {
  //     priceElement.textContent = 'Ціна не вказана';
  //   }
  //
  //   ratingElement.textContent = product.rating ? `${product.rating} / 5` : 'Немає рейтингу';
  //   stockElement.textContent = product.stock || '0';
  //   availabilityElement.textContent = product.availabilityStatus || 'Невідомо';
  //   availabilityElement.className = `product-availability-status ${product.availabilityStatus?.replace(/\s+/g, '-') || ''}`;
  //
  //   brandElement.textContent = product.brand || 'Не вказано';
  //   skuElement.textContent = product.sku || 'Не вказано';


    // ================================

    // THUMBS SWIPER

    // MAIN SWIPER
    const {swiperId:mainSwiperId, swiperMainElement} = swiperStructureForImage(product.images);
    mainImageSwiper.appendChild(swiperMainElement)

    if (mainSwiperId) {
      const {swiperId:swiperThumbsID,swiperMainElement:swiperThumbsElement} = swiperStructureForImage(product.images);
      thumbnailContainer.appendChild(swiperThumbsElement)

      const thumbsSwiper = new Swiper('#'+swiperThumbsID.id, {
        slidesPerView: 3,
        spaceBetween: 10,
        watchSlidesProgress: true,
        navigation: {
          enabled: false,
        }
      });

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
      });
    }


  //   weightElement.textContent = product.weight ? `${product.weight} kg` : 'Не вказано';
  //   if (product.dimensions) {
  //     dimensionsElement.textContent = `${product.dimensions.width} x ${product.dimensions.height} x ${product.dimensions.depth}`;
  //   } else {
  //     dimensionsElement.textContent = 'Не вказано';
  //   }
  //   warrantyElement.textContent = product.warrantyInformation || 'Не вказано';
  //   shippingElement.textContent = product.shippingInformation || 'Не вказано';
  //   returnPolicyElement.textContent = product.returnPolicy || 'Не вказано';
  //   minOrderElement.textContent = product.minimumOrderQuantity || '1';
  //
  //   reviewsContainer.innerHTML = '';
  //   if (product.reviews && product.reviews.length > 0) {
  //     product.reviews.forEach(review => {
  //       const reviewCard = document.createElement('div');
  //       reviewCard.classList.add('review-card');
  //       reviewCard.innerHTML = `
  //                   <p class="reviewer-info">${review.reviewerName || 'Анонім'}</p>
  //                   <p class="review-rating">Рейтинг: ${'&#9733;'.repeat(review.rating)}${'&#9734;'.repeat(5 - review.rating)}</p>
  //                   <p class="review-comment">${review.comment || 'Без коментаря'}</p>
  //                   <p class="review-date">${new Date(review.date).toLocaleDateString('uk-UA')}</p>
  //               `;
  //       reviewsContainer.appendChild(reviewCard);
  //     });
  //   } else {
  //     reviewsContainer.innerHTML = '<p>Відгуків про цей товар ще немає.</p>';
  //   }
  //
  //   addToCartBtn.addEventListener('click', () => {
  //     console.log(`Додано в кошик: ${product.title}, ID: ${product.id}`);
  //     // Ваша логіка додавання в кошик
  //   });
  };

  const initPage = async () => {
    const productId = getProductIdFromUrl();
    if (productId) {
      try {
        const productData = await ApiService.product.getSingle(productId);
        displayProductData(productData);
      } catch (error) {
        console.error('Failed to load product:', error);
        document.title = "Помилка завантаження | ОТАК";
        titleElement.textContent = 'Не вдалося завантажити дані про продукт.';
        document.querySelector('.product-container')?.classList.add('hidden');
      }
    } else {
      document.title = "ID товару не вказано | ОТАК";
      document.querySelector('.product__main').innerHTML = `
                <h1>Помилка: ID продукту не вказано в URL.</h1>
                <p><a href="index.html">Повернутися на головну</a></p>
            `;
    }
  };

  initPage();
})()