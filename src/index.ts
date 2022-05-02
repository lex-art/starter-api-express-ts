import express, { Response} from 'express';
const app = express();
app.use(express.json()); // middleware que transforma un body a un json

const PORT = 3000;

app.get('/', (_, res: Response) => {
    res.send('Hello world');
});

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});