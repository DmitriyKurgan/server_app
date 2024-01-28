"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apps = void 0;
const express_1 = __importDefault(require("express"));
const videos_router_1 = require("./routes/videos-router");
const body_parser_1 = __importDefault(require("body-parser"));
exports.apps = (0, express_1.default)();
const port = process.env.PORT || 5000;
exports.apps.use(express_1.default.json());
exports.apps.use(express_1.default.urlencoded({ extended: true }));
const parserMiddleware = (0, body_parser_1.default)({});
exports.apps.use(parserMiddleware);
exports.apps.use('/videos', videos_router_1.videosRouter);
exports.apps.get('/', (req, res) => {
    res.send('DEFAULT GET REQUEST');
});
exports.apps.delete('/testing/all-data', (req, res) => {
    res.status(204).send(videos_router_1.videos);
});
exports.apps.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
module.exports.apps = exports.apps;
