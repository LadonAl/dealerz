import { useState } from "react";
import styled from "styled-components";
import { useOrder } from "../../../App";
import { Product } from "../../../services";
import { theme } from "../../../theme";
import { H6, NumberPicker, Button } from "../../primitives";

interface ProductQtyPickerProps {
  product: Product;
}

const SpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-block-end: 31px;
`;

const ProductQtyPickerContainer = styled.div`
  margin-block-start: 32px;
`;

const ProductQtyPickerButtonContainer = styled.div`
  button {
    display: inline-flex;
    margin-inline-end: 2em;
    margin-block-start: 44px;
  }
`;

export const ProductQtyPicker: React.FC<ProductQtyPickerProps> = function renderProductQuantityPicker({ product }) {
  const [qty, setQty] = useState<number>(1);
  const { order, setOrder } = useOrder();

  const productWishlistIndex = order.wishlistLines.findIndex(({ id }) => product.id === id);
  const productInWishlist = ~productWishlistIndex;

  function toggleWishlist(e: any) {
    e.stopPropagation();

    if (productInWishlist) {
      const updatedWishlist = productWishlistIndex ? order.wishlistLines.splice(productWishlistIndex, 1) : [];
      return setOrder({ ...order, wishlistLines: updatedWishlist });
    }
    setOrder({ ...order, wishlistLines: [...order.wishlistLines, product] });
  }

  function addLine() {
    setOrder({ ...order, cartLines: [...order.cartLines, { productId: product.id, quantity: qty }] });
  }

  return (
    <ProductQtyPickerContainer>
      <SpaceBetween>
        <H6 weight="bold">Quantity</H6>
        <NumberPicker onChangeNumber={setQty} />
        <H6 weight="bold" color={theme.colors.secondary[50]}>
          Add note
        </H6>
      </SpaceBetween>
      <SpaceBetween>
        <H6 weight="bold">Sub Total</H6>
        <H6 weight="bold">${(product.price * qty).toFixed(2)}</H6>
      </SpaceBetween>
      <ProductQtyPickerButtonContainer>
        <Button onClick={toggleWishlist} size="large" iconRight="heart" outline>
          Wishlist
        </Button>
        <Button size="large" iconRight="cart" onClick={addLine}>
          Add to Cart
        </Button>
      </ProductQtyPickerButtonContainer>
    </ProductQtyPickerContainer>
  );
};
