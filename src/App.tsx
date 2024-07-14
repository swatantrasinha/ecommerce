import HomePage from './components/templates/home-page/HomePage'
 import { Routes, Route } from "react-router-dom"
import ProductDetailPage from './components/templates/product-detail-page/ProductDetailPage'
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    // delete localstorage data when app is removed
  return () => {
    if(window.localStorage.categoryData) {
      window.localStorage.removeItem("categoryData");
    }
  }
}, [])

 

  return (
    <div className="app">
          <Routes>
            <Route path="/" element={ <HomePage /> } />
            <Route path="/:categoryName/:productId" element={ <ProductDetailPage/> } />
        </Routes> 
    </div>
  )
}

export default App
