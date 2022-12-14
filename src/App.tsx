import "react-range-slider-input/dist/style.css";
import { createBrowserRouter, RouterProvider, useLocation } from "react-router-dom";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import _ from "underscore";
import { Layout } from "./components";
import { Checkout, GalleryPage, Home, ProductPage, Shop } from "./pages";
import { theme } from "./theme";
import { QueryClientProvider, useQueries, useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { CartLine, createQueryClient, getCart, Product } from "./services";
import { createContext, useContext, useEffect, useState } from "react";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  
  body {
    margin: 0;
    font-family: ${(props) => props.theme.font.family};
    background-color: ${(props) => props.theme.colors.primary[10]}
  }
  
  button {
    font-family: "Mulish", sans-serif;
    font-weight: ${(props) => props.theme.font.weight.bold};
    font-size: 1rem;
  }

  img {
    object-fit: cover;
  }

  /* Find something that matches our setup better */
  .range-slider {
    height: 1px!important;
    background-color: ${(props) => props.theme.colors.fill.disabled}!important;
    margin-block-end: 17px;
  }

  .range-slider__thumb {
    height: 8px!important;
    width: 8px!important;
    background-color: ${(props) => props.theme.colors.fill.disabled}!important;
  }

  .range-slider__range {
    height: 2px!important;
    background-color: ${(props) => props.theme.colors.secondary[50]}!important;
  }
`;

const product = {
  id: 123,
  title: "Lorem Ipsum",
  category: "Wololo",
  price: 69.69,
  description: "Asdf asdF dsfads ",
  image: "DSaf",
  rating: {
    rate: 3.3,
    count: 33,
  },
};

const line = {
  productId: 123,
  quantity: 2,
};

const cart = {
  id: 12,
  userId: 32,
  products: [{ productId: 34, quantity: 12 }],
  date: "asdf",
};

const router = createBrowserRouter(
  [
    { path: "/", element: <Home /> },
    { path: "/shop", element: <Shop /> },
    { path: "/gallery", element: <GalleryPage /> },
    { path: "/product/:id", element: <ProductPage /> },
    { path: "/checkout", element: <Checkout /> },
  ].map((route) => ({
    // @todo: find a better way...
    ...route,
    element: (
      <Layout>
        <ScrollToTop />
        {route.element}
      </Layout>
    ),
  }))
);

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

interface OrderContext {
  cartLines: CartLine[];
  wishlistLines: Product[];
}

interface OrderContextHook {
  order: OrderContext;
  setOrder: (update: OrderContext) => void;
}

const initOrderState = { order: { cartLines: [], wishlistLines: [] }, setOrder: (update: OrderContext) => {} };

export const OrderContext = createContext<OrderContextHook>(initOrderState);

export function useOrder() {
  return useContext(OrderContext);
}

const App = function renderRootComponent() {
  const [order, setOrder] = useState<OrderContext>(initOrderState.order);

  return (
    <QueryClientProvider client={createQueryClient()}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <OrderContext.Provider value={{ order, setOrder }}>
          <RouterProvider router={router} />
        </OrderContext.Provider>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
