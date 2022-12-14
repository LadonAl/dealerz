import styled, { css, DefaultTheme, ThemedStyledProps } from "styled-components";
import { icons, Icon } from "../../assets";

type Size = "small" | "medium" | "large";
type Border = "rounded" | "ellipse" | "circle";

export interface ButtonProps {
  iconLeft?: Icon;
  iconRight?: Icon;
  align?: "start" | "center" | "end";
  justify?: boolean;
  border?: Border;
  outline?: boolean;
  size?: Size;
  color?: string;
  onlyIcon?: boolean;
}

const paddingTop: { [size in Size]: string } = {
  small: "11px",
  medium: "14px",
  large: "18px",
};

const sizeMixin = css<ButtonProps>`
  padding: ${(props) => paddingTop[props.size as Size]} 24px;
`;

const border: { [border in Border]: string } = {
  rounded: "8px",
  ellipse: "28px",
  circle: "100%",
};

const borderMixin = css<ButtonProps>`
  border-radius: ${(props) => border[props.border as Border]};
`;

function _colorMixin(props: ThemedStyledProps<ButtonProps, DefaultTheme>) {
  const color = props.color || props.theme.colors.secondary[50];
  if (!props.outline) {
    return css`
      color: ${props.theme.colors.base.white};
      border: 2px solid ${color};
      background: ${color};
      &::before,
      &::after {
        background-color: ${props.theme.colors.base.white};
      }
    `;
  }
  return css`
    color: ${color};
    border: 2px solid ${color};
    background: transparent;
    &::before,
    &::after {
      background-color: ${color};
    }
  `;
}

const colorMixin = css<ButtonProps>`
  ${_colorMixin}
`;

const _onlyIconMixin = (props: ThemedStyledProps<ButtonProps, DefaultTheme>) =>
  props.onlyIcon
    ? css`
        padding: 0;
        aspect-ratio: 1;
        width: 40px;
        justify-content: center;
        align-items: center;
        &::before,
        &::after {
          /* @todo: get rid of important */
          padding: 0 !important;
          width: 12px !important;
          aspect-ratio: 1 !important;
        }
      `
    : "";

const iconMixin = css<ButtonProps>`
  ${_onlyIconMixin}

  &::before,
  &::after {
    content: "";
    display: inline-block;
    width: 18px;
    height: 20px;
    mask-repeat: no-repeat;
    mask-position: center;
    mask-size: contain;
  }

  &::before {
    content: "";
    padding-inline-end: 1em;
    mask-position-x: left;
    mask-image: url(${(props) => props.iconLeft && icons[props.iconLeft]});
    ${(props) => (!props.iconLeft || !icons[props.iconLeft] ? "display: none;" : "")}
  }

  &::after {
    padding-inline-start: 1em;
    mask-position-x: right;
    mask-image: url(${(props) => props.iconRight && icons[props.iconRight]});
    ${(props) => (!props.iconRight || !icons[props.iconRight] ? "display: none;" : "")}
  }
`;

export const Button = styled.button<ButtonProps>`
  display: flex;
  border: unset;
  background: unset;
  cursor: pointer;
  align-items: center;
  ${sizeMixin}
  ${borderMixin}
  ${colorMixin}
  ${iconMixin}
`;

Button.defaultProps = {
  size: "small",
  border: "rounded",
};
