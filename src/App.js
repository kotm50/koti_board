import { Routes, Route } from "react-router-dom";

import Board from "./Components/Board";
import List from "./Components/Board/List";
import Write from "./Components/Board/Write";
import Detail from "./Components/Board/Detail";
import Index from "./Components/Index";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/board" element={<Board />}>
          <Route path="list/:bid?" element={<List />} />
          <Route path="write/:bid?/:pid?" element={<Write />} />
          <Route path="detail/:bid?/:pid?" element={<Detail />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
