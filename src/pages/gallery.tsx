import { Banner, Display, P, Body1, GalleryGrid, Testimonies } from "../components";

export const GalleryPage: React.FC = function renderGalleryPage() {
  return (
    <>
      <Banner particles={2}>
        <Display weight="bold">
          Our Gallery, <br />
          Your Dreams!
        </Display>
        <P>
          <Body1>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, <br />
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Body1>
        </P>
      </Banner>
      <GalleryGrid title="Our Gallery" />
      <Testimonies />
    </>
  );
};
