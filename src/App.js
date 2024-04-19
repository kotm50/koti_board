import { Routes, Route } from "react-router-dom";

import Board from "./Components/Board";
import BoardList from "./Components/Board/List";
import Write from "./Components/Board/Write";
import Detail from "./Components/Board/Detail";
import Index from "./Components/Index";
import Sheet from "./Components/Sheet";
import CompanyList from "./Components/Sheet/CompanyList";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/main" element={<Sheet />}>
          <Route path="" element={<CompanyList />} />
          <Route path="company" element={<CompanyList />} />
          <Route path="companydetail" element={<CompanyList />} />
        </Route>
        <Route path="/board" element={<Board />}>
          <Route path="list/:bid?" element={<BoardList />} />
          <Route path="write/:bid?/:pid?" element={<Write />} />
          <Route path="detail/:bid?/:pid?" element={<Detail />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
