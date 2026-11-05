import { demoImages } from '../../data/demoImages.js'

function DemoPhoto({ image, className = '', priority = false, decorative = false, sizes = '100vw' }) {
  const photo = demoImages[image]
  if (!photo) return null
  return <img className={className} src={photo.src} srcSet={`${photo.small} 800w, ${photo.src} ${photo.width}w`} sizes={sizes} width={photo.width} height={photo.height} alt={decorative ? '' : photo.alt} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} decoding="async" />
}
export default DemoPhoto
