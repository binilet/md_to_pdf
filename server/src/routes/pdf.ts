// server/src/routes/pdf.ts
import { Router, Request, Response } from 'express';
import { z } from 'zod';
import multer from 'multer';
import fs from 'fs';
import { generatePDF } from '../services/pdfService';
import { validateBody } from '../middleware/validateRequest';
import { asyncHandler } from '../middleware/errorHandler';

export const pdfRouter = Router();

// multer — store upload in memory, max 10mb
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: (_req: any, file: any, cb: any) => {
        if (file.mimetype === 'text/markdown' || file.originalname.endsWith('.md')) {
            cb(null, true);
        } else {
            cb(new Error('Only .md files are allowed'));
        }
    },
});

// ─── Schemas ─────────────────────────────────────────────────────────────────

const MarginSchema = z.object({
    top: z.string().default('1in'),
    bottom: z.string().default('1in'),
    left: z.string().default('1in'),
    right: z.string().default('1in'),
});

const ThemeSchema = z.object({
    selectedTheme: z.enum(['github', 'academic', 'minimal', 'dark']).default('github'),
    accentColor: z.string().regex(/^#[0-9a-fA-F]{6}$/).default('#0969da'),
    fontFamily: z.enum(['sans', 'serif', 'mono']).default('sans'),
    fontSize: z.number().min(10).max(24).default(16),
    pageSize: z.enum(['A4', 'Letter']).default('A4'),
    margins: MarginSchema.default({ top: '1in', bottom: '1in', left: '1in', right: '1in' }),
    customCSS: z.string().max(10000).default(''),
});

const GenerateSchema = z.object({
    markdown: z.string().min(1).max(500_000),
    theme: ThemeSchema.default({
        selectedTheme: 'github',
        accentColor: '#0969da',
        fontFamily: 'sans',
        fontSize: 16,
        pageSize: 'A4',
        margins: { top: '1in', bottom: '1in', left: '1in', right: '1in' },
        customCSS: '',
    }),
});

// ─── Routes ──────────────────────────────────────────────────────────────────

/**
 * POST /api/pdf/generate
 * Body: { markdown: string, theme: ThemeConfig }
 * Response: Binary PDF stream
 */
pdfRouter.post(
    '/generate',
    validateBody(GenerateSchema),
    asyncHandler(async (req: Request, res: Response) => {
        const { markdown, theme } = req.body;

        const pdf = await generatePDF(markdown, theme);

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="document.pdf"');
        res.setHeader('Content-Length', pdf.length);
        res.send(pdf);
    })
);

/**
 * POST /api/pdf/generate-file
 * Content-Type: multipart/form-data
 * Form fields:
 *   - file: <your .md file>
 *   - theme: (optional) JSON string of ThemeConfig
 *
 * Test in Postman:
 *   Body → form-data
 *   Key: file   Type: File   Value: <select your .md file>
 *   Key: theme  Type: Text   Value: {"selectedTheme":"github"}  (optional)
 */
pdfRouter.post(
    '/generate-file',
    upload.single('file'),
    asyncHandler(async (req: any, res: Response) => {
        if (!req.file) {
            res.status(400).json({ error: 'No .md file uploaded' });
            return;
        }

        const markdown = req.file.buffer.toString('utf-8');

        // Parse optional theme from form field, fall back to defaults
        let theme = ThemeSchema.parse({});
        if (req.body.theme) {
            try {
                const parsed = JSON.parse(req.body.theme);
                theme = ThemeSchema.parse(parsed);
            } catch {
                res.status(400).json({ error: 'Invalid theme JSON' });
                return;
            }
        }

        const pdf = await generatePDF(markdown, theme);

        const outputName = req.file.originalname.replace(/\.md$/, '.pdf');
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="${outputName}"`);
        res.setHeader('Content-Length', pdf.length);
        res.send(pdf);
    })
);