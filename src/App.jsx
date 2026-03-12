import { Cart } from "./Component/Cart"
import Dashboard from "./Component/Dashboard"
import Header from "./Component/Header"
import Hero from "./Component/Hero"
import Login from "./Component/Login"
import ResetPassword from "./Component/ResetPassword"
import ProductsData from "./ProductApi/ProductsData"
import { BrowserRouter as Router , Route ,Routes } from "react-router"
import Footer from  "./Component/Footer"
import SignUp from "./Component/SignUp"
function App() {


  return (
    <>  
    <ProductsData>
     
      <Router>
         <Header />
         <Cart />
         
        <Routes >

          <Route path="/" element={<Hero />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/update-password" element={<ResetPassword />} />
        </Routes>
      </Router>
      </ProductsData>
      
    </>
  )
}

export default App
