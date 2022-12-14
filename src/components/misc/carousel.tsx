import useEmblaCarousel from "embla-carousel-react";
import React, { useCallback, useEffect, useState } from "react";
import styled, { useTheme } from "styled-components";

import { Button } from "../primitives";

const Embla = styled.div`
  position: relative;
`;

const Viewport = styled.div`
  overflow: hidden;
`;

const Container = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 400px;
  height: 451px;
  grid-column-gap: 16px;
  width: 100%;
`;

const Dots = styled.div`
  width: 100%;
  text-align: center;
  padding-block-start: 141px;
  padding-block-end: 44px;
  margin-bottom: -120px;
`;

interface DotProps {
  active?: boolean;
}

const Dot = styled.button<DotProps>`
  width: 16px;
  height: 16px;
  margin-inline: 12px;
  border: none;
  border-radius: 100%;
  background-color: ${(props) => (props.active ? "#7A6005" : props.theme.colors.fill.disabled)};
`;

export const Carousel = ({ children }: { children: React.ReactNode }) => {
  const [emblaRef, embla] = useEmblaCarousel({ loop: false, skipSnaps: true, startIndex: 2 });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollTo = useCallback((index: number) => embla && embla.scrollTo(index), [embla]);

  useEffect(() => {
    if (embla) {
      const onSelect = () => {
        setSelectedIndex(embla.selectedScrollSnap());
      };

      setScrollSnaps(embla.scrollSnapList());
      embla.on("select", onSelect);
      onSelect();
    }
  }, [embla]);

  return (
    <>
      <Embla>
        <Viewport ref={emblaRef}>
          <Container>
            {React.Children.map(children, (Child, index) => (
              <div key={index}>
                <div>{Child}</div>
              </div>
            ))}
          </Container>
        </Viewport>
        <Dots>
          {scrollSnaps.map((snap, index) => (
            <Dot
              active={index === selectedIndex}
              onClick={() => {
                scrollTo(index);
                setSelectedIndex(index);
              }}
              key={index}
            />
          ))}
        </Dots>
      </Embla>
    </>
  );
};

const Viewport2 = styled(Viewport)`
  margin-inline: 32px;
`;

const Container2 = styled(Container)`
  position: relative;
  height: unset;
  grid-auto-columns: 100%;
`;

const CarouselButton = styled(Button)`
  position: absolute;
  margin: auto;
  height: 56px;
  width: 56px;
  border: none;
  border-radius: 100%;
  outline: none;
  inset: 0;
`;

const CarouselButtonLeft = styled(CarouselButton)`
  left: 0;
  right: unset;
`;

const CarouselButtonRight = styled(CarouselButton)`
  right: 0;
  left: unset;
`;

export const Carousel2 = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();

  const [emblaRef, embla] = useEmblaCarousel({ loop: true, skipSnaps: true, startIndex: 2 });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollTo = useCallback((index: number) => embla && embla.scrollTo(index), [embla]);

  useEffect(() => {
    if (embla) {
      const onSelect = () => {
        setSelectedIndex(embla.selectedScrollSnap());
      };

      setScrollSnaps(embla.scrollSnapList());
      embla.on("select", onSelect);
      onSelect();
    }
  }, [embla]);

  const scrollPrev = useCallback(() => {
    if (embla) embla.scrollPrev();
  }, [embla]);

  const scrollNext = useCallback(() => {
    if (embla) embla.scrollNext();
  }, [embla]);

  return (
    <>
      <Embla>
        <Viewport2 ref={emblaRef} style={{ marginInline: "32px" }}>
          <Container2>
            {React.Children.map(children, (Child, index) => (
              <div key={index}>
                <div>{Child}</div>
              </div>
            ))}
          </Container2>
          <CarouselButtonLeft onClick={scrollPrev} iconLeft="arrowSharpLeft" color={theme.colors.base.black} onlyIcon outline />
          <CarouselButtonRight onClick={scrollNext} iconLeft="arrowSharpRight" color={theme.colors.base.black} onlyIcon outline />
        </Viewport2>
      </Embla>
    </>
  );
};
