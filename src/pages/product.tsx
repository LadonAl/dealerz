import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

import { TopProducts } from "../components";
import { ProductDetails } from "../components/shop/widgets/product";
import { getProduct } from "../services";

export const ProductPage: React.FC = function renderProductPage() {
  const { id } = useParams<"id">();

  if (!id) {
    return <>404</>;
  }

  const { data, status } = useQuery(["product", id], () => getProduct(id));

  if (status !== "success") {
    return <></>;
  }

  return (
    <>
      <ProductDetails product={data} />
      <TopProducts
        title="Top Items"
        subtitle={
          <>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod <br />
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
          </>
        }
      />
    </>
  );
};
