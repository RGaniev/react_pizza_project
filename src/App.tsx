import React, { Suspense } from "react";
import Home from "./pages/Home";
import Header from "./components/Header";

import { Route, Routes } from "react-router-dom";

const Cart = React.lazy(
  () => import(/* webpackChunkName: 'CartComponent' */ "./pages/Cart")
);
const FullPizza = React.lazy(
  () => import(/* webpackChunkName: 'FullPizzaComponent' */ "./pages/FullPizza")
);
const NotFound = React.lazy(
  () => import(/* webpackChunkName: 'NotFoundComponent' */ "./pages/NotFound")
);

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/cart"
              element={
                <Suspense
                  fallback={
                    <div style={{ textAlign: "center", fontSize: "32px" }}>
                      Загрузка корзины...
                    </div>
                  }
                >
                  <Cart />
                </Suspense>
              }
            />
            <Route
              path="/pizza/:id"
              element={
                <Suspense>
                  <FullPizza />
                </Suspense>
              }
            />
            <Route
              path="*"
              element={
                <Suspense
                  fallback={
                    <div style={{ textAlign: "center", fontSize: "32px" }}>
                      Загрузка...
                    </div>
                  }
                >
                  <NotFound />
                </Suspense>
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
