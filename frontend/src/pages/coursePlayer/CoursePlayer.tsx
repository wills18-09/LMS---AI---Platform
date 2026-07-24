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

  // Prevent API spam
  const lastUpdateRef = useRef(0);

  // Prevent seeking multiple times
  const hasResumedRef = useRef(false);

  // -----------------------------
  // Fetch lecture details
  // -----------------------------
  useEffect(() => {
    const fetchLecture = async () => {
      try {
        const response = await api.get(`/courses/${courseId}`);

        console.log("Player course:", response.data);

        const course: Course = response.data.course;

        let selectedLecture: Lecture | null = null;

        for (const module of course.modules) {
          const found = module.lectures.find(
            (lecture) => lecture.id === lectureId
          );

          if (found) {
            selectedLecture = found;
            break;
          }
        }

        setLecture(selectedLecture);
      } catch (error) {
        console.error("Failed loading lecture:", error);
      }
    };

    if (courseId && lectureId) {
      fetchLecture();
    }
  }, [courseId, lectureId]);

  // -----------------------------
  // Resume previous position
  // -----------------------------
  useEffect(() => {
    if (!lectureId || !videoRef.current) return;

    const video = videoRef.current;

    const handleLoadedMetadata = () => {
      if (hasResumedRef.current) return;

      const savedTime = localStorage.getItem(`lecture-${lectureId}`);

      if (savedTime) {
        video.currentTime = Number(savedTime);
        setWatchedSeconds(Number(savedTime));
      }

      hasResumedRef.current = true;
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      video.removeEventListener(
        "loadedmetadata",
        handleLoadedMetadata
      );
    };
  }, [lectureId, lecture]);

  // -----------------------------
  // Send progress
  // -----------------------------
  const updateProgress = async (completed = false) => {
    if (!lectureId || !videoRef.current) {
      return;
    }

    const currentTime = Math.floor(videoRef.current.currentTime);

    setWatchedSeconds(currentTime);

    // Save locally for resume
    localStorage.setItem(
      `lecture-${lectureId}`,
      currentTime.toString()
    );

    try {
      const response = await api.post(
        `/lectures/${lectureId}/progress`,
        {
          watched_seconds: currentTime,
          completed,
        }
      );

      console.log("Progress updated:", response.data);

      if (completed) {
        localStorage.removeItem(`lecture-${lectureId}`);
      }
    } catch (error) {
      console.error("Progress update failed:", error);
    }
  };

  // -----------------------------
  // Called while video plays
  // -----------------------------
  const handleTimeUpdate = () => {
    if (!videoRef.current) {
      return;
    }

    const currentTime = Math.floor(videoRef.current.currentTime);

    if (currentTime - lastUpdateRef.current >= 10) {
      lastUpdateRef.current = currentTime;

      updateProgress(false);
    }
  };

  if (!lecture) {
    return <h2>Loading lecture...</h2>;
  }

  const watchedPercentage = Math.floor(
    (watchedSeconds / lecture.duration_seconds) * 100
  );

  return (
    <div style={{ padding: "30px" }}>
      <h1>{lecture.title}</h1>

      <p>
        Duration:{" "}
        {Math.floor(lecture.duration_seconds / 60)} minutes
      </p>

      <p>
        Watched: {watchedSeconds}/{lecture.duration_seconds} seconds
      </p>

      <p>Progress: {watchedPercentage}%</p>

      <video
        ref={videoRef}
        width="800"
        controls
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => updateProgress(true)}
      >
        <source
          src={lecture.video_url}
          type="video/mp4"
        />
      </video>

      <h2>Transcript</h2>

      <p>{lecture.transcript}</p>

      <h2>Resources</h2>

      {lecture.resource_urls?.map((url, index) => (
        <p key={index}>
          📄{" "}
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
          >
            Resource {index + 1}
          </a>
        </p>
      ))}
    </div>
  );
}

export default CoursePlayer;