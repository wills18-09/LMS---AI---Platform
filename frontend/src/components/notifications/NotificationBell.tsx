import {
useEffect,
useState
} from "react";


import {
getNotifications,
markNotificationRead
} from "../../services/notifications.service";


import "../../styles/notificationBell.css";



type Notification = {

id:string;

title:string;

body:string;

is_read:boolean;

created_at:string;

};





function NotificationBell(){


const [notifications,setNotifications] =
useState<Notification[]>([]);



const [open,setOpen] =
useState(false);





const loadNotifications =
async()=>{


try{


const data =
await getNotifications();


setNotifications(
data.notifications || []
);


}
catch(error){

console.error(
"NOTIFICATION ERROR",
error
);

}


};





useEffect(()=>{


loadNotifications();


},[]);





const unread =
notifications.filter(
notification=>!notification.is_read
).length;







const readNotification =
async(
id:string
)=>{


await markNotificationRead(
id
);


loadNotifications();


};







return (


<div className="notification-wrapper">





<button

className="notification-button"

onClick={()=>
setOpen(!open)
}

>


🔔


{
unread > 0 &&

<span className="notification-count">

{unread}

</span>

}


</button>







{

open &&

<div className="notification-dropdown">



<div className="notification-header">

<h3>
Notifications
</h3>


<span>
{unread} unread
</span>


</div>






{

notifications.length === 0

?

<div className="empty-notification">

No new notifications 🎉

</div>


:


<div className="notification-list">


{

notifications.map(notification=>(


<div

key={notification.id}

className={

notification.is_read

?

"notification-item read"

:

"notification-item"

}


onClick={()=>{

if(!notification.is_read){

readNotification(
notification.id
);

}

}}


>


<div className="notification-title">

{notification.title}

</div>



<p>

{notification.body}

</p>




<small>

{
new Date(
notification.created_at
)
.toLocaleString()

}

</small>



</div>



))

}


</div>


}



</div>


}



</div>


);


}


export default NotificationBell;