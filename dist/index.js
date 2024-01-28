"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const videos_router_1 = require("./routes/videos-router");
const body_parser_1 = __importDefault(require("body-parser"));
const app_settings_1 = require("./app_settings");
const port = process.env.PORT || 5000;
app_settings_1.app.use(express_1.default.json());
app_settings_1.app.use(express_1.default.urlencoded({ extended: true }));
const parserMiddleware = (0, body_parser_1.default)({});
app_settings_1.app.use(parserMiddleware);
app_settings_1.app.use('/videos', videos_router_1.videosRouter);
app_settings_1.app.get('/', (req, res) => {
    res.send('DEFAULT GET REQUEST');
});
app_settings_1.app.delete('/testing/all-data', (req, res) => {
    res.status(204).send(videos_router_1.videos);
});
app_settings_1.app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
module.exports.apps = app_settings_1.app;
