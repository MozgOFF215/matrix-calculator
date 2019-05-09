
import React, { useState } from "react"
import "storm-react-diagrams/dist/style.min.css"
import './diagram.css'
import { Box2x2 } from './Box'
import { checkDate, solve, dateParse, mod, strToDate, getAge } from "./Utils";

let defaultDate = localStorage.getItem("defDate") || "24.05.1975"

export function App() {

  let [text, setText] = useState(defaultDate)
  let [date, setDate] = useState(defaultDate)
  let [alarm, setAlarm] = useState()

  function checkDate1(text) {

    if (checkDate(text)) {
      setAlarm(undefined)
      setDate(text)
      localStorage.setItem("defDate", text)
      return
    }

    setAlarm("неверная дата")
  }

  let table = undefined

  if (!alarm) {
    let { d: dd, m: mm, y: yy } = dateParse(date)
    let { sky, earth, m, f } = solve(dd, mm, yy)

    let headerStyle = { textAlign: "right" }

    let summSE = mod(sky + earth)
    let summMF = mod(m + f)

    let spirit = mod(summSE + summMF)

    let borderStyle = "1px solid lightgray"

    table = (
      <table style={{ margin: "10px 0 10px 0" }}>
        <tbody>
          <tr style={{ borderTop: borderStyle }}>
            <td style={{ ...headerStyle, borderBottom: borderStyle }}>Возраст :</td>
            <td colSpan="5" style={{ borderBottom: borderStyle }}>{getAge(strToDate(date))}</td>
          </tr>
          <tr >
            <td></td><td></td><td></td><td></td><td></td><td></td>
          </tr>
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
          <tr style={{ borderBottom: borderStyle }}>
            <td  ></td><td></td><td></td><td></td><td></td><td></td>
          </tr>
          <tr style={{ borderBottom: borderStyle }}>
            <td style={headerStyle}>Духовное :</td>
            <td>{spirit}</td>
            <td></td>
            <td style={headerStyle}>Планетарное :</td>
            <td>{mod(spirit + summMF)}</td>
            <td></td>
          </tr>
        </tbody>
      </table >
    )
  }

  return (
    <div style={{ margin: "10px" }}>
      {alarm && <div style={{ color: "red" }}>{alarm}</div>}
      <input className="bp3-input" type="text" placeholder="дд.мм.гггг" onChange={(e) => setText(e.target.value)} value={text} />
      <button className="bp3-button" type="button" onClick={() => checkDate1(text)}>обновить</button>
      {table}
      <Box2x2 date={date} />
    </div>
  )
}