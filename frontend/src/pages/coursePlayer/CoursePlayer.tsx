import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/axios";


type Lecture = {
  id: string;
  title: string;
  video_url: string;
  transcript: string;
  duration_seconds: number;
  resource_urls: string[];
};


type Course = {
  modules: {
    id: string;
    title: string;
    lectures: Lecture[];
  }[];
};



function CoursePlayer() {

  const { courseId, lectureId } = useParams();


  const videoRef = useRef<HTMLVideoElement | null>(null);


  const [lecture, setLecture] = useState<Lecture | null>(null);


  const [watchedSeconds, setWatchedSeconds] = useState(0);



  // prevent API spam
  const lastUpdateRef = useRef(0);



  // Fetch lecture details
  useEffect(() => {


    const fetchLecture = async () => {

      try {

        const response = await api.get(
          `/courses/${courseId}`
        );


        console.log(
          "Player course:",
          response.data
        );


        const course: Course =
          response.data.course;



        let selectedLecture: Lecture | null = null;



        for (const module of course.modules) {


          const found =
            module.lectures.find(
              (lecture) =>
                lecture.id === lectureId
            );


          if(found){

            selectedLecture = found;
            break;

          }

        }


        setLecture(selectedLecture);



      } catch(error){

        console.error(
          "Failed loading lecture:",
          error
        );

      }

    };



    if(courseId && lectureId){

      fetchLecture();

    }


  },[courseId, lectureId]);






  // Send progress to backend
  const updateProgress = async (
    completed = false
  ) => {


    if(!lectureId || !videoRef.current){
      return;
    }



    const currentTime =
      Math.floor(
        videoRef.current.currentTime
      );



    setWatchedSeconds(currentTime);



    try {


      const response = await api.post(

        `/lectures/${lectureId}/progress`,

        {
          watched_seconds: currentTime,
          completed
        }

      );


      console.log(
        "Progress updated:",
        response.data
      );



    } catch(error){

      console.error(
        "Progress update failed:",
        error
      );

    }


  };







  // Runs while video plays
  const handleTimeUpdate = () => {


    if(!videoRef.current){
      return;
    }



    const currentTime =
      Math.floor(
        videoRef.current.currentTime
      );



    // update every 10 seconds
    if(
      currentTime - lastUpdateRef.current >= 10
    ){

      lastUpdateRef.current = currentTime;

      updateProgress(false);

    }


  };








  if(!lecture){

    return (
      <h2>
        Loading lecture...
      </h2>
    );

  }






  const watchedPercentage =
    Math.floor(
      (watchedSeconds /
      lecture.duration_seconds) * 100
    );







  return (

    <div style={{padding:"30px"}}>


      <h1>
        {lecture.title}
      </h1>




      <p>
        Duration:
        {" "}
        {Math.floor(
          lecture.duration_seconds / 60
        )}
        minutes
      </p>




      <p>
        Watched:
        {" "}
        {watchedSeconds}
        /
        {lecture.duration_seconds}
        seconds
      </p>



      <p>
        Progress:
        {" "}
        {watchedPercentage}%
      </p>





      <video

        ref={videoRef}

        width="800"

        controls


        onTimeUpdate={handleTimeUpdate}


        onEnded={() =>
          updateProgress(true)
        }


      >


        <source
          src={lecture.video_url}
          type="video/mp4"
        />


      </video>







      <h2>
        Transcript
      </h2>


      <p>
        {lecture.transcript}
      </p>







      <h2>
        Resources
      </h2>




      {
        lecture.resource_urls?.map(
          (url,index)=>(

            <p key={index}>

              📄

              <a
                href={url}
                target="_blank"
              >

                Resource {index+1}

              </a>


            </p>

          )
        )
      }





    </div>

  );

}


export default CoursePlayer;