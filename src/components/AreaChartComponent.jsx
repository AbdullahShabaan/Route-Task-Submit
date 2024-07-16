import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useSelector } from "react-redux";
import "../index.css";
import LoaderGraph from "./LoaderGraph";
const BarChartComponent = (props) => {
  const detailsSelector = useSelector((state) => state.userDetails.user);
  const isShow = useSelector((state) => state.userDetails.isShow);
  const isLoading = useSelector((state) => state.userDetails.isLoading);
  const salesData = detailsSelector;
  return (
    <div className="graph">
      {isShow ? (
        <div className="w-100">
          <ResponsiveContainer width="100%" height="100%">
            <h2 style={{ textAlign: "center" }}>{props.name}</h2>
            <BarChart
              data={salesData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="amount" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        ""
      )}
      {isLoading && (
        <div
          className="w-100"
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <LoaderGraph />
        </div>
      )}
    </div>
  );
};

export default BarChartComponent;
