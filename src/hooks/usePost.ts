import axios from "axios";
import { useQuery, QueryClient, useQueryClient } from "@tanstack/react-query";
import { Post } from "../utils/globaltypes";
import { fetchComments } from "./useComments";
import { fetchUser } from "./useUser";

const fetchPost = (postId: number): Promise<Post> => {
  return axios
    .get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    .then((res) => res.data);
};

export const usePost = (postId: number) => {
  const queryClient = useQueryClient();

  return useQuery(["posts", postId], () => fetchPost(postId), {
    placeholderData: () => {
      const postsData = queryClient.getQueryData(["posts"]) as Post[];
      return postsData?.find((post) => post.id === postId);
    },
    onSuccess: () => {
      try {
        queryClient.prefetchQuery(["posts", postId, "comments"], () =>
          fetchComments(postId)
        );
        const postQuery = queryClient.getQueryData(["posts", postId]) as Post;
        queryClient.prefetchQuery(["users", postQuery.userId], () =>
          fetchUser(postQuery.userId)
        );
      } catch (error) {
        console.log(error);
      }
    },
  });
};
