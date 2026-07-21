"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'octofit-backend' });
});
app.get('/api/leaderboard', (_req, res) => {
    res.json([
        { name: 'Nova', points: 2840 },
        { name: 'Atlas', points: 2410 },
        { name: 'Suri', points: 2180 },
    ]);
});
async function connectToDatabase() {
    try {
        await mongoose_1.default.connect(mongoUri);
        console.log('Connected to MongoDB');
    }
    catch (error) {
        console.error('MongoDB connection failed', error);
    }
}
connectToDatabase();
app.listen(port, () => {
    console.log(`OctoFit API running on http://localhost:${port}`);
});
