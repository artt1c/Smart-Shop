const swiperStructureForImage = (imgArr) => {
  if (!Array.isArray(imgArr)) throw new Error('imgArr must be an array');

  const swiperMainElement = document.createElement('div')
  let swiperId = null;

  if (imgArr.length > 1) {

    // GENERATE RANDOM ID FOR SWIPER
    const initId = 'swiperId'+Math.random().toString(36).substring(2, 15)
    swiperId = {
      id: initId,
      nextIdBtn: ('swiper-button-next-' + initId),
      prevIdBtn: ('swiper-button-prev-' + initId)
    }

    // CREATE SWIPER STRUCTURE
    swiperMainElement.classList.add('swiper')
    swiperMainElement.id = swiperId.id
    const swiperWrapper = document.createElement('div')
    swiperWrapper.classList.add('swiper-wrapper')
    swiperMainElement.appendChild(swiperWrapper)

    // ADD PAGINATION BUTTONS
    const swiperButtonNext = document.createElement('div')
    swiperButtonNext.classList.add('swiper-button-next')
    swiperButtonNext.id = swiperId.nextIdBtn
    const swiperButtonPrev = document.createElement('div')
    swiperButtonPrev.classList.add('swiper-button-prev')
    swiperButtonPrev.id = swiperId.prevIdBtn
    swiperMainElement.append(swiperButtonPrev, swiperButtonNext)

    imgArr.forEach(img => {
      const slide = document.createElement('div')
      slide.classList.add('swiper-slide')

      const imgInSlide = document.createElement('img')
      imgInSlide.src = img
      imgInSlide.loading = 'lazy'

      slide.appendChild(imgInSlide)
      swiperWrapper.appendChild(slide)
    })

  } else {
    const img = document.createElement('img')
    img.src = imgArr[0]
    swiperMainElement.appendChild(img)
  }

  return {swiperId, swiperMainElement}
}

export default swiperStructureForImage;