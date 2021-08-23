export function * generatedate (start, end) {
  for (let i = start; i <= end; i++) {
    yield i
  }
}

export function * generateSequence (start, end) {
  for (let i = start; i <= end; i++) {
    if (i < 10) {
      yield '0' + i
    } else yield i
  }
}
