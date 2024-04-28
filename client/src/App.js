import { BrowserRouter, Routes, Route, Link } from "react-router-dom"

// pages
import Home from "./pages/Home"
import Create from "./pages/Create"
import Update from "./pages/Update"
import Content from "./pages/Content"

function App() {
  return (
    <BrowserRouter>
      <nav>
        <h1>Welcome to Community Board</h1>
        <Link to="/">Home</Link>
        <Link to="/create">Create New community topic</Link>
      </nav>
      <br />
      <div style={{ textAlign: "center" }}>
        <img src={allTeamImage} alt="allContentmate" style={{ display: "block", margin: "0 auto" }} /> {/* use the imported image */}
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/:id" element={<Update />} />
        <Route path="/Content" element={<Content />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
