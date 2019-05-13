import React from "react"
import { dateParse, solve } from "./Utils"

let borderStyle2 = "1px double gray"

function val(name, num) {
  return [name, num]
}

function segment(num) {
  return num + "-" + (num + 1)
}

function groupVal(res, start, years1) {
  years1.map((d, indx) => res.push(val(indx === 3 ? start + 5 : segment(start + (indx > 3 ? 2 : 1) + indx), years1[indx])))
}

function years(start, a, a1, years1) {
  let res = []
  res.push(val(start, a))
  groupVal(res, start, years1)

  return res
}

function rows(col1, col2, col3, col4) {
  let revTab = col1.map((d, indx) => [col1[indx][0], col1[indx][1], col2[indx][0], col2[indx][1], col3[indx][0], col3[indx][1], col4[indx][0], col4[indx][1]])
  return revTab.map((d, indx) => (
    <tr>
      <>{[0, 2, 4, 6].map(j => <>
        <td style={{ }}>{d[j]}</td>
        <td style={{ borderRight: borderStyle2, }}>{d[j + 1]}</td>
      </>)}</>
    </tr>
  ))
}

export function YearsTable({ date }) {

  let { d: dd, m: mm, y: yy } = dateParse(date)
  let { a, b, c, d, a1, b1, c1, d1, years1, years2, years3, years4, years5, years6, years7, years8 } = solve(dd, mm, yy)

  return (
    <table style={{ margin: "10px 0 10px 0", textAlign: "center", border: borderStyle2 }}>
      <tbody>
        <tr style={{ border: borderStyle2 }}>
          <>{[0, 2, 4, 6].map(j => <>
            <th key={j} style={{ }}>год</th>
            <th key={j + 1} style={{ borderRight: borderStyle2 }}>код</th>
          </>)}</>
        </tr>
        <>{rows(years(0, a, a1, years1), years(20, b, b1, years3), years(40, c, c1, years5), years(60, d, d1, years7))}</>
        <>{rows(years(10, a1, b, years2), years(30, b1, c, years4), years(50, c1, d, years6), years(70, d1, a, years8))}</>
      </tbody>
    </table >
  )
}