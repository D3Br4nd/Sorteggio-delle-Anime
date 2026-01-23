import express from 'express';
import cors from 'cors';
import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Redis Client
const redisClient = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379'
});

redisClient.on('error', err => console.log('Redis Client Error', err));

await redisClient.connect();

app.use(cors());
app.use(express.json());

// Track a new result
app.post('/api/results', async (req, res) => {
    const { resultId } = req.body;

    if (!resultId) {
        return res.status(400).json({ error: 'resultId is required' });
    }

    try {
        // Increment global counter for this result
        await redisClient.hIncrBy('quiz:stats', resultId, 1);

        // Log the result with timestamp for history/CSV export
        const resultLog = JSON.stringify({
            resultId,
            timestamp: new Date().toISOString()
        });
        await redisClient.lPush('quiz:history', resultLog);

        res.json({ success: true });
    } catch (error) {
        console.error('Error tracking result:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get global statistics
app.get('/api/stats', async (req, res) => {
    try {
        const stats = await redisClient.hGetAll('quiz:stats');

        // Convert string values to numbers
        const formattedStats = {};
        let total = 0;

        for (const [key, value] of Object.entries(stats)) {
            const count = parseInt(value, 10);
            formattedStats[key] = count;
            total += count;
        }

        res.json({
            stats: formattedStats,
            total
        });
    } catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Export history as CSV
app.get('/api/export', async (req, res) => {
    try {
        const history = await redisClient.lRange('quiz:history', 0, -1);

        let csv = 'Timestamp,ResultID\n';

        history.forEach(item => {
            const { timestamp, resultId } = JSON.parse(item);
            csv += `${timestamp},${resultId}\n`;
        });

        res.header('Content-Type', 'text/csv');
        res.attachment('quiz_results.csv');
        res.send(csv);
    } catch (error) {
        console.error('Error exporting CSV:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Backend listening at http://localhost:${port}`);
});
