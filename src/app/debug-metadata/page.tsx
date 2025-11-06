import { Metadata } from 'next'

export default function MetadataDebug() {
  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1>Metadata Debug - Mi Piso España</h1>
      
      <h2>Imágenes de Open Graph disponibles:</h2>
      <ul>
        <li>
          <a href="/opengraph-image" target="_blank">
            Imagen principal de Open Graph
          </a>
        </li>
        <li>
          <a href="/twitter-image" target="_blank">
            Imagen de Twitter Card
          </a>
        </li>
        <li>
          <a href="/es/cities/madrid/opengraph-image" target="_blank">
            Open Graph - Madrid
          </a>
        </li>
        <li>
          <a href="/es/cities/barcelona/opengraph-image" target="_blank">
            Open Graph - Barcelona
          </a>
        </li>
      </ul>

      <h2>Herramientas de Testing:</h2>
      <ul>
        <li>
          <a
            href="https://developers.facebook.com/tools/debug/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook Sharing Debugger
          </a>
        </li>
        <li>
          <a
            href="https://cards-dev.twitter.com/validator"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter Card Validator
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/post-inspector/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn Post Inspector
          </a>
        </li>
      </ul>

      <h2>URLs para probar:</h2>
      <ul>
        <li>Página principal: {typeof window !== 'undefined' ? window.location.origin : 'https://mipisoespana.com'}</li>
        <li>Madrid: {typeof window !== 'undefined' ? window.location.origin : 'https://mipisoespana.com'}/es/cities/madrid</li>
        <li>Barcelona: {typeof window !== 'undefined' ? window.location.origin : 'https://mipisoespana.com'}/es/cities/barcelona</li>
      </ul>

      <p>
        <strong>Nota:</strong> Las imágenes se generan dinámicamente usando Next.js Image Generation. 
        Una vez que subas a producción, estas URLs funcionarán correctamente en redes sociales.
      </p>
    </div>
  )
}