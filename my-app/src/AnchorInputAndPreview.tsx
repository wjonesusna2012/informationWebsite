import { Alert, AlertTitle, CircularProgress, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import React from 'react';
import { AnchorInputProps } from './interfaces';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Warning } from '@mui/icons-material';
import axios, { AxiosError } from 'axios';
import RHFTextField from './RHFTextField';

const AnchorInputAndPreview: React.FC<AnchorInputProps> = ({
  anchorLink,
  setAnchorLink
}) => {
  const queryClient = useQueryClient();

  const { isLoading, error, data, fetchStatus } = useQuery({
    enabled: anchorLink !== '',
    queryKey: ['ImagePreview', anchorLink],
    queryFn: () => {
      const params = {
        url: anchorLink
      };
      const proxyUrl = new URL('http://localhost:3001/proxy/og/');
      return axios.get(proxyUrl.toString(), {
        params
      })
    },
  })
  return (
    <>
      <Stack spacing={2} direction="row">
        <RHFTextField name="link" label="Link" />
        {/* <TextField label="Link" placeholder="Enter Link" value={anchorLink} /> */}
        <Button variant="contained" onClick={l => setAnchorLink('')}>Add</Button>
      </Stack>
      {isLoading && fetchStatus === 'fetching' && <CircularProgress />}
      {error && (
        <Alert severity='error' icon={<Warning />}>
          <AlertTitle>Error in Fetching</AlertTitle>
          {(error as AxiosError)?.message ?? ''}
        </Alert>
      )}
      {!isLoading && !error && (
        <Stack>
          <Typography variant="h6">{data?.data?.title ?? ''}</Typography>
          <Typography variant="body1">{data?.data?.description ?? ''}</Typography>
          <img
            src={data?.data?.imgSrc ?? ''}
            alt={`${data?.data?.title ?? 'Not Found'}`}
            style={{ maxHeight: 200 }}
          />
        </Stack>
      )}
    </>
  );
};

export default AnchorInputAndPreview;
