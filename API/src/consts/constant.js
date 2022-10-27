const reducer1 = (arr) => {
  const data = arr.reduce((prev, ele) => {
    // console.log(ele);
    return prev + parseInt(ele.rating);
  }, 0);
  if (arr.length == 0) {
    return 0;
  }
  return data / arr.length;
};

module.exports = { reducer1 };
