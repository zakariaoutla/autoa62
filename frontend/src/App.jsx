import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home/Home'
import NavBar from './components/Home/NavBar'
import Footer from './components/Home/Footer'
import LogIn from './pages/LogIn'
import Signup from './pages/Singup'
import PrivateRoute from './components/PrivateRoute'
import BookPage from './pages/Home/BookPage'
import Userdashboard from './pages/Home/Userdashboard'
import CarPage from './pages/Home/CarPage'
import ScrollToTop from './components/ScrollToTop'
import Cars from './pages/Home/Cars'
import Availabcar from './pages/Home/Availabcar'
import AboutUs from './pages/Home/AboutUs'
import ContactUs from './pages/Home/ContactUs'
import AdminLayout from './AdminLayout'
import Dashboard from './pages/Admin/Dashboard'
import Vehicles from './pages/Admin/Vehicles'
import NewCar from './pages/Admin/NewCar'
import EditProduct from './pages/Admin/EditProduct'
import Rentals from './pages/Admin/Rentals'
import Customers from './pages/Admin/Customers'
import Payments from './pages/Admin/Payments'

function App() {

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path='/' element={
          <>
            <NavBar />
            <Home />
            <Footer />
          </>
        } />
        
        <Route path='/about-us' element={
          <>
            <NavBar />
            <AboutUs />
            <Footer />
          </>
        } />
        <Route path='/support' element={
          <>
            <NavBar />
            <ContactUs />
            <Footer />
          </>
        } />
        <Route path='/car/:id' element={
          <>
            <NavBar />
            <CarPage />
            <Footer />
          </>
        } />
        <Route path='/cars' element={
          <>
            <NavBar />
            <Cars />
            <Footer />
          </>
        } />

        <Route path='/available-cars' element={
          <>
            <NavBar />
            <Availabcar />
            <Footer />
          </>
        } />




        <Route element={<PrivateRoute allowedRoles={['client']} />}>
          <Route path="/book/:id" element={
            <>
              <NavBar />
              <BookPage />
              <Footer />
            </>
          } />
          <Route path="/myaccount/:id" element={
            <>
              <NavBar />
              <Userdashboard />
              <Footer />
            </>
          } />
        </Route>




        <Route element={<PrivateRoute allowedRoles={['admin']} />}>
          <Route path='/admin' element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path='vehicles' element={<Vehicles />} />
            <Route path='add-car' element={<NewCar />} />
            <Route path='edit-car/:id' element={<EditProduct />} />
            <Route path='rentals' element={<Rentals />} />
            <Route path='customers' element={<Customers />} />
            <Route path='payments' element={<Payments />} />
          </Route>
        </Route>


        <Route path='/singup' element={<Signup />} />
        <Route path='/log-in' element={<LogIn />} />
      </Routes>



    </>

  )
}

export default App
