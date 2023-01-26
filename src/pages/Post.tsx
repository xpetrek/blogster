import { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import { usePost } from "../hooks/usePost";
import { useComments } from "../hooks/useComments";
import { PostComment } from "../utils/globaltypes";
import { useUserByPost } from "../hooks/useUser";

export const Post = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const postQuery = usePost(Number.parseInt(id ?? "1"));
  const postCommentsQuery = useComments(Number.parseInt(id ?? "1"));
  const userQuery = useUserByPost(Number.parseInt(id ?? "1"));
  const handleClickUser = useCallback(
    (userId: number) => navigate(`/users/${userId}`, { replace: false }),
    [navigate]
  );

  return (
    <StyledContainer>
      <StyledPostContainer>
        {postQuery.isLoading ? null : (
          <>
            <StyledHeading>{postQuery.data.title}</StyledHeading>
            <div>
              <p>{postQuery.data.body}</p>
              <p
                onClick={() => {
                  handleClickUser(userQuery.data?.id);
                }}
              >
                Written by {userQuery.data?.username}
              </p>
            </div>
          </>
        )}
      </StyledPostContainer>

      <h2> Comment section</h2>
      {postCommentsQuery.isLoading ? null : (
        <StyledCommentsContainer>
          {postCommentsQuery.data.map((comment: PostComment, key: number) => (
            <StyledCommentContainer key={key}>
              <h3>{comment.name}</h3>
              <StyledLinkText>{comment.email}</StyledLinkText>
              <p>{comment.body}</p>
            </StyledCommentContainer>
          ))}
        </StyledCommentsContainer>
      )}
    </StyledContainer>
  );
};
const StyledContainer = styled.div`
  padding: 1rem;
  max-width: 1400px;
  margin: 0px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledHeading = styled.h1`
  padding: 0 0 1rem 0;
  text-align: center;
`;

const StyledPostContainer = styled.div`
  padding: 1rem;
`;

const StyledCommentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem 0 0 0;
  border: 1px solid transparent;
`;

const StyledCommentContainer = styled.div`
  padding: 1rem 0 1rem 0.5rem;
  height: 100%;
  width: 80%;
  font-size: 14px;
  border: 1px solid black;
  margin: 0.5rem 0;
  background-color: var(--primary);
  border-radius: 1rem;
  box-shadow: rgba(0, 0, 0, 0.8) 5px 5px 10px;
`;

const StyledLinkText = styled.p`
  color: rgba(0, 0, 0, 0.85);
  text-decoration: none;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
