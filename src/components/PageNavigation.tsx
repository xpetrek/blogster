import React from "react";
import styled from "styled-components";

const StyledButton = styled.button({
  minHeight: "5vh",
  height: "100%",
  width: "40%",
  minWidth: "15rem",
  cursor: "pointer",
  borderRadius: "1rem",
  boxShadow: "rgba(0, 0, 0, 0.8) 5px 5px 10px",
  backgroundColor: "var(--primary)",

  ":disabled": {
    backgroundColor: "var(--grey-500)",
  },
  ":hover:enabled": {
    backgroundColor: "var(--primary-dark)",
  },
});

const StyledButtonNavigation = styled.div`
  min-height: 5vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 1rem;
  max-width: 1400px;
  margin: auto auto;
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
