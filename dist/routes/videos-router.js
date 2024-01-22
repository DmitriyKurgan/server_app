"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videos = exports.CodeResponsesEnum = exports.videosRouter = void 0;
const express_1 = require("express");
exports.videosRouter = (0, express_1.Router)({});
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
    const id = req.params.id;
    if (id) {
        res.send(exports.videos.filter(p => p.id.toString() === id)).status(200);
    }
    else {
        res.send(exports.videos).status(200);
    }
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
exports.videosRouter.post('/', (req, res) => {
    const newVideo = {
        id: +(new Date()),
        title: req.body.title,
        author: req.body.author,
        canBeDownloaded: true,
        minAgeRestriction: null,
        createdAt: new Date().toISOString(),
        publicationDate: new Date().toISOString(),
        availableResolutions: [
            "P146"
        ]
    };
    exports.videos.push(newVideo);
    res.status(CodeResponsesEnum.Created_201).send(newVideo);
});
