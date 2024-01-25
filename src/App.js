import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import { useEffect} from "react";
import { Detail } from "./components/Detail";
import { getRestaurant } from "./redux/restaurantSlice";
import { useDispatch, useSelector} from "react-redux";
import Add from './components/Add';
import Register from "./components/Register";
import Login from "./components/Login";
import ProtectedRouter from "./utils/ProtectedRouter";
import { Users } from "./components/Users";
import { User } from "./components/User";
import instance from "./axios";

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  console.log(isAuthenticated);
  useEffect(() => {
    // fetch('./restaurants.json')
    //   .then((value) => value.json())
    //   .then((data) => dispatch(getRestaurant(data.restaurants)))
    const fetchRestaurants = async () => {
      try {
        const res = await instance.get('api/v1/restaurants')
        if(res.data.success){
          dispatch(getRestaurant(res.data.restaurants))
        } else {
          console.log(res.data.message);
        }
        
      } catch (error) {
        console.log(error.message);
      }

    }
    fetchRestaurants();
  }, [dispatch]);
  
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/details/:id" element={<Detail />} /> 
          <Route path="/register" element={<Register />} /> 
          <Route path="/login" element={<Login />} /> 
          {/* static */}
          {/* <Route path="/add" element={<ProtectedRouter isAuthenticated={false}> <Add /> </ProtectedRouter>} />  */}
          <Route path="/add" element={<ProtectedRouter isAuthenticated={isAuthenticated}> <Add /> </ProtectedRouter>} />
          <Route path="/contact" element={<ProtectedRouter isAuthenticated={isAuthenticated}> <Contact /> </ProtectedRouter>} />
          <Route path="/users" element={<ProtectedRouter isAuthenticated={isAuthenticated}> <Users /> </ProtectedRouter>} />
          <Route path="/users/:id" element={<ProtectedRouter isAuthenticated={isAuthenticated}> <User /> </ProtectedRouter>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
