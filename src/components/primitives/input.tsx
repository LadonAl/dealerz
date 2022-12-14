import { forwardRef } from "react";
import styled, { css } from "styled-components";
import { icons, Icon } from "../../assets";

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

interface InnerInputProps {
  outline?: boolean;
  primary?: boolean;
}

const InnerInput = styled.input<InnerInputProps>`
  border: unset;
  background: ${(props) => props.theme.colors.base.white};
  padding: 19px 30px;
  font-size: ${(props) => props.theme.font.size.body[1]};
  border-radius: 4px;
  width: 100%;

  ${(props) =>
    props.outline
      ? css`
          background: transparent;
          border: 1px solid ${props.theme.colors.base.black};
        `
      : ""}

  ${(props) =>
    props.primary
      ? css`
          background: ${props.theme.colors.primary[10]};
        `
      : ""}
`;

interface IconProps {
  icon?: Icon;
}
const IconComponent = styled.div<IconProps>`
  position: absolute;
  right: 4%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: 20px;
  width: 20px;
  mask-image: url(${(props) => props.icon && icons[props.icon]});
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: contain;
  background: ${(props) => props.theme.colors.fill.icon};
`;

export interface InputProps extends Omit<JSX.IntrinsicElements["input"], "ref"> {
  icon?: Icon;
  outline?: boolean;
  primary?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function renderInputWithOptionalIcon(props, ref) {
  const { icon, ...rest } = props;
  return (
    <Wrapper>
      <InnerInput ref={ref} {...rest} />
      {icon && <IconComponent icon={icon} />}
    </Wrapper>
  );
});
