import "./App.css";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import PROTECTED_HOME from "./protected_route/protected_home";
import PROTECTED_LOGIN from "./protected_route/protected_login";
import PROTECTED_REGISTER from "./protected_route/protected_register";
function App() {

  return (
    <BrowserRouter>
      <Routes >
        <Route path="/" element={<PROTECTED_LOGIN/>} />
        <Route path="*" element={<PROTECTED_LOGIN/>} />
        <Route path="/login" element={<PROTECTED_LOGIN/>} />
        <Route path="/register" element={<PROTECTED_REGISTER/>} />
        <Route path="/accueil" element={<PROTECTED_HOME/>} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
