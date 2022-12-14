import { Banner, Display, P, Body1, TopProducts, Checkout as CheckoutWidget } from "../components";

export const Checkout: React.FC = function renderCheckoutPage() {
  return (
    <>
      <Banner particles={2}>
        <Display weight="bold">
          Our Gallery, <br />
          Your Dreams!
        </Display>
        <P>
          <Body1>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, <br />
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Body1>
        </P>
      </Banner>
      <CheckoutWidget />
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
