import React, { useCallback } from "react"
import { dateParse, getPosX, getPosY, solve, checkKey } from './Utils'
import { saveImage, addToSerializeTab as s } from "./Storage"

function newNode(id, name, grad, diam = 500, color = undefined) {
  let node = { id, name, x: getPosX(grad, diam), y: getPosY(grad, diam), color }

  return node
}

function newYearsNodes(base, data, startGrad, endGrad, startDiam, endDiam, color) {
  let vertex = data.length
  let gradStep = (endGrad - startGrad) / (vertex + 1)
  let diamStep = (endDiam - startDiam) / (vertex + 1) / 2

  let result = []
  let grad = startGrad
  let diam = startDiam
  for (let i = 0; i < vertex; i++) {
    grad += gradStep
    if (i < vertex / 2) diam += diamStep
    else diam -= diamStep
    result.push(newNode(i + 1 + base, data[i], grad, diam, color))
  }
  return result
}

function i64(id) { return id + 64 }
function i256(id) { return id + 256 }

function createNodes({ a, b, c, d, e, a1, b1, c1, d1, a2, a3, a4, b2, b3, b4, c2, c3, d2, d3, c4, c41, c42, a12, b12, c12, d12, a13, b13, c13, d13, a04, b04,
  years1, years2, years3, years4, years5, years6, years7, years8 }) {

  let na = newNode(0, a, -90, 500, "#fce9fc", 0) // "violet")
  let nb = newNode(16, b, 0, 500, "#fce9fc") // "violet")
  let nc = newNode(32, c, 90, 500, "#ffe6e6") //"red")
  let nd = newNode(48, d, 180, 500, "#ffe6e6") //"red")

  let ne = newNode(-1, e, 0, 0, "#ffffcc") // "yellow")

  let na1 = newNode(8, a1, -45, 500, "#cccccc") // "gray")
  let nb1 = newNode(24, b1, 45, 500, "#cccccc") // "gray")
  let nc1 = newNode(40, c1, 90 + 45, 500, "#cccccc") // "gray")
  let nd1 = newNode(56, d1, 180 + 45, 500, "#cccccc") // "gray")

  let na2 = newNode(i64(2), a2, -90, 350)
  let na3 = newNode(i64(1), a3, -90, 425)
  let na4 = newNode(-1, a4, -90, 275)

  let nb2 = newNode(i64(16 + 2), b2, 0, 350)
  let nb3 = newNode(i64(16 + 1), b3, 0, 425)
  let nb4 = newNode(-1, b4, 0, 275)

  let nc2 = newNode(i64(32 + 2), c2, 90, 350, "#ffedcc")// "orange")
  let nc3 = newNode(i64(32 + 1), c3, 90, 425)

  let nd2 = newNode(i64(48 + 2), d2, 180, 350, "#ffedcc")// "orange")
  let nd3 = newNode(i64(48 + 1), d3, 180, 425)
  let nc4 = newNode(i256(0), c4, 90 + 45, 270, "#cccccc") // "gray")
  let nc41 = newNode(i256(1), c41, 90 + 30, 320, "#cccccc") // "gray")
  let nc42 = newNode(i256(2), c42, 180 - 30, 320, "#cccccc") // "gray")
  let na12 = newNode(i64(8 + 2), a12, -45, 350)
  let nb12 = newNode(i64(24 + 2), b12, 45, 350)
  let nc12 = newNode(i64(40 + 2), c12, 90 + 45, 350)
  let nd12 = newNode(i64(56 + 2), d12, 180 + 45, 350)
  let na13 = newNode(i64(8 + 1), a13, -45, 425)
  let nb13 = newNode(i64(24 + 1), b13, 45, 425)
  let nc13 = newNode(i64(40 + 1), c13, 90 + 45, 425)
  let nd13 = newNode(i64(56 + 1), d13, 180 + 45, 425)
  let na04 = newNode(-1, a04, -90, 180, "#e6ffe6") // "green")
  let nb04 = newNode(-1, b04, 0, 180, "#e6ffe6") // "green")

  let start = 500
  let end = 100
  let color = "#f2f2f2" // "lightgray"

  let ny1 = newYearsNodes(0, years1, -90, -45, start, end, color)
  let ny2 = newYearsNodes(8, years2, -45, 0, start, end, color)
  let ny3 = newYearsNodes(16, years3, 0, 45, start, end, color)
  let ny4 = newYearsNodes(24, years4, 45, 90, start, end, color)
  let ny5 = newYearsNodes(32, years5, 90, 90 + 45, start, end, color)
  let ny6 = newYearsNodes(40, years6, 90 + 45, 180, start, end, color)
  let ny7 = newYearsNodes(48, years7, 180, 180 + 45, start, end, color)
  let ny8 = newYearsNodes(56, years8, 180 + 45, 180 + 90, start, end, color)

  return [
    na, nb, nc, nd,
    ne,
    na1, nb1, nc1, nd1,
    na2, na3, na4, nb2, nb3, nb4, nc2, nc3, nd2, nd3,
    nc4, nc41, nc42,
    na12, nb12, nc12, nd12,
    na13, nb13, nc13, nd13,
    na04, nb04, ...ny1, ...ny2, ...ny3, ...ny4, ...ny5, ...ny6, ...ny7, ...ny8
  ]
}

export function Box({ diam, dx, dy, date }) {
  let { d: dd, m: mm, y: yy } = dateParse(date)

  let refCanvas = useCallback(canvas => {
    if (!canvas) return
    let nodes = checkKeysNodes(createNodes(solve(dd, mm, yy)))
    let ctx = canvas.getContext("2d")
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.textAlign = "center"
    ctx.baseLine = "middle"

    ctx.font = "bold 14px Arial"
    let dc = 12
    nodes.map(d => {
      ctx.beginPath()
      ctx.arc(d.x, d.y, dc, 0, 2 * Math.PI)
      if (d.key) {
        ctx.strokeStyle = "#7297d6";
        ctx.lineWidth = 5
      } else {
        ctx.strokeStyle = "black";
        ctx.lineWidth = 3
      }
      ctx.stroke()
      ctx.fillStyle = d.color ? d.color : "white"
      ctx.fill()

      ctx.lineWidth = 5
      ctx.fillStyle = "black"
      ctx.fillText(d.name, d.x, d.y + 5)
    })

    ctx.fillText(date, 70, 30)

    let img = canvas.toDataURL("image/png")

    saveImage(img)

  }, [dd, mm, yy, date])

  return (
    <div className="pagebreak">
      <canvas id="matrix"
        width={550} height={550}
        style={{ border: "1px solid #cccccc" }}
        ref={refCanvas}
      >
      </canvas>
      <h5>{s("Generated on " + (new Date()).toDateString() + " by using Matrix calculator. Copyright © MozgOFF, 2019")}</h5>
    </div>)
}

Box.defaultProps = {
  diam: 500,
  dx: 20, dy: 20
}

function checkNodes(nodes, id1, id2, id3) {

  // for check
  // nodes.map(d => {
  //   if ([id1, id2, id3].includes(d.id)) d.key=1
  // })

  let focusNodes = []
  nodes.map(d => {
    if (id1 === d.id) focusNodes.push(d)
  })
  nodes.map(d => {
    if (id2 === d.id) focusNodes.push(d)
  })
  nodes.map(d => {
    if (id3 === d.id) focusNodes.push(d)
  })

  let keys = checkKey(focusNodes.map(d => d.name))
  let a = keys.filter(i => i.b[0].m).length > 0
  let b = keys.filter(i => i.b[1].m).length > 0
  let c = keys.filter(i => i.b[2].m).length > 0

  if (!b) return

  if (a) focusNodes[0].key = 1
  if (b) focusNodes[1].key = 1
  if (c) focusNodes[2].key = 1
}

function checkNodes64(nodes, base) {
  checkNodes(nodes, base, i64(base + 1), i64(base + 2))
}

function checkKeysNodes(nodes) {

  checkNodes64(nodes, 0)
  checkNodes64(nodes, 8)
  checkNodes64(nodes, 16)
  checkNodes64(nodes, 24)
  checkNodes64(nodes, 32)
  checkNodes64(nodes, 40)
  checkNodes64(nodes, 48)
  checkNodes64(nodes, 56)

  checkNodes(nodes, i64(32 + 2), i256(0), i256(1))
  checkNodes(nodes, i64(48 + 2), i256(0), i256(2))

  for (let i = 0; i < 64 - 2; i++) {
    checkNodes(nodes, i, i + 1, i + 2)
  }

  return nodes
}