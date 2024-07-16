import {
  Button,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import SearchIcon from "./icons/SearchIcon";
import FilterPopover from "./FilterPopover";

const Filters = ({ columnFilters, setColumnFilters, data }) => {
  const taskName = columnFilters.find((f) => f.id === "name")?.value || "";
  const amount = columnFilters.find((f) => f.id === "amount")?.value || "";
  const onFilterChange = (id, value) =>
    setColumnFilters((prev) =>
      prev
        .filter((f) => f.id !== id)
        .concat({
          id,
          value,
        })
    );

  return (
    <HStack mb={6} spacing={3}>
      <InputGroup size="sm" maxW="12rem">
        <InputLeftElement pointerEvents="none">
          <Icon as={SearchIcon} />
        </InputLeftElement>
        <Input
          style={{ backgroundColor: "transparent", borderColor: "#eee" }}
          _focus={{ background: "#eee", color: "white" }}
          type="text"
          variant="filled"
          placeholder="Customer Name"
          borderRadius={5}
          value={taskName}
          onChange={(e) => onFilterChange("name", e.target.value)}
        />
      </InputGroup>
      <InputGroup size="sm" maxW="12rem">
        <InputLeftElement pointerEvents="none">
          <Icon as={SearchIcon} />
        </InputLeftElement>
        <Input
          style={{ backgroundColor: "transparent", borderColor: "#eee" }}
          _focus={{ background: "#eee", color: "white" }}
          type="text"
          variant="filled"
          placeholder="Amount"
          borderRadius={5}
          value={amount}
          onChange={(e) => onFilterChange("amount", e.target.value)}
        />
      </InputGroup>
      <FilterPopover
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
      />
    </HStack>
  );
};
export default Filters;
