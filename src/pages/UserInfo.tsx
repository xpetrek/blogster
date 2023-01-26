import { useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { StyledHeadingH3 } from "../components/CommonStyled";
import { usePostsByUserPaginated } from "../hooks/usePosts";
import { useUser } from "../hooks/useUser";
import { Post, User } from "../utils/globaltypes";

export const UserInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const userQuery = useUser(Number.parseInt(id ?? "1"));
  const userData: User = userQuery.data;
  const userPostsQuery = usePostsByUserPaginated(1, 1, 5);

  const getShortDescription = (description: string) => {
    return description.slice(0, 70) + "...";
  };

  const handleClickPost = useCallback(
    (postId: number) => navigate(`/posts/${postId}`, { replace: false }),
    [navigate]
  );

  return (
    <>
      {userQuery.isLoading ? null : (
        <>
          <StyledContainer>
            <h1>{userData.name}'s personal information</h1>
            <StyledHeadingH3>Personal information</StyledHeadingH3>
            <StyledPersonalInformationContainer>
              <StyledImage src="https://via.placeholder.com/150" />
              <StyledPersonalInformation>
                <StyledTextInformation>
                  <p>Name:</p>
                  <p>{userData.name}</p>
                </StyledTextInformation>
                <StyledTextInformation>
                  <p>Username:</p>
                  <p>{userData.username}</p>
                </StyledTextInformation>
                <StyledTextInformation>
                  <p>Mobile phone:</p>
                  <p>{userData.phone}</p>
                </StyledTextInformation>
                <StyledTextInformation>
                  <p>Website:</p>
                  <p>{userData.website}</p>
                </StyledTextInformation>
              </StyledPersonalInformation>
            </StyledPersonalInformationContainer>
            <StyledInformationContainer>
              <StyledHeadingH3>Address information</StyledHeadingH3>
              <StyledTextInformation>
                <p>City:</p>
                <p>{userData.address.city}</p>
              </StyledTextInformation>
              <StyledTextInformation>
                <p>Street:</p>
                <p>{userData.address.street}</p>
              </StyledTextInformation>
              <StyledTextInformation>
                <p>Suite:</p>
                <p>{userData.address.suite}</p>
              </StyledTextInformation>
              <StyledTextInformation>
                <p>Zipcode:</p>
                <p>{userData.address.zipcode}</p>
              </StyledTextInformation>
              <StyledTextInformation>
                <p>Geolocation: </p>
                <p>
                  {userData.address.geo.lat}, {userData.address.geo.lng}lng
                </p>
              </StyledTextInformation>

              <p></p>
            </StyledInformationContainer>
            <StyledInformationContainer>
              <StyledHeadingH3>Company information</StyledHeadingH3>
              <StyledTextInformation>
                <p>Name:</p>
                <p>{userData.company.name}</p>
              </StyledTextInformation>
              <StyledTextInformation>
                <p>Areas: </p>
                <p>{userData.company.bs}</p>
              </StyledTextInformation>
              <StyledTextInformation>
                <p>Keywords: </p>
                <p>{userData.company.catchPhrase}</p>
              </StyledTextInformation>
            </StyledInformationContainer>
          </StyledContainer>
          <div>
            {userPostsQuery.isLoading
              ? null
              : userPostsQuery?.data.map((post: Post, key: number) => (
                  <StyledPostItem
                    key={key}
                    onClick={() => handleClickPost(post.id)}
                  >
                    <h3>{post.title}</h3>
                    <p>{getShortDescription(post.body)}</p>
                  </StyledPostItem>
                ))}
          </div>
        </>
      )}
    </>
  );
};

const StyledImage = styled.img`
  width: 5rem;
  height: 5rem;
  padding: 0 0.5rem 0 0.5rem;
`;
const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin: 0px auto;
  max-width: 800px;
  justify-content: center;
`;

const StyledInformationContainer = styled.div``;

const StyledPersonalInformationContainer = styled.div`
  display: flex;
`;

const StyledPersonalInformation = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: flex-end;
`;

const StyledTextInformation = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledPostItem = styled.article`
  width: 45%;
  min-width: 30rem;
  cursor: pointer;
  border: 1px solid black;
  border-radius: 1rem;
  box-shadow: rgba(0, 0, 0, 0.8) 5px 5px 10px;
  background-color: var(--primary);

  &:hover {
    text-decoration: underline;
    background-color: var(--primary-dark);
  }
`;

