import { useQueryClient } from "@tanstack/react-query";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { StyledHeadingH1 } from "../components/SharedStyled";
import PageNavigation from "../components/PageNavigation";
import Pagination from "../components/Pagination";
import PostsList from "../components/PostsList";
import {
  prefetchNextPageData,
  usePosts,
  usePostsByUserPaginated,
  usePostsPaginated,
} from "../hooks/usePosts";
import { ROW_PER_PAGE } from "../utils/constants";
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
  const userPostsQuery = usePostsByUserPaginated(
    userId,
    currentPage,
    postsPerPage
  );

  useEffect(() => {
    parseUrlParams();
  }, []);

  useEffect(() => {
    parseUrlParams();
  }, [searchParams]);

  useEffect(() => {
    if (isUserIdSpecified()) {
      setAllPostsLen(
        allPostsQuery.data?.filter((post: Post) => post?.userId === userId)
          .length ?? 0
      );
    } else setAllPostsLen(allPostsQuery.data?.length ?? 0);
  }, [allPostsQuery.data, userPostsQuery.data, userId]);

  useEffect(() => {
    if (isUserIdSpecified()) {
      if (!userPostsQuery.isLoading && userPostsQuery.data?.length === 0)
        handlePageChange(1);
    } else {
      if (!postsQuery.isLoading && postsQuery.data?.length === 0)
        handlePageChange(1);
    }
    const nextPageData = prefetchNextPageData(
      queryClient,
      currentPage,
      postsPerPage
    );
  }, [
    userPostsQuery.data,
    postsQuery.data,
    currentPage,
    postsPerPage,
    queryClient,
  ]);

  const parseUrlParams = () => {
    const initialPage = Number.parseInt(searchParams.get("page") || "1");
    const initialPostsPerPage = Number.parseInt(
      searchParams.get("postsPerPage") || "10"
    );
    const initialUserId = Number.parseInt(searchParams.get("userId") || "-1");
    setUserId(initialUserId);
    if (ROW_PER_PAGE.includes(initialPostsPerPage))
      setPostsPerPage(initialPostsPerPage);
    else setPostsPerPage(10);
    setCurrentPage(Number.isNaN(initialPage) ? 1 : initialPage);
  };

  const handleClickPost = useCallback(
    (postId: number) => navigate(`/posts/${postId}`, { replace: false }),
    [navigate]
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    navigate(getNewUrlString(page, postsPerPage), {
      replace: false,
    });
  };

  const handlePostsPerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPostsPerPage(Number.parseInt(event.target.value));
    setCurrentPage(1);
    navigate(getNewUrlString(1, Number.parseInt(event.target.value)), {
      replace: false,
    });
  };

  const getNewUrlString = (page: number, postsPerPage: number) => {
    let urlString = `/posts?page=${page}&postsPerPage=${postsPerPage}`;
    if (isUserIdSpecified())
      urlString = `/posts?page=${page}&postsPerPage=${postsPerPage}&userId=${userId}`;
    return urlString;
  };

  const checkIfIsLastPage = () => {
    return allPostsLen - currentPage * postsPerPage <= 0;
  };

  const isUserIdSpecified = () => {
    return Number.parseInt(searchParams.get("userId") || "-1") > 0;
  };
  return (
    <>
      <StyledHeadingH1>Blog posts</StyledHeadingH1>
      {isUserIdSpecified() && (
        <PostsList
          postsQuery={userPostsQuery}
          handleClickPost={handleClickPost}
        />
      )}
      {!isUserIdSpecified() && (
        <PostsList postsQuery={postsQuery} handleClickPost={handleClickPost} />
      )}
      <Pagination
        currentPage={currentPage}
        postsPerPage={postsPerPage}
        allItemsLen={allPostsLen}
        handlePageChange={handlePageChange}
        handleItemsPerPage={handlePostsPerPage}
      />
      <PageNavigation
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        checkIfIsLastPage={checkIfIsLastPage}
      />
    </>
  );
};
