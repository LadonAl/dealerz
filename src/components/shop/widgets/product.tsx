import styled, { css, useTheme } from "styled-components";
import { Product } from "../../../services";
import { H5, H1, P, Body1, H3 } from "../../primitives";
import { ImageGallery, Stars } from "../product";
import { ProductQtyPicker } from "./productQtyPicker";
import { ProductReviews } from "./productReviews";

const ProductContainer = styled.section`
  display: grid;
  padding-block-start: 67px;
  padding-block-end: 164px;
  padding-inline: 32px;
  grid-template-columns: 1fr;
  background: linear-gradient(0deg, transparent 73%, ${(props) => props.theme.colors.base.white} 27%);

  > h3,
  > h5 {
    padding-block-end: 48px;

    &:not(:first-child) {
      padding-block: 48px;
    }

    @media (min-width: ${(props) => props.theme.breakpoints.md}) {
      grid-column: span 2;
    }
  }

  @media (min-width: ${(props) => props.theme.breakpoints.md}) {
    padding-inline: 90px;
    grid-template-columns: 1fr 1fr;
  }
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;

  @media (min-width: ${(props) => props.theme.breakpoints.md}) {
    padding-inline-end: 120px;
  }
`;

interface DetailsContainerProps {
  rows?: number;
  cols?: number;
}

const DetailsContainer = styled.div<DetailsContainerProps>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-inline-end: 28px;
  gap: 32px;
  ${(props) =>
    props.rows
      ? css`
          grid-row: span ${props.rows};
        `
      : ""}

  @media (min-width: ${(props) => props.theme.breakpoints.md}) {
    ${(props) =>
      props.cols
        ? css`
            grid-col: span ${props.cols};
          `
        : ""}
  }
`;

const Image = styled.div`
  background-color: ${(props) => props.theme.colors.fill.image};
  width: 100%;
  height: 100%;
  border-radius: 8px;
`;

interface ProductDetailsProps {
  product: Product;
}

export const ProductDetails: React.FC<ProductDetailsProps> = function renderProductDetails({ product }) {
  const theme = useTheme();

  return (
    <ProductContainer>
      <H5 weight="bold" color={theme.colors.text.title}>
        {"Grocery > Fruits > Japan Oranges"}
      </H5>
      <LeftContainer>
        <ImageGallery
          currentImage={0}
          images={[
            { src: product.image, alt: `${product.title} image` },
            { src: "dummy", alt: "dummy" },
            { src: "dummy", alt: "dummy" },
          ]}
        />
      </LeftContainer>
      <DetailsContainer>
        <H1 weight="bold" color={theme.colors.text.title}>
          {product.title}
        </H1>
        {product.rating && <Stars rating={product.rating.rate} size={32} align="start" />}
        <H1 weight="bold" color={theme.colors.secondary[50]}>
          ${product.price.toFixed(2)}
        </H1>
        <div>
          <H5 weight="bold" color={theme.colors.text.title} style={{ marginBlockEnd: "16px" }}>
            Details Product
          </H5>
          <P>
            <Body1 color={theme.colors.text.body[1]}>
              {product.description}
              <br />
              <br />
              Develop a website by finding a product identity that has value and branding to become a characteristic of a company. We will also facilitate the
              business marketing of these products with our SEO experts so that they become a ready-to-use website and help sell a product from the company.
              <br />
              <br />
              Develop a website by finding a product identity that has value and branding to become a characteristic of a company. We will also facilitate the
              business marketing of these products with our SEO experts so that they become a ready-to-use website and help sell a product from the company.
            </Body1>
          </P>
          <ProductQtyPicker product={product} />
        </div>
      </DetailsContainer>
      <H3 weight="bold" color={theme.colors.text.title}>
        Description
      </H3>
      <LeftContainer>
        <P>
          <Body1 color={theme.colors.text.body[2]}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
            laborum.
            <br />
            <br />
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
            inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
            fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit
            amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad
            minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure
            reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo.
          </Body1>
        </P>
      </LeftContainer>
      <DetailsContainer rows={2}>
        <Image />
      </DetailsContainer>
      <LeftContainer>
        <ProductReviews product={product} />
      </LeftContainer>
    </ProductContainer>
  );
};
