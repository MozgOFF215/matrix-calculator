import React from "react"
import { dateParse, solve, mod, chekTripletWithStyles } from "./Utils"
import { localize } from "./Locale"
import { addToSerializeTab as s } from "./Storage"

let borderStyle2 = "2px solid gray"

export const YearsTable = localize(({ date, texts }) => {

  let { d: dd, m: mm, y: yy } = dateParse(date)
  let { a, b, c, d, a1, b1, c1, d1, years1, years2, years3, years4, years5, years6, years7, years8 } = solve(dd, mm, yy)

  let ring = [a, ...years1, a1, ...years2, b, ...years3, b1, ...years4, c, ...years5, c1, ...years6, d, ...years7, d1, ...years8]

  function getPeriod(indx) {
    let a = indx * 5 / 4
    let a1 = Math.floor(a)
    let a2 = Math.ceil(a)
    if (a1 === a2) return a
    return a1 + "-" + a2
  }

  function header() {
    return (
      <tr style={{ border: borderStyle2 }}>
        <th >{s(texts.year)}</th>
        <th colSpan="3" style={{ borderRight: borderStyle2 }}>{s("a+b=c")}</th>
        <th >{s(texts.year)}</th>
        <th colSpan="3" style={{ borderRight: borderStyle2 }}>{s("a+b=c")}</th>
      </tr>)
  }

  let tabCol = ring.map((d, indx) => {
    let a = d
    let b = ring[(indx + 32) & 0x3f]
    let c = mod(d + ring[(indx + 32) & 0x3f])

    let [sa, sb, sc] = chekTripletWithStyles([a, b, c])

    return (<>
      <td style={{ color: "gray" }}><i>{s(getPeriod(indx))}</i></td>
      <td style={{ color: "#000066", ...sa.style }}>{s(sa)}</td>
      <td style={{ color: "#003300", ...sb.style }}>{s(sb)}</td>
      <td style={{ borderRight: borderStyle2, ...sc.style }}>{s(sc)}</td>
    </>)
  })

  return (
    <>
      <div style={{ margin: 10 }}>
        <table style={{ textAlign: "center", border: borderStyle2 }}>
          <tbody>
            {header()}
            {tabCol.map((d, indx) => indx < 16 && <tr key={indx}>
              {d}
              {tabCol[indx + 16]}
            </tr>)}
          </tbody>
        </table>
      </div>

      <div style={{ margin: 10 }}>
        <table style={{ textAlign: "center", border: borderStyle2 }}>
          <tbody>
            {header()}
            {tabCol.map((d, indx) => indx >= 32 && indx < 48 && <tr key={indx}>
              {d}
              {tabCol[indx + 16]}
            </tr>)}
          </tbody>
        </table>
      </div>

    </>
  )
})

YearsTable.defaultProps = {
  texts: { year: "year" },
  "texts-de": { year: "Jahr" },
  "texts-ru": { year: "лет" },
}