import { Paragraph, TextRun, Document, Packer, TableAnchorType, VerticalAlign, Table, Image } from "docx"
import { saveAs } from "file-saver"
import { resetIterator, getSerializeTab } from "./Storage"

function next() {
  return new Paragraph(getSerializeTab()).center()
}


export function docxReport() {
  resetIterator()

  const doc = new Document();

  const table = new Table({
    rows: 9,
    columns: 6,
  });

  table.getColumn(5).mergeCells(2, 3);
  table.getColumn(2).mergeCells(2, 3);

  let row = 0;
  table.getCell(row, 0).addParagraph(next());
  table.getRow(row).mergeCells(0, 1);
  table.getCell(row, 1).addParagraph(next());
  table.getRow(row).mergeCells(1, 4);

  row = 1;
  table.getCell(row, 0).addParagraph(next());
  table.getRow(row).mergeCells(0, 1);
  table.getCell(row, 1).addParagraph(next());
  table.getRow(row).mergeCells(1, 4);

  row = 2;
  table.getCell(row, 0).addParagraph(next());
  table.getCell(row, 1).addParagraph(next());
  table.getCell(row, 2).addParagraph(next()).setVerticalAlign(VerticalAlign.CENTER)
  table.getCell(row, 3).addParagraph(next());
  table.getCell(row, 4).addParagraph(next());
  table.getCell(row, 5).addParagraph(next()).setVerticalAlign(VerticalAlign.CENTER)

  row = 3;
  table.getCell(row, 0).addParagraph(next());
  table.getCell(row, 1).addParagraph(next());

  table.getCell(row, 3).addParagraph(next());
  table.getCell(row, 4).addParagraph(next());

  row = 4;
  table.getCell(row, 0).addParagraph(next());
  table.getRow(row).mergeCells(0, 1);
  table.getCell(row, 1).addParagraph(next());
  table.getCell(row, 2).addParagraph(next());
  table.getRow(row).mergeCells(2, 3);
  table.getCell(row, 3).addParagraph(next());

  row = 5
  table.getCell(row, 0).addParagraph(next());
  table.getRow(row).mergeCells(0, 1);
  table.getCell(row, 1).addParagraph(next());
  table.getRow(row).mergeCells(1, 4);

  row = 6
  table.getCell(row, 0).addParagraph(next());
  table.getRow(row).mergeCells(0, 1);
  table.getCell(row, 1).addParagraph(next());
  table.getCell(row, 2).addParagraph(next());
  table.getRow(row).mergeCells(2, 3);
  table.getCell(row, 3).addParagraph(next());

  row = 7
  table.getCell(row, 0).addParagraph(next());
  table.getRow(row).mergeCells(0, 1);
  table.getCell(row, 1).addParagraph(next());
  table.getCell(row, 2).addParagraph(next());
  table.getRow(row).mergeCells(2, 3);
  table.getCell(row, 3).addParagraph(next());

  row = 8
  table.getCell(row, 0).addParagraph(next());
  table.getRow(row).mergeCells(0, 1);
  table.getCell(row, 1).addParagraph(next());
  table.getCell(row, 2).addParagraph(next());
  table.getRow(row).mergeCells(2, 3);
  table.getCell(row, 3).addParagraph(next());

  const table2 = new Table({
    rows: 9,
    columns: 4,
  });

  for (let i = 0; i < 9; i++)
    for (let j = 0; j < 4; j++)
      table2.getCell(i, j).addParagraph(next());

  const tableY1 = new Table({
    rows: 17,
    columns: 8,
  });

  for (let i = 1; i < 17; i++)
    for (let j = 0; j < 8; j++)
      tableY1.getCell(i, j).addParagraph(next());

  const tableY2 = new Table({
    rows: 17,
    columns: 8,
  });


  for (let i = 1; i < 17; i++)
    for (let j = 0; j < 8; j++)
      tableY2.getCell(i, j).addParagraph(next());

  tableY1.getCell(0, 0).addParagraph(next());
  tableY1.getCell(0, 1).addParagraph(next());
  tableY1.getRow(0).mergeCells(1, 3);
  tableY1.getCell(0, 2).addParagraph(next());
  tableY1.getCell(0, 3).addParagraph(next());
  tableY1.getRow(0).mergeCells(3, 5);

  tableY2.getCell(0, 0).addParagraph(next());
  tableY2.getCell(0, 1).addParagraph(next());
  tableY2.getRow(0).mergeCells(1, 3);
  tableY2.getCell(0, 2).addParagraph(next());
  tableY2.getCell(0, 3).addParagraph(next());
  tableY2.getRow(0).mergeCells(3, 5);

  doc.addTable(table)
  doc.addParagraph(new Paragraph(""))
  doc.addTable(table2)
  doc.addParagraph(new Paragraph(""))
  doc.addTable(tableY1)
  doc.addParagraph(new Paragraph(""))
  doc.addTable(tableY2)
  doc.addParagraph(new Paragraph(""))

  const image = doc.createImage()

  doc.addParagraph(next())

  ////////////////////////////////////////////////////////////////////////////////////////////////
  const packer = new Packer();

  packer.toBlob(doc).then(blob => {
    saveAs(blob, "matrix.docx");
  });
}