import NotificationBell from "../notifications/NotificationBell";

import {
useTheme
} from "../../context/ThemeContext";


import "../../styles/navbar.css";




function Navbar(){


const {
darkMode,
toggleDarkMode
}=useTheme();




return (

<nav className="navbar">



<div className="navbar-logo">

🎓 LearnAI LMS

</div>





<div className="navbar-actions">



<button

className="theme-button"

onClick={toggleDarkMode}

>


{
darkMode
?
"☀️"
:
"🌙"
}


</button>





<NotificationBell />



</div>





</nav>


);


}


export default Navbar;