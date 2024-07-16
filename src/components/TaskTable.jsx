import { useEffect, useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Icon,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import DATA from "./Data";
import EditableCell from "./EditableCell";
import StatusCell from "./StatusCell";
import DateCell from "./DateCell";
import Filters from "./Filters";
import SortIcon from "./icons/SortIcon";
import { useDispatch, useSelector } from "react-redux";
import { GetCustomers } from "../store/usersSlice";
import GetUser from "./GetUser";
import { GetGraphData } from "../store/userDetails";
import BarChartComponent from "./AreaChartComponent";
import Loader from "./Loader";

// const STATUS_ON_DECK = { id: 1, name: "On Deck", color: "blue.300" };
const STATUS_IN_PROGRESS = {
  id: 2,
  name: "In Progress",
  color: "yellow.400",
};
// const STATUS_TESTING = { id: 3, name: "Testing", color: "pink.300" };
const STATUS_PAID = { id: 4, name: "Deployed", color: "green.300" };
export const STATUSES = [STATUS_IN_PROGRESS, STATUS_PAID];

const TaskTable = () => {
  const [customerName, setCustomerName] = useState("");
  const dispatch = useDispatch();
  const columns = [
    {
      accessorKey: "name",
      header: "Name",
      size: 120,
      cell: EditableCell,
      enableColumnFilter: true,
      filterFn: "includesString",
    },
    {
      accessorKey: "amount",
      header: "Amount",
      size: 110,
      cell: EditableCell,
      enableColumnFilter: true,
      filterFn: "includesString",
    },
    {
      accessorKey: "status",
      header: "Status",
      size: 110,
      cell: StatusCell,
      enableSorting: false,
      enableColumnFilter: true,
      filterFn: (row, columnId, filterStatuses) => {
        if (filterStatuses.length === 0) return true;
        const status = row.getValue(columnId);
        return filterStatuses.includes(status?.id);
      },
    },
    {
      accessorKey: "due",
      header: "Due",
      cell: DateCell,
      size: 110,
    },
    {
      accessorKey: "notes",
      header: "Notes",
      size: 110,
      cell: EditableCell,
    },
    {
      accessorKey: "details",
      header: "Details",
      size: 150,
      cell: ({ row }) => (
        <div className="btns-parent">
          <Button
            colorScheme="teal"
            size="xs"
            variant="ghost"
            onClick={() => {
              dispatch(GetGraphData({ id: row.original.id }));
              setCustomerName(row.original.name);
            }}
          >
            View graph
          </Button>
        </div>
      ),
    },
  ];
  const customersSelector = useSelector((state) => state.usersSlice.customers);
  const isLoading = useSelector((state) => state.usersSlice.isLoading);

  const [data, setData] = useState(DATA);
  const [columnFilters, setColumnFilters] = useState([]);

  useEffect(() => {
    dispatch(GetCustomers());
  }, [dispatch]);
  useEffect(() => {
    if (customersSelector && customersSelector.length > 0) {
      Promise.all(
        customersSelector.map((customer) =>
          GetUser(customer.customer_id).then((result) => ({
            name: result[0]?.name,
            amount: customer.amount,
            status:
              customer.status == "STATUS_IN_PROGRESS"
                ? STATUS_IN_PROGRESS
                : customer.status == "STATUS_PAID"
                ? STATUS_PAID
                : "",
            due: customer.date,
            notes: "",
            id: customer.customer_id,
            transactionID: customer.id,
          }))
        )
      ).then((userDetails) => {
        const updatedData = [...DATA, ...userDetails];
        setData(updatedData);
      });
    }
  }, [customersSelector]);
  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    columnResizeMode: "onChange",
    meta: {
      updateData: (rowIndex, columnId, value) =>
        setData((prev) =>
          prev.map((row, index) =>
            index === rowIndex
              ? {
                  ...prev[rowIndex],
                  [columnId]: value,
                }
              : row
          )
        ),
    },
  });

  const isSmallScreen = useBreakpointValue({ base: true, md: false });

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        gap: "50px",
      }}
    >
      <Box overflowX={isSmallScreen ? "auto" : "visible"}>
        <Filters
          data={data}
          columnFilters={columnFilters}
          setColumnFilters={setColumnFilters}
        />
        <Box className="table" w={table.getTotalSize()}>
          {table.getHeaderGroups().map((headerGroup) => (
            <Box className="tr" key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Box className="th" w={header.getSize()} key={header.id}>
                  {header.column.columnDef.header}
                  {header.column.getCanSort() && (
                    <Icon
                      as={SortIcon}
                      mx={3}
                      fontSize={14}
                      onClick={header.column.getToggleSortingHandler()}
                    />
                  )}
                  {
                    {
                      asc: " 🔼",
                      desc: " 🔽",
                    }[header.column.getIsSorted()]
                  }
                  <Box
                    onMouseDown={header.getResizeHandler()}
                    onTouchStart={header.getResizeHandler()}
                    className={`resizer ${
                      header.column.getIsResizing() ? "isResizing" : ""
                    }`}
                  />
                </Box>
              ))}
            </Box>
          ))}
          {isLoading && (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                padding: "20px",
              }}
            >
              <Loader />
            </div>
          )}
          {table.getRowModel().rows.map((row) => (
            <Box className="tr" key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <Box className="td" w={cell.column.getSize()} key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Box>
              ))}
            </Box>
          ))}
        </Box>
        <br />
        <Text mb={2}>
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </Text>
        <ButtonGroup size="sm" isAttached variant="outline">
          <Button
            style={{ color: "white" }}
            onClick={() => table.previousPage()}
            isDisabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </Button>
          <Button
            style={{ color: "white" }}
            onClick={() => table.nextPage()}
            isDisabled={!table.getCanNextPage()}
          >
            {">"}
          </Button>
        </ButtonGroup>
      </Box>
      <BarChartComponent name={customerName} />
    </div>
  );
};
export default TaskTable;
