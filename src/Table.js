import React from "react"
import { mod, dateParse, solve, getAge, strToDate, chekTripletWithStyles } from "./Utils"
import { localize, useLocaleContext } from "./Locale";
import { cleanSerializeTab, addToSerializeTab as s } from "./Storage"

let borderStyle = ""//"1px solid lightgray"

function rowC4S1_span(name, num1, num2) {
  s(name)
  let a = num1
  let b = num2
  let c = mod(num1 + num2)

  let [sa, sb, sc] = chekTripletWithStyles([a, b, c])

  s(sa)
  s(sb)
  s(sc)

  return (
    <tr>
      <td colSpan="2">{name}</td>
      <td style={{ borderLeft: borderStyle, textAlign: "center", ...sa.style }}>{a}</td>
      <td colSpan="2" style={{ borderLeft: borderStyle, textAlign: "center", ...sb.style }}>{b}</td>
      <td style={{ borderLeft: borderStyle, textAlign: "center", ...sc.style }}>{c}</td>
    </tr>
  )
}

function rowC4S1(name, num1, num2) {
  s(name)
  let a = num1
  let b = num2
  let c = mod(num1 + num2)

  let [sa, sb, sc] = chekTripletWithStyles([a, b, c])

  s(sa)
  s(sb)
  s(sc)

  return (
    <tr>
      <td>{name}</td>
      <td style={{ textAlign: "center", ...sa.style }}>{a}</td>
      <td style={{ textAlign: "center", ...sb.style }}>{b}</td>
      <td style={{ textAlign: "center", ...sc.style }}>{c}</td>
    </tr>
  )
}

function rowC4(name, num1, num2, num3) {
  s(name)
  let a = num1
  let b = num2
  let c = num3

  let [sa, sb, sc] = chekTripletWithStyles([a, b, c])

  s(sa)
  s(sb)
  s(sc)

  return (
    <tr style={{ borderTop: borderStyle }}>
      <td>{name}</td>
      <td style={{ textAlign: "center", ...sa.style }}>{a}</td>
      <td style={{ textAlign: "center", ...sb.style }}>{b}</td>
      <td style={{ textAlign: "center", ...sc.style }}>{c}</td>
    </tr>
  )
}

function headerC4(col1, col2, col3, col4) {
  return (
    <tr style={{ borderBottom: "2px solid gray" }}>
      <th>{s(col1)}</th>
      <th style={{ textAlign: "center" }}>{s(col2)}</th>
      <th style={{ textAlign: "center" }}>{s(col3)}</th>
      <th style={{ textAlign: "center" }}>{s(col4)}</th>
    </tr>
  )
}

function rowC2(name, value) {
  return (
    <tr style={{ borderBottom: borderStyle, borderTop: borderStyle }}>
      <td colSpan="2">{s(name)}</td>
      <td colSpan="4" style={{ borderLeft: borderStyle, textAlign: "center" }}>{s(value)}</td>
    </tr>
  )
}

function headerC2(col1, col2) {
  return (
    <tr style={{ borderBottom: "2px solid gray" }}>
      <th colSpan="2">{s(col1)}</th>
      <th colSpan="4" style={{ borderLeft: borderStyle, textAlign: "center" }}>{s(col2)}</th>
    </tr>
  )
}

function rowC4_span(name1, num1, name2, num2) {
  return (
    <tr style={{ borderBottom: borderStyle, borderTop: borderStyle }}>
      <td colSpan="2">{s(name1)}</td>
      <td style={{ borderLeft: borderStyle, textAlign: "center" }}>{s(num1)}</td>
      <td colSpan="2" style={{ borderLeft: borderStyle, textAlign: "center" }}>{s(name2)}</td>
      <td style={{ borderLeft: borderStyle, textAlign: "center" }}>{s(num2)}</td>
    </tr>
  )
}

export const Table = localize(({ date, texts }) => {

  let { locale } = useLocaleContext()

  let headerStyle = { textAlign: "right" }

  let { d: dd, m: mm, y: yy } = dateParse(date)
  let { a, b, c, d, a1, b1, c1, d1, a3, b3, a2, b2, a4, b4, c2, d2, e, sky, earth, m, f } = solve(dd, mm, yy)

  let summSE = mod(sky + earth)
  let [s_sky, s_earth, s_summSE] = chekTripletWithStyles([sky, earth, summSE], true)
  
  let summMF = mod(m + f)
  let [s_m, s_f, s_summMF] = chekTripletWithStyles([m, f, summMF], true)

  let spirit = mod(summSE + summMF)
  let genusPower = mod(a1 + b1 + c1 + d1)

  cleanSerializeTab()

  return (
    <>
      <div key={1} style={{ margin: 10 }}>
        <table style={{ border: "2px solid gray" }}>
          <tbody>
            {headerC2(texts.birthday, date)}
            {rowC2(texts.age, getAge(strToDate(date), locale))}
            <tr>
              <td style={headerStyle}>{s(texts.sky)}</td>
              <td style={s_sky.style}>{s(s_sky)}</td>
              <td rowSpan="2" ><div className="braces"><div className="curly" style={s_summSE.style}>{s(s_summSE)}</div></div></td>
              <td style={headerStyle}>{s(texts.male)}</td>
              <td style={s_m.style}>{s(s_m)}</td>
              <td rowSpan="2" ><div className="braces"><div className="curly" style={s_summMF.style}>{s(s_summMF)}</div></div></td>
            </tr>
            <tr>
              <td style={headerStyle}>{s(texts.earth)}</td>
              <td style={s_earth.style}>{s(s_earth)}</td>
              <td style={headerStyle}>{s(texts.female)}</td>
              <td style={s_f.style}>{s(s_f)}</td>
            </tr>
            {rowC4_span(texts.spiritual, spirit, texts.planetary, mod(spirit + summMF))}
            {rowC2(texts.power, genusPower)}
            {rowC4S1_span(texts.innerStrength, genusPower, e)}
            {rowC4S1_span(texts.maleKey, a1, c1)}
            {rowC4S1_span(texts.femaleKey, b1, d1)}
          </tbody>
        </table >
      </div>

      <div key={2} style={{ margin: 10 }}>
        <table style={{ border: "2px solid gray" }}>
          <tbody>
            {headerC4(texts.chakras, texts.physics, texts.energy, texts.emotions)}
            {rowC4S1(texts.sahasrara, a, b)}
            {rowC4S1(texts.ajna, a3, b3)}
            {rowC4S1(texts.vishuddha, a2, b2)}
            {rowC4S1(texts.anahata, a4, b4)}
            {rowC4S1(texts.manipura, e, e)}
            {rowC4S1(texts.svadhisthana, c2, d2)}
            {rowC4S1(texts.muladhara, c, d)}
            {rowC4(texts.total,
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
    sky: "Sky :",
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
    sky: "Himmel :",
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