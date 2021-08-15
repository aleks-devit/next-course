import 'styles/globals.css'
import 'styles/index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import AppNavbar from "components/shared/AppNavbar";
import Hero from "components/shared/Hero";

function MyApp({ Component, pageProps }) {

  return (
    <div className='portfolio-app'>
      <AppNavbar/>
      <div className='container'>
        {}
        {Component.name === 'Home' && <Hero/>}
        <Component {...pageProps} />
        {
          Component.name === 'Home' && <footer id="sticky-footer" className="py-4 bg-black text-white-50 py-3">
            <div className="container text-center">
              <small>Copyright &copy; Your Website</small>
            </div>
          </footer>
        }
      </div>
    </div>
  )
}


export default MyApp
