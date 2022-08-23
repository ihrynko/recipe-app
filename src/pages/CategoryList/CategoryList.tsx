import { useEffect, useCallback } from "react";
import { useSelector } from 'react-redux';
import { categoryListResetData } from './reducers/categoryList';
import { categoryListFetchStart } from './thunks/categoryList';
import { useAppDispatch } from '../../store';
import * as selectors from './selectors/categoryList';
import Loader from '../../components/Loader'
import {CategoryCard} from './components/CategoryCard/CategoryCard'
import Card from '@mui/material/Card';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Skeleton, Grid ,Paper, Box, Container, Button} from '@mui/material';
import { CardContent, Typography } from '@mui/material';
import { CreateCategoryModal } from './components/CreateCategoryModal/CreateCategoryModal'
import {DeleteCategoryModal} from './components/DeleteCategoryModal/DeleteCategoryModal'
import { modalOpenToggleAction } from "../../store/modal/reducers/modal";
import { MODAL_NAME } from "../../store/modal/actions/modal";
import { categoryListCreateCategory } from './thunks/categoryListCreateCategory'
import { categoryListDeleteCategory } from './thunks/categoryListDeleteCategory'
import { CategoryCreate, Category } from '../../types/pages/index'
import { modalStateSelector } from '../../store/modal/selectors/modal';
import { deleteActions } from "./reducers/categoryListDeleteCategory";

const CategoryList = () => {
   const {
    data: categories,
    loading,
    error,
   } = useSelector(selectors.categoryListStateSelector);
 const {
    open, name
  } = useSelector(modalStateSelector);
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(categoryListFetchStart());
    return () => {
      dispatch(categoryListResetData());
    };
  }, [dispatch]);

  const handleCreateCategory = (values: CategoryCreate) => {
    dispatch(categoryListCreateCategory({ categoryData: values }));
  };

   const handleCreateModalOpenToggle = () => {
    dispatch(modalOpenToggleAction({ name: MODAL_NAME.CATEGORY_CREATE }));
  };

    const handleDeleteModalOpenToggle = useCallback((item: Category ) => {
    dispatch(deleteActions.categoryDeleteItemDataSet({ data: item }));
    dispatch(modalOpenToggleAction({ name: MODAL_NAME.CATEGORY_DELETE }));
  }, [])

   const handleDeleteModalClose = useCallback(() => {
    dispatch(modalOpenToggleAction({ name: MODAL_NAME.CATEGORY_DELETE }));
  }, [dispatch]);

    const handleDeleteCategory = (id: string) => {
    dispatch(categoryListDeleteCategory({id}));
  };

  return (
   <Container maxWidth="md">
      {loading && !categories && !error && <Loader />}
      {!loading && !error && (
        <Grid container direction="column" justifyContent="center" alignItems="center">
          <Button onClick={handleCreateModalOpenToggle}>
        <AddCircleIcon/>
        </Button>

          {categories.map((category) => {
            return (

                <Card key={category._id}>
                  <CategoryCard
                  category={category}
                  onDelete={handleDeleteModalOpenToggle}
                  />
               
                 </Card>
            );
          })}
          
                  </Grid>
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
    </Container>
  );
};

export default CategoryList;

