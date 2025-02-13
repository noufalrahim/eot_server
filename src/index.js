import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/users.js';
import setupSwagger from './docs/swagger.js';
import unitsRouter from './routes/units.js';
import diagnosesRouter from './routes/diagnosis.js';
import actionsRouter from './routes/actions.js';
import patientsRouter from './routes/patients.js';
import timelineRouter from './routes/timeline.js';

dotenv.config();
const app = express();

var corsOptions = {
    origin: "http://localhost:3000",
};

const PORT = process.env.PORT || 5000;

app.use(cors(corsOptions));
app.use(express.json());
setupSwagger(app); 

app.use('/api', userRoutes); 
app.use('/api', unitsRouter); 
app.use('/api', diagnosesRouter); 
app.use('/api', actionsRouter);
app.use('/api', patientsRouter);
app.use('/api', timelineRouter);

app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`)
});
