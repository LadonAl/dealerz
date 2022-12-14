import { useTheme } from "styled-components";
import { Banner, Body1, Button, Display, GalleryGrid, TopProducts, About, Companies, Testimonies, ArticleGrid, P } from "../components";

export const Home = function renderHomePage() {
  const theme = useTheme();
  return (
    <>
      <Banner particles={1}>
        <Display weight="bold">
          Your Premium <br />
          Sound, Unplugged!
        </Display>

        <P>
          <Body1>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, <br />
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Body1>
        </P>

        <div>
          <Button size="large">Find out more</Button>
        </div>
      </Banner>
      <GalleryGrid title="Our Premium Collection" />
      <TopProducts
        title="Top Items"
        subtitle={
          <>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod <br />
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
          </>
        }
      />
      <About />
      <Companies />
      <Testimonies />
      <ArticleGrid
        title={
          <>
            Get Better Insights <br /> from Our Articles
          </>
        }
      />
    </>
  );
};
