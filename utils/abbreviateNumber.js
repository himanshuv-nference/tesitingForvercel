const units = ['K', 'M', 'B', 'T']

export default function abbreviateNumber(_number, _decPlaces = 1) {
  let num = Math.abs(_number - 0)

  const isNegative = _number - 0 < 0
  const decPlaces = 10 ** _decPlaces

  for (let i = units.length - 1; i >= 0; i--) {
    const size = 10 ** ((i + 1) * 3)

    if (size <= num) {
      num = Math.round((num * decPlaces) / size) / decPlaces

      if (num === 1000 && i < units.length - 1) {
        num = 1
        i++
      }

      num += units[i]

      break
    }
  }

  return isNegative ? `-${num}` : num
}
