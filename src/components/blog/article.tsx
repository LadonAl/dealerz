import styled from "styled-components";
import { Body1, H4, H6, Menu1 } from "../primitives";

const ArticleContainer = styled.article`
  width: 608px;
  margin-block-end: 48px;
`;

const Image = styled.div`
  width: 100%;
  height: 416px;
  background-color: ${(props) => props.theme.colors.fill.image};
  margin-block-end: 24px;
`;

const ArticleTitle = styled(H4)`
  font-weight: ${(props) => props.theme.font.weight.bold};
  margin-block-end: 16px;
`;

const ArticleDate = styled(Menu1).attrs({ as: "div" })`
  font-weight: ${(props) => props.theme.font.weight.bold};
  color: ${(props) => props.theme.colors.text.body[1]};
  margin-block-end: 16px;
`;

const ArticleBody = styled(Body1).attrs({ as: "div" })`
  color: ${(props) => props.theme.colors.text.body[2]};
  margin-block-end: 32px;
`;

const ArticleLink = styled(H6)`
  font-weight: ${(props) => props.theme.font.weight.bold};
  color: ${(props) => props.theme.colors.secondary[50]};
`;

export const Article = function renderArticle() {
  return (
    <ArticleContainer>
      <Image />
      <ArticleTitle>Best Summer Outfit Style</ArticleTitle>
      <ArticleDate>14 Feb . Livina Style</ArticleDate>
      <ArticleBody>
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley. Lorem Ipsum has been the industry's
        standard dummy text ever since the 1500s.
      </ArticleBody>
      <ArticleLink>Explore More</ArticleLink>
    </ArticleContainer>
  );
};
