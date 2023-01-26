import { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { usePost } from "../hooks/usePost";
import { useComments } from "../hooks/useComments";
import { PostComment } from "../utils/globaltypes";
import { useUserByPost } from "../hooks/useUser";

export const Post = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const postQuery = usePost(Number.parseInt(id ?? "1"));
  const postCommentsQuery = useComments(Number.parseInt(id ?? "1"));
  const userQuery = useUserByPost(Number.parseInt(id ?? "1"));
  const handleClickUser = useCallback(
    (userId: number) => navigate(`/users/${userId}`, { replace: false }),
    [navigate]
  );

  return (
    <div>
      <div>
        {postQuery.isLoading ? null : (
          <div>
            <h1>{postQuery.data.title}</h1>
            <div>
              <p>{postQuery.data.body}</p>
              <p
                onClick={() => {
                  handleClickUser(userQuery.data?.id);
                }}
              >
                Written by {userQuery.data?.username}
              </p>
            </div>
          </div>
        )}
      </div>

      <h2> Comment section</h2>
      {postCommentsQuery.isLoading ? null : (
        <div>
          {postCommentsQuery.data.map((comment: PostComment, key: number) => (
            <div key={key}>
              <p>{comment.name}</p>
              <p>{comment.email}</p>
              <p>{comment.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
