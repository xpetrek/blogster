import { useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import {
  StyledButton,
  StyledDecorativeHeadingH2,
} from "../components/SharedStyled";
import PostItem from "../components/PostItem";

import UserInfo from "../components/UserInfo";
import { usePostsByUser } from "../hooks/usePosts";
import { useUser } from "../hooks/useUser";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
  margin: 0px auto;
  max-width: 800px;
  height: 100%;
`;

const StyledPostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 0;
  gap: 1rem;
`;

export const UserProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const userQuery = useUser(Number.parseInt(id ?? "1"));
  const userPostQuery = usePostsByUser(Number.parseInt(id ?? "1"));

  const handleClickPost = useCallback(
    (postId: number) => navigate(`/posts/${postId}`, { replace: false }),
    [navigate]
  );
  return (
    <StyledContainer>
      <UserInfo userQuery={userQuery} />
      {userQuery?.isLoading ? null : (
        <StyledDecorativeHeadingH2>
          {userQuery.data?.username}'s posts
        </StyledDecorativeHeadingH2>
      )}
      <StyledPostsContainer>
        {userPostQuery?.isLoading ? null : (
          <PostItem
            post={userPostQuery.data && userPostQuery?.data[0]}
            key={Number.MAX_VALUE}
            handleClickPost={handleClickPost}
          />
        )}
        <Link to={`/posts?page=1&postsPerPage=10&userId=${id}`}>
          <StyledButton>Show more ...</StyledButton>
        </Link>
      </StyledPostsContainer>
    </StyledContainer>
  );
};
