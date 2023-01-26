import axios from "axios";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { Post } from "../utils/globaltypes";

export const fetchPostsPaginated = (
  currentPage: number,
  postsPerPage: number
): Promise<Post[]> => {
  return axios
    .get(
      `https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=${postsPerPage}`
    )
    .then((res) => res.data);
};

export const fetchPostsByUser = (userId: number): Promise<Post[]> => {
  return axios
    .get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    .then((res) => res.data);
};

export const fetchPostsByUserPaginated = (
  userId: number,
  currentPage: number,
  postsPerPage: number
): Promise<Post[]> => {
  return axios
    .get(
      `https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=${postsPerPage}&userId=${userId}`
    )
    .then((res) => res.data);
};

export const fetchPosts = (): Promise<Post[]> => {
  return axios
    .get(`https://jsonplaceholder.typicode.com/posts`)
    .then((res) => res.data);
};

// Fetch/prefetch are distinguished only by return value, i decided i might need data in debugging/development process
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

// This is somewhat of an expensive call but unfortunatelly our API does not provide additional information such as:
// lastPageNumber/hasNext/allPostsLength
export const usePosts = () => {
  return useQuery(["posts"], () => fetchPosts(), {
    keepPreviousData: true,
  });
};

// Keep that query allive only where userId is specified (is present in URL)
export const usePostsByUser = (userId: number) => {
  return useQuery(["posts", userId], () => fetchPostsByUser(userId), {
    keepPreviousData: true,
    enabled: userId > 0,
  });
};

// Keep that query allive only where userId is specified (is present in URL)
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
      enabled: userId > 0,
    }
  );
};
