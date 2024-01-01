import {Request, Response, Router} from "express";

export const videosRouter = Router({});

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
    if (req.query.title) {
        let searchString = req.query.title.toString()
        res.send(videos.filter(p => p.title.indexOf(searchString) > -1))
    } else {
        res.send(videos)
    }
})

videosRouter.get('/:id', (req: Request, res: Response) => {
    const id = req.params.id;
    console.log('id',id)
})


videosRouter.delete('/:id', (req:Request, res:Response)=>{
    const id = +req.params.id;
    for(let i = 0; i < videos.length; i++){
        if (videos[i].id === id){
            videos.splice(i,1)
            res.sendStatus(200)
        }
        return false
    }
    res.sendStatus(404)
})