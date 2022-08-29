import React from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import { RecipeCreate } from "../../../../types/pages";
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Grid,
  MenuItem,
} from "@mui/material";
import DeleteOutlined from "@mui/icons-material/DeleteOutlined";
import { StyledForm } from "./styled";

const createRecipeSchema = yup.object().shape({
  title: yup.string().required("Required"),
  description: yup.string().required("Required"),
  imageUrl: yup
    .string()
    .required("Required")
    .url("Image must be a valid URL.")
    .matches(
      /\.(jpeg|jpg|gif|png)$/,
      "Only image URL is allowed for this field "
    ),
  category: yup.string().required("Required"),
  ingredients: yup
    .array()
    .of(
      yup.object().shape({
        ingredient: yup.string().required("Required"),
        amount: yup
          .number()
          .typeError("Value must be a positive number")
          .positive("Value must be a positive number")
          .integer("Value must be an integer")
          .required("Required"),
        unit: yup.string().required("Required"),
      })
    )
    .min(1, "Must be minimum 1 ingredient"),
  instructions: yup
    .array()
    .of(
      yup.object().shape({
        value: yup.string().required("Required"),
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

const currencies = [
  {
    value: "USD",
    label: "$",
  },
  {
    value: "EUR",
    label: "€",
  },
  {
    value: "BTC",
    label: "฿",
  },
  {
    value: "JPY",
    label: "¥",
  },
];

export const RecipeForm = (props: RecipeFormProps) => {
  const { onSave, name, loading, onCancel } = props;
  const { categoryId } = useParams();

  const [currency, setCurrency] = React.useState("EUR");

  const handleChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setCurrency(event.target.value);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RecipeCreate>({
    defaultValues: {
      ingredients: [{ ingredient: "", amount: 0, unit: "" }],
      instructions: [{ value: "" }],
    },
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
          render={({ field }) => {
            return <input type="hidden" {...field} />;
          }}
          name="category"
          defaultValue={categoryId}
          control={control}
        />

        {ingredientsFields.map((field, index) => {
          return (
            <Grid container key={index} spacing={1}>
              <Grid item>
                <Controller
                  render={({ field }) => {
                    return (
                      <TextField
                        style={{ width: 210 }}
                        placeholder={"Ingredient"}
                        label={"Ingredient"}
                        disabled={loading}
                        error={!!errors["ingredients"]?.[index]?.["ingredient"]}
                        helperText={
                          errors["ingredients"]?.[index]?.["ingredient"]
                            ? errors["ingredients"]?.[index]?.["ingredient"]
                                ?.message
                            : ""
                        }
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
                        style={{ width: 210 }}
                        placeholder={"Amount"}
                        label={"Amount"}
                        disabled={loading}
                        error={!!errors["ingredients"]?.[index]?.["amount"]}
                        helperText={
                          errors["ingredients"]?.[index]?.["amount"]
                            ? errors["ingredients"]?.[index]?.["amount"]
                                ?.message
                            : ""
                        }
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
                        style={{ width: 210 }}
                        placeholder={"Unit"}
                        label={"Unit"}
                        disabled={loading}
                        select={true}
                        error={!!errors["ingredients"]?.[index]?.["unit"]}
                        helperText={
                          errors["ingredients"]?.[index]?.["unit"]
                            ? errors["ingredients"]?.[index]?.["unit"]?.message
                            : ""
                        }
                        onFocus={(event) => {
                          event.target.select();
                        }}
                        {...currencies.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                        // {...field}
                      ></TextField>
                    );
                  }}
                  name={`ingredients[${index}].unit` as "ingredients.0.unit"}
                  defaultValue={field.unit}
                  control={control}
                />
              </Grid>
              <IconButton onClick={() => remove(index)}>
                <DeleteOutlined />
              </IconButton>
            </Grid>
          );
        })}

        <Button
          type="button"
          onClick={() => append({ ingredient: "", amount: 0, unit: "" })}
        >
          Add ingredient
        </Button>

        {instructionFields.map((item, index) => {
          return (
            <Grid container key={item.id}>
              <Grid item>
                <Controller
                  render={({ field }) => {
                    return (
                      <TextField
                        style={{ width: 650 }}
                        placeholder={`Step ${index + 1}`}
                        label={`Step ${index + 1}`}
                        disabled={loading}
                        error={!!errors["instructions"]?.[index]?.["value"]}
                        helperText={
                          errors["instructions"]?.[index]?.["value"]
                            ? errors["instructions"]?.[index]?.["value"]
                                ?.message
                            : ""
                        }
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
              <IconButton onClick={() => instructionRemove(index)}>
                <DeleteOutlined />
              </IconButton>
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
            Create
          </Button>
        </Box>
      </StyledForm>
    </>
  );
};
