class SerializeTab {

}

SerializeTab.storage = []
SerializeTab.iterator = 0

export function cleanSerializeTab() {
  SerializeTab.storage = []
}

export function addToSerializeTab(value) {
  SerializeTab.storage.push("" + value)
  return value
}

export function getSerializeTab() {
  return SerializeTab.storage[SerializeTab.iterator++]
}

export function resetIterator() {
  SerializeTab.iterator = 0
}
