import { UseQueryResult } from "@tanstack/react-query";
import React from "react";
import styled from "styled-components";
import { StyledHeadingH1, StyledHeadingH3 } from "./SharedStyled";

const StyledImage = styled.img`
  width: 5rem;
  height: 5rem;
  margin: 0 0.5rem 0 0.5rem;
  box-shadow: rgba(0, 0, 0, 0.8) 2px 2px 5px;
`;

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
  p {
    font-weight: bold;
  }
`;

type Props = {
  userQuery: UseQueryResult<any, unknown>;
};
const UserInfo = ({ userQuery }: Props) => {
  return (
    <>
      {userQuery.isLoading ? null : (
        <>
          <StyledHeadingH1>
            {userQuery.data.name}'s personal information
          </StyledHeadingH1>
          <StyledHeadingH3>Personal information</StyledHeadingH3>
          <StyledPersonalInformationContainer>
            <StyledImage src="https://via.placeholder.com/150" />
            <StyledPersonalInformation>
              <StyledTextInformation>
                <p>Name:</p>
                <span>{userQuery.data.name}</span>
              </StyledTextInformation>
              <StyledTextInformation>
                <p>Username:</p>
                <span>{userQuery.data.username}</span>
              </StyledTextInformation>
              <StyledTextInformation>
                <p>Mobile phone:</p>
                <span>{userQuery.data.phone}</span>
              </StyledTextInformation>
              <StyledTextInformation>
                <p>Website:</p>
                <span>{userQuery.data.website}</span>
              </StyledTextInformation>
            </StyledPersonalInformation>
          </StyledPersonalInformationContainer>
          <>
            <StyledHeadingH3>Address information</StyledHeadingH3>
            <StyledTextInformation>
              <p>City:</p>
              <span>{userQuery.data.address.city}</span>
            </StyledTextInformation>
            <StyledTextInformation>
              <p>Street:</p>
              <span>{userQuery.data.address.street}</span>
            </StyledTextInformation>
            <StyledTextInformation>
              <p>Suite:</p>
              <span>{userQuery.data.address.suite}</span>
            </StyledTextInformation>
            <StyledTextInformation>
              <p>Zipcode:</p>
              <span>{userQuery.data.address.zipcode}</span>
            </StyledTextInformation>
            <StyledTextInformation>
              <p>Geolocation: </p>
              <span>
                {userQuery.data.address.geo.lat},
                {userQuery.data.address.geo.lng}
              </span>
            </StyledTextInformation>
          </>
          <>
            <StyledHeadingH3>Company information</StyledHeadingH3>
            <StyledTextInformation>
              <p>Name:</p>
              <span>{userQuery.data.company.name}</span>
            </StyledTextInformation>
            <StyledTextInformation>
              <p>Areas: </p>
              <span>{userQuery.data.company.bs}</span>
            </StyledTextInformation>
            <StyledTextInformation>
              <p>Keywords: </p>
              <span>{userQuery.data.company.catchPhrase}</span>
            </StyledTextInformation>
          </>
        </>
      )}
    </>
  );
};

export default React.memo(UserInfo);
