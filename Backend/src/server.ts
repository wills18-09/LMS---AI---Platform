import path from "path";
import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from "cors";
import pool from './db';

import authRoutes from './modules/auth/auth.routes';
import courseRoutes from './modules/courses/course.routes';
import moduleRoutes from './modules/modules/module.routes';
import lectureRoutes from './modules/lectures/lecture.routes';
import enrollmentRoutes from "./modules/enrollments/enrollment.routes";
import progressRoutes from "./modules/lectureProgress/progress.routes";
import notesRoutes from "./modules/notes/notes.routes";
import bookmarksRoutes from "./modules/bookmarks/bookmarks.routes";
import assignmentRoutes from "./modules/assignments/assignments.routes";
import quizRoutes from "./modules/quizzes/quizzes.routes";
import certificateRoutes from "./modules/gamification/certificates/certificates.routes";
import badgeRoutes from "./modules/gamification/badges/badges.routes";
import streakRoutes from "./modules/gamification/streaks/streaks.routes";
import analyticsRoutes from "./modules/analytics/analytics.routes";
import adminRoutes from "./modules/admin/admin.routes";
import reviewRoutes from "./modules/reviews/reviews.routes";
import announcementRoutes from "./modules/announcements/announcements.routes";
import uploadRoutes from "./modules/uploads/uploads.routes";
import aiRoutes from "./modules/ai/ai.routes";
import flashcardRoutes from "./modules/flashcards/flashcards.routes";
import quizAIRoutes from "./modules/quizzes/quizzes.ai.routes";
import summaryRoutes from "./modules/ai/summary.routes";
import masteryRoutes from "./modules/mastery/mastery.routes";
import preferencesRoutes from "./modules/preferences/preferences.routes";
import recommendationsRoutes from "./modules/recommendations/recommendations.routes";
import studyPlansRoutes from "./modules/studyPlans/studyPlans.routes";
import chatSessionRoutes from "./modules/ai/chatSession.routes";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const PORT = process.env.PORT || 5000;

console.log("🔍 [DEBUG] Database URL from env is:", process.env.DATABASE_URL);

app.use(express.json());

app.use(
  "/videos",
  express.static(path.join(__dirname, "../videos"))
);

app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "../uploads")
  )
);


app.use('/api/v1/auth', authRoutes);

app.use('/api/v1/courses', courseRoutes);

app.use('/api/v1/courses', moduleRoutes);

app.use('/api/v1/modules', lectureRoutes);

app.use('/api/v1/lectures', lectureRoutes);

app.use("/api/v1/courses", enrollmentRoutes);

app.use("/api/v1/enrollments", enrollmentRoutes);

app.use("/api/v1/lectures", progressRoutes);

app.use("/api/v1", notesRoutes);

app.use("/api/v1", bookmarksRoutes);

app.use("/api/v1/assignments", assignmentRoutes);

app.use("/api/v1/quizzes",quizRoutes);

app.use("/api/v1/certificates",certificateRoutes);

app.use("/certificates",express.static(path.join(__dirname, "../certificates")));

app.use("/api/v1/badges",badgeRoutes);

app.use("/api/v1/streaks",streakRoutes);

app.use("/api/v1/analytics",analyticsRoutes);

app.use("/api/v1/admin",adminRoutes);

app.use("/api/v1",reviewRoutes);

app.use("/api/v1",announcementRoutes);

app.use("/api/v1",uploadRoutes);

app.use("/api/v1/ai",aiRoutes);

app.use("/api/v1/ai",chatSessionRoutes);

app.use("/api/v1/flashcards",flashcardRoutes);

app.use("/api/v1/quizzes/ai",quizAIRoutes);

app.use("/api/v1/ai/summary",summaryRoutes);

app.use("/api/v1/mastery",masteryRoutes);

app.use("/api/v1/preferences",preferencesRoutes);

app.use("/api/v1/recommendations",recommendationsRoutes);

app.use("/api/v1/study-plans",studyPlansRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('LMS AI Platform Backend Engine is running smoothly.');
});


async function assertDatabaseConnection() {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log(
      `🚀 [Database]: Connection established successfully at ${result.rows[0].now}`
    );
  } catch (error) {
    console.error('❌ [Database]: Connection initialization failed!');
    console.error(error);
    process.exit(1);
  }
}


app.listen(PORT, async () => {
  console.log(`⚡ [Server]: Server is currently listening on port ${PORT}`);
  await assertDatabaseConnection();
});