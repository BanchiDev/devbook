import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

import authRoutes from './routes/auth';

// Initialize PostgreSQL connection pool
const connectionString = process.env.DATABASE_URL || '';
const pool = new Pool({ connectionString });

// Instantiate Prisma Client with the PostgreSQL adapter (Prisma v7 standard)
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware configuration
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// API health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'SyncleraBook API is running' });
});

// Start Express server
app.listen(PORT, () => {
  console.log(`🚀 Server is flying on http://localhost:${PORT}`);
});

export { prisma };