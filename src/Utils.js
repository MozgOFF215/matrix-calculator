import { programNames } from "./programsList"
import { collectNames } from "./Components"

export function isDev() { return process.env.NODE_ENV === "development" }

export function mod(number) {
  if (number > 22) {
    let str = "" + number
    let sum = 0
    for (let i = 0; i < str.length; i++)
      sum = sum + +str[i]
    return mod(sum)
  }
  return number
}

export function strToDate(text) {
  let arr = text.split(".")
  let date = new Date(arr[2] + "-" + arr[1] + "-" + arr[0])
  return date
}

export function checkDate(text) {

  if (!text) return false

  let arr = text.split(".")
  if (arr.length !== 3) return false
  let d = +arr[0]
  let m = +arr[1]
  let y = +arr[2]

  if (isNaN(d) || d > 31 || d === 0) return false
  if (isNaN(m) || m > 12 || m === 0) return false
  if (isNaN(y) || arr[2].length < 4) return false

  let date = new Date(arr[2] + "-" + arr[1] + "-" + arr[0])
  if (isNaN(date)) return false

  return true
}

export function dateParse(date) {
  let teils = date.split('.')
  let d = +teils[0]
  let m = +teils[1]
  let y = +teils[2]

  return { d, m, y }
}

const dxy = 270
const scale = 1

export function getPosX(grad, diam = 500, dx = dxy, dy = dxy) {
  return (diam * Math.sin(grad * Math.PI / 180) / 2 + dx) * scale
}

export function getPosY(grad, diam = 500, dx = dxy, dy = dxy) {
  return (-diam * Math.cos(grad * Math.PI / 180) / 2 + dy) * scale
}

function getYears(num1, num2) {
  let y4 = mod(num1 + num2)
  let y2 = mod(num1 + y4)
  let y6 = mod(y4 + num2)
  let y1 = mod(num1 + y2)
  let y3 = mod(y2 + y4)
  let y5 = mod(y4 + y6)
  let y7 = mod(y6 + num2)
  return [y1, y2, y3, y4, y5, y6, y7]
}

export function solve(dd, mm, yy) {

  let a = mod(dd)
  let b = mod(mm)
  let c = mod(yy)
  let d = mod(a + b + c)

  let e = mod(a + b + c + d)

  let a1 = mod(a + b)
  let b1 = mod(b + c)
  let c1 = mod(c + d)
  let d1 = mod(a + d)

  let years1 = getYears(a, a1)
  let years2 = getYears(a1, b)
  let years3 = getYears(b, b1)
  let years4 = getYears(b1, c)
  let years5 = getYears(c, c1)
  let years6 = getYears(c1, d)
  let years7 = getYears(d, d1)
  let years8 = getYears(d1, a)

  let a2 = mod(a + e)
  let a3 = mod(a + a2)
  let a4 = mod(a2 + e)

  let b2 = mod(b + e)
  let b3 = mod(b + b2)
  let b4 = mod(b2 + e)

  let c2 = mod(c + e)
  let c3 = mod(c + c2)

  let d2 = mod(d + e)
  let d3 = mod(d + d2)

  let c4 = mod(c2 + d2)

  let c41 = mod(c2 + c4)
  let c42 = mod(d2 + c4)

  let a12 = mod(a1 + e)
  let b12 = mod(b1 + e)
  let c12 = mod(c1 + e)
  let d12 = mod(d1 + e)

  let a13 = mod(a1 + a12)
  let b13 = mod(b1 + b12)
  let c13 = mod(c1 + c12)
  let d13 = mod(d1 + d12)

  let a04 = mod(e + a2)
  let b04 = mod(e + b2)

  let sky = mod(b + d)
  let earth = mod(a + c)

  let m = mod(a1 + c1)
  let f = mod(b1 + d1)

  return {
    a, b, c, d, e, a1, b1, c1, d1, a2, a3, a4, b2, b3, b4, c2, c3, d2, d3, c4, c41, c42, a12, b12, c12, d12, a13, b13, c13, d13, a04, b04,
    sky, earth, m, f, years1, years2, years3, years4, years5, years6, years7, years8
  }
}

function dateDiff(date) {

  var today = new Date()
  var year = today.getFullYear()
  var month = today.getMonth() + 1
  var day = today.getDate();
  var yy = date.getFullYear()
  var mm = date.getMonth() + 1
  var dd = date.getDate()
  var years, months, days
  // months
  months = month - mm
  if (day < dd) {
    months = months - 1;
  }
  // years
  years = year - yy;
  if (month * 100 + day < mm * 100 + dd) {
    years = years - 1;
    months = months + 12;
  }
  // days
  days = Math.floor((today.getTime() - (new Date(yy + years, mm + months - 1, dd)).getTime()) / (24 * 60 * 60 * 1000))
  //
  return { years, months, days }
}

function textYears(amount, locale) {

  if (!locale) locale = "ru"

  if (!amount || amount === 0) return ""

  let last = amount - Math.floor(amount / 10) * 10
  let prelast = Math.floor((amount - Math.floor(amount / 100) * 100) / 10)

  let word = locale === "en" ? "years" : locale === "de" ? "Jahre" : "лет"

  if (locale === "ru") {
    if (last === 1 && prelast !== 1) word = "год"
    if (last >= 2 && last <= 4 && prelast !== 1) word = "года"
  }

  if (locale === "de") {
    if (amount === 1) word = "Jahr"
  }

  if (locale === "en") {
    if (amount === 1) word = "years"
  }

  return amount + " " + word + " "
}

function textMonth(amount, locale) {
  if (!amount || amount === 0) return ""

  let last = amount - Math.floor(amount / 10) * 10
  let prelast = Math.floor((amount - Math.floor(amount / 100) * 100) / 10)


  let word = locale === "en" ? "month" : locale === "de" ? "Monate" : "месяцев"

  if (locale === "ru") {
    if (last === 1 && prelast !== 1) word = "месяц"
    if (last >= 2 && last <= 4 && prelast !== 1) word = "месяца"
  }

  if (locale === "de") {
    if (amount === 1) word = "Monat"
  }

  if (locale === "en") {
    if (amount === 1) word = "month"
  }

  return amount + " " + word + " "
}

function textDays(amount, locale) {
  if (!amount || amount === 0) return ""

  let last = amount - Math.floor(amount / 10) * 10
  let prelast = Math.floor((amount - Math.floor(amount / 100) * 100) / 10)


  let word = locale === "en" ? "days" : locale === "de" ? "Tage" : "дней"

  if (locale === "ru") {
    if (last === 1 && prelast !== 1) word = "день"
    if (last >= 2 && last <= 4 && prelast !== 1) word = "дня"
  }

  if (locale === "de") {
    if (amount === 1) word = "Tag"
  }

  if (locale === "en") {
    if (amount === 1) word = "day"
  }

  return amount + " " + word + " "
}

export function getAge(date, locale) {
  if (!date) return
  let diff = dateDiff(date)
  let years = textYears(diff.years, locale)
  let month = textMonth(diff.months, locale)
  let days = textDays(diff.days, locale)

  let res = years + month + days
  if (!years && !month && !days)
    return locale === "en" ? "really born today!!!???"
      : locale === "de" ? "wirklich heute geboren!!!???"
        : "в самом деле сегодня родился(лась)!!!???"

  let exactly = locale === "en" ? " exactly" : locale === "de" ? " genau" : " ровно"
  if (!month && !days) return years + exactly
  if (!days) return res + exactly

  return res
}

function _checkTriplet(n1, n2, n3, type = { fixOrder: false, withHole: false, isKarmicTail: false }) {

  if (type.fixOrder) {
    return programNames.filter(i => !!type.isKarmicTail === !!i.isKarmicTail).map(d => {
      if (d.codes.length === 2) {
        if (d.codes[0] === n1 && d.codes[1] === n2) return [d.PId, d.PId, 0]
        if (d.codes[0] === n2 && d.codes[1] === n3) return [0, d.PId, d.PId]
      }

      if (d.codes[0] === n1 && d.codes[1] === n2 && d.codes[2] === n3) return [d.PId, d.PId, d.PId]

      return [0, 0, 0]
    })
  }

  let values = [n1, n2, n3].sort()

  return programNames.filter(d => !!type.isKarmicTail === !!d.isKarmicTail).map(d => {
    if (d.codes.length === 3) {
      if (values.every((value, index) => value === d.codes.sort()[index])) return [d.PId, d.PId, d.PId]
    }
    else if (d.codes.length === 2) {

      let n1n2 = [n1, n2].sort()
      if (n1n2.every((value, index) => value === d.codes.sort()[index])) return [d.PId, d.PId, 0]

      let n2n3 = [n2, n3].sort()
      if (n2n3.every((value, index) => value === d.codes.sort()[index])) return [0, d.PId, d.PId]

      if (type.withHole) {
        let n1n3 = [n1, n3].sort()
        if (n1n3.every((value, index) => value === d.codes.sort()[index])) return [d.PId, 0, d.PId]
      }
    }

    return [0, 0, 0]
  })

}

function _linkTriplet(array) {
  return [
    Array.from(new Set(array.map(d => d[0]).filter(d => d))),
    Array.from(new Set(array.map(d => d[1]).filter(d => d))),
    Array.from(new Set(array.map(d => d[2]).filter(d => d))),
  ]
}

export function checkTriplet(n1, n2, n3, type = { fixOrder: false, withHole: false, isKarmicTail: false }) {
  return _linkTriplet(_checkTriplet(n1, n2, n3, type))
}

export function checkTripletWithStyles(n1, n2, n3, type) {

  let [a, b, c] = checkTriplet(n1, n2, n3, type = { fixOrder: false, withHole: false, isKarmicTail: false })
  let sa, sb, sc
  let color = "rgba(0,0,255,0.15)"

  if (!b.length > 0 && !type.withHole) {
    return [
      { value: n1, names: [] },
      { value: n2, names: [] },
      { value: n3, names: [] }
    ]
  }

  if (a.length > 0) sa = { backgroundColor: color }
  if (b.length > 0) sb = { backgroundColor: color }
  if (c.length > 0) sc = { backgroundColor: color }

  return [
    { value: n1, style: sa, names: collectNames(a) },
    { value: n2, style: sb, names: collectNames(b) },
    { value: n3, style: sc, names: collectNames(c) }
  ]
}