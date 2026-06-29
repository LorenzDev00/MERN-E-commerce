import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import DefaultScreen from './screens/DefaultScreen';
import CartScreen from './screens/CartScreen';
import SignIn from './screens/SignIn';

// Components imports 
import Nav from './components/Navbar';
import Footer from './components/Footer'

import Container from 'react-bootstrap/esm/Container';
import ShippingAddressScreen from './screens/ShippingAdrScreen';
import SignUp from './screens/SignUp';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrder from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import SearchProducts from './screens/SearchProducts';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardScreen from './screens/DashboardScreen';
import DashboardScreen1 from './screens/DashboardScreen1';
import AdminRoute from './components/AdminRoute';

function App() {
  return (
    <PayPalScriptProvider deferLoading={true} options={{ "client-id" : process.env.PAYPAL_CLIENT_ID }}> 
    <BrowserRouter>
    <Nav />
      <Container>
        <Routes>
          <Route path="/product/:slug" element={<ProductScreen />} />
          <Route path="/" element={<DefaultScreen />} />
          <Route path="/cart" element={<CartScreen />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/productList" element={<HomeScreen />} />
          <Route path="/shipping" element={<ShippingAddressScreen />} />
          <Route path="/payment" element={<PaymentMethodScreen />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/placeorder" element={<PlaceOrder />} />
          <Route path="/order/:id" element={<OrderScreen />} />
          <Route
                path="/order/:id"
                element={
                  <ProtectedRoute>
                    <OrderScreen />
                  </ProtectedRoute>
                }
              ></Route>
          <Route path="/orderhistory" element={<OrderHistoryScreen />} element={
                  <ProtectedRoute>
                    <OrderHistoryScreen />
                  </ProtectedRoute>
                }/>
          <Route path="/profile" element={<ProfileScreen />} />
          <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfileScreen />
                  </ProtectedRoute>
                }
              />
          <Route path="/searchProducts" element={<SearchProducts/>} />
          <Route
                path="/admin/dashboard"
                element={
                  <AdminRoute>
                    <DashboardScreen />
                  </AdminRoute>
                }
              ></Route>
            <Route
                path="/admin/users"
                element={
                  <AdminRoute>
                    <DashboardScreen1 />
                  </AdminRoute>
                }
              ></Route>
        </Routes>
      </Container>
      <Footer />
    </BrowserRouter >
    </PayPalScriptProvider>
  );
}

export default App;
