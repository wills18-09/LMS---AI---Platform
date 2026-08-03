import {
    useEffect,
    useState
} from "react";

import api from "../../services/axios";

import "../../styles/courses.css";


type Course = {

    id:string;

    title:string;

    description:string;

};




function Courses(){


    const [courses,setCourses] =
    useState<Course[]>([]);


    const [message,setMessage] =
    useState("");



    useEffect(()=>{


        const loadCourses = async()=>{


            try{

            const response =
await api.get("/courses");


setCourses(
    response.data.courses || []
);
            }
            catch(error){

                console.error(error);

            }


        };


        loadCourses();


    },[]);






    const enroll = async(
        id:string
    )=>{


        try{


            await api.post(
                `/courses/${id}/enroll`
            );


            setMessage(
                "Course enrolled successfully 🎉"
            );


        }
        catch(error:any){


            console.error(error);


            setMessage(
                error.response?.data?.message ||
                "Enrollment failed"
            );


        }


    };





    return(


        <div className="courses-page">


            <h1>

                Explore Courses 📚

            </h1>


            {
                message &&
                <p className="course-message">
                    {message}
                </p>
            }



            <div className="available-course-grid">


{
    courses.length > 0 ? (

        courses.map(course => (

            <div
                key={course.id}
                className="available-course-card"
            >


                <div className="course-icon">
                    🎬
                </div>



                <h2>
                    {course.title}
                </h2>



                <p>
                    {course.description}
                </p>



                <button
                    onClick={() =>
                        enroll(course.id)
                    }
                >

                    Enroll Now 🚀

                </button>



            </div>

        ))

    )

    :

    (

        <div className="empty-state">

            <h3>
                No courses available 📚
            </h3>


            <p>
                Check back later for new courses.
            </p>


        </div>

    )

}


</div>


</div>


);


}


export default Courses;