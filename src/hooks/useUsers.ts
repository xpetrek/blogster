import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { User } from "../utils/globaltypes";

const fetchUsersPaginated = (
  currentPage: number,
  postsPerPage: number
): Promise<User[]> => {
  return axios
    .get(
      `https://jsonplaceholder.typicode.com/users?_page=${currentPage}&_limit=${postsPerPage}`
    )
    .then((res) => res.data);
};

const fetchUsers = (): Promise<User[]> => {
  return axios
    .get("https://jsonplaceholder.typicode.com/users/")
    .then((res) => res.data);
};

export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => fetchUsers(),
  });
};

export const useUsersPaginated = (
  currentPage: number,
  postsPerPage: number
) => {
  return useQuery(
    ["users", currentPage, postsPerPage],
    () => {
      return fetchUsersPaginated(currentPage, postsPerPage);
    },
    {
      keepPreviousData: true,
      staleTime: 10000,
    }
  );
};
