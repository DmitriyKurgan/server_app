import express, {Request,Response} from 'express';
import {videosRouter} from "./routes/videos-router";

const app = express();

const port = process.env.PORT || 6000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('hometask_01/api//videos', videosRouter);

app.get('/', (req:Request, res:Response)=>{
    res.send('DEFAULT GET REQUEST')
});

app.listen(port, ()=>{
    console.log(`Example app listening on port ${port}`)
});