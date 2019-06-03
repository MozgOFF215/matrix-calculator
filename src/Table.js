import React from "react"
import { mod, dateParse, solve, getAge, strToDate } from "./Utils"
import { localize, useLocaleContext } from "./Locale";

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
    <tr style={{ borderBottom: "2px solid gray" }}>
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

function val_h(name, num) {
  return (
    <tr style={{ borderBottom: "2px solid gray" }}>
      <th colSpan="2">{name}</th>
      <th colSpan="4" style={{ borderLeft: borderStyle, textAlign: "center" }}>{num}</th>
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

export const Table = localize(({ date, texts }) => {

  let { locale } = useLocaleContext()

  let headerStyle = { textAlign: "right" }

  let { d: dd, m: mm, y: yy } = dateParse(date)
  let { a, b, c, d, a1, b1, c1, d1, a3, b3, a2, b2, a4, b4, c2, d2, e, sky, earth, m, f } = solve(dd, mm, yy)

  let summSE = mod(sky + earth)
  let summMF = mod(m + f)

  let spirit = mod(summSE + summMF)
  let genusPower = mod(a1 + b1 + c1 + d1)

  return (
    <>
      <div style={{ margin: 10 }}>
        <table style={{ border: "2px solid gray" }}>
          <tbody>
            {val_h(texts.birthday, date)}
            {val(texts.age, getAge(strToDate(date), locale))}
            <tr>
              <td style={headerStyle}>{texts.sky}</td>
              <td>{sky}</td>
              <td rowSpan="2" ><div className="braces"><div className="curly">{summSE}</div></div></td>
              <td style={headerStyle}>{texts.male}</td>
              <td>{m}</td>
              <td rowSpan="2" ><div className="braces"><div className="curly">{summMF}</div></div></td>
            </tr>
            <tr>
              <td style={headerStyle}>{texts.earth}</td>
              <td>{earth}</td>
              <td style={headerStyle}>{texts.female}</td>
              <td>{f}</td>
            </tr>
            {val2(texts.spiritual, spirit, texts.planetary, mod(spirit + summMF))}
            {val(texts.power, genusPower)}
            {key(texts.innerStrength, genusPower, e)}
            {key(texts.maleKey, a1, c1)}
            {key(texts.femaleKey, b1, d1)}
          </tbody>
        </table >
      </div>

      <div style={{ margin: 10 }}>
        <table style={{ border: "2px solid gray" }}>
          <tbody>
            {header(texts.chakras, texts.physics, texts.energy, texts.emotions)}
            {key_(texts.sahasrara, a, b)}
            {key_(texts.ajna, a3, b3)}
            {key_(texts.vishuddha, a2, b2)}
            {key_(texts.anahata, a4, b4)}
            {key_(texts.manipura, e, e)}
            {key_(texts.svadhisthana, c2, d2)}
            {key_(texts.muladhara, c, d)}
            {key2_(texts.total,
              mod(a + a3 + a2 + a4 + e + c2 + c), mod(b + b3 + b2 + b4 + e + d2 + d),
              mod(mod(a + b) + mod(a3 + b3) + mod(a2 + b2) + mod(a4 + b4) + mod(e + e) + mod(c2 + d2) + mod(c + d)))}
          </tbody>
        </table >
      </div>
    </>
  )
})

Table.defaultProps = {
  texts: {
    birthday: "Birthday",
    age: "Age",
    spiritual: "Spiritual",
    planetary: "Planetary",
    power: "Power of family",
    innerStrength: "Inner strength",
    maleKey: "Male key",
    femaleKey: "Female key",
    chakras: "Chakras",
    physics: "Physics",
    energy: "Energy",
    emotions: "Emotions",

    sahasrara: "7. Sahasrara",
    ajna: "6. Ajna",
    vishuddha: "5. Vishuddha",
    anahata: "4. Anahata",
    manipura: "3. Manipura",
    svadhisthana: "2. Svadhishthana",
    muladhara: "1. Muladhara",
    total: "Total",

    earth: "Earth :",
    sky: "Sky",
    male: "m :",
    female: "f :",

  },
  "texts-de": {
    birthday: "Geburtstag",
    age: "Alter",
    spiritual: "Spirituell",
    planetary: "Planetarisch",
    power: "Kraft der Ahnen",
    innerStrength: "Innere Stärke",
    maleKey: "Männlicher Schlüssel",
    femaleKey: "Weiblicher Schlüssel",
    chakras: "Chakren",
    physics: "Physik",
    energy: "Energie",
    emotions: "Emotionen",

    sahasrara: "7. Sahasrara",
    ajna: "6. Ajna",
    vishuddha: "5. Vishuddha",
    anahata: "4. Anahata",
    manipura: "3. Manipura",
    svadhisthana: "2. Svadhishthana",
    muladhara: "1. Muladhara",
    total: "Gesamt",

    earth: "Erde :",
    sky: "Himmel",
    male: "m :",
    female: "w :",

  },
  "texts-ru": {
    birthday: "День рожденья",
    age: "Возраст",
    spiritual: "Духовное",
    planetary: "Планетарное",
    power: "Сила рода",
    innerStrength: "Внутренняя сила",
    maleKey: "Мужской ключ",
    femaleKey: "Женский ключ",
    chakras: "Чакры",
    physics: "Физика",
    energy: "Энергия",
    emotions: "Эмоции",

    sahasrara: "7. Сахасрара",
    ajna: "6. Аджна",
    vishuddha: "5. Вишуддха",
    anahata: "4. Анахата",
    manipura: "3. Манипура",
    svadhisthana: "2. Свадхистхана",
    muladhara: "1. Муладхара",
    total: "Итого",

    earth: "Земля :",
    sky: "Небо :",
    male: "М :",
    female: "Ж :",
  }
}