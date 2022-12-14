import { QueryCache, QueryObserver, useQueries, useQueryClient } from "react-query";
import styled, { useTheme } from "styled-components";
import _ from "underscore";
import { size } from "underscore";
import { useOrder } from "../../../App";
import { Cart, getProduct } from "../../../services";
import { Menu1, H2, Input, Button, H5 } from "../../primitives";
import { CartComponent } from "../cart";

const cart: Cart = {
  id: 12,
  userId: 32,
  products: [{ productId: 34, quantity: 12 }],
  date: "asdf",
};

const CheckoutWrapper = styled.section`
  display: grid;
  gap: 118px;
  padding: 120px 64px;

  > h2 {
    @media (min-width: ${(props) => props.theme.breakpoints.md}) {
      grid-column: span 2;
    }
  }

  @media (min-width: ${(props) => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr 1fr;
    padding: 120px 103px;
  }
`;

const StepsWrapper = styled.div`
  display: flex;
  gap: 40px;

  @media (min-width: ${(props) => props.theme.breakpoints.md}) {
    grid-column: span 2;
  }
`;

const CouponWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 26px 49px;
  background-color: ${(props) => props.theme.colors.base.white};
  border-radius: 8px;
`;

const CartTotalsWrapper = styled.section`
  margin-block-start: 80px;
`;

const CartTotalsTable = styled.table`
  width: 100%;
  margin-block-start: 32px;
  margin-block-end: 56px;

  td {
    padding-block-end: 24px;
  }

  td:first-child {
    padding-inline-end: 4em;
  }

  td:nth-child {
    padding-inline-end: 6em;
  }

  td:last-child {
    text-align: end;
  }

  + button {
    width: 100%;
    justify-content: center;
  }
`;

export const Checkout: React.FC = function renderCheckoutWidget() {
  const theme = useTheme();
  const { order } = useOrder();

  // should be fine. React-query should throttle the possible duplicate "GET product" call
  // since the keys match with those in CartItem
  const products = useQueries(order.cartLines.map(({ productId }) => ({ queryKey: ["product", productId], queryFn: () => getProduct(productId) })));

  if (!products.every((product) => product.status === "success")) return <></>;

  const productById = _.chain(products)
    .map((product) => product.data)
    .indexBy("id")
    .value();

  const total = order.cartLines
    .map((line) => line.quantity * (productById[line.productId]?.price ?? 0))
    .reduce((a, b) => a + b, 0)
    .toFixed(2);

  return (
    <CheckoutWrapper>
      <StepsWrapper>
        <Menu1 weight="bold" color={theme.colors.text.title}>
          1. Shopping Cart
        </Menu1>
        <Menu1 weight="bold" color={theme.colors.text.body[2]}>
          2. Checkout
        </Menu1>
        <Menu1 weight="bold" color={theme.colors.text.body[2]}>
          3. Order Succeeded
        </Menu1>
      </StepsWrapper>
      <H2 weight="bold" color={theme.colors.text.title}>
        My Cart
      </H2>
      <CartComponent />
      <div>
        <CouponWrapper>
          <H5 weight="bold" color={theme.colors.text.title}>
            Have a Coupon?
          </H5>
          <Input placeholder="Coupon Number" outline />
          <div>
            <Button size="medium">Apply</Button>
          </div>
        </CouponWrapper>
        <CartTotalsWrapper>
          <H5 weight="bold" color={theme.colors.text.title}>
            Cart Totals
          </H5>
          <CartTotalsTable>
            <tr>
              <td>
                <Menu1 weight="bold">Subtotal</Menu1>
              </td>
              <td>
                <Menu1>${total}</Menu1>
              </td>
              <td />
            </tr>
            <tr>
              <td>
                <Menu1 weight="bold">Shipping</Menu1>
              </td>
              <td>
                <Menu1>Free Shipping</Menu1>
              </td>
              <td />
            </tr>
            <tr>
              <td />
              <td>
                <Menu1>Shipping to Sidney</Menu1>
              </td>
              <td>
                <Menu1 weight="bold" color={theme.colors.secondary[50]}>
                  Change
                </Menu1>
              </td>
            </tr>
            <tr>
              <td>
                <Menu1 weight="bold">Total</Menu1>
              </td>
              <td>
                <Menu1 weight="bold">${total}</Menu1>
              </td>
              <td />
            </tr>
          </CartTotalsTable>
          <Button size="large">Checkout</Button>
        </CartTotalsWrapper>
      </div>
    </CheckoutWrapper>
  );
};
