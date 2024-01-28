import express, {Request,Response} from 'express';
import {videos, videosRouter} from "./routes/videos-router";
import bodyParser from "body-parser";
export const apps = express();

const port = process.env.PORT || 5000;

apps.use(express.json());
apps.use(express.urlencoded({ extended: true }));

const parserMiddleware = bodyParser({})
apps.use(parserMiddleware)


apps.use('/videos', videosRouter);

apps.get('/', (req:Request, res:Response)=>{
    res.send('DEFAULT GET REQUEST')
});

apps.delete('/testing/all-data', (req: Request, res: Response) => {

    res.status(204).send(videos);
});

apps.listen(port, ()=>{
    console.log(`Example app listening on port ${port}`)
});

module.exports.apps = apps