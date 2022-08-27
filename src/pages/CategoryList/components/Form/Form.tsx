import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { CategoryCreate } from "../../../../types/pages";
import { Box, Typography, TextField, Button } from "@mui/material";
import { StyledForm } from "./styled";

const createCategorySchema = yup.object().shape({
  name: yup.string().required("Required"),
  description: yup.string(),
  image: yup
    .string()
    .required("Required")
    .matches(
      /\.(jpeg|jpg|gif|png)$/,
      "Only image URL is allowed for this field "
    ),
});

type CategoryFormProps = {
  name: string;
  loading: boolean;
  onSave: (data: CategoryCreate) => void;
  onCancel: () => void;
};

export const CategoryForm = (props: CategoryFormProps) => {
  const { onSave, name, loading, onCancel } = props;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryCreate>({
    resolver: yupResolver(createCategorySchema),
    mode: "all",
  });

  return (
    <>
      <Typography variant="h3" style={{ marginBottom: "15px" }}>
        Create category
      </Typography>
      <StyledForm onSubmit={handleSubmit(onSave)} id={name}>
        <Controller
          render={({ field }) => (
            <TextField
              autoComplete="false"
              placeholder="Enter name of category"
              label="Name of category"
              disabled={loading}
              error={!!errors["name"]}
              helperText={errors["name"] ? errors["name"].message : ""}
              {...field}
            />
          )}
          name="name"
          control={control}
          defaultValue={""}
        />
        <Controller
          render={({ field }) => (
            <TextField
              placeholder="Enter the link for your category image"
              label="Image"
              disabled={loading}
              error={!!errors["image"]}
              helperText={errors["image"] ? errors["image"].message : ""}
              {...field}
            />
          )}
          name="image"
          control={control}
          defaultValue={""}
        />
        <Controller
          render={({ field }) => (
            <TextField
              multiline
              disabled={loading}
              label="Description"
              error={!!errors["description"]}
              helperText={
                errors["description"] ? errors["description"].message : ""
              }
              rows={4}
              {...field}
            />
          )}
          name="description"
          control={control}
          defaultValue={""}
        />
        <Box display="flex" gap="4px" justifyContent="flex-end">
          <Button disabled={loading} onClick={onCancel}>
            Cancel
          </Button>
          <Button disabled={loading} variant="contained" type="submit">
            Submit
          </Button>
        </Box>
      </StyledForm>
    </>
  );
};
