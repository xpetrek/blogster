import { useQueryClient } from "@tanstack/react-query";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

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
    <div>
      <h1>Blog posts</h1>
      <div>
        {postsQuery?.isLoading
          ? null
          : postsQuery?.data.map((post: Post, key: number) => (
              <article key={key} onClick={() => handleClickPost(post.id)}>
                <h3>{post.title}</h3>
                <p>{getShortDescription(post.body)}</p>
              </article>
            ))}
      </div>
      <div>
        <div>
          {(currentPage - 1) * postsPerPage}-{currentPage * postsPerPage}/
          {allPostsLen}
        </div>
        <div>
          {currentPage > 2 && <i onClick={() => handlePageChange(1)}>first</i>}
          {currentPage > 1 && (
            <i onClick={() => handlePageChange(currentPage - 1)}>
              {currentPage - 1}
            </i>
          )}
          <i onClick={() => handlePageChange(currentPage)}>{currentPage}</i>
          {currentPage < allPostsLen / postsPerPage && (
            <i onClick={() => handlePageChange(currentPage + 1)}>
              {currentPage + 1}
            </i>
          )}
          {currentPage + 1 < allPostsLen / postsPerPage && (
            <i onClick={() => handlePageChange(allPostsLen / postsPerPage)}>
              last
            </i>
          )}
        </div>
        <div>
          <select
            value={postsPerPage}
            onChange={(event) => handlePostsPerPage(event)}
          >
            <option value={6}>6</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>
      <div>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={checkIfIsLastPage()}
        >
          Next
        </button>
      </div>
    </div>
  );
};
