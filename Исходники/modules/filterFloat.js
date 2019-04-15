module.exports = function filterFloat(value) {
  value = value.toString()
  			       .replace(",", ".")
               .replace(" ", "");
  return Number(value);
  /*if(/^(\-|\+)?([0-9]+(\.[0-9]+)?|Infinity)$/
      .test(value))
      return Number(value);
  return NaN;*/
}