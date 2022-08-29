import * as React from "react";
import { useSelector } from "react-redux";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";

import IconButton from "@mui/material/IconButton";

import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../store";
import { recipeListBySearchFetchStart } from "../../pages/RecipeList/thunks/recipeListSearchRecipe";
import {
  recipeListSearchResetData,
  recipeListChangeValue,
} from "../../pages/RecipeList/reducers/recipeListSearchRecipe";
import { recipeSearchStateSelector } from "../../pages/RecipeList/selectors/recipeList";

export default function Search() {
  const { query, data } = useSelector(recipeSearchStateSelector);

  const dispatch = useAppDispatch();

  console.log(data);

  useEffect(() => {
    if (query) {
      dispatch(recipeListBySearchFetchStart({ query: query }));
    }
    return () => {
      dispatch(recipeListSearchResetData());
    };
  }, [dispatch, query]);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };

  const handleChange = (e: { target: { value: string } }) => {
    dispatch(recipeListChangeValue({ query: e.target.value }));
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
        placeholder="Search Recipe"
        inputProps={{ "aria-label": "search recipe" }}
        onChange={handleChange}
      />
    </Paper>
  );
}
