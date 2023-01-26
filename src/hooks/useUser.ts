import axios from "axios";
import { useQuery, QueryClient, useQueryClient } from "@tanstack/react-query";
import { Post } from "../utils/globaltypes";

export const fetchUser = (userId: number) => {
  return axios
    .get(`https://jsonplaceholder.typicode.com/users/${userId}`)
    .then((res) => res.data);
};

export const useUser = (userId: number) => {
  return useQuery(["users", userId], () => fetchUser(userId), {});
};

export const useUserByPost = (postId: number) => {
  const queryClient = useQueryClient();
  const postQuery = queryClient.getQueryData(["posts", postId]) as Post;
  const userId = postQuery?.userId;
  return useQuery(["users", userId], () => fetchUser(userId), {
    enabled: !!userId,
  });
};
