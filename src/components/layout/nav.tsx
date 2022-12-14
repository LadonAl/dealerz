import _ from "underscore";
import styled, { css, useTheme } from "styled-components";
import { Body1, H3, Input, Wrapper } from "../primitives";
import { Icon, icons } from "../../assets";
import { useMediaQuery } from "react-responsive";
import { Link, useNavigate } from "react-router-dom";
import { useOrder } from "../../App";

interface NavProps {
  fill?: boolean;
}

export const Nav = styled.nav<NavProps>`
  display: flex;
  padding: 24px 94px;
  flex-wrap: wrap;
  justify-content: space-between;
  ${(props) => (props.fill ? `background-color: ${props.theme.colors.base.white}` : "")};

  @media (min-width: ${(props) => props.theme.breakpoints.sm}) {
    flex-wrap: nowrap;
  }
`;

export const Logo = styled(H3)`
  --font-multiplayer: 1;
  width: 100%;
  text-align: center;
  margin-bottom: 0.5em;
  font-weight: ${(props) => props.theme.font.weight.bold};
  color: ${(props) => props.theme.colors.secondary[50]};

  @media (min-width: ${(props) => props.theme.breakpoints.sm}) {
    flex-wrap: nowrap;
    margin-inline-end: auto;
    margin-bottom: 0;
    text-align: start;
  }
`;

export interface ContactLinkProps {
  icon: string;
}

export const ContactLink = styled.a`
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.colors.text.title};
  font-size: ${(props) => props.theme.font.size.body};
  font-weight: ${(props) => props.theme.font.weight.semibold};
  text-decoration: none;
  padding-inline-end: 1.5em;

  &::before {
    content: "";
    display: inline-block;
    mask-image: url(${icons.phone});
    mask-repeat: no-repeat;
    mask-position: center;
    mask-size: contain;
    padding-inline-end: 1em;
    height: 1em;
    width: 20px;
    background: ${(props) => props.theme.colors.text.title};
  }
`;

interface SpaceProps {
  direction?: "left" | "right";
}

export const Space = styled.div<SpaceProps>`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column-reverse;

  & > & {
    flex-direction: row;
    padding-block: 1.25em;
  }

  ${Wrapper} {
    width: 90%;
  }

  ${(props) => (props.direction ? "gap: 46px;" : "")};

  @media (min-width: ${(props) => props.theme.breakpoints.md}) {
    flex-direction: row-reverse;
    flex-wrap: wrap;
    ${(props) => (props.direction === "left" ? "justify-content: start;" : "")}
    ${(props) => (props.direction === "right" ? "justify-content: end;" : "")}

    & > & {
      padding-inline: 94px;
      padding-block-start: 32px;
      padding-block-end: 0;
      width: 50%;
    }

    ${Wrapper} {
      width: 100%;
      margin-inline: 94px;
      padding-block: 32px;
    }
  }

  @media (min-width: ${(props) => props.theme.breakpoints.lg}) {
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    padding: 28px 94px;

    & > & {
      padding: unset;
      width: unset;
    }

    ${Wrapper} {
      width: 100%;
      margin-inline: 64px;
      padding-block: 0;
    }
  }
`;

interface WidgetProps {
  icon: Icon;
  count?: number;
  onClick?: any;
}

export const WidgetContainer = styled.div<WidgetProps>`
  position: relative;
  height: 25px;
  width: 25px;
  cursor: pointer;
`;

export const WidgetIcon = styled.div<WidgetProps>`
  mask-image: url(${(props) => props.icon && icons[props.icon]});
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: contain;
  background: ${(props) => props.theme.colors.base.black};
  height: 100%;
  width: 100%;
`;

export const WidgetCount = styled.div<WidgetProps>`
  position: absolute;
  justify-content: center;
  align-items: center;
  top: -0.75em;
  right: -1em;
  display: ${(props) => (props.count ? "flex" : "none")};
  background-color: ${(props) => props.theme.colors.secondary[50]};
  height: 24px;
  width: 24px;
  border-radius: 100%;
`;

export const Widget: React.FC<WidgetProps> = function ({ icon, count, onClick }) {
  const theme = useTheme();

  return (
    <WidgetContainer icon={icon} count={count} onClick={onClick}>
      <WidgetIcon icon={icon} />
      <WidgetCount icon={icon} count={count}>
        <Body1 weight="semibold" color={theme.colors.base.white}>
          {count}
        </Body1>
      </WidgetCount>
    </WidgetContainer>
  );
};

export const Header = function renderHeaderFromNavComponents() {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMd = useMediaQuery({ query: `(min-width: ${theme.breakpoints.md})` });
  const isLg = useMediaQuery({ query: `(min-width: ${theme.breakpoints.lg})` });

  const { order } = useOrder();

  const menuBottom = [
    <Space direction="left" key="menu">
      <Link to="/shop">
        <Body1>Shop</Body1>
      </Link>
      <Link to="/">
        <Body1>Promo</Body1>
      </Link>
      <Link to="/">
        <Body1>About</Body1>
      </Link>
      <Link to="/">
        <Body1>Blog</Body1>
      </Link>
    </Space>,
    <Input type="text" placeholder="Search what you need" icon="search" key="search" />,
    <Space direction="right" key="widgets">
      <Widget icon="heart" count={order.wishlistLines.length} />
      <Widget icon="cart" count={order.cartLines.length} onClick={() => navigate("/checkout")} />
      <Widget icon="user" />
      <Widget icon="bell" />
    </Space>,
  ];

  if (isMd && !isLg) {
    menuBottom.unshift(menuBottom.pop() as JSX.Element);
  }

  return (
    <>
      <Nav fill>
        <Link to="/" style={{ textDecoration: "none", marginInlineEnd: "auto" }}>
          <Logo>Dealerz.</Logo>
        </Link>
        <ContactLink href="#">test</ContactLink>
        <ContactLink href="#">test</ContactLink>
      </Nav>
      <Space>{menuBottom}</Space>
    </>
  );
};
