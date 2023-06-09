import { z } from 'zod';
import { addStoryResponseSchema } from './addStory'

export const getNarrativeStoriesResponseSchema = z.array(addStoryResponseSchema)