import styled, { useTheme } from "styled-components";
import { AutoGrid, H2, H5, Section } from "../../primitives";
import { Article } from "../article";

const ArticlesHeaderWrapper = styled.header`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-block-end: 56px;
`;

interface ArticleGridProps extends React.PropsWithChildren {
  title: string | JSX.Element;
}

export const ArticleGrid: React.FC<ArticleGridProps> = function renderArticleGridWithCustomTitle({ title }) {
  const theme = useTheme();
  return (
    <Section>
      <ArticlesHeaderWrapper>
        <H2 weight="bold">{title}</H2>
        <H5 weight="bold" color={theme.colors.secondary[50]}>
          See more
        </H5>
      </ArticlesHeaderWrapper>

      <AutoGrid>
        <Article />
        <Article />
        <Article />
        <Article />
      </AutoGrid>
    </Section>
  );
};
