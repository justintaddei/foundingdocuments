export function isNewerVersion(newVer, oldVer) {
  const newArr = newVer.split();
  const oldArr = oldVer.split();

  for (let n = 0; n < newArr.length; n++) {
    if (newArr[n] > oldArr[n]) return true;
  }

  return false;
}
