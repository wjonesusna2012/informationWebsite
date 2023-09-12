export const storyAggregatePipeline = (localStoryId: string) => [
    {
        $lookup: {
            from: 'stories',
            localField: localStoryId,
            foreignField: '_id',
            as: 'stories' 
        }
    }
];

export const narrativeAggregatePipeline = (localNarrativeId: string) => [
    {
        $lookup: {
            from: 'narratives',
            localField: localNarrativeId,
            foreignField: '_id',
            as: 'narratives' 
        }
    }
];