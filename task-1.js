/**
 * Group by array value by function
 * Just a pure function without input data validation
 *
 * @param {array} array — input array
 * @param {function} func — group by function
 * @return {object} grouped object
 */
const groupBy = (array, func) => {
  const groupedData = {};

  array.forEach((value) => {
    const groupedIndex = func(value);

    if (typeof groupedData[groupedIndex] === "undefined") {
      groupedData[groupedIndex] = [];
    }

    groupedData[groupedIndex].push(value);
  });

  return groupedData;
};

console.log(groupBy([3.6, 3.7, 6.4, 8.9], Math.floor));
