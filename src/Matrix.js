import React, { memo, useRef, useState, useEffect, useCallback } from "react"
import './Matrix.css'
import { Box2x2 } from "./Box"
import { Table } from "./Table"
import { YearsTable } from "./YearsTable"
import html2canvas from 'html2canvas'

export const Matrix = memo(({ alarm, date }) => {

  const [image, setImage] = useState(null)
  const refImgBox = useRef(null)

  let refCanvasBox = useCallback(node => {
    if (!node || image) return
    html2canvas(node)
      .then((sourceCanvas) => {

        let imgData = sourceCanvas.toDataURL('image/png')
        let img = new Image()
        img.onload = () => {
          setImage(img)
        }
        img.src = imgData
      })
  }, [image])

  useEffect(() => {
    if (image) {
      if (refImgBox.current.childNodes.length > 0) refImgBox.current.removeChild(refImgBox.current.childNodes[0])
      refImgBox.current.appendChild(image)
    }
  }, [refImgBox, image])

  useEffect(() => {
    setImage(null)
  }, [date])

  return (
    <div style={{ padding: 20 }}>

      <div className="container-flex">
        <div style={{ margin: 20 }}>
          <Table date={date} />
        </div>

        <div style={{ margin: 20 }}>
          <YearsTable date={date} />
        </div>
  
      {image && <div id="refImgBox" ref={refImgBox} className="container"></div>}
      {!image && <div id="refCanvasBox" ref={refCanvasBox}><Box2x2 date={date} ref={refCanvasBox} /></div>}
      </div>


    </div>)
})