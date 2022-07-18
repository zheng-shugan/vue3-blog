export function throttle(fn: Function, delay: number): Function {
  let last = 0
  let timer: any = null

  return function () {
    const that: any = this as any
    let context = that
    let args = arguments
    let now = +new Date()

    if (now - last < delay) {
      clearTimeout(timer)
      timer = setTimeout(function () {
        last = now
        fn.apply(context, args)
      }, delay)
    } else {
      last = now
      fn.apply(context, args)
    }
  }
}

export function setCookie(cName: string, value: any, expireDays: any): void {
  if (expireDays > 0 && expireDays !== '100') {
    let exdate = new Date()
    exdate.setDate(exdate.getDate() + expireDays)
    document.cookie = cName + '=' + escape(value) + (expireDays == null ? '' : ';expires=' + exdate.toUTCString())
  }

  if (expireDays === '100') {
    let exdate = new Date('2118-01-01 00:00:00')
    document.cookie = cName + '=' + escape(value) + (expireDays == null ? '' : ';expires=' + exdate.toUTCString())
  }
}

export function getCookie(cName: string): string | any {
  if (document.cookie.length > 0) {
    let cStart = document.cookie.indexOf(cName + '=')
    if (cStart !== -1) {
      cStart = cStart + cName.length + 1
      let cEnd = document.cookie.indexOf(';', cStart)
      if (cEnd === -1) cEnd = document.cookie.length

      return unescape(document.cookie.substring(cStart, cEnd))
    }
  }
  return ''
}

export function delCookie(name: string): void {
  let exp = new Date()
  exp.setTime(exp.getTime() - 1)
  let cookie = getCookie(name)
  if (cookie != null) {
    document.cookie = name + '=' + cookie + ';expires' + exp.toUTCString()
  }
}

export function clearCookie(name: string): void {
  setCookie(name, '', -1)
}

export function getQueryString(): string[] | string | any {
  let result = window.location.search.match(new RegExp('[?&][^?&]+=[^?&]+', 'g'))

  if (result == null || result.length < 1) return ''

  for (let i = 0; i < result.length; i++) result[i] = result[i].substring(1)

  return result
}

export function getQueryStringByName(name: string): string | any {
  let result = window.location.search.match(new RegExp('[?&]' + name + '=([^&]+)', 'i'))

  if (result == null || result.length < 1) return ''

  return result[1]
}

export function getScrollTop(): number | any {
  return Math.max(
    // Chrome
    document.body.scrollTop,
    // Firefox / IE
    document.documentElement.scrollTop,
  )
}

export function getDocumentHeight(): number | any {
  return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
}

export function getWindowHeight(): any {
  return document.compatMode === 'CSS1Compat' ? document.documentElement.clientHeight : document.body.clientHeight
}

// Format time: 2222-22-22 22:22:22
export function timestampToTime(timestamp: Date | any, dayMinSecFlag: boolean): string | any {
  const date = new Date(timestamp)
  const Y = date.getFullYear() + '-'
  const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  const D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' '
  const h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':'
  const m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':'
  const s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  if (!dayMinSecFlag) {
    return Y + M + D
  }
  return Y + M + D + h + m + s
}

export function isMobileOrPc(): boolean {
  if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
    return true
  } else {
    return false
  }
}
