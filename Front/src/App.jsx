import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { NavBar } from './components/NavBar/NavBar';
import { UserProvider } from './context/userContext';

import './App.css';
import { Home } from './views/Home/Home';
import { Footer } from './components/Footer';
import { Product } from './views/Product/Product';
import { Register } from './views/Auth/Register';
import { Login } from './views/Auth/Login';
import { Cart } from './views/Cart/Cart';
import { Admin } from './views/Admin/Admin';
import { User } from './views/User/User';
import { PurchaseCompleted } from './views/Auth/PurchaseCompleted';
import { RestorePassword } from './views/Auth/RestorePassword';

function App() {
    return (
        <UserProvider>
            <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route path="/api/v1/home" element={<Home />} />
                    <Route path="/api/v1/home/page/:pageNumber" element={<Home />} />
                    <Route path="/api/v1/home/category/:category/page/:pageNumber" element={<Home />} />
                    <Route path='/api/v1/login' element={<Login />} />
                    <Route path='/api/v1/register' element={<Register />} />
                    <Route path='/api/v1/product/:productId' element={<Product />} />
                    <Route path='/api/v1/admin' element={<Admin />} />
                    <Route path='/api/v1/profile' element={<User />} />
                    <Route path='/api/v1/cart' element={<Cart />} />
                    <Route path='/api/v1/restorePass/:token' element={<RestorePassword />} />
                    <Route path='/api/v1/purchaseCompleted' element={<PurchaseCompleted />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </UserProvider>
    );
}
export default App;
