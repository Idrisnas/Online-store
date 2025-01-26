import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Homepage from "./pages/Homepage";
import Cartpage from "./pages/Cartpage";
import Productpage from "./pages/Productpage";
import Footer from "./components/Footer";
import { CartProvider } from "./context/CartContext";
import { FilterProvider } from "./context/FilterContext";
import Admin from "./pages/Admin";
// import AdminSignIn from "./pages/AdminSignIn";
import AdminDashboard from "./pages/AdminDashboard";
import Category from "./pages/Category";
import AdminSignIn from "./pages/AdminSignIn";
import AddProduct from "./pages/AddProduct";
import FProductPage from "./pages/FproductPage";
import CategoryPage from "./pages/CategoryPage";

function App() {
  return (
    <CartProvider>
      <FilterProvider>
        <Router>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Homepage />}></Route>
                <Route path="/product/:id" element={<Productpage />}></Route>
                <Route path="/cart" element={<Cartpage />}></Route>
                <Route path="/admin" element={<Admin />}></Route>
                <Route path="signin" element={<AdminSignIn />}></Route>

               


                <Route path="dashboard" element={<AdminDashboard />}></Route>
                <Route path="addproduct" element={<AddProduct />}></Route>

                <Route path="/category/" element={<Category />} />


                <Route path="/categories" element={<CategoryPage />} />
        <Route path="/products/:categoryId" element={<FProductPage />} />
    

              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </FilterProvider>
    </CartProvider>
  );
}
export default App;
