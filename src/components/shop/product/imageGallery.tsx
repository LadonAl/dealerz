import styled from "styled-components";

const Image = styled.img`
  border-radius: 8px;
  height: 100%;
  aspect-ratio: 608 / 552;
  max-width: 100%;
  background-color: ${(props) => props.theme.colors.fill.image};
`;

const ImageLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  height: 100%;

  > :first-child {
    grid-column: 1 / 4;
  }
`;

interface ImageInfo {
  src: string;
  alt: string;
}

interface ImageGalleryProps extends React.PropsWithChildren {
  currentImage: number;
  images: ImageInfo[];
}

export const ImageGallery: React.FC<ImageGalleryProps> = function ({ currentImage, images }) {
  // only 3 images for the sake of this example
  const imagesToRender = images.slice(0, 3);
  return (
    <ImageLayout>
      <Image src={images[currentImage].src} alt={images[currentImage].alt} />
      {imagesToRender.map((image) => (
        <Image src={image.src} alt={image.alt} key={image.src} />
      ))}
    </ImageLayout>
  );
};
