import * as mongoose from 'mongoose';

type DBParams = {
    host: string,
    port: string,
    name: string
};

export default async function setup({ host, port, name }: DBParams) {
    const db = await mongoose.connect(`mongodb://${host}:${port}/${name}`);

    return db;
}
