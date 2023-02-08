function remainder(a, b) {
  if (a > b && b != 0) {
    return a % b
  } else if (b >= a && a != 0) {
    return b % a
  } else {
    return NaN
  }
}
