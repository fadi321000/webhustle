import { Link } from 'react-router-dom'

export function Brand() {
  return (
    <Link className="brand" to="/" aria-label="WebHustle home">
      <span className="brand-logo-frame"><img className="brand-logo" src="/webhustle-logo-transparent.png" alt="WebHustle — Design · Build · Grow" width="768" height="768" /></span>
    </Link>
  )
}
