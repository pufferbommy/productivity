export const getDataFromLocalStorage = (key, objKey) => {
  const value = JSON.parse(localStorage.getItem(key))[objKey]
  return value
}
