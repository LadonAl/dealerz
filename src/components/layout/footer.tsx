import styled from "styled-components";
import { theme } from "../../theme";
import { Section, H2, Body1, Input, Display, H6 } from "../primitives";

const NewsWrapper = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-block-start: 94px;
  padding-block-end: 80px;
  background-color: ${(props) => props.theme.colors.base.white};
  padding-inline: 64px;
  min-height: 560px;

  @media (min-width: ${(props) => props.theme.breakpoints.md}) {
    min-height: 408px;
    padding-inline: 210px;
  }
`;

const News = function () {
  return (
    <Section>
      <NewsWrapper>
        <H2 weight="bold" color={theme.colors.text.title} align="center">
          Join Our News Letters
        </H2>
        <Body1 color={theme.colors.text.body[2]} align="center">
          Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster
        </Body1>
        <Input placeholder="Insert your email here" primary />
      </NewsWrapper>
    </Section>
  );
};

const Social = styled.div`
  display: inline-flex;
  width: 40px;
  height: 40px;
  aspect-ratio: 1;
  background-color: ${(props) => props.theme.colors.secondary[50]};
  border-radius: 100%;
  align-items: center;
  justify-content: center;
  margin-inline-end: 1em;
  margin-block-end: 1em;
`;

const Image = styled.div`
  height: 360px;
  width: 360px;
  aspect-ratio: 1;
  background-color: ${(props) => props.theme.colors.fill.image};
`;

const DetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  height: 100%;

  > :last-child {
    margin-block-start: auto;
  }
`;

const FooterWrapper = styled.footer`
  display: grid;
  grid-template-columns: 1fr;
  padding: 69px 64px;
  background-color: ${(props) => props.theme.colors.base.white};
  gap: 32px;
  justify-items: center;

  @media (min-width: ${(props) => props.theme.breakpoints.md}) {
    grid-template-columns: repeat(3, 1fr);
    padding: 69px 104px;
  }
`;

const FooterBottom = function () {
  return (
    <FooterWrapper>
      <Image />
      <DetailsWrapper>
        <Display weight="bold" color={theme.colors.secondary[50]}>
          Dealerz.
        </Display>
        <H6 weight="bold" color={theme.colors.text.title}>
          Privacy Policy
        </H6>
        <H6 weight="bold" color={theme.colors.text.title}>
          Terms and Condition
        </H6>
        <H6 weight="bold" color={theme.colors.text.title}>
          @2020 TanahAir Studio. All rights reserved.{" "}
        </H6>
      </DetailsWrapper>
      <div>
        <Social>
          <H6 weight="bold" color={theme.colors.base.white}>
            Yt
          </H6>
        </Social>
        <Social>
          <H6 weight="bold" color={theme.colors.base.white}>
            Fb
          </H6>
        </Social>
        <Social>
          <H6 weight="bold" color={theme.colors.base.white}>
            Tw
          </H6>
        </Social>
        <Social>
          <H6 weight="bold" color={theme.colors.base.white}>
            Ig
          </H6>
        </Social>
      </div>
    </FooterWrapper>
  );
};

export const Footer = function () {
  return (
    <>
      <News />
      <FooterBottom />
    </>
  );
};
