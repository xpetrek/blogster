import styled from "styled-components";

export const StyledHeadingH1 = styled.h1`
  padding: 0 0 1rem 0;
  text-align: center;
`;

export const StyledParagraph = styled.p`
  padding: 1rem 0.5rem;
`;

export const StyledHeadingH2 = styled.h2`
  padding: 0 0 1rem 0;
  text-align: center;
`;

export const StyledHeadingH3 = styled.h3`
  display: flex;
  flex-direction: row;

  &:before,
  &:after {
    content: "";
    flex: 1 1;
    border-bottom: 1px solid;
    margin: auto;
  }
  &:before {
    padding-right: 10px;
    margin-right: 10px;
  }
  &:after {
    padding-left: 10px;
    margin-left: 10px;
  }
`;
