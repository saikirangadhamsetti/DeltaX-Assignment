const reducer1 = (arr) => {
  const data = arr.reduce((prev, ele) => {
    return prev + parseInt(ele.rating);
  }, 0);
  if (arr.length == 0) {
    return 0;
  }
  return data / arr.length;
};

const song_rating = (arr) => {
  const data = arr.reduce((prev, ele) => {
    if (ele.overallRating) {
      return prev + parseInt(ele.overallRating);
    } else {
      return prev + 0;
    }
  }, 0);
  if (arr.length == 0) {
    return 0;
  }
  return data / arr.length;
};

module.exports = { reducer1, song_rating };
