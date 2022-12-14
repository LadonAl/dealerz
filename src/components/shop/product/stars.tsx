import styled, { useTheme } from "styled-components";
import { P, TypographyProps } from "../../primitives";

const StarSVG = styled.svg`
  padding-inline: 2px;
`;

interface StarProps extends React.PropsWithChildren {
  full?: boolean;
  size?: number;
}

const Star: React.FC<StarProps> = function renderSingleStar({ full, size }) {
  const theme = useTheme();
  const colorFull = theme.colors.secondary[50];
  const colorEmpty = theme.colors.secondary[10];
  return (
    <StarSVG width={size || "20"} height={size || "20"} viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8 0L9.79611 5.52786H15.6085L10.9062 8.94427L12.7023 14.4721L8 11.0557L3.29772 14.4721L5.09383 8.94427L0.391548 5.52786H6.20389L8 0Z"
        fill={full ? colorFull : colorEmpty}
      />
    </StarSVG>
  );
};

interface StarsProps extends React.PropsWithChildren, TypographyProps {
  rating: number;
  size?: number;
}

export const Stars: React.FC<StarsProps> = function renderStarsBasedOnRating(props) {
  const { rating, size, ...typographyProps } = props;
  const fullStars = Math.min(Math.max(Math.round(rating), 0), 5);
  const emptyStars = 5 - fullStars;

  if (!typographyProps.align) {
    typographyProps.align = "center";
  }

  return (
    <P {...typographyProps}>
      {Array.from(Array(fullStars), (_, index) => (
        <Star full key={index} size={size} />
      ))}
      {Array.from(Array(emptyStars), (_, index) => (
        <Star key={index} size={size} />
      ))}
    </P>
  );
};
