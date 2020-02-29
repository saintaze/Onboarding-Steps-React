class Validator {
  isEmpty = (str) => str.trim().length === 0
  isShorterThan = (str, x) => str.trim().length > 0 && str.trim().length < x
  isNotEmail = (str) => str.trim().length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str.trim())
}

export default new Validator();