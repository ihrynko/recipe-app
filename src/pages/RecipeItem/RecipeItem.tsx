import React, { useEffect, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../store";

import { recipeItemFetchStart } from "./thunks/recipeItem";
import { recipeItemResetData } from "./reducers/recipeItem";
import { recipeItemStateSelector } from "./selectors/recipeItem";

import { CardMedia, CardContent, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { styled } from "@mui/material/styles";

import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

import Loader from "../../components/Loader";
import {
  StyledContainer,
  StyledBox,
  StyledItem,
  StyledList,
  StyledWrapperContent,
  StyledContent,
  StyledTitle,
  StyledIngredients,
  StyledWrapperTabs,
  StyledTabs,
} from "./styled";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ paddingTop: "10px" }}>
          <Typography paragraph>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const RecipeItem = () => {
  const { recipeId } = useParams();
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const {
    loading,
    data: recipeData,
    error,
  } = useSelector(recipeItemStateSelector);

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

  useEffect(() => {
    if (error && !loading) {
      toast.error("Error! Bad request!", {
        autoClose: 3000,
      });
      toast.clearWaitingQueue();
    }
  }, [error, loading]);

  return (
    <>
      {loading && !error && <Loader />}
      {recipeData && !loading && !error && (
        <StyledContainer maxWidth="lg">
          <IconButton onClick={() => navigate(-1)}>
            <ReplyOutlinedIcon />
          </IconButton>
          <StyledBox>
            <StyledContent>
              <CardMedia
                component="img"
                height="300px"
                image={recipeData.imageUrl}
                alt={recipeData.title}
              />
              <StyledWrapperContent>
                <StyledTitle>{recipeData.title}</StyledTitle>

                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {recipeData.description}
                  </Typography>
                </CardContent>
              </StyledWrapperContent>
            </StyledContent>
          </StyledBox>
          <StyledWrapperTabs sx={{ width: "60%" }}>
            <Box sx={{ marginBottom: "10px" }}>
              <Tabs
                value={value}
                TabIndicatorProps={{
                  style: {
                    backgroundColor: "#E35640",
                  },
                }}
                onChange={handleChange}
                centered
              >
                <StyledTabs label="Ingredients" {...a11yProps(0)} />
                <StyledTabs label="Method" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <StyledList>
              {recipeData.ingredients.map((ingredient, index) => {
                return (
                  <TabPanel value={value} index={0} key={index}>
                    <StyledIngredients key={index}>
                      {ingredient.amount + ingredient.unit}{" "}
                      {ingredient.ingredient}
                    </StyledIngredients>
                  </TabPanel>
                );
              })}
            </StyledList>
            <ol>
              {recipeData.instructions.map((step, index) => {
                return (
                  <TabPanel value={value} index={1} key={index}>
                    <StyledItem key={index}>{step.value}</StyledItem>
                  </TabPanel>
                );
              })}
            </ol>
          </StyledWrapperTabs>
        </StyledContainer>
      )}
    </>
  );
};

export default RecipeItem;
