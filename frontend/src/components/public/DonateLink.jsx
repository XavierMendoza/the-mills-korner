import { donationUrl } from '../../config/donations.js'

function DonateLink({ label = 'Donate', className = 'button button--primary', url = donationUrl }) {
  if (!url) return null

  return <a className={className} href={url} target="_blank" rel="noopener noreferrer">{label}</a>
}

export default DonateLink
