import { useEffect } from "react";
import { useQuery } from "react-query";
import { useOrder } from "../../App";
import { getCart } from "../../services";
import { Footer } from "./footer";
import { Header } from "./nav";

function getGeolocation(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject));
}

export const Layout: React.FC<React.PropsWithChildren> = function ({ children }) {
  const { data, status } = useQuery("cart", () => getCart(1));
  const { data: geo, status: geoStatus } = useQuery("geolocation", getGeolocation);
  const { order, setOrder } = useOrder();

  useEffect(() => {
    if (status === "success") {
      setOrder({ ...order, cartLines: data.products });
    }
  }, [data, status]);

  useEffect(() => {
    if (geoStatus === "success") {
      setOrder({ ...order, geolocation: geo });
    }
  }, [geo, geoStatus]);

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};
