import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const fetchComment = (commentId: number) => {
  return axios
    .get(`https://jsonplaceholder.typicode.com/comments/${commentId}/`)
    .then((res) => res.data);
}

export const useComment = (commentId: number) => {
  return useQuery(["comments", commentId], () => fetchComment(commentId), {});
}
