import {Request, Response, Router} from "express";
import {STATUS_CODES} from "http";
import {validateRequest} from "../middlewares";

export const videosRouter = Router({});
process.env.TZ = 'Europe/Minsk';
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

//const videos = [
    // {
    //     id: 0,
    //     title: "React",
    //     author: "Dima",
    //     canBeDownloaded: true,
    //     minAgeRestriction: null,
    //     createdAt: new Date().toISOString(),
    //     publicationDate: new Date().toISOString(),
    //     availableResolutions: [
    //         "P144"
    //     ]
    // },
    // {
    //     id: 1,
    //     title: "Redux",
    //     author: "Dima",
    //     canBeDownloaded: true,
    //     minAgeRestriction: null,
    //     createdAt: new Date().toISOString(),
    //     publicationDate: new Date().toISOString(),
    //     availableResolutions: [
    //         "P145"
    //     ]
    // },
    // {
    //     id: 2,
    //     title: "TypeScript",
    //     author: "Dima",
    //     canBeDownloaded: true,
    //     minAgeRestriction: null,
    //     createdAt: new Date().toISOString(),
    //     publicationDate: new Date().toISOString(),
    //     availableResolutions: [
    //         "P146"
    //     ]
    // },
// ];

export const videos = [] as any []

//all videos request
videosRouter.get('/', (req: Request, res: Response) => {
        res.send(videos).status(200)
})

videosRouter.get('/:id', (req: Request, res: Response) => {
    const id = +req.params.id;
    const videoById = videos.find(v => v.id === id)
    if (!id && !videoById) {
        res.sendStatus(404)
    }
    res.status(200).send(videoById)
})


videosRouter.delete('/:id', (req: Request, res: Response) => {
    const id = +req.params.id;
    const indexToDelete = videos.findIndex(video => video.id === id);

    if (indexToDelete !== -1) {
        videos.splice(indexToDelete, 1);
        return res.sendStatus(204);
    }

    return res.sendStatus(404);
});


videosRouter.post("/", validateRequest, (req: Request, res: Response) => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);
    const newDate = new Date(currentDate.getTime());
    const formattedDate = newDate.toISOString()
    const newVideo: VideoType = {
        id: +(new Date()),
        title: req.body.title,
        author: req.body.author,
        canBeDownloaded: Boolean(req.body.canBeDownloaded),
        minAgeRestriction: req.body.minAgeRestriction ?? null,
        createdAt: new Date().toISOString(),
        publicationDate: formattedDate,
        availableResolutions: req.body.availableResolutions ?? ["P146"],
    };


    videos.push(newVideo);
    res.status(CodeResponsesEnum.Created_201).send(newVideo);
});

videosRouter.put('/:id', validateRequest, (req: Request, res: Response) => {
    const videoById = videos.find(v => v.id === +req.params.id)
    if (!videoById) {
        res.sendStatus(404);
        return;
    }
    const currentDate = new Date();
    const modifiedDate = new Date(currentDate);
    modifiedDate.setDate(currentDate.getDate() + 6);
    videoById.publicationDate = req.body.publicationDate
    videoById.title = req.body.title ?? videoById.title;
    videoById.author = req.body.author ?? videoById.author;
    videoById.availableResolutions = req.body.availableResolutions ?? videoById.availableResolutions;
    videoById.canBeDownloaded = req.body.canBeDownloaded ?? videoById.canBeDownloaded;
    videoById.minAgeRestriction = req.body.minAgeRestriction ?? videoById.minAgeRestriction;

    res.status(204).send(videoById);
});



