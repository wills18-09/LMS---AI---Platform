import {
createContext,
useContext,
useEffect,
useState
} from "react";


type ThemeContextType = {

darkMode:boolean;

toggleDarkMode:()=>void;

};



const ThemeContext =
createContext<ThemeContextType | null>(null);





export function ThemeProvider(
{
children
}:{
children:React.ReactNode
}){


const [darkMode,setDarkMode] =
useState(()=>{


return localStorage.getItem("theme")==="dark";


});





useEffect(()=>{


if(darkMode){


document.documentElement.classList.add(
"dark"
);


localStorage.setItem(
"theme",
"dark"
);


}
else{


document.documentElement.classList.remove(
"dark"
);


localStorage.setItem(
"theme",
"light"
);


}



},[darkMode]);







const toggleDarkMode = ()=>{


setDarkMode(
previous=>!previous
);


};






return (

<ThemeContext.Provider

value={{

darkMode,

toggleDarkMode

}}

>


{children}


</ThemeContext.Provider>


);


}






export function useTheme(){


const context =
useContext(ThemeContext);



if(!context){

throw new Error(
"useTheme must be used inside ThemeProvider"
);

}


return context;


}