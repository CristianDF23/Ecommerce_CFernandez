import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { NavBar } from './components/NavBar/NavBar';
import { UserProvider } from './context/userContext';

import './App.css';
import { Home } from './views/Home';
import { Footer } from './components/Footer';
import { Product } from './views/Product';
import { Register } from './views/Register';
import { Login } from './views/Login';
import { Cart } from './views/Cart';
import { Admin } from './views/Admin';
import { User } from './views/User';
import { PurchaseCompleted } from './views/PurchaseCompleted';
import { RestorePassword } from './views/RestorePassword';

function App() {
    return (
        <UserProvider>
            <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/page/:page" element={<Home />} />
                    <Route path="/category/:cat/page/:pag" element={<Home />} />
                    <Route path='/product/:id' element={<Product />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/restorePass/:token' element={<RestorePassword/>}/>
                    <Route path='/cart' element={<Cart />} />
                    <Route path='/admin' element={<Admin />} />
                    <Route path='/profile' element={<User />} />
                    <Route path='/purchaseCompleted' element={<PurchaseCompleted/>}/>
                </Routes>
                <Footer />
            </BrowserRouter>
        </UserProvider>
    );
}
export default App;
