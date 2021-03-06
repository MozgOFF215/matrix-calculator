import React, { memo } from "react"
import { Box } from "./Box"
import { Table } from "./Table"
import { YearsTable } from "./YearsTable"
import './Matrix.css'

export const Matrix = memo(({ alarm, date }) => {

  return (
    <div style={{ padding: 0 }}>
      <div className="container-flex">
        <Table date={date} />
        <YearsTable date={date} />
        <Box date={date} />
      </div>
    </div >)
})