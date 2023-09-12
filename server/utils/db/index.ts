import { Collection, Document } from 'mongodb';
import client from '../../database';

export const establishConnectionToCollection = async (database: string, collection: string) => {
    await client.connect();
    return client.db(database).collection(collection);
};

export const genericPipelineLookupFromCollection = async (collection: Collection<Document>, pipeline: Array<any>) => {
    return await collection.aggregate(pipeline).toArray();
}