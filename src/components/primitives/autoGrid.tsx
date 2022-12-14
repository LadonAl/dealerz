import styled, { css } from "styled-components";

export const AutoGrid = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;

  @media (min-width: ${(props) => props.theme.breakpoints.md}) {
    justify-content: space-between;
  }
`;
