import React, {Suspense, lazy} from "react";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";

import './scss/app.scss'

import MainLayout from "./layouts/MainLayout";

const Cart = lazy(() => import(/* webpackChunkName: "Cart" */ './pages/Cart'));
const FullPizza = lazy(() => import(/* webpackChunkName: "FullPizza" */ './pages/FullPizza'));
const NotFound = lazy(() => import(/* webpackChunkName: "NotFound" */ './pages/NotFound'));


function App() {

    return (
        <Routes>
            <Route path='/' element={<MainLayout />}>
                <Route path="" element={<Home />} />
                <Route path="cart" element={
                    <Suspense fallback={<div>LOADING...</div>}>
                        <Cart/>
                    </Suspense>} />
                <Route path="pizza/:id" element={
                    <Suspense fallback={<div>LOADING PIZZA...</div>}>
                        <FullPizza />
                    </Suspense>} />
                <Route path="*" element={
                    <Suspense fallback={<div>LOADING NOT FOUND PAGE</div>}>
                        <NotFound />
                    </Suspense>} />
            </Route>

        </Routes>


    )
}

export default App;
