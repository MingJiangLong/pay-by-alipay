window.ubox_toast_timer = undefined

export function toast(message: string, duration = 1000) {

  const app = document.getElementById('app')
  if (!app) return;

  let divDom = document.getElementById('ubox-toast')

  if (divDom) {
    divDom.innerText = message
    clearTimeout(window.ubox_toast_timer)
  } else {
    divDom = document.createElement('div')
    divDom.style.position = 'absolute'
    divDom.style.maxWidth = '90%'
    divDom.style.top = '50%'
    divDom.style.left = '50%'
    divDom.style.transform = 'translate(-50%,-50%)'

    divDom.style.fontSize = '16px'
    divDom.style.fontWeight = '600'
    divDom.style.textAlign = 'center'
    divDom.style.color = '#ffffff'
    divDom.style.padding = '18px 15px'
    divDom.style.background = '#131415'
    divDom.style.borderRadius = '8px'
    divDom.style.zIndex = '300'
    divDom.innerText = message

    divDom.setAttribute('id', 'ubox-toast')
    app.appendChild(divDom)
  }

  window.ubox_toast_timer = setTimeout(() => {
    divDom?.remove()
    clearTimeout(window.ubox_toast_timer)
    window.ubox_toast_timer = undefined
  }, duration)
}