import { UseQueryResult } from "@tanstack/react-query";
import React from "react";
import styled from "styled-components";
import { getShortDescription } from "../hooks/useDescriptionShortener";
import { Post } from "../utils/globaltypes";
import { StyledHeadingH2, StyledParagraph } from "./CommonStyled";

const StyledPostsContainer = styled.div`
  min-height: 75vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 1rem;
  max-width: 1400px;
  margin: auto auto;
`;

const StyledPostItem = styled.article`
  width: 45%;
  min-width: 30rem;
  cursor: pointer;
  border: 1px solid black;
  border-radius: 1rem;
  box-shadow: rgba(0, 0, 0, 0.8) 5px 5px 10px;
  background-color: var(--primary);

  &:hover {
    text-decoration: underline;
    background-color: var(--primary-dark);
  }
`;


type Props = {
  postsQuery : UseQueryResult<any, unknown>;
  handleClickPost: (postId: number) => void

}
const PostsList = ({postsQuery, handleClickPost}: Props) => {
  return (
    <>
      <StyledPostsContainer>
        {postsQuery?.isLoading
          ? null
          : postsQuery?.data.map((post: Post, key: number) => (
              <StyledPostItem
                key={key}
                onClick={() => handleClickPost(post.id)}
              >
                <StyledHeadingH2>{post.title}</StyledHeadingH2>
                <StyledParagraph>
                  {getShortDescription(post.body)}
                </StyledParagraph>
              </StyledPostItem>
            ))}
      </StyledPostsContainer>
    </>
  );
};

export default React.memo(PostsList);
