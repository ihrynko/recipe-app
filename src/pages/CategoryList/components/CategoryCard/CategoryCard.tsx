import { Category } from "../../../../types/pages";
import DeleteOutlined from "@mui/icons-material/DeleteOutlined";
import {
  Button,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import { StyledLink, StyledCardHeader, StyledWrapper } from "./styled";

import notfoundimg from "../../../../assets/notfoundimg.png";

type CategoryCardProps = {
  category: Category;
  onDelete: (data: Category) => void;
};

const imageOnErrorHandler = (
  event: React.SyntheticEvent<HTMLImageElement, Event>
) => {
  event.currentTarget.src = notfoundimg;
  event.currentTarget.className = "error";
};

export const CategoryCard = (props: CategoryCardProps) => {
  const { category, onDelete } = props;
  const { _id: id } = category;

  return (
    <StyledWrapper>
      <CardHeader
        action={
          <IconButton onClick={() => onDelete(category)}>
            <DeleteOutlined />
          </IconButton>
        }
        title={<StyledCardHeader> {category.name}</StyledCardHeader>}
      />
      <CardMedia
        component="img"
        height="300"
        image={category.image}
        alt={category.name}
        onError={imageOnErrorHandler}
      />

      <CardContent>
        <Box flexGrow={1}>
          <Typography variant="body2">{category.description}</Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Button>
          <StyledLink to={`/categories/${id}`}>View Recipes</StyledLink>
        </Button>
      </CardActions>
    </StyledWrapper>
  );
};
