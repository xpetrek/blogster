import React, { useState } from "react";
import axios from "axios";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { Post } from "../utils/globaltypes";

export const fetchPostsPaginated = async (
  currentPage: number,
  postsPerPage: number
) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return axios
    .get(
      `https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=${postsPerPage}`
    )
    .then((res) => res.data);
};

export const fetchPostsByUser = (userId: number) => {
  return axios
    .get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    .then((res) => res.data);
};

export const fetchPostsByUserPaginated = (
  userId: number,
  currentPage: number,
  postsPerPage: number
) => {
  return axios
    .get(
      `https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=${postsPerPage}&userId=${userId}`
    )
    .then((res) => res.data);
};

export const fetchPosts = () => {
  return axios
    .get(`https://jsonplaceholder.typicode.com/posts`)
    .then((res) => res.data);
};

export const prefetchNextPageData = async (
  queryClient: QueryClient,
  currentPage: number,
  postsPerPage: number
) => {
  try {
    const data: Post[] = await queryClient.fetchQuery(
      ["posts", currentPage + 1, postsPerPage],
      () => fetchPostsPaginated(currentPage + 1, postsPerPage)
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const usePostsPaginated = (
  currentPage: number,
  postsPerPage: number
) => {
  return useQuery(
    ["posts", currentPage, postsPerPage],
    () => {
      return fetchPostsPaginated(currentPage, postsPerPage);
    },
    {
      keepPreviousData: true,
      staleTime: 10000,
    }
  );
};

export const usePosts = () => {
  return useQuery(["posts"], () => fetchPosts(), {
    keepPreviousData: true,
  });
};

export const usePostsByUser = (userId: number) => {
  return useQuery(["posts", userId], () => fetchPostsByUser(userId), {
    keepPreviousData: true,
  });
};

export const usePostsByUserPaginated = (
  userId: number,
  currentPage: number,
  postsPerPage: number
) => {
  return useQuery(
    ["posts", userId, currentPage, postsPerPage],
    () => fetchPostsByUserPaginated(userId, currentPage, postsPerPage),
    {
      keepPreviousData: true,
    }
  );
};
