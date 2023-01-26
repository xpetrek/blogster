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
        : usersQuery.data.map((post: User, key: number) => (
            <Link to={`/users/${post.id}`}>
              <div
                key={key}
                // onClick={() => handleClickPost(post.id)}
              >
                <h3>{post.name}</h3>
              </div>
            </Link>
          ))}
    </div>
  );
};
