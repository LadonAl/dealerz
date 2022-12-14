import styled from "styled-components";
import { Particles1, Particles2 } from "./particles";

const BannerStyle = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 65vh;
  background-color: ${(props) => props.theme.colors.base.white};
  overflow: hidden;
  justify-content: space-between;
  gap: 32px;
  padding-inline: 2em;

  > *:not(svg) {
    z-index: 1;
  }

  padding-block: 96px;

  h1,
  p {
    text-align: center;
  }

  button {
    margin: auto;
  }

  @media (min-width: ${(props) => props.theme.breakpoints.lg}) {
    min-height: 45vh;
    padding-inline-start: 53%;
    padding-inline-end: 120px;
    padding-block-start: 135px;
    padding-block-end: 165px;

    h1,
    p {
      text-align: unset;
    }

    button {
      margin: unset;
    }
  }
`;

interface BannerProps extends React.PropsWithChildren {
  particles: 1 | 2;
}

export const Banner: React.FC<BannerProps> = function renderBannerWithParticles(props) {
  const { particles, children } = props;

  return (
    <BannerStyle>
      {[, <Particles1 />, <Particles2 />][particles]}
      {children}
    </BannerStyle>
  );
};
