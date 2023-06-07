import React from 'react';
import CardAccordion from './CardAccordion';
import { Stack } from '@mui/material';
import { CircularProgress } from '@mui/material';
import { trpc } from '.';

const ListNarratives = () => {
    const { data: narratives, isLoading } = trpc.getNarrativesList.useQuery({});
    if (isLoading) return (<CircularProgress/>); 
    return (
        <Stack>
            {
                narratives?.map(n => (
                    <CardAccordion 
                        summary={n.title as string} 
                        details={n.summary as string}
                        abbreviation={n.abbreviation as string}
                    />
                ))
            }
        </Stack>
    )
}

export default ListNarratives;