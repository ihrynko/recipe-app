import { useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../store";

import { CategoryCard } from "./components/CategoryCard/CategoryCard";
import { CreateCategoryModal } from "./components/CreateCategoryModal/CreateCategoryModal";
import { DeleteCategoryModal } from "./components/DeleteCategoryModal/DeleteCategoryModal";

import { deleteActions } from "./reducers/categoryListDeleteCategory";
import { categoryListResetData } from "./reducers/categoryList";
import { categoryListFetchStart } from "./thunks/categoryList";

import { modalStateSelector } from "../../store/modal/selectors/modal";
import { modalOpenToggleAction } from "../../store/modal/reducers/modal";
import { MODAL_NAME } from "../../store/modal/actions/modal";

import { categoryListCreateCategory } from "./thunks/categoryListCreateCategory";
import { categoryListDeleteCategory } from "./thunks/categoryListDeleteCategory";

import { CategoryCreate, Category } from "../../types/pages/index";
import * as selectors from "./selectors/categoryList";
import Loader from "../../components/Loader";

import AddIcon from "@mui/icons-material/Add";
import { Grid, Box } from "@mui/material";
import {
  StyledCard,
  StyledButton,
  StyledContainer,
  StyledWrapper,
} from "./styled";
import { toast } from "react-toastify";

const CategoryList = () => {
  const {
    data: categories,
    loading,
    error,
  } = useSelector(selectors.categoryListStateSelector);
  const { open, name } = useSelector(modalStateSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(categoryListFetchStart());
    return () => {
      dispatch(categoryListResetData());
    };
  }, [dispatch]);

  useEffect(() => {
    if (error && !loading) {
      toast.error("Error! Bad request!", {
        autoClose: 3000,
      });
      toast.clearWaitingQueue();
    }
  }, [error, loading]);

  const handleCreateCategory = useCallback(
    (values: CategoryCreate) => {
      dispatch(categoryListCreateCategory({ categoryData: values }));
    },
    [dispatch]
  );

  const handleCreateModalOpenToggle = useCallback(() => {
    dispatch(modalOpenToggleAction({ name: MODAL_NAME.CATEGORY_CREATE }));
  }, [dispatch]);

  const handleDeleteModalOpenToggle = useCallback(
    (item: Category) => {
      dispatch(deleteActions.categoryDeleteItemDataSet({ data: item }));
      dispatch(modalOpenToggleAction({ name: MODAL_NAME.CATEGORY_DELETE }));
    },
    [dispatch]
  );

  const handleDeleteModalClose = useCallback(() => {
    dispatch(modalOpenToggleAction({ name: MODAL_NAME.CATEGORY_DELETE }));
  }, [dispatch]);

  const handleDeleteCategory = useCallback(
    (id: string) => {
      dispatch(categoryListDeleteCategory({ id }));
    },
    [dispatch]
  );

  return (
    <>
      {loading && !categories && !error && <Loader />}
      {categories.length > 0 && !loading && !error && (
        <StyledContainer maxWidth="lg">
          <StyledWrapper>
            <Box textAlign="right">
              <StyledButton onClick={handleCreateModalOpenToggle}>
                <AddIcon /> Create Category
              </StyledButton>
            </Box>

            <Grid
              container
              spacing={2}
              direction="column"
              justifyContent="center"
            >
              {categories.map((category) => {
                return (
                  <Grid item xs={3} sm={6} md={4} key={category._id}>
                    <StyledCard key={category._id}>
                      <CategoryCard
                        category={category}
                        onDelete={handleDeleteModalOpenToggle}
                      />
                    </StyledCard>
                  </Grid>
                );
              })}
            </Grid>
          </StyledWrapper>
        </StyledContainer>
      )}

      <CreateCategoryModal
        onClose={handleCreateModalOpenToggle}
        onSave={handleCreateCategory}
        open={open && name === MODAL_NAME.CATEGORY_CREATE}
      />

      <DeleteCategoryModal
        onClose={handleDeleteModalClose}
        onDelete={handleDeleteCategory}
        open={open && name === MODAL_NAME.CATEGORY_DELETE}
      />
    </>
  );
};

export default CategoryList;
