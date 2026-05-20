import cookieParser from "cookie-parser";
import cors from "cors";
import { env } from "@/schemas/env.schema";
import { errorMiddleware } from "@/middlewares/errorMiddleware";
import express from "express"
import mainRouter from "@/routes/index";

const app = express();
const PORT = env.PORT;

// Middlewares
app.use(cors({
    origin: env.CLIENT_URL,
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Routes
// versions in the future /api/v1
app.use('/api', mainRouter);

app.use(errorMiddleware);

app.listen(PORT, () => console.log(`app listened on port ${PORT}`));