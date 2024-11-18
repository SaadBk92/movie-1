import { Routes , Route} from "react-router-dom";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import GuardedRoute from "./GuardedRoute";
import Movies from "../pages/Movies";
import AddUpdate from "../pages/AddUpdate";



const createRoutes = () => (

    <Routes>
        <Route path="/" element={
            <GuardedRoute >
                <Home />
            </GuardedRoute>
        } />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/movies" element={<Movies />} />
        {/* <Route path="/addUpdate" element={<AddUpdate />} /> */}

    </Routes>

)

export default createRoutes

