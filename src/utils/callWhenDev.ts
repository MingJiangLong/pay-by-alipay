export default function (callback: (env: string) => void) {
  if (import.meta.env.MODE != 'prod') {
    typeof callback === 'function' && callback(import.meta.env.MODE)
  }
}