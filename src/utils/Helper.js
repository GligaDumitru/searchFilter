export const findAndBoldChars = (stringToReplace = '', keyword = '') => {
  if (!!stringToReplace) {
    const _reg = new RegExp(keyword, 'ig');
    return stringToReplace.replace(_reg, `<strong>${keyword}</strong>`);
  }
  return '';
};

export const getElementsMatched = (arr = [], str = '') => {
  return arr.filter((el) => el.label.toLowerCase().includes(str.toLowerCase()));
};

export const addElementToArray = (arr = [], el) => {
  const alreadyExist = arr.find((item) => item === el);
  return alreadyExist ? arr : [...arr, el];
};

export const removeElementFromArray = (arr = [], el) => {
  return arr.filter((item) => item !== el);
};
