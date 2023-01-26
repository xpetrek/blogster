import styled from "styled-components";

export const StyledHeadingH1 = styled.h1`
  padding: 0 0 1rem 0;
  text-align: center;
`;

export const StyledParagraph = styled.p`
  padding: 0rem 0.5rem 0.5rem 0.5rem;
`;

export const StyledSpan = styled.span`
  padding: 1rem 0.5rem;
`;

export const StyledHeadingH2 = styled.h2`
  padding: 0 0 1rem 0;
  text-align: center;
`;

export const StyledDecorativeHeadingH2 = styled(StyledHeadingH2)`
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

export const StyledHeadingH3 = styled.h3`
  padding: 0 0 1rem 0;
  text-align: center;
`;

export const StyledDecorativeHeadingH3 = styled.h3`
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

export const StyledButton = styled.button`
  min-height: 5vh;
  height: 100%;
  width: 40%;
  min-width: 15rem;
  cursor: pointer;
  border-radius: 1rem;
  box-shadow: rgba(; ; ; 0.8) 5px 5px 10px;
  background-color: var(--primary);

  &:disabled {
    background-color: var(--grey-500);
  }

  &:hover:enabled {
    background-color: var(--primary-dark);
  }
`;
