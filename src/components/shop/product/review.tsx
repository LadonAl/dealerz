import styled from "styled-components";
import { theme } from "../../../theme";
import { H5, Body1, Body2 } from "../../primitives";
import { Stars } from "./stars";

const ReviewContainer = styled.article`
  display: flex;
  gap: 24px;
`;

const ReviewDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ReviewTitleContainer = styled.div`
  display: flex;
  gap: 2em;
`;

const ReviewPurchaseImagesContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Avatar = styled.div`
  width: 64px;
  height: 64px;
  aspect-ratio: 1;
  background-color: ${(props) => props.theme.colors.fill.image};
  border-radius: 100%;
`;

const PurchaseImage = styled.div`
  width: 88px;
  aspect-ratio: 1;
  border-radius: 4px;
  background-color: ${(props) => props.theme.colors.fill.image};
`;

export const Review = function renderReview() {
  return (
    <ReviewContainer>
      <Avatar />
      <ReviewDetailsContainer>
        <ReviewTitleContainer>
          <H5 weight="bold" color={theme.colors.text.title}>
            Alex Iwobi
          </H5>
          <Stars rating={5} size={28} />
        </ReviewTitleContainer>
        <Body1 color={theme.colors.text.body[2]}>2 March 2021 at 06.30 pm</Body1>
        <ReviewPurchaseImagesContainer>
          <PurchaseImage />
          <PurchaseImage />
          <PurchaseImage />
          <PurchaseImage />
        </ReviewPurchaseImagesContainer>
        <Body2 color={theme.colors.text.body[1]}>
          Thank you for the article that was made, it really provides insight and knowledge that I didn't know before.
        </Body2>
      </ReviewDetailsContainer>
    </ReviewContainer>
  );
};
