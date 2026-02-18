import express, { Request, Response } from 'express';
import cors from 'cors';
import { healthRouter } from './routes/health'
import { requestLogger } from './middleware/logger';
import { errorHandler } from './middleware/errorHandler';
import { pdfRouter } from './routes/pdf';

const app = express();
const PORT = 3000;
const CLIENT_URL = 'http://localhost:5173'


//global middleware
app.use(cors({
    origin: CLIENT_URL,
    credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(requestLogger);

//routes
app.use('/health', healthRouter);
app.use('/api/pdf', pdfRouter);

//404 catch all
app.use((_req: Request, res: Response) => {
    res.status(404).json({ error: 'not found' });
});

//global error handler
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`✅  Server running → http://localhost:${PORT}`);
    console.log(`📄  PDF endpoint  → POST http://localhost:${PORT}/api/pdf/generate`);
    console.log(`❤️   Health check  → GET  http://localhost:${PORT}/health`);
});
export default app;
