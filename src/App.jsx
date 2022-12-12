import { useState, useContext } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import {CotizadorContext} from './contexts/CotizadorApp'
import ProductForm from './components/ProductForm'
import ProductList from './components/ProductList'


function App() {


  return (
    <>
    <div className='container mt-5'>
    <ProductForm />
    <ProductList />
    </div>
    <div className="container mt-5">
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <div className="col-md-4 d-flex align-items-center">
          <span className="mb-3 mb-md-0 text-white fw-bold">
            &copy; 2022 ⚡ Powered by Samuel Berrú ⚡
          </span>
        </div>
        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
          <li className="ms-3">
            <a href="https://forms.gle/gopd51qgPBuVJRZ17" target="_blank" className='svg_social'>
              <img src="./coments.svg" alt="GitHub" width="30" height="30"/>
            </a> 
          </li>
          <li className="ms-3">
            <a href="https://twitter.com/samuel24_dev" target="_blank" className='svg_social'>
              <img src="./twitter.svg" alt="twitter" width="30" height="30"/>
            </a> 
          </li>
          <li className="ms-3">
            <a href="https://www.paypal.com/donate/?hosted_button_id=FXLEYP4FXC5B2" target="_blank" className='svg_social'>
              <img src="./paypal.svg" alt="paypal" width="30" height="30"/>
            </a> 
          </li>
        </ul>
      </footer>
    </div>
    
    </>
    
  )
}

export default App
