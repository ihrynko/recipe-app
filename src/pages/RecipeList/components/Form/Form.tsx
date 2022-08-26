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
  timeInMins: yup
    .number()
    .typeError("Value must be a positive number")
    .positive("Value must be a positive number")
    .integer("Value must be an integer")
    .required("This field is required"),
  category: yup.string().required("This field is required"),
  ingredients: yup
    .array()
    .of(
      yup.object().shape({
        ingredient: yup.string().required("required"),
        amount: yup
          .number()
          .typeError("Value must be a positive number")
          .positive("Value must be a positive number")
          .integer("Value must be an integer")
          .required("This field is required"),
        unit: yup.string().required("required"),
      })
    )
    .min(1, "Must be minimum 1 ingredient"),
  instructions: yup
    .array()
    .of(
      yup.object().shape({
        value: yup.string().required("required"),
      })
    )
    .min(1, "Must be minimum 1 step"),
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

  const {
    fields: ingredientsFields,
    append,
    remove,
  } = useFieldArray({
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
          defaultValue={0}
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
          {ingredientsFields.map((field, index) => {
            return (
              <Grid container key={field.id} spacing={1}>
                <Grid item>
                  <Controller
                    render={({ field }) => {
                      return (
                        <TextField
                          placeholder={"Name"}
                          label={"Name"}
                          // error={!!errors["ingredients.ingredient"]}
                          // helperText={
                          //   errors["ingredients.ingredient"]
                          //     ? errors["ingredients.ingredient"].message
                          //     : ""
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
                    render={({ field }) => {
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
                    render={({ field }) => {
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
                <Button type="button" onClick={() => remove(index)}>
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

        {instructionFields.map((item, index) => {
          return (
            <Grid container key={item.id}>
              <Grid item>
                <Controller
                  render={({ field }) => {
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

              <Button type="button" onClick={() => instructionRemove(index)}>
                &#8722;
              </Button>
            </Grid>
          );
        })}
        <Button type="button" onClick={() => instructionAppend({ value: "" })}>
          Add step
        </Button>
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

type GroupFieldsProps = {
  isError?: boolean;
};

const GroupFields = styled.div<GroupFieldsProps>`
  padding: 15px;
  border-radius: 3px;
  border-width: 1px;
  border-style: solid;
`;
