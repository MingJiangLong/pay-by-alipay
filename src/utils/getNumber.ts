export default function (param: any) {

  let tempt = +param;
  if (isNaN(tempt)) return 0
  return tempt
}