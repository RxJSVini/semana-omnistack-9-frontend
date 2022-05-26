import { BrowserRouter , Route, Routes} from "react-router-dom";
import { Login } from "../pages/Login";
import { New } from "../pages/New";
import { Dashboard } from "../pages/Dashboard";

function Router(){
    return(
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Login/>}></Route>
                <Route  path="/dashboard" element={<Dashboard/>}></Route>
                <Route  path="/new" element={<New/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}
export { Router };