import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { CategoryCreate } from '../../../../types/pages';
import { Box, Typography, TextField, Button } from "@mui/material";
import {StyledForm} from './styled'

const createCategorySchema = yup.object().shape({
  name: yup.string().required("This field is required"),
  description: yup.string(),
  image: yup.string().required("This field is required"),
});

type CategoryFormProps = {
  name: string;
  loading: boolean;
  onSave: (data: CategoryCreate) => void;
  onCancel: () => void;
};

export const CategoryForm = (props:CategoryFormProps ) => {
  const { onSave, name, loading, onCancel } = props;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryCreate>({
    resolver: yupResolver(createCategorySchema),
  });
 

  return (
    <>
      <Typography variant="h3" style={{ marginBottom: "15px" }}>Create category</Typography>
      <StyledForm onSubmit={handleSubmit(onSave)} id={name}>
        <Controller
        render={({ field }) => (
        <TextField
        autoComplete='false'
        placeholder='Enter name of category'      
        label="Name of category"
        disabled={loading}
        {...field} />)}  
          name="name"
          control={control}
          defaultValue={""}
        />
        {errors.name && (
          <Typography style={{ display: "block" }} color="error" >
            {errors.name.message}
          </Typography>
        )}
          <Controller
          render={({ field }) => <TextField
            placeholder='Enter the link for your category image'
            label="Image"
          disabled={loading}
            {...field} />}
          name="image"
          control={control}
          defaultValue={""}
        />
        {errors.image && (
          <Typography style={{ display: "block" }} color="error">
            {errors.image.message}
          </Typography>
        )}

        <Controller
         render={({ field }) => (
        <TextField 
        multiline
        disabled={loading}
        label="Description"
        rows={4}   
        {...field} />)}
          name="description"
          control={control}
          defaultValue={""}
        />
        {errors.description && (
          <Typography style={{ display: "block" }} color="error" >
            {errors.description.message}
          </Typography>
        )}
           <Box
            display="flex"
            gap="4px"
            justifyContent="flex-end"
        >
          <Button
            disabled={loading}
            onClick={onCancel}>
              Cancel
            </Button>
          <Button
            disabled={loading}
              variant="contained"
              type="submit"
            >
              Submit
            </Button>
          </Box>
        
      </StyledForm>
    </>
  );
};