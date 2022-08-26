import React from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { RecipeCreate, Category } from "../../../../types/pages";
import {
  Box,
  Typography,
  TextField,
  Button,
  Hidden,
  Grid,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { StyledForm } from "./styled";
import styled from "styled-components";

const createRecipeSchema = yup.object().shape({
  title: yup.string().required("This field is required"),
  description: yup.string().required("This field is required"),
  imageUrl: yup.string().required("This field is required"),
  timeInMins: yup.number().required("This field is required"),
  category: yup.string().required("This field is required"),
  ingredients: yup
    .array()
    .of(
      yup.object().shape({
        ingredient: yup.string().required("required"),
        amount: yup.number().required("required"),
        unit: yup.string().required("required"),
      })
    )
    .min(2, "The error message if length === 0 | 1"),
  instructions: yup
    .array()
    .of(
      yup.object().shape({
        value: yup.string().required("required"),
      })
    )
    .min(2, "The error message if length === 0 | 1"),
});

type RecipeFormProps = {
  name: string;
  loading: boolean;
  onSave: (data: RecipeCreate) => void;
  onCancel: () => void;
};

export const RecipeForm = (props: RecipeFormProps) => {
  const { onSave, name, loading, onCancel } = props;
  const { categoryId } = useParams();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RecipeCreate>({
    resolver: yupResolver(createRecipeSchema),
    mode: "all",
  });

  const { fields, append, remove } = useFieldArray({
    name: "ingredients",
    control,
  });

  const {
    fields: instructionFields,
    append: instructionAppend,
    remove: instructionRemove,
  } = useFieldArray({
    name: "instructions",
    control,
  });

  console.log(errors);

  return (
    <>
      <Typography variant="h3" style={{ marginBottom: "15px" }}>
        Create recipe
      </Typography>
      <StyledForm onSubmit={handleSubmit(onSave)} id={name}>
        <Controller
          render={({ field }) => (
            <TextField
              placeholder="Enter name of recipe"
              label="Name of recipe"
              disabled={loading}
              error={!!errors["title"]}
              helperText={errors["title"] ? errors["title"].message : ""}
              {...field}
            />
          )}
          name="title"
          control={control}
          defaultValue={""}
        />
        <Controller
          render={({ field }) => (
            <TextField
              placeholder="Enter the link for your recipe image"
              label="Image"
              disabled={loading}
              error={!!errors["imageUrl"]}
              helperText={errors["imageUrl"] ? errors["imageUrl"].message : ""}
              {...field}
            />
          )}
          name="imageUrl"
          control={control}
          defaultValue={""}
        />

        <Controller
          render={({ field }) => (
            <TextField
              multiline
              disabled={loading}
              label="Description"
              rows={4}
              error={!!errors["description"]}
              helperText={
                errors["description"] ? errors["description"].message : ""
              }
              {...field}
            />
          )}
          name="description"
          control={control}
          defaultValue={""}
        />

        <Controller
          render={({ field }) => (
            <TextField
              placeholder="Enter time in minutes"
              label="Cooking time"
              disabled={loading}
              error={!!errors["timeInMins"]}
              helperText={
                errors["timeInMins"] ? errors["timeInMins"].message : ""
              }
              {...field}
            />
          )}
          name="timeInMins"
          control={control}
        />
        <Controller
          render={({ field }) => {
            return <input type="hidden" {...field} />;
          }}
          name="category"
          defaultValue={categoryId}
          control={control}
        />

        <GroupFields>
          {fields.map((field, index) => {
            return (
              <Grid container key={field.id} spacing={1}>
                <Grid item>
                  <Controller
                    render={({ field, fieldState }) => {
                      return (
                        <TextField
                          placeholder={"Name"}
                          label={"Name"}
                          // error={!!errors["title"]}
                          // helperText={
                          //   errors["title"] ? errors["title"].message : ""
                          // }
                          {...field}
                        />
                      );
                    }}
                    name={
                      `ingredients[${index}].ingredient` as "ingredients.0.ingredient"
                    }
                    control={control}
                  />
                </Grid>
                <Grid item>
                  <Controller
                    render={({ field, fieldState }) => {
                      return (
                        <TextField
                          placeholder={"Amount"}
                          label={"Amount"}
                          {...field}
                        />
                      );
                    }}
                    name={
                      `ingredients[${index}].amount` as "ingredients.0.amount"
                    }
                    defaultValue={field.amount}
                    control={control}
                  />
                </Grid>
                <Grid item>
                  <Controller
                    render={({ field, fieldState }) => {
                      return (
                        <TextField
                          placeholder={"Unit"}
                          label={"Unit"}
                          {...field}
                        />
                      );
                    }}
                    name={`ingredients[${index}].unit` as "ingredients.0.unit"}
                    defaultValue={field.unit}
                    control={control}
                  />
                </Grid>
                <Button type="button" onClick={() => instructionRemove(index)}>
                  &#8722;
                </Button>
              </Grid>
            );
          })}
          <Button
            type="button"
            onClick={() => append({ ingredient: "", amount: 0, unit: "" })}
          >
            Add ingredient
          </Button>
        </GroupFields>

        {errors?.instructions && (
          <Typography style={{ display: "block" }} color="error">
            {errors?.instructions?.message}
          </Typography>
        )}

        {instructionFields.map((item, index) => {
          return (
            <Grid container key={item.id}>
              <Grid item>
                <Controller
                  render={({ field, fieldState }) => {
                    return (
                      <TextField
                        placeholder={`Step ${index + 1}`}
                        label={`Step ${index + 1}`}
                        multiline={true}
                        {...field}
                      />
                    );
                  }}
                  name={
                    `instructions[${index}].value` as "instructions.0.value"
                  }
                  control={control}
                />
              </Grid>

              <Button type="button" onClick={() => remove(index)}>
                &#8722;
              </Button>
            </Grid>
          );
        })}
        <Button type="button" onClick={() => instructionAppend({ value: "" })}>
          Add ingredient
        </Button>

        {/* <Controller
          render={({ field }) => <TextField
            label="Method"
            // disabled 
            {...field} />}
          name="instructions"
          control={control}
          defaultValue={['']}
        /> */}
        {errors.instructions && (
          <Typography style={{ display: "block" }} color="error">
            {errors.instructions.message}
          </Typography>
        )}
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

type GroupFieldsProps = {
  isError?: boolean;
};

const GroupFields = styled.div<GroupFieldsProps>`
  padding: 15px;
  border-radius: 3px;
  border-width: 1px;
  border-style: solid;
`;
