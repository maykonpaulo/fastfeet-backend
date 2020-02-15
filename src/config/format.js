class Format {
  zipcode(value) {
    return `${value.substring(0, 5)}-${value.substring(5, 8)}`;
  }
}

export default new Format();