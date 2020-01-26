import React, { useCallback, useState, useEffect } from "react"
import { dateParse, getPosX, getPosY, solve, checkTriplet, isDev } from './Utils'
import { saveImage, addToSerializeTab as s } from "./Storage"
import { localize } from "./Locale"
import { collectNames } from "./Components"

function newNode(id, value, grad, diam = 500, color = undefined) {
  let node = { id, value, x: getPosX(grad, diam), y: getPosY(grad, diam), color }

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

export const Box = localize(({ diam, dx, dy, date, pleaseClick }) => {
  let [highlightedNodes, setHighlightedNodes] = useState([])
  let [canvasDom, setCanvasDom] = useState()
  let [selectedNode, setSelectedNode] = useState()
  let { d: dd, m: mm, y: yy } = dateParse(date)

  const handler = useCallback(e => {
    let x = +e.offsetX
    let y = +e.offsetY
    let nodes = []
    if (isDev()) console.log(x + ' ' + y)

    for (let i = 0; i < highlightedNodes.length; i++) {
      let dot = highlightedNodes[i]
      let dx = x - dot.x
      let dy = y - dot.y
      if (dx * dx + dy * dy < 144) {
        // tipCanvas.style.left = (dot.x) + "px";
        // tipCanvas.style.top = (dot.y - 40) + "px";
        // tipCtx.clearRect(0, 0, tipCanvas.width, tipCanvas.height);
        // //                  tipCtx.rect(0,0,tipCanvas.width,tipCanvas.height);
        // tipCtx.fillText($(dot.tip).val(), 5, 15);
        // hit = true;
        if (isDev()) console.log(dot)
        nodes.push(dot)
      }

      if (nodes.length > 0) {
        setSelectedNode({
          x, y, name: collectNames(nodes.map(d=>d.PIds).flat())
        })
      }
      else setSelectedNode({ x, y })
    }
  },
    [highlightedNodes]
  )

  let refCanvas = useCallback(canvas => {
    let highlightedNodes = []
    if (!canvas) return
    let nodes = checkKeysNodes(createNodes(solve(dd, mm, yy)))
    let ctx = canvas.getContext("2d")
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.textAlign = "center"
    ctx.baseLine = "middle"

    ctx.font = "bold 14px Arial"
    let dc = 12
    nodes.map(d => {
      ctx.beginPath()
      ctx.arc(d.x, d.y, dc, 0, 2 * Math.PI)
      if (d.PIds && d.PIds.length > 0) {
        // highlighted
        highlightedNodes.push(d)
        ctx.strokeStyle = "#7297d6"
        ctx.lineWidth = 5
      } else {
        ctx.strokeStyle = "black"
        ctx.lineWidth = 3
      }
      ctx.stroke()
      ctx.fillStyle = d.color ? d.color : "white"
      ctx.fill()

      ctx.lineWidth = 5
      ctx.fillStyle = "black"
      ctx.fillText(d.value, d.x, d.y + 5)
    })

    ctx.fillText(date, 70, 30)

    let img = canvas.toDataURL("image/png")

    saveImage(img)
    setHighlightedNodes(highlightedNodes)
    setCanvasDom(canvas)
  }, [dd, mm, yy, date])

  useEffect(() => {
    if (!canvasDom) return
    const eventListener = event => handler(event)
    canvasDom.addEventListener('click', eventListener)
    return () => {
      canvasDom.removeEventListener('click', eventListener)
    }
  }, [canvasDom, handler])

  return (
    <div className="pagebreak">
      <canvas id="matrix"
        width={550} height={550}
        style={{ border: "1px solid #cccccc" }}
        ref={refCanvas}
      >
      </canvas>
      {(selectedNode && selectedNode.name) ? selectedNode.name : <div>{pleaseClick}</div>
      }
      <h5>{s("Generated on " + (new Date()).toDateString() + " by using Matrix calculator. Copyright © MozgOFF, 2019")}</h5>
    </div>)
})

Box.defaultProps = {
  diam: 500,
  dx: 20, dy: 20,
  pleaseClick: "Try clicking on the highlighted node.",
  "pleaseClick-de": "Versuchen auf den markierten Knoten zu klicken.",
  "pleaseClick-ru": "Попробуйте кликнуть по подсвеченному узлу"
}

function checkNodes(nodes, id1, id2, id3, isKarmicTail) {

  let a = nodes.find(d => id1 === d.id)
  let b = nodes.find(d => id2 === d.id)
  let c = nodes.find(d => id3 === d.id)

  let keys = checkTriplet(a.value, b.value, c.value, { fixOrder: isKarmicTail, isKarmicTail })

  let aPIds = !a.PIds ? [] : a.PIds
  let bPIds = !b.PIds ? [] : b.PIds
  let cPIds = !c.PIds ? [] : c.PIds

  a.PIds = [...new Set([...aPIds, ...keys[0]])]
  b.PIds = [...new Set([...bPIds, ...keys[1]])]
  c.PIds = [...new Set([...cPIds, ...keys[2]])]
}

function checkNodes64(nodes, base, isKarmicTail) {
  checkNodes(nodes, base, i64(base + 1), i64(base + 2), isKarmicTail)
}

function checkKeysNodes(nodes) {

  checkNodes64(nodes, 0)
  checkNodes64(nodes, 8)
  checkNodes64(nodes, 16)
  checkNodes64(nodes, 24)
  checkNodes64(nodes, 32)
  checkNodes64(nodes, 40)
  checkNodes(nodes, 48, i64(48 + 2), i64(48 + 1), true) // karmic tail 48, 114, 113
  checkNodes64(nodes, 56)

  checkNodes(nodes, i64(32 + 2), i256(0), i256(1))
  checkNodes(nodes, i64(48 + 2), i256(0), i256(2))

  for (let i = 0; i < 64 - 2; i++) {
    checkNodes(nodes, i, i + 1, i + 2)
  }

  return nodes
}