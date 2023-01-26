import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () =>
      axios
        .get("https://jsonplaceholder.typicode.com/users/")
        .then((res) => res.data),
  });
}
