import { UseQueryResult } from "@tanstack/react-query";
import React from "react";
import styled from "styled-components";
import { getShortDescription } from "../hooks/useDescriptionShortener";
import { Post, User } from "../utils/globaltypes";
import { StyledHeadingH2, StyledParagraph } from "./SharedStyled";

const StyledOverflow = styled.div`
  overflow-x: auto;
`;

const StyledUsersContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  max-width: 60vw;
  min-width: 40rem;
  margin: auto auto;
  gap: 0.1rem;
  padding: 2rem;
`;

type StyledUserRowProps = {
  disabled?: boolean;
};
const StyledUserRow = styled.div<StyledUserRowProps>`
  display: flex;
  justify-content: space-between;
  width: 100%;
  min-width: 30rem;
  cursor: pointer;
  border: 1px solid black;
  box-shadow: rgba(0, 0, 0, 0.8) 2px 2px 5px;
  background-color: ${(props) =>
    props.disabled && props.disabled
      ? "var(--primary-dark)"
      : "var(--primary)"};
  padding: 0 10px;

  &:hover {
    text-decoration: ${(props) =>
      props.disabled && props.disabled ? "none" : "underline"};
    background-color: var(--primary-dark);
  }
`;

type StyledDivProps = {
  fontWeight?: "bold";
};
const StyledDiv = styled.div<StyledDivProps>`
  width: 100%;
  font-weight: ${(props) => props.fontWeight && props.fontWeight};
`;

type Props = {
  usersQuery: UseQueryResult<any, unknown>;
  handleClickPost: (postId: number) => void;
};
const UsersList = ({ usersQuery: postsQuery, handleClickPost }: Props) => {
  return (
    <StyledOverflow>
      <StyledUsersContainer>
        <StyledUserRow disabled={true}>
          <StyledDiv fontWeight="bold">Name</StyledDiv>
          <StyledDiv fontWeight="bold">Username</StyledDiv>
          <StyledDiv fontWeight="bold">Email</StyledDiv>
        </StyledUserRow>
        {postsQuery?.isLoading
          ? null
          : postsQuery?.data.map((user: User, key: number) => (
              <StyledUserRow key={key} onClick={() => handleClickPost(user.id)}>
                <StyledDiv>{user.name}</StyledDiv>
                <StyledDiv>{user.username}</StyledDiv>
                <StyledDiv>{user.email}</StyledDiv>
              </StyledUserRow>
            ))}
      </StyledUsersContainer>
    </StyledOverflow>
  );
};

export default React.memo(UsersList);
