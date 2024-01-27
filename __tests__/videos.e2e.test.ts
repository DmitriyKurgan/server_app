import request from 'supertest'
import {app} from "../src";
import {CodeResponsesEnum, VideoType} from "../src/routes/videos-router";
// import { app } from '../src/settings'import dotenv from 'dotenv'
// dotenv.config()



const dbName = 'back'
const mongoURI = process.env.mongoURI || `mongodb://0.0.0.0:27017/${dbName}`

describe('/videos', () => {
    let newVideo: VideoType | null = null
   // const client = new MongoClient(mongoURI)

    beforeAll(async () => {
        //await client.connect()
        await request(app).delete('/testing/all-data').expect(204)
    })

    // afterAll(async () => {
    //     await client.close()
    // })

    it('GET videos = []', async () => {
        await request(app).get('/videos/').expect([])
    })

    it('- POST does not create the video with incorrect data (no title, no author)', async function () {
        await request(app)
            .post('/videos/')
            .send({ title: '', author: '' })
            .expect(CodeResponsesEnum.Incorrect_values_400, {
                errorsMessages: [
                    { message: 'title is required', field: 'title' },
                    { message: 'author is required', field: 'author' },
                ],
            })

        const res = await request(app).get('/videos/')
        expect(res.body).toEqual([])
    })

    it('- GET product by ID with incorrect id', async () => {
        await request(app).get('/videos/helloWorld').expect(400)
    })
    it('+ GET product by ID with correct id', async () => {
        await request(app)
            .get('/videos/' + newVideo!.id)
            .expect(200, newVideo)
    })

    it('- PUT product by ID with incorrect data', async () => {
        await request(app)
            .put('/videos/' + 1223)
            .send({ title: 'title', author: 'title' })
            .expect(CodeResponsesEnum.Not_found_404)

        const res = await request(app).get('/videos/')
        expect(res.body[0]).toEqual(newVideo)
    })

    it('+ PUT product by ID with correct data', async () => {
        await request(app)
            .put('/videos/' + newVideo!.id)
            .send({
                title: 'hello title',
                author: 'hello author',
                publicationDate: '2023-01-12T08:12:39.261Z',
            })
            .expect(CodeResponsesEnum.Not_content_204)

        const res = await request(app).get('/videos/')
        expect(res.body[0]).toEqual({
            ...newVideo,
            title: 'hello title',
            author: 'hello author',
            publicationDate: '2023-01-12T08:12:39.261Z',
        })
        newVideo = res.body[0]
    })

    it('- DELETE product by incorrect ID', async () => {
        await request(app)
            .delete('/videos/876328')
            .expect(CodeResponsesEnum.Not_found_404)

        const res = await request(app).get('/videos/')
        expect(res.body[0]).toEqual(newVideo)
    })
    it('+ DELETE product by correct ID, auth', async () => {
        await request(app)
            .delete('/videos/' + newVideo!.id)
            .set('authorization', 'Basic YWRtaW46cXdlcnR5')
            .expect(CodeResponsesEnum.Not_content_204)

        const res = await request(app).get('/videos/')
        expect(res.body.length).toBe(0)
    })
})
