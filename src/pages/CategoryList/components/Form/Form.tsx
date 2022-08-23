import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input, Typography, TextField, Button } from "@mui/material";
import { CategoryCreate } from '../../../../types/pages';

const createCategorySchema = yup.object().shape({
  name: yup.string().required("This field is required"),
  description: yup.string(),
  image: yup.string().required("This field is required"),
});

type CategoryFormProps = {
    name: string;
  onSave: (data: CategoryCreate) => void;
  onCancel: () => void;
};

export const CategoryForm = (props:CategoryFormProps ) => {
  const { onSave, name, onCancel } = props;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryCreate>({
    resolver: yupResolver(createCategorySchema),
  });
 

  return (
    <>
      <Typography variant="h3">Create Category</Typography>
      <form onSubmit={handleSubmit(onSave)} id={name}>
        <Controller
        render={({ field }) => (
        <TextField 
        label="Name of category"
        rows={10}
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
          render={({ field }) => (
        <TextField 
        label="Description"
        rows={10}
              {...field} />
                  )}
                  
          name="description"
          control={control}
           defaultValue={""}
        />
        {errors.description && (
          <Typography style={{ display: "block" }} color="error" >
            {errors.description.message}
          </Typography>
        )}
        <Controller
          render={({ field }) => <TextField label="Image" {...field} />}
          name="image"
          control={control}
          defaultValue={""}
        />
        {errors.image && (
          <Typography style={{ display: "block" }} color="error">
            {errors.image.message}
          </Typography>
        )}
          <Button onClick={onCancel}>
              Cancel
            </Button>
            <Button
              variant="contained"
              type="submit"
            >
              Submit
            </Button>
      </form>
    </>
  );
};