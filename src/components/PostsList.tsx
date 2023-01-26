import { UseQueryResult } from "@tanstack/react-query";
import React from "react";
import styled from "styled-components";

import { Post } from "../utils/globaltypes";

import PostItem from "./PostItem";

const StyledPostsContainer = styled.div`
  min-height: 75vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 1rem;
  max-width: 1400px;
  margin: auto auto;
`;

type Props = {
  postsQuery: UseQueryResult<any, unknown>;
  handleClickPost: (postId: number) => void;
};
const PostsList = ({ postsQuery, handleClickPost }: Props) => {
  return (
    <>
      <StyledPostsContainer>
        {postsQuery?.isLoading
          ? null
          : postsQuery?.data.map((post: Post, key: number) => (
              <PostItem
                key={key}
                post={post}
                handleClickPost={handleClickPost}
              />
            ))}
      </StyledPostsContainer>
    </>
  );
};

export default React.memo(PostsList);
