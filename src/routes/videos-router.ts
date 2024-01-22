import {Request, Response, Router} from "express";
import {STATUS_CODES} from "http";

export const videosRouter = Router({});

export enum CodeResponsesEnum {
    Incorrect_values_400 = 400,
    Not_found_404 = 404,
    Not_content_204 = 204,
    Created_201 = 201,
}

export type VideoType = {
    id: number
    title: string
    author: string
    canBeDownloaded: boolean
    minAgeRestriction: number | null
    createdAt: string
    publicationDate: string
    availableResolutions: string []
}

const videos = [
    {
        id: 0,
        title: "React",
        author: "Dima",
        canBeDownloaded: true,
        minAgeRestriction: null,
        createdAt: "2023-05-21T14:13:27.020Z",
        publicationDate: "2023-05-21T14:13:27.020Z",
        availableResolutions: [
            "P144"
        ]
    },
    {
        id: 1,
        title: "Redux",
        author: "Dima",
        canBeDownloaded: true,
        minAgeRestriction: null,
        createdAt: "2023-05-21T14:14:27.020Z",
        publicationDate: "2023-05-21T14:14:27.020Z",
        availableResolutions: [
            "P145"
        ]
    },
    {
        id: 2,
        title: "TypeScript",
        author: "Dima",
        canBeDownloaded: true,
        minAgeRestriction: null,
        createdAt: "2023-05-21T14:15:27.020Z",
        publicationDate: "2023-05-21T14:15:27.020Z",
        availableResolutions: [
            "P146"
        ]
    },

];

//all videos request
videosRouter.get('/', (req: Request, res: Response) => {
        res.send(videos).status(200)
})

videosRouter.get('/:id', (req: Request, res: Response) => {
    const id = req.params.id;
    if (id) {
        res.send(videos.filter(p => p.id.toString() === id)).status(200)
    } else {
        res.send(videos).status(200)
    }
})


videosRouter.delete('/:id', (req:Request, res:Response)=>{
    const id = +req.params.id;
    for(let i = 0; i < videos.length; i++){
        if (videos[i].id === id){
            videos.splice(i,1)
            res.sendStatus(204)
        }
        return false
    }
    res.sendStatus(404)
})

videosRouter.post('/', (req:Request, res:Response)=>{
   const newVideo = {
       id: +(new Date()),
       title: req.body.title,
       author: "Dima",
       canBeDownloaded: true,
       minAgeRestriction: null,
       createdAt: "2023-05-21T14:15:27.020Z",
       publicationDate: "2023-05-21T14:15:27.020Z",
       availableResolutions: [
           "P146"
       ]
   };

   videos.push(newVideo);
   res.status(CodeResponsesEnum.Created_201).send(newVideo);

})
