import {
  StyledHeadingH1,
  StyledHeadingH2,
  StyledHeadingH3,
} from "../components/SharedStyled";

export const Home = () => {
  return (
    <div>
      <StyledHeadingH1>Welcome to the blog post page</StyledHeadingH1>
      <StyledHeadingH2>
        Browse the page "Posts" to see blog posts
      </StyledHeadingH2>
      <StyledHeadingH2>
        Browse the page "Users" to see contributors profiles
      </StyledHeadingH2>
      <StyledHeadingH2>
        Check the selected posts and its comments. Click on author "by ****" to
        redirect to user profile.
      </StyledHeadingH2>
      <StyledHeadingH3>by Stanislav Petrek</StyledHeadingH3>
    </div>
  );
};
