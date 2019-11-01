class SerializeTab {
}
SerializeTab.storage = []
SerializeTab.iterator = 0

export function cleanSerializeTab() {
  SerializeTab.storage = []
  SerializeTab.iterator = 0
}

export function addToSerializeTab(value) {

  if (typeof value === "object") {
    SerializeTab.storage.push(value)
    return value.value
  }

  SerializeTab.storage.push({ value })
  return value
}

export function getSerializeTab() {
  return SerializeTab.storage[SerializeTab.iterator++]
}

export function resetIterator() {
  SerializeTab.iterator = 0
}

export function saveImage(image) {
  SerializeTab.image = image
}

export function getImage() {
  return SerializeTab.image
}
