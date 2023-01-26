import { Link, useParams } from "react-router-dom";
import { useUsers } from "../hooks/useUsers";
import { User } from "../utils/globaltypes";

export const Users = () => {
  const { id } = useParams();
  const usersQuery = useUsers();
  return (
    <div>
      {usersQuery?.isLoading
        ? null
        : usersQuery.data.map((user: User, key: number) => (
            <Link to={`/users/${user.id}`}>
              <div key={key}>
                <h3>{user.name}</h3>
              </div>
            </Link>
          ))}
    </div>
  );
};
