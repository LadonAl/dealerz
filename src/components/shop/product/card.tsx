import styled, { useTheme } from "styled-components";
import { Product } from "../../../services";
import { Body1, Body2, Button, ButtonProps, H2, H5, H6, P } from "../../primitives";
import { Stars } from "./stars";
import { useNavigate } from "react-router-dom";
import { useOrder } from "../../../App";

const Image = styled.img`
  display: block;
  width: 400px;
  height: 406px;
  background-color: ${(props) => props.theme.colors.base.white};
`;

const Card1InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 400px;
  min-height: calc(640px - 406px);
  padding-inline: 40px;
  padding-block: 32px;
  background-color: ${(props) => props.theme.colors.base.white};
  h2 {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;

export const ButtonWrapper = styled.div`
  margin-block-start: 80px;
  text-align: center;
  button {
    margin-inline: auto;
  }
`;

interface CardProps extends React.PropsWithChildren {
  product: Product;
}

export const Card1: React.FC<CardProps> = function renderCard1({ product }) {
  const { id, title, image, category } = product;
  const navigate = useNavigate();

  return (
    <article>
      <Image src={image} alt={`${title} image`} />
      <Card1InfoWrapper>
        <div>
          <Body2 weight="bold">category {category}</Body2>
          <H2 weight="bold">{title}</H2>
        </div>
        <Button onClick={() => navigate(`/product/${id}`)} iconLeft="arrowRight" border="circle" onlyIcon />
      </Card1InfoWrapper>
    </article>
  );
};

const Card2Wrapper = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 451px;
  width: 400px;
  background: ${(props) => props.theme.colors.fill.image};
  border-radius: 6px;
  padding: 29px;

  flex-basis: 400px;
  min-width: 0;

  &::before {
    content: "SALE";
    position: absolute;
    top: 10px;
    left: 10px;
    background-color: ${(props) => props.theme.colors.primary[10]};
    color: ${(props) => props.theme.colors.secondary[50]};
    text-align: center;
    font-size: ${(props) => props.theme.font.size.body[2]};
    font-weight: ${(props) => props.theme.font.weight.semibold};
    padding: 6px;
    border-radius: 6px;
  }

  img {
    margin-block-end: auto;
    width: 100%;
    max-height: 75%;
  }

  h5 {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;

export const Card2: React.FC<CardProps> = function renderCard2({ product }) {
  const theme = useTheme();
  const { id, title, price, image } = product;
  const navigate = useNavigate();
  return (
    <Card2Wrapper onClick={() => navigate(`/product/${id}`)}>
      <img src={image} alt={`${title} image`} />
      <H5 weight="bold" align="center">
        {title}
      </H5>
      <Body2 align="center">Apple Cherry</Body2>
      <P align="center">
        <Body1 color={theme.colors.secondary[50]} weight="bold">
          ${(price * 0.85).toFixed(2)}
        </Body1>{" "}
        <Body1 color={theme.colors.text.body[2]} weight="bold">
          ${price.toFixed(2)}
        </Body1>
      </P>
    </Card2Wrapper>
  );
};

const Card3Wrapper = styled(Card2Wrapper)`
  height: 375px;
  width: 424px;
  background-color: ${(props) => props.theme.colors.base.white};
  &::before {
    content: unset;
  }

  img {
    max-height: 56%;
    object-fit: contain;
  }
`;

const addToWishlistButtonProps: ButtonProps = {
  onlyIcon: true,
  iconLeft: "heart",
  border: "rounded",
};

const AddToWishlistButton = styled(Button)`
  position: absolute;
  top: 11px;
  right: 10px;
  background-color: ${(props) => props.theme.colors.secondary[10]};
  height: 22px;
  width: 27px;
  &::before {
    height: 13px;
    width: 14px !important;
    background-color: ${(props) => props.theme.colors.secondary[50]};
  }
`;

export const Card3: React.FC<CardProps> = function renderCard3({ product }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const { order, setOrder } = useOrder();

  const { id, title, rating, category, price, image } = product;

  const productWishlistIndex = order.wishlistLines.findIndex((product) => product.id === id);
  const productInWishlist = ~productWishlistIndex;

  function toggleWishlist(e: any) {
    e.stopPropagation();

    if (productInWishlist) {
      const updatedWishlist = productWishlistIndex ? order.wishlistLines.splice(productWishlistIndex, 1) : [];
      return setOrder({ ...order, wishlistLines: updatedWishlist });
    }
    setOrder({ ...order, wishlistLines: [...order.wishlistLines, product] });
  }

  return (
    <Card3Wrapper onClick={() => navigate(`/product/${id}`)}>
      <AddToWishlistButton {...addToWishlistButtonProps} onClick={toggleWishlist} />
      <img src={image} alt={`${title} image`} />
      <H5 weight="bold" align="center">
        {title}
      </H5>
      {rating !== undefined && <Stars rating={rating.rate} />}
      <Body2 align="center">{category}</Body2>
      <Body1 align="center" weight="semibold" color={theme.colors.secondary[50]}>
        ${price.toFixed(2)}
      </Body1>
    </Card3Wrapper>
  );
};

const Card4Wrapper = styled.article`
  display: flex;
  align-items: center;
  height: 80px;
  width: 100%;

  img {
    height: 100%;
    aspect-ratio: 1;
    border-radius: 8px;
    margin-right: 24px;
  }

  h6 {
    margin-block-end: 8px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 70%;
  }
`;

export const Card4: React.FC<CardProps> = function renderCard4({ product }) {
  const theme = useTheme();
  const navigate = useNavigate();

  const { title, price, image, id } = product;

  return (
    <Card4Wrapper onClick={() => navigate(`/product/${id}`)}>
      <img src={image} alt={`${title} image`} />

      <div style={{ width: "77%" }}>
        <H6 weight="bold" color={theme.colors.text.title}>
          {title}
        </H6>
        <Body2 weight="semibold" color={theme.colors.secondary[50]}>
          ${price.toFixed(2)}
        </Body2>
      </div>
    </Card4Wrapper>
  );
};
