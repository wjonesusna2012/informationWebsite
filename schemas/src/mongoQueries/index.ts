import { ObjectId } from 'mongodb';

export const narrativeWithStoriesAggregation = (narrativeId: ObjectId) => {
  return [
    {
      $match: {
        narrativeId
      }
    },
    {
      $lookup: {
        from: 'stories',
        localField: 'storyId',
        foreignField: '_id',
        as: 'story'
      }
    },
    {
      $unwind: {
        path: '$story'
      }
    },
    {
      $project: {
        narrativeId: 1,
        story: 1,
        _id: 0
      }
    },
    {
      $group: {
        _id: '$narrativeId',
        narrativeId: {
          $first: '$narrativeId'
        },
        stories: {
          $push: '$story'
        }
      }
    },
    {
      $lookup: {
        from: 'narratives',
        localField: 'narrativeId',
        foreignField: '_id',
        as: 'narrative'
      }
    },
    {
      $unwind: {
        path: '$narrative'
      }
    },
    {
      $addFields: {
        'narrative.stories': '$stories'
      }
    },
    {
      $replaceRoot: {
        newRoot: '$narrative'
      }
    }
  ];
};
