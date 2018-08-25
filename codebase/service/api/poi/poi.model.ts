import { Typegoose, prop, arrayProp } from 'typegoose';

enum GeoPointType {
    POINT = 'Point'
}

class GeoPoint extends Typegoose {
    @prop({ enum: GeoPointType, required: true })
    type: string = 'Point';

    @arrayProp({ items: Number, required: true })
    coordinates?: number[];
}

export const GeoPointModel = new GeoPoint().getModelForClass(GeoPoint);

class Poi extends Typegoose {
    @prop()
    name?: string;

    @prop({ required: true })
    location?: GeoPoint;
}


export default new Poi().getModelForClass(Poi);
