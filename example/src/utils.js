export function titleize(v) {
  const words = v.split(' ')
  return words
    .map(
      (word) =>
        word.slice(0, 1).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join(' ')
}

export function debounce(fn, delay = 300) {
  let id = 0
  return function(...params) {
    clearTimeout(id)
    id = setTimeout(() => fn(...params), delay)
  }
}
