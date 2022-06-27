import abbreviateNumber from './abbreviateNumber'

export function numberWithCommas(number) {
  if (number === Infinity) return number
  let num = Number(number)

  if (isNaN(num)) {
    console.error(`${number} can't be cast to a number`)
    return number
  }

  if (Math.abs(num) < 1000) return num

  const sign = num < 0 ? '-' : ''
  num = Math.abs(num)
  const [whole, decimal] = String(num).split('.')
  num = Number(whole)
  const chars = String(num).split('')

  let pos = chars.length % 3

  if (pos === 0) pos = 3

  const charsWithCommas = []
  let i = 0
  while (i < chars.length) {
    if (charsWithCommas.length === pos) {
      charsWithCommas.push(',')
      pos += 4
    } else {
      charsWithCommas.push(chars[i])
      i++
    }
  }

  return `${sign}${charsWithCommas.join('')}${decimal ? `.${decimal}` : ''}`
}

export const getProbString = prob => {
  if (prob === 0) return ''
  return `
    1 in ${abbreviateNumber(Math.round(1.0 / prob))}
  `
}
