import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { Card, CardContent, Snackbar } from "@mui/material";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import { useAuth } from "@/hooks/AuthContext";

const FormItem = styled.div`
  margin-bottom: 1rem;
`;

const ErrorMsg = styled.div`
  color: rgba(255, 0, 0, 0.6);
  font-size: 0.8rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  opacity: ${(props) => (props.hidden ? 0 : 1)};
  transform: ${(props) =>
    props.hidden ? "translateY(-1rem)" : "translateY(0)"};
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
`;

const Label = styled.div`
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: #555;
`;

const StyledAlert = styled(Alert)`
  white-space: pre-line;
  max-width: 260px;
  font-size: 0.8rem;
`;

const StyledCard = styled(Card)`
  width: 400px;
  padding: 2rem 1rem;
  max-height: 80%; // カードの最大高さを80%に制限
  overflow-y: auto; // 必要に応じてスクロールバーを表示
  border-radius: 0.5rem;
  border: 1.1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0px 0px 0.5px rgba(0, 0, 0, 0.1);
`;

const StyledButton = styled(Button)`
  background-color: rgba(63, 81, 181, 0.7);
  color: #fff;
  font-weight: bold;
  margin-top: 4rem;
  padding: 0.6rem;
  &:hover {
    background-color: rgba(63, 81, 181, 0.9);
    box-shadow: none;
  }
  box-shadow: 0.5px 0.5px 0.5px rgba(0, 0, 0, 0.1);
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
`;

const FormContainer = styled.div`
  flex: 1; // この値を調整して、入力フォームが占めるスペースの比率を変更
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [usernameError, setUsernameError] = useState("");
  const { setIsLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const regex = /^[a-zA-Z0-9-_]+$/;
    if (!regex.test(username) && username !== "") {
      setSnackbarMessage(
        "半角の「英数字、ハイフン、アンダースコア」のみ使用可能"
      );
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      setUsernameError(true);
    } else {
      setUsernameError(false);
    }
  }, [username]);

  const handleLogin = async () => {
    if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
      setError(
        "Username can only contain letters, numbers, hyphens, and underscores."
      );
      setSnackbarOpen(true);
      setSnackbarSeverity("error");
      setSnackbarMessage(
        "半角の「英数字、ハイフン、アンダースコア」のみ使用可能"
      );
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/token/", {
        username: username,
        password: password,
      });
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);
      onLoginSuccess();
      setIsLoggedIn(true);
      navigate("/transaction/list");
      setSnackbarOpen(true);
      setSnackbarSeverity("success");
      setSnackbarMessage("Login successful");
    } catch (error) {
      console.error(error);
      setSnackbarOpen(true);
      setSnackbarSeverity("error");
      setSnackbarMessage("ログインに失敗しました");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyUp = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <StyledCard>
      <CardContent>
        <FlexContainer>
          <FormContainer onKeyUp={handleKeyUp}>
            <FormItem>
              <Label>ユーザー名</Label>
              <TextField
                fullWidth
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                variant="outlined"
                size="small"
                error={!!usernameError}
              />
            </FormItem>
            <FormItem>
              <Label>パスワード</Label>
              <TextField
                fullWidth
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                size="small"
              />
            </FormItem>
          </FormContainer>
          <StyledButton
            variant="contained"
            onClick={handleLogin}
            fullWidth
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </StyledButton>
        </FlexContainer>
        <Snackbar
          open={snackbarOpen}
          onClose={() => setSnackbarOpen(false)}
          autoHideDuration={3000}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <StyledAlert
            onClose={() => setSnackbarOpen(false)}
            severity={snackbarSeverity}
          >
            {snackbarMessage}
          </StyledAlert>
        </Snackbar>
      </CardContent>
    </StyledCard>
  );
}
export default Login;
