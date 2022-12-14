import styled, { useTheme } from "styled-components";
import { Body1, H2, H5, P } from "../primitives";

const ReviewWrapper = styled.article`
  display: flex;
  padding: 63px 72px;
  padding-block-end: 53px;
  width: 100%;
  background-color: ${(props) => props.theme.colors.base.white};
  gap: 80px;
  flex-direction: column;
  align-items: center;

  :nth-child(2) {
    flex: 1;
  }

  @media (min-width: ${(props) => props.theme.breakpoints.md}) {
    flex-direction: row;
    align-items: unset;
  }
`;

const ReviewText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding-inline-end: 186px;
`;

const ReviewSignature = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Image = styled.div`
  width: 320px;
  height: 320px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.colors.fill.image};
`;

export const Testimony = function renderTestimony() {
  const theme = useTheme();
  return (
    <ReviewWrapper>
      <div>
        <Image />
      </div>
      <ReviewText>
        <H2 weight="bold" color={theme.colors.secondary[50]}>
          Good Seller!
        </H2>
        <P>
          <Body1 color={theme.colors.text.body[2]}>
            I am very happy with the services provided, it is very helpful, starting from the insight that the company gave from the start that I did not
            understand what it was so I got knowledge and made my website look better
          </Body1>
        </P>

        <ReviewSignature>
          <H5 weight="bold">Anna Saraspova</H5>
          <Body1 weight="semibold">Your Beloved Buyer</Body1>
        </ReviewSignature>
      </ReviewText>
    </ReviewWrapper>
  );
};
