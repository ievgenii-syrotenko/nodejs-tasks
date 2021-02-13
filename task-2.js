/**
 * Invert object function
 * Just a pure function without input data validation
 *
 * @param {object} obj — input object
 * @return {object} inverted object
 */
const invert = (obj) => {
  const data = {};

  for (const [key, value] of Object.entries(obj)) {
    data[value] = key;
  }

  return data;
};

console.log(invert({ a: "some", b: "object", c: 1 }));
