import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import styled, { useTheme } from "styled-components";
import { useOrder } from "../../App";
import { CartLine, getProduct, Product } from "../../services";
import { H5, NumberPicker, H1, Button } from "../primitives";

const CartItemContainer = styled.article`
  display: flex;
  gap: 40px;

  flex-direction: column;
  align-items: center;

  @media (min-width: ${(props) => props.theme.breakpoints.lg}) {
    flex-direction: row;
    align-items: unset;
  }
`;

const Image = styled.img`
  width: 200px;
  height: 200px;
  aspect-ratio: 1;
  background-color: ${(props) => props.theme.colors.fill.image};
`;

const CartItemDetails = styled.table`
  margin-block-start: 24px;
  margin-block-end: 21px;

  td:first-child {
    padding-inline-end: 1rem;
  }

  td:nth-child(2) {
    padding-inline-end: 4rem;
  }
`;

const CartItemPriceLine = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
  align-items: center;
  flex-direction: column;

  button {
    :first-of-type {
      margin-left: 2rem;
    }
    height: 40px;
  }

  @media (min-width: ${(props) => props.theme.breakpoints.md}) {
    flex-direction: row;
  }
`;

interface CartItemProps {
  lineIdx: number;
}

export const CartItem: React.FC<CartItemProps> = function renderCartItem({ lineIdx }) {
  const theme = useTheme();

  const { order, setOrder } = useOrder();

  const line = order.cartLines[lineIdx];

  const { data: product, status } = useQuery(["product", line.productId], () => getProduct(line.productId));

  function setQty(qty: number) {
    const update = order.cartLines.slice(0);
    update[lineIdx].quantity = qty;
    setOrder({ ...order, cartLines: update });
  }

  function removeLine() {
    let update: CartLine[] = order.cartLines.slice();
    update.splice(lineIdx, 1);
    setOrder({ ...order, cartLines: update });
  }

  function moveToWishlist() {
    let cartLines: CartLine[] = order.cartLines.slice();
    cartLines.splice(lineIdx, 1);
    let wishlistLines = order.wishlistLines;
    if (product) wishlistLines = [...wishlistLines, product];
    setOrder({ cartLines, wishlistLines });
  }

  if (status !== "success") return <></>;

  return (
    <CartItemContainer>
      <Image src={product.image} />
      <div>
        <H5 weight="bold" color={theme.colors.text.title}>
          {product.title}
        </H5>
        <CartItemDetails>
          <tr>
            <td>Size</td>
            <td>:</td>
            <td style={{ textAlign: "end", paddingInlineEnd: "0.5em" }}>M</td>
          </tr>
          <tr>
            <td>Quantity</td>
            <td>:</td>
            <td>
              <NumberPicker initialValue={line.quantity} bg="transparent" onChangeNumber={setQty} />
            </td>
          </tr>
        </CartItemDetails>
        <CartItemPriceLine>
          <H1 weight="bold" color={theme.colors.secondary[50]}>
            ${(line.quantity * product.price).toFixed(2)}
          </H1>
          <Button onClick={removeLine} iconRight="bin" size="medium" onlyIcon outline />
          <Button onClick={moveToWishlist} iconRight="heart" outline>
            Wishlist
          </Button>
        </CartItemPriceLine>
      </div>
    </CartItemContainer>
  );
};
