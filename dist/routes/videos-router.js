"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videos = exports.CodeResponsesEnum = exports.videosRouter = void 0;
const express_1 = require("express");
const middlewares_1 = require("../middlewares");
exports.videosRouter = (0, express_1.Router)({});
process.env.TZ = 'Europe/Minsk';
var CodeResponsesEnum;
(function (CodeResponsesEnum) {
    CodeResponsesEnum[CodeResponsesEnum["Incorrect_values_400"] = 400] = "Incorrect_values_400";
    CodeResponsesEnum[CodeResponsesEnum["Not_found_404"] = 404] = "Not_found_404";
    CodeResponsesEnum[CodeResponsesEnum["Not_content_204"] = 204] = "Not_content_204";
    CodeResponsesEnum[CodeResponsesEnum["Created_201"] = 201] = "Created_201";
})(CodeResponsesEnum = exports.CodeResponsesEnum || (exports.CodeResponsesEnum = {}));
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
exports.videos = [];
//all videos request
exports.videosRouter.get('/', (req, res) => {
    res.send(exports.videos).status(200);
});
exports.videosRouter.get('/:id', (req, res) => {
    const id = +req.params.id;
    const videoById = exports.videos.find(v => v.id === id);
    if (!id && !videoById) {
        res.sendStatus(404);
    }
    res.status(200).send(videoById);
});
exports.videosRouter.delete('/:id', (req, res) => {
    const id = +req.params.id;
    for (let i = 0; i < exports.videos.length; i++) {
        if (exports.videos[i].id === id) {
            exports.videos.splice(i, 1);
            res.sendStatus(204);
        }
        return false;
    }
    res.sendStatus(404);
});
exports.videosRouter.post("/", middlewares_1.validateRequest, (req, res) => {
    var _a, _b;
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);
    const newDate = new Date(currentDate.getTime());
    const formattedDate = newDate.toISOString();
    const newVideo = {
        id: +(new Date()),
        title: req.body.title,
        author: req.body.author,
        canBeDownloaded: Boolean(req.body.canBeDownloaded),
        minAgeRestriction: (_a = req.body.minAgeRestriction) !== null && _a !== void 0 ? _a : null,
        createdAt: new Date().toISOString(),
        publicationDate: formattedDate,
        availableResolutions: (_b = req.body.availableResolutions) !== null && _b !== void 0 ? _b : ["P146"],
    };
    exports.videos.push(newVideo);
    res.status(CodeResponsesEnum.Created_201).send(newVideo);
});
exports.videosRouter.put('/:id', middlewares_1.validateRequest, (req, res) => {
    var _a, _b, _c, _d, _e;
    const videoById = exports.videos.find(v => v.id === +req.params.id);
    if (!videoById) {
        res.sendStatus(404);
        return;
    }
    const currentDate = new Date();
    const modifiedDate = new Date(currentDate);
    modifiedDate.setDate(currentDate.getDate() + 6);
    videoById.publicationDate = req.body.publicationDate;
    videoById.title = (_a = req.body.title) !== null && _a !== void 0 ? _a : videoById.title;
    videoById.author = (_b = req.body.author) !== null && _b !== void 0 ? _b : videoById.author;
    videoById.availableResolutions = (_c = req.body.availableResolutions) !== null && _c !== void 0 ? _c : videoById.availableResolutions;
    videoById.canBeDownloaded = (_d = req.body.canBeDownloaded) !== null && _d !== void 0 ? _d : videoById.canBeDownloaded;
    videoById.minAgeRestriction = (_e = req.body.minAgeRestriction) !== null && _e !== void 0 ? _e : videoById.minAgeRestriction;
    res.status(204).send(videoById);
});
