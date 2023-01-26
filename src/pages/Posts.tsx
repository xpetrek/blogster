import { useQueryClient } from "@tanstack/react-query";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import {
  StyledHeadingH1,
  StyledHeadingH2,
  StyledParagraph,
} from "../components/CommonStyled";

import {
  prefetchNextPageData,
  usePosts,
  usePostsPaginated,
} from "../hooks/usePosts";
import { Post } from "../utils/globaltypes";

export const Posts = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [userId, setUserId] = useState(-1);
  const [allPostsLen, setAllPostsLen] = useState(-1);

  const allPostsQuery = usePosts();
  const postsQuery = usePostsPaginated(currentPage, postsPerPage);

  const handlePageChange = useCallback(
    (page: number) => {
      setCurrentPage(page);
      const urlString = `/posts?page=${page}&postsPerPage=${postsPerPage}`;
      if (userId > 0) urlString.concat(`&userId=${userId}`);
      console.log(urlString);
      navigate(urlString, {
        replace: false,
      });
    },
    [navigate]
  );

  useEffect(() => {
    const initialPage = Number.parseInt(searchParams.get("page") || "1");
    const initialPostsPerPage = Number.parseInt(
      searchParams.get("postsPerPage") || "10"
    );
    const initialUserId = Number.parseInt(searchParams.get("userId") || "-1");
    if (
      initialPostsPerPage === 6 ||
      initialPostsPerPage === 10 ||
      initialPostsPerPage === 20
    )
      setPostsPerPage(initialPostsPerPage);
    else setPostsPerPage(10);
    setCurrentPage(initialPage);
    setUserId(initialUserId);
  }, []);

  useEffect(() => {
    setAllPostsLen(allPostsQuery.data?.length);
  }, [allPostsQuery.data]);

  useEffect(() => {
    const nextPageData = prefetchNextPageData(
      queryClient,
      currentPage,
      postsPerPage
    );
  }, [postsQuery.data, currentPage, postsPerPage, queryClient]);

  const handleClickPost = useCallback(
    (postId: number) => navigate(`/posts/${postId}`, { replace: false }),
    [navigate]
  );

  const handlePostsPerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPostsPerPage(Number.parseInt(event.target.value));
    setCurrentPage(1);
    navigate(
      `/posts?page=${1}&postsPerPage=${Number.parseInt(event.target.value)}`,
      {
        replace: false,
      }
    );
  };

  const getShortDescription = (description: string) => {
    return description.slice(0, 70) + "...";
  };

  const checkIfIsLastPage = () => {
    return allPostsLen - currentPage * postsPerPage <= 0;
  };

  return (
    <>
      <StyledHeadingH1>Blog posts</StyledHeadingH1>
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
      <StyledButtonNavigation>
        <StyledNavigationButton
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </StyledNavigationButton>
        <StyledNavigationButton
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={checkIfIsLastPage()}
        >
          Next
        </StyledNavigationButton>
      </StyledButtonNavigation>
    </>
  );
};

const StyledPostsContainer = styled.div`
  min-height: 75vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 1rem;
  max-width: 1400px;
  margin: auto auto;
`;

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

const StyledButtonNavigation = styled.div`
  min-height: 5vh;
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

const StyledNavigationButton = styled.button({
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
