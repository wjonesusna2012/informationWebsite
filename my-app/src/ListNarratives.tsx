import React from 'react';
import CardAccordion from './CardAccordion';
import { Stack } from '@mui/material';
import { TopicCardProps } from './interfaces';

const ListNarratives = () => {
    const narratives = [] as TopicCardProps[];
    return (
        <Stack>
            {
                narratives.map(n => (
                    <CardAccordion 
                        summary={n.title as string} 
                        details={n.summary as string}
                    >
                        
                    </CardAccordion>
                )
            }
        </Stack>
    )
}