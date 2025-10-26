import { ObjectId } from 'mongodb';

export const narrativeWithStoriesAggregation = (narrativeId: ObjectId) => {
  return [
    {
      $match: {
        narrativeId
      }
    },
    {
      $project: {
        narrativeId: 1,
        storyId: 1,
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
          $push: '$storyId'
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
