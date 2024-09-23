"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
const axios_1 = __importDefault(require("axios"));
const htmlParser_1 = __importStar(require("./htmlParser"));
const trpc_1 = require("./trpc");
const schemas_1 = require("@info/schemas");
const cors_1 = __importDefault(require("cors"));
const trpcExpress = __importStar(require("@trpc/server/adapters/express"));
const zod_1 = require("zod");
const database_1 = __importDefault(require("./database"));
const db_1 = require("./utils/db");
const mongoQueries_1 = require("./mongoQueries");
const appRouter = (0, trpc_1.router)({
    addStory: trpc_1.publicProcedure
        .input(schemas_1.addStorySchema)
        .output(schemas_1.addStoryResponseSchema)
        .mutation(async (opts) => {
        await database_1.default.connect();
        const db = database_1.default.db('NarrativesProject');
        const collection = db.collection('stories');
        await collection.insertOne({
            ...opts.input,
            createdAt: new Date(),
            createdBy: 'Phil N. Later'
        });
        return {
            _id: 'Test ID',
            storyTitle: 'Title Test',
            summary: "Lorem Ipsum I forget I don't have internet",
            link: '',
            date: new Date(),
            createdAt: new Date(),
            createdBy: 'Yours Truly'
        };
    }),
    addNarrative: trpc_1.publicProcedure
        .input(schemas_1.addNarrativeSchema)
        .output(schemas_1.addNarrativeResponseSchema)
        .mutation(async (opts) => {
        await database_1.default.connect();
        const db = database_1.default.db('NarrativesProject');
        const collection = db.collection('narratives');
        await collection.insertOne({
            ...opts.input,
            createdAt: new Date(),
            createdBy: 'Phil N. Later'
        });
        return {
            _id: 'Test ID',
            title: 'Title Test',
            summary: "Lorem Ipsum I forget I don't have internet",
            abbreviation: 'EXO2020',
            createdAt: new Date(),
            createdBy: 'Yours Truly'
        };
    }),
    addTag: trpc_1.publicProcedure
        .input(schemas_1.addTagSchema)
        .output(schemas_1.addTagResponseSchema)
        .mutation(async (opts) => {
        await database_1.default.connect();
        const db = database_1.default.db('NarrativesProject');
        const collection = db.collection('tags');
        const { insertedId } = await collection.insertOne({
            ...opts.input,
            createdAt: new Date(),
            createdBy: 'Phil N. Later'
        });
        const insertedObject = await collection.findOne(insertedId);
        return {
            _id: 'Test ID',
            tagTitle: 'Title Test',
            tagName: "Lorem Ipsum I forget I don't have internet",
            createdAt: new Date(),
            createdBy: 'Yours Truly'
        };
    }),
    getTagList: trpc_1.publicProcedure.input(schemas_1.getTagsQuerySchema).query(async (opts) => {
        const { searchString, userId } = opts.input;
        const db = database_1.default.db('NarrativesProject');
        const collection = db.collection('tags');
        const validUserForSearch = !!userId && userId !== '';
        const validStringForSearch = !!searchString && searchString !== '';
        const filterObj = {
            ...(validStringForSearch
                ? { tagName: { $regex: new RegExp(`${searchString}`, 'i') } }
                : {}),
            ...(validUserForSearch
                ? { tagName: { $regex: new RegExp(`${userId}`, 'i') } }
                : {})
        };
        const results = await collection
            .find(filterObj)
            .toArray();
        return results;
    }),
    addStoryToNarrative: trpc_1.publicProcedure
        .input(schemas_1.addStoryToNarrative)
        // .output()
        .mutation(async (opts) => {
        const { narrativeId, storyId } = opts.input;
        await database_1.default.connect();
        const db = database_1.default.db('NarrativesProject');
        const collection = db.collection('narrativeStoryMapping');
        await collection.insertOne({
            narrativeId,
            storyId,
            createdAt: new Date(),
            createdBy: 'Phil N. Later'
        });
    }),
    getNarrativesList: trpc_1.publicProcedure
        .output(zod_1.z.array(schemas_1.addNarrativeResponseSchema))
        .query(async (opts) => {
        const collection = await (0, db_1.establishConnectionToCollection)('NarrativesProject', 'narratives');
        const results = await collection
            .find({})
            .toArray();
        return results;
    }),
    getNarrativeStories: trpc_1.publicProcedure
        .input(schemas_1.getNarrativeStoriesQuerySchema)
        .output(schemas_1.getNarrativeStoriesResponseSchema)
        .query(async (opts) => {
        const { narrativeId } = opts.input;
        await database_1.default.connect();
        const db = database_1.default.db('NarrativesProject');
        const collection = db.collection('narrativeStoryMapping');
        const results = await collection
            .aggregate((0, mongoQueries_1.narrativeWithStoriesAggregation)(new mongodb_1.ObjectId(narrativeId)))
            .toArray();
        return results;
    })
});
const expressRouter = (0, express_1.default)();
expressRouter.use((0, cors_1.default)());
expressRouter.use('/trpc', trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext: trpc_1.createContext
}));
expressRouter.get('/', (req, res) => {
    res.sendStatus(200);
});
expressRouter.get('/proxy/og/', (req, res) => {
    const params = req.query;
    axios_1.default.get(params.url).then((response) => {
        const htmlDoc = (0, htmlParser_1.default)(response.data);
        const responseObject = (0, htmlParser_1.extractMetaTagsFromHTMLRoot)(htmlDoc);
        res.json(responseObject);
    });
});
expressRouter.listen(4000, () => {
    console.log('Express server listening on port 4000!!');
});
