import React from 'react';
import ReactDOM from 'react-dom/client';
import "bootstrap/dist/css/bootstrap.min.css"
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import {PayPalScriptProvider} from '@paypal/react-paypal-js'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ShippingPage from './pages/ShippingPage';
import PaymentPage from './pages/PaymentPage';
import OrderPage from './pages/OrderPage';
import ProductEditPage from './pages/admin/ProductEditPage';
import ProfilePage from './pages/ProfilePage';
import PrivateRoute from './components/PrivateRoute';
import ProductListPage from './pages/admin/ProductListPage';
import OrderListPage from './pages/admin/OrderListPage';
import UserEditPage from './pages/admin/UserEditPage';
import UsersList from './pages/admin/UsersList';
import AdminRoute from './pages/admin/AdminRoute';
import { store } from './statemanagement/store';
import {Provider} from 'react-redux';
import PlaceOrder from './pages/PlaceOrder';
const router= createBrowserRouter(
  createRoutesFromElements(
    <Route  path='/' element={<App/>}>
      <Route index={true} path='/' element={<HomePage/>}/>
      <Route  path='/product/:id' element={<ProductPage/>}/>
      <Route  path='/cart' element={<CartPage/>}/>
      <Route  path='/login' element={<LoginPage/>}/>
      <Route  path='/register' element={<RegisterPage/>}/>
      <Route path='' element={<PrivateRoute/>}>
        <Route  path='/shipping' element={<ShippingPage/>}/>  
        <Route  path='/placeorder' element={<PlaceOrder/>}/>  
        <Route  path='/payment' element={<PaymentPage/>}/>
        <Route  path='/order/:id' element={<OrderPage/>}/>
        <Route  path='/profile' element={<ProfilePage/>}/>
      </Route>
      <Route path='' element={<AdminRoute/>}>
        <Route path='/admin/orderlist' element={<OrderListPage/>}/>
        <Route path='/admin/productslist' element={<ProductListPage/>}/>
        <Route path='/admin/product/:id/edit' element={<ProductEditPage/>}/>
         <Route path='/admin/userslist' element={<UsersList/>}/>
         <Route path='/admin/user/:id/edit' element={<UserEditPage/>}/> 

      </Route>
    </Route>
  )
)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Provider store={store}>
    <PayPalScriptProvider deferLoading={false}>
    <RouterProvider router={router}/>    
    </PayPalScriptProvider>
  </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
