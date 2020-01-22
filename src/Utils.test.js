import { dateParse, mod, checkTriplet } from './Utils'

it('dateParse', () => {
  expect(dateParse("1.1.2001")).toEqual({ "d": 1, "m": 1, "y": 2001 })
  expect(dateParse("01.01.2001")).toEqual({ "d": 1, "m": 1, "y": 2001 })
  expect(dateParse("001.001.2001")).toEqual({ "d": 1, "m": 1, "y": 2001 })
  expect(dateParse("1.1.1")).toEqual({ "d": 1, "m": 1, "y": 1 })
})

it('mod', () => {
  expect(mod(0)).toEqual(0)
  expect(mod(10)).toEqual(10)   // 10<=22 -> 10
  expect(mod(22)).toEqual(22)   // 22<=22 -> 22
  expect(mod(23)).toEqual(5)    // 23>22 => 2+3 -> 5
  expect(mod(55)).toEqual(10)   // 55>22 => 5+5 -> 10
  expect(mod(555)).toEqual(15)  // 555>22 => 5+5+5 -> 15
  expect(mod(5555)).toEqual(20) // 5555>22 => 5+5+5+5 -> 20
  expect(mod(55555)).toEqual(7) // 5+5+5+5+5 -> 25; 25>22 => 2+5 -> 7
})

it('checkTriplet', () => {
  expect(checkTriplet([1, 2, 3])).toEqual([]) // nothing
  let a = checkTriplet([18, 7, 7])
  console.log('__result: ', JSON.stringify(a))
  expect(checkTriplet([12, 18, 3])).toEqual([{ "key": 32, "b": [{ "d": 12, "m": true }, { "d": 18, "m": true }, { "d": 3, "m": true }], "name": " Физические страдания", "fullName": "12-18-3 Физические страдания" }])
  expect(checkTriplet([18, 12, 3])).toEqual([{ "key": 32, "b": [{ "d": 18, "m": true }, { "d": 12, "m": true }, { "d": 3, "m": true }], "name": " Физические страдания", "fullName": "12-18-3 Физические страдания" }])
  expect(checkTriplet([18, 7, 7])).toEqual([{"key":48,"b":[{"d":18,"m":true},{"d":7,"m":true},{"d":7,"m":true}],"name":" Страх Карьеры, Инициативы, Дороги","fullName":"18-7-7 Страх Карьеры, Инициативы, Дороги"}])
})