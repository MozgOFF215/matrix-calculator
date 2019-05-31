import React, { useCallback } from "react"
import { dateParse, getPosX, getPosY, solve } from './Utils'

function newNode(name, grad, diam = 500, color = undefined) {
  let node = { name, x: getPosX(grad, diam), y: getPosY(grad, diam), color }

  return node
}

function newYearsNodes(data, startGrad, endGrad, startDiam, endDiam, color) {
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
    result.push(newNode(data[i], grad, diam, color))
  }
  return result
}

function createNodes({ a, b, c, d, e, a1, b1, c1, d1, a2, a3, a4, b2, b3, b4, c2, c3, d2, d3, c4, c41, c42, a12, b12, c12, d12, a13, b13, c13, d13, a04, b04,
  years1, years2, years3, years4, years5, years6, years7, years8 }) {
  let na = newNode(a, -90, 500, "#fce9fc") // "violet")
  let nb = newNode(b, 0, 500, "#fce9fc") // "violet")
  let nc = newNode(c, 90, 500, "#ffe6e6") //"red")
  let nd = newNode(d, 180, 500, "#ffe6e6") //"red")

  let ne = newNode(e, 0, 0, "#ffffcc") // "yellow")

  let na1 = newNode(a1, -45, 500, "#cccccc") // "gray")
  let nb1 = newNode(b1, 45, 500, "#cccccc") // "gray")
  let nc1 = newNode(c1, 90 + 45, 500, "#cccccc") // "gray")
  let nd1 = newNode(d1, 180 + 45, 500, "#cccccc") // "gray")

  let na2 = newNode(a2, -90, 350)
  let na3 = newNode(a3, -90, 425)
  let na4 = newNode(a4, -90, 275)

  let nb2 = newNode(b2, 0, 350)
  let nb3 = newNode(b3, 0, 425)
  let nb4 = newNode(b4, 0, 275)

  let nc2 = newNode(c2, 90, 350, "#ffedcc")// "orange")
  let nc3 = newNode(c3, 90, 425)

  let nd2 = newNode(d2, 180, 350, "#ffedcc")// "orange")
  let nd3 = newNode(d3, 180, 425)
  let nc4 = newNode(c4, 90 + 45, 270, "#cccccc") // "gray")
  let nc41 = newNode(c41, 90 + 30, 320, "#cccccc") // "gray")
  let nc42 = newNode(c42, 180 - 30, 320, "#cccccc") // "gray")
  let na12 = newNode(a12, -45, 350)
  let nb12 = newNode(b12, 45, 350)
  let nc12 = newNode(c12, 90 + 45, 350)
  let nd12 = newNode(d12, 180 + 45, 350)
  let na13 = newNode(a13, -45, 425)
  let nb13 = newNode(b13, 45, 425)
  let nc13 = newNode(c13, 90 + 45, 425)
  let nd13 = newNode(d13, 180 + 45, 425)
  let na04 = newNode(a04, -90, 180, "#e6ffe6") // "green")
  let nb04 = newNode(b04, 0, 180, "#e6ffe6") // "green")

  let start = 500
  let end = 100
  let color = "#f2f2f2" // "lightgray"

  let ny1 = newYearsNodes(years1, -90, -45, start, end, color)
  let ny2 = newYearsNodes(years2, -45, 0, start, end, color)
  let ny3 = newYearsNodes(years3, 0, 45, start, end, color)
  let ny4 = newYearsNodes(years4, 45, 90, start, end, color)
  let ny5 = newYearsNodes(years5, 90, 90 + 45, start, end, color)
  let ny6 = newYearsNodes(years6, 90 + 45, 180, start, end, color)
  let ny7 = newYearsNodes(years7, 180, 180 + 45, start, end, color)
  let ny8 = newYearsNodes(years8, 180 + 45, 180 + 90, start, end, color)

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
    let nodes = createNodes(solve(dd, mm, yy))
    let ctx = canvas.getContext("2d")
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.textAlign = "center"
    ctx.baseLine = "middle"

    ctx.font = "bold 14px Arial"
    let dc = 12
    nodes.map(d => {
      ctx.beginPath()
      ctx.arc(d.x, d.y, dc, 0, 2 * Math.PI)
      ctx.strokeStyle = "black";
      ctx.lineWidth = 3
      ctx.stroke()
      ctx.fillStyle = d.color ? d.color : "white"
      ctx.fill()

      ctx.lineWidth = 5
      ctx.fillStyle = "black"
      ctx.fillText(d.name, d.x, d.y + 5)
    })

    ctx.fillText(date, 70, 30)

  }, [dd, mm, yy, date])

  return (
    <div className="pagebreak">
      <canvas id="matrix"
        width={550} height={550}
        style={{ border: "1px solid #cccccc" }}
        ref={refCanvas}
      >
      </canvas>
      <h5>Generated on {(new Date()).toDateString()} by using Matrix calculator. Copyright © MozgOFF, 2019</h5>
    </div>)
}

Box.defaultProps = {
  diam: 500,
  dx: 20, dy: 20
}