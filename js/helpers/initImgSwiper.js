const initImgSwiper = (swiperId, productTemplate) => {
  const imgSwiper = new Swiper('#' + swiperId.id, {
    slidesPerView: 'auto',
    spaceBetween: 0,
    loop: true,
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
  const nextBtn = document.getElementById(swiperId.nextIdBtn);

  prevBtn.classList.add('pagination-hidden');
  nextBtn.classList.add('pagination-hidden');

  productTemplate.addEventListener('mouseover', () => {
    prevBtn.classList.remove('pagination-hidden');
    prevBtn.classList.add('pagination-visible');

    nextBtn.classList.remove('pagination-hidden');
    nextBtn.classList.add('pagination-visible');
  })
  productTemplate.addEventListener('mouseout', () => {
    prevBtn.classList.remove('pagination-visible');
    prevBtn.classList.add('pagination-hidden');

    nextBtn.classList.remove('pagination-visible');
    nextBtn.classList.add('pagination-hidden');
  })
}
export default initImgSwiper;