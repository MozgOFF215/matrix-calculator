
import React, { useState } from "react"
import { Matrix } from "./Matrix"
import { checkDate } from "./Utils"
import { localize, useLocaleContext, LocaleProvider } from "./Locale"

let defaultDate = localStorage.getItem("defDate") || "24.05.1975"

export const App = localize(({ texts }) => {

  let [locale, _setLocale] = useState(() => localStorage.getItem('locale') || "ru")

  function setLocale(locale) {
    _setLocale(locale)
    localStorage.setItem('locale', locale)
  }

  return (
    <LocaleProvider value={{ locale, setLocale }}>
      <Main />
    </LocaleProvider>
  )
})

const Main = localize(({ texts }) => {
  let [text, setText] = useState(defaultDate)
  let [date, setDate] = useState(defaultDate)
  let [alarm, setAlarm] = useState()
  let { setLocale } = useLocaleContext()

  function checkDate1(text) {

    if (checkDate(text)) {
      setAlarm(undefined)
      setDate(text)
      localStorage.setItem("defDate", text)
      return
    }
    setAlarm(texts.invalidDate)
  }

  return (
    <>
      <div className="noprint" style={{ margin: "20px 0 0 20px" }}>
        {alarm && <div style={{ color: "red" }}>{alarm}</div>}
        <input className="bp3-input" type="text" placeholder={texts.placeholder} onChange={(e) => setText(e.target.value)} value={text} />
        <button className="bp3-button" type="button" onClick={() => checkDate1(text)}  style={{margin:"0 10px 0 0"}}>{texts.renew}</button>
        <button onClick={window.print} style={{margin:"0 10px 0 0"}}>{texts.toPrinter}</button>
        <button onClick={() => setLocale("ru")}>ru</button>
        <button onClick={() => setLocale("de")}>de</button>
        <button onClick={() => setLocale("en")}>en</button>
      </div>
      {!alarm && <Matrix date={date} />}
    </>
  )
})

Main.defaultProps = {
  texts: {
    placeholder: "dd.mm.yyyy",
    invalidDate: "invalid date",
    toPrinter: "print",
    renew: "renew",
  },
  "texts-de": {
    placeholder: "TT.MM.JJJJ",
    invalidDate: "ungültiges Datum",
    toPrinter: "drucken",
    renew: "renew",
  },
  "texts-ru": {
    placeholder: "дд.мм.гггг",
    invalidDate: "неверная дата",
    toPrinter: "печать",
    renew: "обновить",
  }
}