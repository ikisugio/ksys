import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";

const RoundedTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: "25px",
  },
});

const SearchBar = ({ query, onQueryChange, onSearch }) => {
  return (
    <form onSubmit={onSearch} style={{ display: "flex", alignItems: "center" }}>
      <RoundedTextField
        label="Search"
        variant="outlined"
        value={query}
        onChange={onQueryChange}
        fullWidth
        margin="normal"
      />
      <IconButton type="submit">
        <SearchIcon />
      </IconButton>
    </form>
  );
};

export default SearchBar;
