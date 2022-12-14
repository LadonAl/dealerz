import styled from "styled-components";

interface SectionProps {
  fill?: string;
}

export const Section = styled.section<SectionProps>`
  padding-block: 120px;
  padding-inline: 32px;

  ${(props) => (props.fill ? `background-color: ${props.fill};` : "")}

  @media (min-width: ${(props) => props.theme.breakpoints.md}) {
    padding-inline: 64px;
  }

  @media (min-width: ${(props) => props.theme.breakpoints.lg}) {
    padding-inline: 104px;
  }
`;
