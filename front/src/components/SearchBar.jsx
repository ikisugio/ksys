import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import { styled } from "@mui/material/styles";

const RoundedTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: "25px",
    height: "50px",
  },
  "& .MuiInputLabel-root": {
    top: "-3px",
  },
});

const SearchBar = ({ query, onQueryChange, onSearch }) => {
  return (
    <form onSubmit={onSearch} style={{ display: "flex" }}>
      <RoundedTextField
        label="Search"
        variant="outlined"
        value={query}
        onChange={onQueryChange}
        fullWidth
        margin="normal"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton type="submit">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </form>
  );
};

export default SearchBar;
