import {Context} from 'swagger2-koa/dist/router';
import PoiModel, {GeoPointModel} from './poi.model';

export async function create(context: Context) {
    const params = context.request.body;
    const poi = new PoiModel({
        name: params.name,
        location: new GeoPointModel({
            type: 'Point',
            coordinates: params.location
        })
    });

    const p = await poi.save();

    context.status = 200;
    context.body = {
        ...p.toObject()
    };
}
