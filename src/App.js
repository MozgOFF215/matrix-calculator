
import React, { useRef, useState } from "react"
import "storm-react-diagrams/dist/style.min.css"
import { Matrix } from "./Matrix"
import ReactToPrint from 'react-to-print'
import { checkDate } from "./Utils";

let defaultDate = localStorage.getItem("defDate") || "24.05.1975"

class Wrapper extends React.Component {
  render() {
    return !this.props.alarm && <Matrix date={this.props.date} />
  }
}

export const App = () => {

  let [text, setText] = useState(defaultDate)
  let [date, setDate] = useState(defaultDate)
  let [alarm, setAlarm] = useState()
  const componentRef = useRef()

  function checkDate1(text) {

    if (checkDate(text)) {
      setAlarm(undefined)
      setDate(text)
      localStorage.setItem("defDate", text)
      return
    }
    setAlarm("неверная дата")
  }

  return (
    <div>
      <div style={{ margin: "0 0 0 20px" }}>
        {alarm && <div style={{ color: "red" }}>{alarm}</div>}
        <input className="bp3-input" type="text" placeholder="дд.мм.гггг" onChange={(e) => setText(e.target.value)} value={text} />
        <button className="bp3-button" type="button" onClick={() => checkDate1(text)}>обновить</button>
        <ReactToPrint trigger={() => <button style={{ margin: 20 }}>печать</button>} content={() => componentRef.current} />
      </div>

      <Wrapper ref={componentRef} date={date} alarm={alarm} />
    </div>
  )
}