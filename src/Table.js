import React from "react"
import { mod, dateParse, solve, getAge, strToDate } from "./Utils"

let borderStyle = ""//"1px solid lightgray"

function key(name, num1, num2) {
  return (
    <tr>
      <td colSpan="2">{name}</td>
      <td style={{ borderLeft: borderStyle, textAlign: "center" }}>{num1}</td>
      <td colSpan="2" style={{ borderLeft: borderStyle, textAlign: "center" }}>{num2}</td>
      <td style={{ borderLeft: borderStyle, textAlign: "center" }}>{mod(num1 + num2)}</td>
    </tr>
  )
}
function key_(name, num1, num2) {
  return (
    <tr>
      <td>{name}</td>
      <td style={{ textAlign: "center" }}>{num1}</td>
      <td style={{ textAlign: "center" }}>{num2}</td>
      <td style={{ textAlign: "center" }}>{mod(num1 + num2)}</td>
    </tr>
  )
}

function key2_(name, num1, num2, num3) {
  return (
    <tr style={{ borderTop: borderStyle }}>
      <td>{name}</td>
      <td style={{ textAlign: "center" }}>{num1}</td>
      <td style={{ textAlign: "center" }}>{num2}</td>
      <td style={{ textAlign: "center" }}>{num3}</td>
    </tr>
  )
}

function header(name, num1, num2, num3) {

  return (
    <tr style={{ borderBottom: borderStyle, borderTop: borderStyle }}>
      <th>{name}</th>
      <th style={{ textAlign: "center" }}>{num1}</th>
      <th style={{ textAlign: "center" }}>{num2}</th>
      <th style={{ textAlign: "center" }}>{num3}</th>
    </tr>
  )
}

function val(name, num) {
  return (
    <tr style={{ borderBottom: borderStyle, borderTop: borderStyle }}>
      <td colSpan="2">{name}</td>
      <td colSpan="4" style={{ borderLeft: borderStyle, textAlign: "center" }}>{num}</td>
    </tr>
  )
}

function val2(name1, num1, name2, num2) {
  return (
    <tr style={{ borderBottom: borderStyle, borderTop: borderStyle }}>
      <td colSpan="2">{name1}</td>
      <td style={{ borderLeft: borderStyle, textAlign: "center" }}>{num1}</td>
      <td colSpan="2" style={{ borderLeft: borderStyle, textAlign: "center" }}>{name2}</td>
      <td style={{ borderLeft: borderStyle, textAlign: "center" }}>{num2}</td>
    </tr>
  )
}

export function Table({ date }) {

  let headerStyle = { textAlign: "right" }

  let { d: dd, m: mm, y: yy } = dateParse(date)
  let { a, b, c, d, a1, b1, c1, d1, a3, b3, a2, b2, a4, b4, c2, d2, e, sky, earth, m, f } = solve(dd, mm, yy)

  let summSE = mod(sky + earth)
  let summMF = mod(m + f)

  let spirit = mod(summSE + summMF)
  let genusPower = mod(a1 + b1 + c1 + d1)

  return (
    <>
      <table>
        <tbody>
          {val("День рожденья", date)}
          {val("Возраст", getAge(strToDate(date)))}
          <tr>
            <td style={headerStyle}>Небо :</td>
            <td>{sky}</td>
            <td rowSpan="2" ><div className="braces"><div className="curly">{summSE}</div></div></td>
            <td style={headerStyle}>M :</td>
            <td>{m}</td>
            <td rowSpan="2" ><div className="braces"><div className="curly">{summMF}</div></div></td>
          </tr>
          <tr>
            <td style={headerStyle}>Земля :</td>
            <td>{earth}</td>
            <td style={headerStyle}>Ж :</td>
            <td>{f}</td>
          </tr>
          {val2("Духовное", spirit, "Планетарное", mod(spirit + summMF))}
          {val("Сила рода", genusPower)}
          {key("Внутренняя сила", genusPower, e)}
          {key("Мужской ключ", a1, c1)}
          {key("Женский ключ", b1, d1)}
        </tbody>
      </table >

      <table>
        <tbody>
          {header("Чакры", "Физика", "Энергия", "Эмоции")}
          {key_("7. Сахасрара", a, b)}
          {key_("6. Аджна", a3, b3)}
          {key_("5. Вишуддха", a2, b2)}
          {key_("4. Анахата", a4, b4)}
          {key_("3. Манипура", e, e)}
          {key_("2. Свадхистхана", c2, d2)}
          {key_("1. Муладхара", c, d)}
          {key2_("Итого",
            mod(a + a3 + a2 + a4 + e + c2 + c), mod(b + b3 + b2 + b4 + e + d2 + d),
            mod(mod(a + b) + mod(a3 + b3) + mod(a2 + b2) + mod(a4 + b4) + mod(e + e) + mod(c2 + d2) + mod(c + d)))}
        </tbody>
      </table >
    </>
  )
}