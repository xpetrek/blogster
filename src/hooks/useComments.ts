import axios from "axios";
import { useQuery, QueryClient, useQueryClient } from "@tanstack/react-query";
import { Post } from "../utils/globaltypes";

export const fetchComments = (postId: number) => {
  return axios
    .get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
    .then((res) => res.data);
};

export const useComments = (postId: number) => {
  const queryClient = useQueryClient();
  return useQuery(["posts", postId, "comments"], () => fetchComments(postId), {
    initialData: () => {
      const data = queryClient.getQueryData(["posts"]) as Post[];
      data?.find((post: Post) => post.id == postId);
    },
  });
};
