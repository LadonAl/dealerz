import styled, { useTheme } from "styled-components";
import { Product } from "../../../services";
import { H3 } from "../../primitives";
import { Review } from "../product";

const ReviewsContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 51px;
  margin-block-start: 72px;
`;

interface ProductReviewsProps {
  product: Product;
}

export const ProductReviews: React.FC<ProductReviewsProps> = function renderReviewsForASingleProduct({ product }) {
  const theme = useTheme();

  if (!product.rating) {
    return (
      <ReviewsContainer>
        <H3 weight="bold" color={theme.colors.text.title}>
          No reviews were found for this product
        </H3>
      </ReviewsContainer>
    );
  }

  return (
    <ReviewsContainer>
      <H3 weight="bold" color={theme.colors.text.title}>
        Reviews ({product.rating.count})
      </H3>
      <Review />
      <Review />
    </ReviewsContainer>
  );
};
