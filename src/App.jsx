import "./App.css";
import Popover from "./components/popover/popover";
import SortableListMain from "./components/sortable-list";
import ThemeSwitcher from "./components/Theme";
import TodoApp from "./components/Todo-app/TodoApp";
import { TodoProvider } from "./components/Todo-app/context/TodoProvider";
import Pagination from "./components/Pagination/Pagination";
import AutoCompleteSearchBar from "./components/SearchBar/AutoCompleteSearchBar";

function App() {
  return (
    <>
      {/* <Popover /> */}
      {/* <SortableListMain /> */}
      {/* <ThemeSwitcher /> */}
      {/* <TodoProvider>
        <TodoApp />
      </TodoProvider> */}
      {/**Pagination Component */}
      {/* <Pagination /> */}
      <AutoCompleteSearchBar />
    </>
  );
}

export default App;
