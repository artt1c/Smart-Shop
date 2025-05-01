import createTopProductsItemsForList from "./utils/createTopProductsItemsForSwiper.js";
import fetchDataForHomePage from "./utils/fetchDataForHomePage.js";
import createAllProductsForList from "./utils/createAllProductsForList.js";


(async function () {
  try {

    await fetchDataForHomePage()

    await createTopProductsItemsForList()

    await createAllProductsForList()

  } catch (e) {
    console.error(e)
  }
})()
