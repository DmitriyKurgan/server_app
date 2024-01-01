"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const videos_router_1 = require("./routes/videos-router");
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/videos', videos_router_1.videosRouter);
app.get('/', (req, res) => {
    res.send('DEFAULT GET REQUEST');
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
