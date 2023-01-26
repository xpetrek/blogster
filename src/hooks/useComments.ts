import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Post, PostComment } from "../utils/globaltypes";

export const fetchComments = (postId: number): Promise<PostComment[]> => {
  return axios
    .get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
    .then((res) => res.data);
};

export const useComments = (postId: number) => {
  const queryClient = useQueryClient();
  return useQuery(
    ["posts", postId, "comments"],
    () => fetchComments(postId),
    {}
  );
};
