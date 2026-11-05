import { donationUrl } from '../../config/donations.js'

function DonateLink({ label = 'Donate', className = 'button button--primary' }) {
  if (!donationUrl) return null

  return <a className={className} href={donationUrl} target="_blank" rel="noopener noreferrer">{label}</a>
}

export default DonateLink
