import {StyledSection, StyledTitle, StyledButton} from "./styled"
import { Link } from "react-router-dom";

export default function Home() {
    return (
<>
<StyledSection>
 <StyledTitle>         
Cook
</StyledTitle>
<StyledTitle>         
book
</StyledTitle>
<Link to={`/categories`}>
<StyledButton type="button">Find your recipe 
</StyledButton>            
 </Link>    
</StyledSection>
</>
  );
}