// import { expect } from 'chai';
import service from '../../';
import agent from '../../utils/koa-supertest';
import dbSetup from '../../setup/db.setup';
import { create } from './poi.controller';
import { SuperTest, Test } from 'supertest';

describe('POI tests', () => {
    let db;
    let http: SuperTest<Test>;

    before(async () => {
        const {
            DB_HOST,
            DB_PORT,
            DB_NAME
        } = process.env;

        console.log(DB_HOST, DB_PORT, DB_NAME);

        db = await dbSetup({
            host: DB_HOST || 'localhost',
            port: DB_PORT || '27017',
            name: DB_NAME || 'poi'
        });

        if (db) {
            console.log('DB connected');
        }

        http = agent(service.app());
    });

    describe('Create POI', async () => {
        service.post('/poi', create);
        const body = {
            name: 'hello',
            location: [90, 190]
        };

        it('should create POI', async () => {
            await http
                .post('/api/v1/poi')
                .send(body)
                .expect(200);
        });
    });
});


