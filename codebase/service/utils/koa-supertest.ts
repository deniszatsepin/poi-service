import {agent} from 'supertest';
import * as http from 'http';
import * as Application from 'koa';

export default function server(app: Application) {
    return agent(http.createServer(app.callback()));
}
