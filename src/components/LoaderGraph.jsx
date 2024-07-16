import { ColorRing } from "react-loader-spinner";

const LoaderGraph = () => {
  return (
    <ColorRing
      visible={true}
      height="100"
      width="100"
      ariaLabel="color-ring-loading"
      wrapperStyle={{}}
      wrapperClass="color-ring-wrapper"
      colors={["#eee", "#eee", "#eee", "#eee", "#eee"]}
    />
  );
};

export default LoaderGraph;
