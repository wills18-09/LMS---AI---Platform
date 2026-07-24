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