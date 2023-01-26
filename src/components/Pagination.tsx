import React from "react";
import styled from "styled-components";
import { ROW_PER_PAGE } from "../utils/constants";

const StyledPageNavigation = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 70%;
  min-height: 5vh;
  max-width: 1400px;
  margin: 1rem auto 0 auto;
  border-top: 2px solid black;
`;

const StyledPageNumbers = styled.div`
  display: flex;
  font-size: 1.5rem;
`;

type StyledPageButtonProps = {
  textDecoration?: "none" | "underline";
  fontWeight?: "bold";
};
const StyledPageButton = styled.p<StyledPageButtonProps>`
  cursor: pointer;
  padding: 5px;
  text-decoration: ${(props) => props.textDecoration || "none"};
  font-weight: ${(props) => props.fontWeight || "400"};
`;

type Props = {
  currentPage: number;
  postsPerPage: number;
  allItemsLen: number;
  handlePageChange: (page: number) => void;
  handleItemsPerPage: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

const Pagination = ({
  currentPage,
  postsPerPage,
  allItemsLen,
  handlePageChange,
  handleItemsPerPage,
}: Props) => {
  return (
    <StyledPageNavigation>
      <div>
        {(currentPage - 1) * postsPerPage}-
        {Math.min(allItemsLen, currentPage * postsPerPage)}/{allItemsLen}
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
        {currentPage < Math.ceil(allItemsLen / postsPerPage) && (
          <StyledPageButton onClick={() => handlePageChange(currentPage + 1)}>
            {currentPage + 1}
          </StyledPageButton>
        )}
        {currentPage + 1 < Math.ceil(allItemsLen / postsPerPage) && (
          <StyledPageButton
            onClick={() =>
              handlePageChange(Math.ceil(allItemsLen / postsPerPage))
            }
          >
            last
          </StyledPageButton>
        )}
      </StyledPageNumbers>
      <StyledPageNumbers>
        <select
          value={postsPerPage}
          onChange={(event) => handleItemsPerPage(event)}
        >
          {ROW_PER_PAGE.map((numberOfRows: number, key: number) => (
            <option key={key} value={numberOfRows}>
              {numberOfRows}
            </option>
          ))}
        </select>
      </StyledPageNumbers>
    </StyledPageNavigation>
  );
};

export default React.memo(Pagination);
