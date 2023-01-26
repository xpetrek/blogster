import { Link, useParams } from "react-router-dom";
import { usePostsByUserPaginated } from "../hooks/usePosts";
import { useUser } from "../hooks/useUser";
import { Post, User } from "../utils/globaltypes";

export const UserInfo = () => {
  const { id } = useParams();
  const userQuery = useUser(Number.parseInt(id ?? "1"));
  const userData: User = userQuery.data;
  const userPostsQuery = usePostsByUserPaginated(1, 1, 5);

  const getShortDescription = (description: string) => {
    return description.slice(0, 70) + "...";
  };

  return (
    <>
      {userQuery.isLoading ? null : (
        <>
          <div>
            <h1>{userData.name}'s personal information</h1>
            <h3>Personal information</h3>
            <div>
              <img src="https://via.placeholder.com/150" />

              <div>
                <div>
                  <p>Name:</p>
                  <p>{userData.name}</p>
                </div>
                <div>
                  <p>Username:</p>
                  <p>{userData.username}</p>
                </div>
                <div>
                  <p>Mobile phone:</p>
                  <p>{userData.phone}</p>
                </div>
                <div>
                  <p>Website:</p>
                  <p>{userData.website}</p>
                </div>
              </div>
            </div>
            <div>
              <h3>Address information</h3>
              <div>
                <p>City:</p>
                <p>{userData.address.city}</p>
              </div>
              <div>
                <p>Street:</p>
                <p>{userData.address.street}</p>
              </div>
              <div>
                <p>Suite:</p>
                <p>{userData.address.suite}</p>
              </div>
              <div>
                <p>Zipcode:</p>
                <p>{userData.address.zipcode}</p>
              </div>
              <div>
                <p>Geolocation: </p>
                <p>
                  {userData.address.geo.lat}, {userData.address.geo.lng}lng
                </p>
              </div>

              <p></p>
            </div>
            <div>
              <h3>Company information</h3>
              <div>
                <p>Name:</p>
                <p>{userData.company.name}</p>
              </div>
              <div>
                <p>Areas: </p>
                <p>{userData.company.bs}</p>
              </div>
              <div>
                <p>Keywords: </p>
                <p>{userData.company.catchPhrase}</p>
              </div>
            </div>
          </div>
          <div>
            {userPostsQuery.isLoading
              ? null
              : userPostsQuery?.data.map((post: Post, key: number) => (
                  <article key={key}>
                    <h3>{post.title}</h3>
                    <p>{getShortDescription(post.body)}</p>
                  </article>
                ))}
          </div>
        </>
      )}
    </>
  );
};
