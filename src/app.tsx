import Cart from 'pages/Cart';
import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
  } from 'react-router-dom';
import Homepage from './pages/Homepage';

function App() {
    return(
    <section className="app">
        <BrowserRouter>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
        </BrowserRouter>
    </section>
    )
}

export default App;