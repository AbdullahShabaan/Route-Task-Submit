import { Box, Heading } from "@chakra-ui/react";
import TaskTable from "./components/TaskTable";
function App() {
  return (
    <div>
      <Box
        maxW={1000}
        mx="auto"
        px={6}
        pt={24}
        fontSize="sm"
        style={{ padding: "20px" }}
      >
        <Heading mb={10} style={{ textAlign: "center" }}>
          Route Task
        </Heading>
        <TaskTable />
      </Box>
    </div>
  );
}

export default App;
