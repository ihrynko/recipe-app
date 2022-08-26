import React from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { RecipeCreate, Category } from '../../../../types/pages';
import { Box, Typography, TextField, Button } from "@mui/material";
import { StyledForm } from './styled'
import styled from "styled-components";

const createRecipeSchema = yup.object().shape({
     title: yup.string().required("This field is required"),
    description: yup.string().required("This field is required"),
    imageUrl:yup.string().required("This field is required"),
    timeInMins: yup.number().required("This field is required"),
    category: yup.string().required("This field is required"),
    ingredients: yup.array().of(yup.object().shape({
    ingredient: yup.string(),
    amount: yup.number(),
    unit: yup.string(),
    })).required("This field is required"),
    instructions: yup.array().of(yup.string()).required("This field is required"),
});

type RecipeFormProps = {
  name: string;
  // categoryId: string;
  loading: boolean;
  onSave: (data: RecipeCreate) => void;
  onCancel: () => void;
};

export const RecipeForm = (props:RecipeFormProps ) => {
  const { onSave, name, loading, onCancel } = props;
    const {
      control,
    handleSubmit,
    formState: { errors },
  } = useForm<RecipeCreate>({
    resolver: yupResolver(createRecipeSchema),
  });

  const { fields, append, remove } = useFieldArray({
    name: "ingredients",
    control
  });

  return (
    <>
      <Typography variant="h3" style={{ marginBottom: "15px" }}>Create recipe</Typography>
      <StyledForm onSubmit={handleSubmit(onSave)} id={name}>
        <Controller
        render={({ field }) => (
        <TextField
        placeholder='Enter name of recipe'      
        label="Name of recipe"
        disabled={loading}
        {...field} />)}  
          name="title"
          control={control}
          defaultValue={""}
        />
        {errors.title && (
          <Typography style={{ display: "block" }} color="error" >
            {errors.title.message}
          </Typography>
        )}
          <Controller
          render={({ field }) => <TextField
            placeholder='Enter the link for your recipe image'
            label="Image"
          disabled={loading}
            {...field} />}
          name="imageUrl"
          control={control}
          defaultValue={""}
        />
        {errors.imageUrl && (
          <Typography style={{ display: "block" }} color="error">
            {errors.imageUrl.message}
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
          <Controller
          render={({ field }) => <TextField
          placeholder='Enter time in minutes'
          label="Cooking time"
          disabled={loading}
            {...field} />}
          name="timeInMins"
          control={control}
        />
        {errors.timeInMins && (
          <Typography style={{ display: "block" }} color="error">
            {errors.timeInMins.message}
          </Typography>
        )}
         <Controller
          render={({ field }) => <TextField
            label="Category"
          // disabled 
            {...field} />}
          name="category"
          control={control}
        />
        {errors.category && (
          <Typography style={{ display: "block" }} color="error">
            {errors.category.message}
          </Typography>
        )}
        {fields.map((field, index) => {
            return (
              <Row key={field.id}>
                  <label htmlFor={`ingredients[${index}].ingredient`}>Name</label>
                  <input
                    type="text"
                    // ref={register()}
                    name={`ingredients[${index}].ingredient`}
                    id={`ingredients[${index}].ingredient`}
                  />


                  <label htmlFor={`ingredients[${index}].amount`}>Amount</label>
                  <input
                    // ref={register()}
                    defaultValue={field.amount}
                    name={`ingredients[${index}].amount`}
                    id={`ingredients[${index}].amount`}
                  />


                  <label htmlFor={`ingredients[${index}].unit`}>Unit</label>
                  <input
                    type="text"
                    // ref={register()}
                    name={`ingredients[${index}].unit`}
                    id={`ingredients[${index}].unit`}
                  />


                <Button type="button" onClick={() => remove(index)}>
                  &#8722;
                </Button>
              </Row>
            );
          })}
        <Button
          type="button"
          onClick={() => append({ ingredient:"", amount: 0, unit: "" })}
          >
            Add ingredient
          </Button>

         <Controller
          render={({ field }) => <TextField
            label="Method"
            // disabled 
            {...field} />}
          name="instructions"
          control={control}
          defaultValue={['']}
        />
        {errors.instructions && (
          <Typography style={{ display: "block" }} color="error">
            {errors.instructions.message}
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

const Row = styled.div`
  display: flex;
  align-items: center;
  & > * {
    margin-right: 20px !important;
  }
  .ui.button {
    margin: 10px 0 0 8px;
  }
`;