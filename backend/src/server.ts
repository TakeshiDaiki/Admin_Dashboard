import dotenv from 'dotenv';
dotenv.config();

import app from './app'; // Import app after dotenv config to ensure env vars are loaded if needed in app
import { connectDB } from './config/db';

const PORT = process.env.PORT || 3001;

// Connect to Database
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
        console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
    });
});
