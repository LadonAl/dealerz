import styled from "styled-components";
import { AutoGrid, H2, Section } from "../primitives";
import { companies } from "../../assets";

const Logos = styled(AutoGrid)`
  gap: 32px;
  justify-content: space-around;
  margin-block-start: 96px;
`;

const Image = styled.img`
  object-fit: contain;
`;

export const Companies = function renderCustomerCompanies() {
  return (
    <Section>
      <H2 align="center" weight="bold">
        Our Achievement
      </H2>
      <Logos>
        {companies.map((company, index) => (
          <Image src={company} alt={String(index)} key={company} />
        ))}
      </Logos>
    </Section>
  );
};
