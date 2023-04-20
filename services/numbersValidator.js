const isNumber = number => {
  if (isNaN(number) || [null, undefined, ''].includes(number)) {
    return false;
  }
  return true;
};
module.exports = { isNumber };
