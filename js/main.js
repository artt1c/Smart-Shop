import createTopProductsItemsForList from "./utils/createTopProductsItemsForSwiper.js";
import fetchDataForHomePage, {addMoreProducts} from "./utils/fetchDataForHomePage.js";
import createAllProductsForList from "./utils/createAllProductsForList.js";
import {modalAttachEvents} from "./utils/attachEvents.js";
import searchInit from "./utils/search.js";


(async function () {
  try {

    await fetchDataForHomePage()

    await createTopProductsItemsForList()

    await createAllProductsForList()

    document.getElementById('footer__more-btn').addEventListener('click', async () => {
      await addMoreProducts()
      await createAllProductsForList()
    })

    searchInit()

    modalAttachEvents()


  } catch (e) {
    console.error(e)
  }
})()
