// components/SliderFilter.jsx
import React, { useState } from "react";
import { Box, Chip, Menu, MenuItem, IconButton } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const SliderFilter = ({ filters, onSelect }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState(null);

  const handleFilterClick = (event, filter) => {
    setAnchorEl(event.currentTarget);
    setSelectedFilter(filter);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleFilterSelect = (filterValue) => {
    onSelect(filterValue, selectedFilter);
    handleMenuClose();
  };

  return (
    <Box
      sx={{
        overflowX: "auto",
        display: "flex",
        gap: 1,
        padding: 1,
      }}
    >
      {filters.map((filter, index) => (
        <Chip
          key={index}
          label={
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {filter}
              <IconButton
                size="small"
                sx={{
                  padding: "0px",
                  width: "0px",
                  marginLeft: "10px",
                  "& .MuiSvgIcon-root": {
                    fontSize: "1rem",
                  },
                }}
              >
                <ArrowDropDownIcon />
              </IconButton>
            </Box>
          }
          onClick={(e) => handleFilterClick(e, filter)}
          sx={{
            borderRadius: "4px",
            paddingRight: "4px",
            paddingLeft: "4px",
            width: "auto",
          }}
        />
      ))}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        MenuListProps={{ sx: { maxHeight: 300 } }}
        PaperProps={{
          sx: { boxShadow: "none", border: "1px solid lightgray" },
        }}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={() => handleFilterSelect("選択肢1")}>
          選択肢1
        </MenuItem>
        <MenuItem onClick={() => handleFilterSelect("選択肢2")}>
          選択肢2
        </MenuItem>
        {/* 他の選択肢も同様に追加 */}
      </Menu>
    </Box>
  );
};

export default SliderFilter;
