
import './App.css'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import AdminProduct from './pages/admin-product/AdminProduct'
import ProductDetail from './pages/product-detail/ProductDetail'
import { Route, Routes } from 'react-router-dom'
import AdminGuard from './services/guard/AdminGuard'
import AdminUsers from './pages/admin-users/AdminUsers'
import Contact from './pages/contact/Contact'
import AboutUs from './pages/about-us/AboutUs'
import Register from './pages/register/Register'
import NotFound from './pages/not-found/NotFound'
import Layout from './layout/Layout'

function App() {

  return (
    <>
        <Routes> {/* Traigo este componente Routes (s final) importandolo de router-dom */}
          
          <Route path='/login' element={<Login/>} />
          
          <Route path="/" element={<Layout/>}>
            <Route index element={<Home/>}/> {/* Agrego una ruta para cuando (en este caso) este la carpeta raíz cargue el componente Home */}
            <Route path='contact' element={<Contact/>} />
            <Route path='about-us' element={<AboutUs/>} />
            <Route path='register' element={<Register/>} />

            <Route path='product-detail/:id' element={<ProductDetail/>}/> {/* No solo espera la ruta sino que recibe en este caso llamado ':id' / Ruta con params*/} 

            {/* Rutas protegidas: */}
            <Route path='admin-product' element={
            
              <AdminGuard>

                  {/* Componente hijo: children */}
                  <AdminProduct /> {/* Este hijo se muestra si cumple lo que dice el admin guard */}

              </AdminGuard>} 
            />

            <Route path='admin-users' element={
              <AdminGuard>
                  <AdminUsers/>
              </AdminGuard>
            }
            />

            <Route path='*' element={<NotFound/>} />
          </Route>
        </Routes>
    </>
  )
}

export default App
