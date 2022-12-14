import { useState } from "react";
import styled from "styled-components";
import _ from "underscore";
import { useOrder } from "../../App";

import { CartItem } from "./cartItem";

const CartComponentWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 56px;
`;

interface LineTotal {
  [id: string]: number;
}

export const CartComponent: React.FC = function renderCart() {
  const { order } = useOrder();
  const [lineTotals, setLineTotals] = useState<LineTotal>({});

  return (
    <CartComponentWrapper>
      {order.cartLines.map((line, idx) => (
        <CartItem lineIdx={idx} key={idx} />
      ))}
    </CartComponentWrapper>
  );
};
