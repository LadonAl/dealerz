import { useEffect } from "react";
import { useQuery } from "react-query";
import { useOrder } from "../../App";
import { getCart } from "../../services";
import { Footer } from "./footer";
import { Header } from "./nav";

export const Layout: React.FC<React.PropsWithChildren> = function ({ children }) {
  const { data, status } = useQuery("cart", () => getCart(1));
  const { order, setOrder } = useOrder();

  useEffect(() => {
    if (status === "success") {
      setOrder({ ...order, cartLines: data.products });
    }
  }, [data, status]);

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};
