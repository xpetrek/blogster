import { useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledNavbarButton = styled.button`
  background-color: var(--primary);
  border: none;
  outline: none;
  padding: 10px 10px;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    background-color: var(--primary-dark);
  }

  &:disabled {
    background-color: var(--grey-500);
  }
`;

const StyledBodyContainer = styled.div`
  background-color: var(--primary-light);
  min-height: 100vh;
  min-width: 100vw;
`;

const StyledNavbar = styled.nav`
  height: 100%;
  width: 100%;
  background-color: var(--primary);
  display: flex;
  justify-content: center;
`;

type Props = {
  children?: React.ReactNode;
};

export const Layout: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();

  return (
    <StyledBodyContainer>
      <StyledNavbar>
        <Link to="/">
          <StyledNavbarButton>Home</StyledNavbarButton>
        </Link>
        <Link to="/posts?page=1&postsPerPage=10">
          <StyledNavbarButton>Posts</StyledNavbarButton>
        </Link>
        <Link to="/users">
          <StyledNavbarButton>Users</StyledNavbarButton>
        </Link>
      </StyledNavbar>
      {children}
    </StyledBodyContainer>
  );
};
