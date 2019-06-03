import React from "react"
import { dateParse, solve, mod, chekWithStyles } from "./Utils"
import { localize } from "./Locale"

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

  let header = <tr style={{ border: borderStyle2 }}>
    <>{[0, 2].map(j => <>
      <th key={j}>{texts.year}</th>
      <th key={j + 1} colSpan="3" style={{ borderRight: borderStyle2 }}>a+b=c</th>
    </>)}</>
  </tr>

  let tabCol1 = ring.map((d, indx) => {
    let a = d
    let b = ring[(indx + 32) & 0x3f]
    let c = mod(d + ring[(indx + 32) & 0x3f])

    let { sa, sb, sc } = chekWithStyles([a, b, c])

    return (<>
      <td style={{ color: "gray" }}><i>{getPeriod(indx)}</i></td>
      <td style={{ color: "#000066", ...sa }}>{a}</td>
      <td style={{ color: "#003300", ...sb }}>{b}</td>
      <td style={{ borderRight: borderStyle2, ...sc }}>{c}</td>
    </>)
  })

  return (
    <>
      <div style={{ margin: 10 }}>
        <table style={{ textAlign: "center", border: borderStyle2 }}>
          <tbody>
            {header}
            {tabCol1.map((d, indx) => indx < 16 && <tr>
              {d}
              {tabCol1[indx + 16]}
            </tr>)}
          </tbody>
        </table>
      </div>

      <div style={{ margin: 10 }}>
        <table style={{ textAlign: "center", border: borderStyle2 }}>
          <tbody>
            {header}
            {tabCol1.map((d, indx) => indx >= 32 && indx < 48 && <tr>
              {d}
              {tabCol1[indx + 16]}
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