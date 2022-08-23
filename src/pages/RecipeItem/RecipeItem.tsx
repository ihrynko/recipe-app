import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../components/Loader'
import { useAppDispatch } from '../../store';
import { recipeItemFetchStart } from './thunks/recipeItem';
import { recipeItemResetData } from './reducers/recipeItem';

import {recipeItemStateSelector} from './selectors/recipeItem';

 const RecipeItem = () => {
  const { recipeId } = useParams();

  const {
    loading,
    data: recipeData,
    error,
  } = useSelector(recipeItemStateSelector);
  console.log(recipeData);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (recipeId) {
      dispatch(recipeItemFetchStart({ id: recipeId }));
    }
    return () => {
      dispatch(recipeItemResetData());
    };
  }, [dispatch, recipeId]);

  return (
    <>
      {loading && !error && <Loader />}
      {recipeData && !loading && !error && (
        <>
          <Button onClick={() => navigate(-1)}>
            <span>Back</span>
          </Button>
          <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
            <Typography
              textAlign="center"
              mb={1}
              variant="h4"
              component="h1"
              data-testid="book-title"
            >
              {recipeData.title}
            </Typography>
            <Typography textAlign="center">{recipeData.description}</Typography>
          </Box>
        </>
      )}
      {error && !loading && <p>{error}</p>}
    </>
  );
};

export default RecipeItem;