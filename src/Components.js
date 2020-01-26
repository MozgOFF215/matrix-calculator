import React from 'react'
import { programNames } from './programsList'
import { isDev } from './Utils'

export function collectNames(PIds) {
  let res = programNames.filter(d => PIds.includes(d.PId)).map((d, idx) => { 
    if (isDev()) console.log("__collect", d)
    return <div key={idx} style={{ color: d.isKarmicTail ? "red" : "blue" }}>{d.fullName}</div> })
  return res
}

export function createHintBlock(names) {
  return <>
    {names.map((d, indx) => <div key={indx}>{d}</div>)}
  </>
}

export function spanWithHint(sa) {
  return sa.names && sa.names.length > 0 && <span className="CellComment">{createHintBlock(sa.names)}</span>
}

export function tdWithHint(text, sa, span) {
  return (
    <td className="CellWithComment" colSpan={span} style={{ textAlign: "center", ...sa.style }}>{text}
      {spanWithHint(sa)}
    </td>
  )
}