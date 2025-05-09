import ApiService from "../services/api.service.js";

const searchInit = () => {
  const searchElement = document.getElementsByClassName('header__search')[0]
  const searchForm = document.forms['search'];
  const searchResponse = document.getElementsByClassName('search__response')[0];
  const searchResponseList = document.getElementsByClassName('search__response-list')[0];
  const nothingFound = document.getElementsByClassName('response__not-found')[0];

  searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    searchResponse.classList.remove('hidden');

    if (!searchForm.elements.searchParams.value) return;
    const response = await ApiService.search.getSearch(searchForm.elements.searchParams.value)

    if (!response.products.length) {
      nothingFound.classList.remove('hidden');
      searchResponseList.innerHTML = '';
    } else {
      nothingFound.classList.add('hidden');
      searchResponseList.innerHTML = '';
      response.products.forEach(product => {
        const productTemplate = document.createElement('a')
        productTemplate.classList.add('search__response-item')
        productTemplate.href = `product.html?id=${product.id}`
        productTemplate.innerHTML = `
          <div class="search__response-item-img">
            <img src="${product.images[0]}" alt="${product.title}">
          </div>
          <div class="search__response-item-details">
            <h3 class="search__response-item-title">${product.title}</h3>
            <p class="search__response-item-price">${product.price} $</p>
          </div>
        `

        searchResponseList.appendChild(productTemplate)
      })
    }
  })
    searchElement.addEventListener('mouseleave', () => {
      searchResponse.classList.add('hidden');
      nothingFound.classList.remove('hidden');
      searchResponseList.innerHTML = '';
    })
}

export default searchInit;