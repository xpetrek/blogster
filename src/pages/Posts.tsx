import { useQueryClient } from "@tanstack/react-query";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import {
  StyledHeadingH1,
  StyledHeadingH2,
  StyledParagraph,
} from "../components/CommonStyled";
import PageNavigation from "../components/PageNavigation";
import Pagination from "../components/Pagination";
import PostsList from "../components/PostsList";
import { getShortDescription } from "../hooks/useDescriptionShortener";

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

  const checkIfIsLastPage = () => {
    return allPostsLen - currentPage * postsPerPage <= 0;
  };

  return (
    <>
      <StyledHeadingH1>Blog posts</StyledHeadingH1>
      <PostsList postsQuery={postsQuery} handleClickPost={handleClickPost} />
      <Pagination
        currentPage={currentPage}
        postsPerPage={postsPerPage}
        allPostsLen={allPostsLen}
        handlePageChange={handlePageChange}
        handlePostsPerPage={handlePostsPerPage}
      />
      <PageNavigation
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        checkIfIsLastPage={checkIfIsLastPage}
      />
    </>
  );
};