import { join } from 'path';
import * as swagger from 'swagger2';
import { ui, router as swaggerRouter, Router } from 'swagger2-koa';
import dbSetup from './setup/db.setup';

const {
    NODE_ENV,
    APP_PORT,
    DB_HOST,
    DB_PORT,
    DB_NAME
} = process.env;

const document = swagger.loadDocumentSync(join(__dirname, 'contract/openapi.yaml'));
const router: Router = swaggerRouter(document);

if ('test' !== NODE_ENV) {
    (async () => {
        try {
            const db = await dbSetup({
                host: DB_HOST || 'localhost',
                port: DB_PORT || '27017',
                name: DB_NAME || 'poi'
            });
            const start = await router
                .app()
                .use(ui(document))
                .listen(APP_PORT || 3333);

            if (db && start) {
                console.log(`Service running on port ${APP_PORT}`);
            }
        } catch (e) {
            console.error(e);
        }
    })();
}

export default router;
