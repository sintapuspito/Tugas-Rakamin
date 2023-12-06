import { VStack } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import BookDetails from "./pages/BooksDetail";
import EditBookPage from "./pages/Editbook";
import Homepage from "./pages/Homepage";
import NewBookPage from "./pages/NewBooks";
import Register from "./pages/Register";
import PrivateRoute from "../src/components/PrivateRoute";
import ListBooks from "./pages/ListBooks";

function App() {
  return (
    <VStack minH="100vh" minW="100vw">
      <Router>
        <Navbar />
        <Routes>
          <Route path={"/"} element={<Homepage />} />
          <Route path={"/books"} element={<ListBooks />} />
          <Route path={"/register"} element={<Register />} />
          <Route path={"/newbook"} element={
            <PrivateRoute>
              <NewBookPage />
            </PrivateRoute>} />
          <Route path={"/books/:id"} element={<BookDetails />} />
          <Route path={"/editbook/:id"} element={
            <PrivateRoute>
              <EditBookPage />
            </PrivateRoute>} />
        </Routes>
      </Router>
    </VStack>
  );
}

export default App;
