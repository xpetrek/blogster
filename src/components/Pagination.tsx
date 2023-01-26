import React from "react";
import styled from "styled-components";

const StyledPageNavigation = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 70%;
  min-height: 5vh;
  max-width: 1400px;
  margin: 20px auto;
  border-top: 1px solid black;
`;

const StyledPageNumbers = styled.div`
  display: flex;
  font-size: 1.5rem;
`;

type StyledPageButtonProps = {
  textDecoration?: "none" | "underline";
  fontWeight?: "bold";
};
const StyledPageButton = styled.p((props: StyledPageButtonProps) => ({
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  padding: "5px",
  textDecoration: props.textDecoration && props.textDecoration,
  fontWeight: props.fontWeight && props.fontWeight,
}));

type Props = {
  currentPage: number;
  postsPerPage: number;
  allPostsLen: number;
  handlePageChange: (page: number) => void;
  handlePostsPerPage: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

const Pagination = ({
  currentPage,
  postsPerPage,
  allPostsLen,
  handlePageChange,
  handlePostsPerPage,
}: Props) => {
  return (
    <StyledPageNavigation>
      <div>
        {(currentPage - 1) * postsPerPage}-{currentPage * postsPerPage}/
        {allPostsLen}
      </div>
      <StyledPageNumbers>
        {currentPage > 2 && (
          <StyledPageButton onClick={() => handlePageChange(1)}>
            first
          </StyledPageButton>
        )}
        {currentPage > 1 && (
          <StyledPageButton onClick={() => handlePageChange(currentPage - 1)}>
            {currentPage - 1}
          </StyledPageButton>
        )}
        <StyledPageButton
          textDecoration="underline"
          fontWeight="bold"
          onClick={() => handlePageChange(currentPage)}
        >
          {currentPage}
        </StyledPageButton>
        {currentPage < allPostsLen / postsPerPage && (
          <StyledPageButton onClick={() => handlePageChange(currentPage + 1)}>
            {currentPage + 1}
          </StyledPageButton>
        )}
        {currentPage + 1 < allPostsLen / postsPerPage && (
          <StyledPageButton
            onClick={() => handlePageChange(allPostsLen / postsPerPage)}
          >
            last
          </StyledPageButton>
        )}
      </StyledPageNumbers>
      <StyledPageNumbers>
        <select
          value={postsPerPage}
          onChange={(event) => handlePostsPerPage(event)}
        >
          <option value={6}>6</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </StyledPageNumbers>
    </StyledPageNavigation>
  );
};

export default React.memo(Pagination);
