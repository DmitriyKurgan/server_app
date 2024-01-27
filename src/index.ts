import express, {Request,Response} from 'express';
import {videos, videosRouter} from "./routes/videos-router";
import bodyParser from "body-parser";
//import {db} from './db/db'
export const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const parserMiddleware = bodyParser({})
app.use(parserMiddleware)


app.use('/videos', videosRouter);
//app.use('/__tests__', getTestRouter(db));

app.get('/', (req:Request, res:Response)=>{
    res.send('DEFAULT GET REQUEST')
});

app.delete('/testing/all-data', (req: Request, res: Response) => {

    res.status(204).send(videos);
});



app.listen(port, ()=>{
    console.log(`Example app listening on port ${port}`)
});