import { useQuery } from "react-query";
import styled, { useTheme } from "styled-components";
import { getProducts } from "../../../services";
import { Carousel } from "../../misc";
import { Body1, H2, P, Section } from "../../primitives";
import { Card2 } from "../product";

const SubtitleContainer = styled.div`
  margin-block-start: 32px;
  margin-block-end: 70px;
`;

interface TopProductsProps extends React.PropsWithChildren {
  title: string;
  subtitle: string | JSX.Element;
}

export const TopProducts: React.FC<TopProductsProps> = function renderTopProductsWithCustomTitle({ title, subtitle }) {
  const { data, status } = useQuery(["products"], () => getProducts({ limit: 5 }));
  const theme = useTheme();

  return (
    <Section fill={theme.colors.base.white}>
      <H2 align="center" weight="bold">
        {title}
      </H2>
      <SubtitleContainer>
        <P align="center">
          <Body1>{subtitle}</Body1>
        </P>
      </SubtitleContainer>
      {status === "success" && (
        <Carousel>
          {data.map((product) => (
            <Card2 product={product} key={product.id} />
          ))}
        </Carousel>
      )}
    </Section>
  );
};
