"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const videos_router_1 = require("./routes/videos-router");
const body_parser_1 = __importDefault(require("body-parser"));
exports.app = (0, express_1.default)();
const port = process.env.PORT || 5000;
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: true }));
const parserMiddleware = (0, body_parser_1.default)({});
exports.app.use(parserMiddleware);
exports.app.use('/videos', videos_router_1.videosRouter);
exports.app.get('/', (req, res) => {
    res.send('DEFAULT GET REQUEST');
});
exports.app.delete('/testing/all-data', (req, res) => {
    res.status(204).send(videos_router_1.videos);
});
exports.app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
