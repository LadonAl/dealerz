import styled, { useTheme } from "styled-components";
import { Body1, H2, Menu1, P, Section } from "../primitives";

const ImagePlaceholder = styled.div`
  width: 607px;
  height: 720px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.colors.fill.image};
`;

const AboutContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  gap: 48px;

  @media (min-width: ${(props) => props.theme.breakpoints.lg}) {
    flex-direction: row;
    align-items: unset;
  }
`;

const AboutText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding-inline: 84px;

  @media (min-width: ${(props) => props.theme.breakpoints.lg}) {
    padding-block-start: 84px;
    padding-inline-start: 0;
    padding-inline-end: 74px;
  }
`;

export const About = function renderAboutWidget() {
  const theme = useTheme();
  return (
    <Section>
      <AboutContainer>
        <div>
          <ImagePlaceholder />
        </div>
        <AboutText>
          <H2 weight="bold">
            Story about <br /> Our Brand
          </H2>
          <P>
            <Body1 color={theme.colors.text.body[2]}>
              Develop a website by finding a product identity that has value and branding to become a characteristic of a company. We will also facilitate the
              business marketing of these products with our SEO experts so that they become a ready-to-use website and help sell a product from the company
              Develop a website by finding a product identity that has value and branding to become a characteristic of a company. We will also facilitate the
              business marketing of these products with our SEO experts so that they become a ready-to-use website and help sell a product from the company
            </Body1>
          </P>
          <Menu1 weight="bold" color={theme.colors.secondary[50]} style={{ marginTop: "24px" }}>
            Read full story
          </Menu1>
        </AboutText>
      </AboutContainer>
    </Section>
  );
};
