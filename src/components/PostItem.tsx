import React from "react";
import styled from "styled-components";

import { getShortDescription } from "../hooks/useDescriptionShortener";
import { Post } from "../utils/globaltypes";

import { StyledDecorativeHeadingH2, StyledParagraph } from "./SharedStyled";

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
  post?: Post;
  handleClickPost: (postId: number) => void;
};
const PostItem = ({ post, handleClickPost }: Props) => {
  return (
    <>
      {post && (
        <StyledPostItem onClick={() => handleClickPost(post.id)}>
          <StyledDecorativeHeadingH2>{post.title}</StyledDecorativeHeadingH2>
          <StyledParagraph>{getShortDescription(post.body)}</StyledParagraph>
        </StyledPostItem>
      )}
    </>
  );
};

export default React.memo(PostItem);
