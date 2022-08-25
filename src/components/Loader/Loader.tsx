import { Oval } from "react-loader-spinner";
import { LoaderWrapper } from "./styled";

export default function  Loader() {
  return (
    <LoaderWrapper>
      <Oval color="#ff6b08" secondaryColor="#212121" height={100} width={110} />
    </LoaderWrapper>
  );
};