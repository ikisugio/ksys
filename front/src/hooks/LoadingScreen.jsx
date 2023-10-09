import { CircularProgress, Box } from "@mui/material";
import styled from "@emotion/styled";

const LoadingContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

function LoadingScreen() {
  return (
    <LoadingContainer>
      <CircularProgress size={80} />
    </LoadingContainer>
  );
}

export default LoadingScreen;
