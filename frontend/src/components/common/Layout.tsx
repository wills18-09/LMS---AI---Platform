import {
Outlet
} from "react-router-dom";


import Navbar from "./NavBar";


import "../../styles/layout.css";



function Layout(){


return (

<div className="app-layout">


<Navbar />


<main className="page-content">

<Outlet />

</main>


</div>


);


}


export default Layout;