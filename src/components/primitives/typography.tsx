import styled, { css } from "styled-components";

type Weight = "regular" | "semibold" | "bold";

type Transform = "capitalize" | "uppercase" | "lowercase" | "none";

type Align = "start" | "center" | "end";

export interface TypographyProps {
  weight?: Weight;
  transform?: Transform;
  align?: Align;
  color?: string;
}

const typographyDefaultProps: TypographyProps = {
  weight: "regular",
  transform: "none",
  align: "start",
};

const headerFontSizeMixin = (level: 1 | 2 | 3 | 4 | 5 | 6) => css`
  font-size: ${(props) => `calc(${props.theme.font.size.headers[level]} * var(--font-multiplayer))`};
`;

const typographyMixin = css<TypographyProps>`
  --font-multiplayer: 0.8;
  margin: 0;
  font-weight: ${(props) => props.theme.font.weight[props.weight as Weight]};
  text-align: ${(props) => props.align};
  text-transform: ${(props) => props.transform};
  ${(props) => (props.color ? `color: ${props.color};` : "")}

  @media (min-width: ${(props) => props.theme.breakpoints.sm}) {
    --font-multiplayer: 0.87;
  }

  @media (min-width: ${(props) => props.theme.breakpoints.md}) {
    --font-multiplayer: 0.94;
  }

  @media (min-width: ${(props) => props.theme.breakpoints.md}) {
    --font-multiplayer: 1;
  }
`;

const headerMixin = (level: 1 | 2 | 3 | 4 | 5 | 6) => css`
  ${headerFontSizeMixin(level)}
  ${typographyMixin}
`;

export const H1 = styled.h1<TypographyProps>`
  ${headerMixin(1)}
  line-height: 74px;
  letter-spacing: 0.003em;
`;

H1.defaultProps = typographyDefaultProps;

export const H2 = styled.h2<TypographyProps>`
  ${headerMixin(2)}
  line-height: 58px;
  letter-spacing: 0.005em;
`;

H2.defaultProps = typographyDefaultProps;

export const H3 = styled.h3<TypographyProps>`
  ${headerMixin(3)}
  line-height: 47px;
  letter-spacing: 0.005em;
`;

H3.defaultProps = typographyDefaultProps;

export const H4 = styled.h4<TypographyProps>`
  ${headerMixin(4)}
  line-height: 37px;
  letter-spacing: 0.005em;
`;

H4.defaultProps = typographyDefaultProps;

export const H5 = styled.h5<TypographyProps>`
  ${headerMixin(5)}
  line-height: 29px;
  letter-spacing: 0.005em;
`;

H5.defaultProps = typographyDefaultProps;

export const H6 = styled.h6<TypographyProps>`
  ${headerMixin(6)}
  line-height: 19px;
  letter-spacing: 0.005em;
`;

H6.defaultProps = typographyDefaultProps;

export const Display = styled.h1`
  ${typographyMixin}
  font-size: ${(props) => `calc(${props.theme.font.size.display} * var(--font-multiplayer))`};
  line-height: 77px;
  letter-spacing: 0.003em;
`;

Display.defaultProps = typographyDefaultProps;

export const Headline = styled.h1`
  ${typographyMixin}
  font-size: ${(props) => props.theme.font.size.headline};
  line-height: 19px;
  letter-spacing: 0.005em;
  text-align: left;
`;

Headline.defaultProps = typographyDefaultProps;

export const Body1 = styled.span`
  color: ${(props) => props.theme.colors.text.body[1]};
  ${typographyMixin}
  font-size: ${(props) => props.theme.font.size.body[1]};
  line-height: 19px;
  letter-spacing: 0.005em;
`;

Body1.defaultProps = typographyDefaultProps;

export const Body2 = styled.span`
  color: ${(props) => props.theme.colors.text.body[2]};
  ${typographyMixin}
  font-size: ${(props) => props.theme.font.size.body[2]};
  line-height: 18px;
  letter-spacing: 0.008em;
`;

Body2.defaultProps = typographyDefaultProps;

export const Caption = styled.span`
  ${typographyMixin}
  font-size: ${(props) => props.theme.font.size.caption};
  line-height: 13px;
  letter-spacing: 0.008em;
`;

Caption.defaultProps = typographyDefaultProps;

export const Notification = styled.span`
  ${typographyMixin}
  font-size: ${(props) => props.theme.font.size.notification};
  line-height: 10px;
  letter-spacing: 0.008em;
`;

Notification.defaultProps = typographyDefaultProps;

export const Menu1 = styled.span`
  ${typographyMixin}
  font-size: ${(props) => props.theme.font.size.menu[1]};
  line-height: 19px;
  letter-spacing: 0.005em;
`;

Menu1.defaultProps = typographyDefaultProps;

export const Menu2 = styled.span`
  ${typographyMixin}
  font-size: ${(props) => props.theme.font.size.menu[2]};
  line-height: 17px;
  letter-spacing: 0.005em;
`;

Menu2.defaultProps = typographyDefaultProps;

export const P = styled.p`
  ${typographyMixin}
`;

P.defaultProps = typographyDefaultProps;
