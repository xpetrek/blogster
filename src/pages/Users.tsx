import { useCallback, useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { StyledHeadingH1 } from "../components/SharedStyled";
import PageNavigation from "../components/PageNavigation";
import Pagination from "../components/Pagination";

import UsersList from "../components/UsersList";
import { useUsers, useUsersPaginated } from "../hooks/useUsers";
import { User } from "../utils/globaltypes";

export const Users = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [allUsersLen, setAllUsersLen] = useState(-1);
  const usersQuery = useUsers();
  const usersPaginatedQuery = useUsersPaginated(currentPage, postsPerPage);

  useEffect(() => {
    const initialPage = Number.parseInt(searchParams.get("page") || "1");
    const initialPostsPerPage = Number.parseInt(
      searchParams.get("postsPerPage") || "10"
    );
    if (
      initialPostsPerPage === 5 ||
      initialPostsPerPage === 10 ||
      initialPostsPerPage === 20
    )
      setPostsPerPage(initialPostsPerPage);
    else setPostsPerPage(10);
    setCurrentPage(initialPage);
  }, []);

  useEffect(() => {
    !usersQuery.isLoading && setAllUsersLen(usersQuery.data?.length ?? 0);
  }, [usersQuery.data]);

  const handleClickUser = useCallback(
    (userId: number) => navigate(`/users/${userId}`, { replace: false }),
    [navigate]
  );

  const handleUsersPerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPostsPerPage(Number.parseInt(event.target.value));
    setCurrentPage(1);
    navigate(
      `/users?page=${1}&postsPerPage=${Number.parseInt(event.target.value)}`,
      {
        replace: false,
      }
    );
  };

  const handlePageChange = useCallback(
    (page: number) => {
      setCurrentPage(page);
      const urlString = `/users?page=${page}&postsPerPage=${postsPerPage}`;
      navigate(urlString, {
        replace: false,
      });
    },
    [navigate]
  );

  return (
    <>
      <StyledHeadingH1>Blog contributors</StyledHeadingH1>{" "}
      <UsersList
        usersQuery={usersPaginatedQuery}
        handleClickPost={handleClickUser}
      />
      <Pagination
        currentPage={currentPage}
        postsPerPage={postsPerPage}
        allItemsLen={allUsersLen}
        handlePageChange={handlePageChange}
        handleItemsPerPage={handleUsersPerPage}
      />
    </>
  );
};
