import { resetIterator, getSerializeTab, getImage } from "./Storage"
import { template } from "./template"
import createReport from 'docx-templates'

function next() {
  return getSerializeTab().value
}

export const docxReport = async ({ _page, _of }) => {

  resetIterator()

  const byteCharacters = atob(template)

  // image

  let data = {}

  // first table
  for (let i = 0; i < 32; i++) data["T1_" + i] = next()

  // second table
  for (let i = 0; i < 36; i++) data["T2_" + i] = next()

  // third table
  for (let i = 0; i < 128; i++) data["y" + i] = next()

  // fourth table
  for (let i = 0; i < 128; i++) data["z" + i] = next()

  // header for third table
  for (let i = 128; i < 132; i++) data["y" + i] = next()

  // header for fourth table
  for (let i = 128; i < 132; i++) data["z" + i] = next()

  // header
  data["header"] = next()

  // footer
  data["Page"] = _page
  data["of"] = _of

  const buffer = await createReport({
    template: byteCharacters,
    output: 'buffer',
    data,
    additionalJsContext: {
      qrCode: url => {
        //const dataUrl = createQrImage(url, { size: 500 });
        const data = getImage().slice('data:image/png;base64,'.length)
        return { width: 15, height: 15, data, extension: '.png' };
      },
    }
  })

  function fixNumber(number) {
    let value = number.toString()
    return value.length === 1 ? "0" + value : value
  }

  var m = new Date();
  var dateString = m.getUTCFullYear() + fixNumber(m.getUTCMonth() + 1) + fixNumber(m.getUTCDate())
    + "_" + fixNumber(m.getUTCHours()) + fixNumber(m.getUTCMinutes()) + fixNumber(m.getUTCSeconds())

  saveDataToFile(
    buffer,
    'matrix_' + dateString + '.docx',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  );
}


const saveDataToFile = (data, fileName, mimeType) => {
  const blob = new Blob([data], { type: mimeType });
  const url = window.URL.createObjectURL(blob);
  downloadURL(url, fileName, mimeType);
  setTimeout(() => {
    window.URL.revokeObjectURL(url);
  }, 1000);
};

const downloadURL = (data, fileName) => {
  const a = document.createElement('a');
  a.href = data;
  a.download = fileName;
  document.body.appendChild(a);
  a.style = 'display: none';
  a.click();
  a.remove();
};