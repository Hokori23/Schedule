function isUndef(v) {
  return v === undefined || v === null
}

function isDef(v) {
  return v !== undefined && v !== null
}

module.exports = {
    isUndef,
    isDef
}