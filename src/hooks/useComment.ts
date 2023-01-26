import axios from "axios";
import { useQuery, QueryClient, useQueryClient } from "@tanstack/react-query";
import { Post } from "../utils/globaltypes";

const fetchComment = (commentId: number) => {
  return axios
    .get(`https://jsonplaceholder.typicode.com/comments/${commentId}/`)
    .then((res) => res.data);
}

export const useComment = (commentId: number) => {
  const queryClient = useQueryClient();
  return useQuery(["comments", commentId], () => fetchComment(commentId), {});
}
