import { Carousel2 } from "../../misc";
import { Section } from "../../primitives";
import { Testimony } from "../testimony";

export const Testimonies = function renderTestimonies() {
  return (
    <Section>
      <Carousel2>
        <Testimony />
        <Testimony />
        <Testimony />
        <Testimony />
      </Carousel2>
    </Section>
  );
};
