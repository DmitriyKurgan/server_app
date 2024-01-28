import request from 'supertest';
import { CodeResponsesEnum, VideoType } from "../routes/videos-router";
import {app} from "../app_settings";


describe('/videos', () => {
    let newVideo: VideoType | null = null;

    // beforeEach(async () => {
    //     // // Очищаем массив videos перед каждым тестом
    //     // await request(app).delete('/videos/').expect(204);
    //     // // Создаем новое видео для каждого теста
    //     // const createRes = await request(app)
    //     //     .post('/videos/')
    //     //     .send({
    //     //         title: 'Test Video',
    //     //         author: 'Test Author',
    //     //         canBeDownloaded: true,
    //     //         availableResolutions: ['P1080'],
    //     //     });
    //     // newVideo = createRes.body;
    // });


    it('GET /videos should return all videos', async () => {
        const res = await request(app).get('/videos/').expect(200);
        expect(res.body).toHaveLength(1);
        expect(res.body[0]).toEqual(newVideo);
    });

    // it('GET /videos/:id should return video by ID', async () => {
    //     const res = await request(app).get('/videos/' + newVideo!.id).expect(200);
    //     expect(res.body).toEqual(newVideo);
    // });
    //
    // it('GET /videos/:id should return 404 for non-existent ID', async () => {
    //     await request(app).get('/videos/999').expect(404);
    // });
    //
    // it('POST /videos should create a new video', async () => {
    //     const createRes = await request(app)
    //         .post('/videos/')
    //         .send({
    //             title: 'New Video',
    //             author: 'New Author',
    //             canBeDownloaded: true,
    //             availableResolutions: ['P720'],
    //         })
    //         .expect(201);
    //     const createdVideo = createRes.body;
    //     const getRes = await request(app).get('/videos/' + createdVideo.id).expect(200);
    //     expect(getRes.body).toEqual(createdVideo);
    // });
    //
    // it('PUT /videos/:id should update video by ID', async () => {
    //     const updateRes = await request(app)
    //         .put('/videos/' + newVideo!.id)
    //         .send({
    //             title: 'Updated Title',
    //             author: 'Updated Author',
    //         })
    //         .expect(204);
    //     const getRes = await request(app).get('/videos/' + newVideo!.id).expect(200);
    //     const updatedVideo = getRes.body;
    //     expect(updatedVideo.title).toBe('Updated Title');
    //     expect(updatedVideo.author).toBe('Updated Author');
    // });
    //
    // it('DELETE /videos/:id should delete video by ID', async () => {
    //     await request(app).delete('/videos/' + newVideo!.id).expect(204);
    //     const getRes = await request(app).get('/videos/').expect(200);
    //     expect(getRes.body).toHaveLength(0);
    // });
    //
    // it('DELETE /videos/:id should return 404 for non-existent ID', async () => {
    //     await request(app).delete('/videos/999').expect(404);
    // });
});
