
import { Category } from '../../../../types/pages';
import DeleteOutlined from '@mui/icons-material/DeleteOutlined';
import {
  Button,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
  IconButton,
} from '@mui/material';
import { StyledLink, StyledCardHeader} from "./styled"

type CategoryCardProps = {
  category: Category;
  onDelete: (data: Category) => void;
};


export const CategoryCard = (props: CategoryCardProps) => {
  const { category, onDelete } = props;
    const { _id: id } = category;

  return (
    <>

        <CardHeader
            action={
            <IconButton onClick={() => onDelete(category)}>
              <DeleteOutlined />
            </IconButton>
          }
        title={<StyledCardHeader> {category.name}</StyledCardHeader>
         }
        />
        
        <CardMedia
          component="img"
          height="300"
          image={category.image}
          alt="Category image"
        />
        
        <CardContent>
          <Typography variant="body2">{category.description}</Typography>
      </CardContent>
      <CardActions>
         <Button>
          <StyledLink to={`/categories/${id}`}>View Recipes</StyledLink>
        </Button>
      </CardActions>
    </>
  );
};

