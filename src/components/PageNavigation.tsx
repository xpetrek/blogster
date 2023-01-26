import React from "react";
import styled from "styled-components";

import { StyledButton } from "./SharedStyled";

const StyledButtonNavigation = styled.div`
  min-height: 5vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 1rem;
  max-width: 1400px;
  margin: 0 auto;
`;

type Props = {
  currentPage: number;
  handlePageChange: (page: number) => void;
  checkIfIsLastPage: () => boolean;
};

const PageNavigation = ({
  currentPage,
  handlePageChange,
  checkIfIsLastPage,
}: Props) => {
  return (
    <StyledButtonNavigation>
      <StyledButton
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </StyledButton>
      <StyledButton
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={checkIfIsLastPage()}
      >
        Next
      </StyledButton>
    </StyledButtonNavigation>
  );
};

export default React.memo(PageNavigation);
