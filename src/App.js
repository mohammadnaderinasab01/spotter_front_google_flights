import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import { Home } from "./pages/Home";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import SearchedFlights from "./pages/SearchedFlights";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchedFlights />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
