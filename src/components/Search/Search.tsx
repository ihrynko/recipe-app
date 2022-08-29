import * as React from "react";
import { useSelector } from "react-redux";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";

import IconButton from "@mui/material/IconButton";

import SearchIcon from "@mui/icons-material/Search";
import { ChangeEvent } from "react";

type SearchProps = {
  value: string;
  name: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const Search = (props: SearchProps) => {
  const { value, onChange, name } = props;

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
    >
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        value={value}
        placeholder={name === "category" ? "Search Category" : "Search Recipe"}
        inputProps={{ "aria-label": "search recipe" }}
        onChange={onChange}
      />
    </Paper>
  );
};
