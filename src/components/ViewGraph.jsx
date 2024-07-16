import { useDispatch } from "react-redux";
const dispatchMethod = () => {
  const dispatch = useDispatch();
  console.log(dispatch);
};
const ViewGraph = () => {
  console.log(dispatchMethod());
  console.log("here");
};

export default ViewGraph;
