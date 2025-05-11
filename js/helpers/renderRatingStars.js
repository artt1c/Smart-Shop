const renderRatingStars = (rating) => {
  const maxRating = 5;
  const starFull = '&#9733;'; // ★
  const starHalf = '&#11240;'; // ⭒
  const starEmpty = '&#9734;'; // ☆

  const roundedRating = Math.round(rating * 2) / 2;

  let starsHTML = '';
  const fullStarsCount = Math.floor(roundedRating);
  const hasHalfStar = (roundedRating % 1 !== 0);
  const emptyStarsCount = maxRating - fullStarsCount - (hasHalfStar ? 1 : 0);

  starsHTML += starFull.repeat(fullStarsCount);
  if (hasHalfStar) {
    starsHTML += starHalf;
  }
  starsHTML += starEmpty.repeat(emptyStarsCount);

  return starsHTML;
}

export default renderRatingStars;