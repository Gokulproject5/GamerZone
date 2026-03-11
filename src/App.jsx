import { Cart } from "./Component/Cart"
import Header from "./Component/Header"
import Hero from "./Component/Hero"
import ProductsData from "./ProductApi/ProductsData"


function App() {


  return (
    <>  
    <ProductsData>
      <Header />
      <Hero />
      <Cart />
      </ProductsData>
    </>
  )
}

export default App
