import createTopProductsItemsForList from "./utils/createTopProductsItemsForSwiper.js";
import fetchDataForHomePage, {addMoreProducts} from "./utils/fetchDataForHomePage.js";
import createAllProductsForList from "./utils/createAllProductsForList.js";


(async function () {
  try {

    await fetchDataForHomePage()

    await createTopProductsItemsForList()

    await createAllProductsForList()

    document.getElementById('footer__more-btn').addEventListener('click', async () => {
      await addMoreProducts()
      await createAllProductsForList()
    })

  } catch (e) {
    console.error(e)
  }
})()
