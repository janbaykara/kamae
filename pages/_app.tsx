import '../styles/globals.css'
import Helmet from 'react-helmet';

function MyApp({ Component, pageProps }) {
  return (
    <>
    <Helmet>
      <title>Kamae Dice 🎲</title>
      <link
        href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css"
        rel="stylesheet"
      />
    </Helmet>
    <Component {...pageProps} />
    </>
  )
}

export default MyApp
