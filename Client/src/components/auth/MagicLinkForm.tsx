import React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

interface MagicLinkFormProps {
  magicEmail: string;
  onMagicEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onMagicLinkLogin: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  magicLinkSent: boolean;
  onSetMagicLinkSent: (sent: boolean) => void;
  isLoading: boolean;
}

const MagicLinkForm: React.FC<MagicLinkFormProps> = ({
  magicEmail,
  onMagicEmailChange,
  onMagicLinkLogin,
  magicLinkSent,
  onSetMagicLinkSent,
  isLoading,
}) => {
  return (
    <Box sx={{ pt: 3 }}>
      {magicLinkSent ? (
        <Box
          sx={{
            textAlign: 'center',
            py: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <MailOutlineIcon sx={{ fontSize: 48, color: 'text.secondary' }} />
          <Typography variant="h6">Check your email</Typography>
          <Typography variant="body2" color="text.secondary">
            We've sent a sign-in link to <b>{magicEmail}</b>
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Didn’t get it?
            <Button
              onClick={() => onSetMagicLinkSent(false)}
              sx={{ ml: 0.5, textTransform: 'none', p: 0 }}
            >
              Try again
            </Button>
          </Typography>
        </Box>
      ) : (
        <Box
          component="form"
          onSubmit={onMagicLinkLogin}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <TextField
            label="Email address"
            type="email"
            fullWidth
            required
            value={magicEmail}
            onChange={onMagicEmailChange}
          />
          <Typography variant="body2" color="text.secondary">
            We'll send a sign-in link to your email so you can log in without a password.
          </Typography>
          <Button type="submit" variant="contained" fullWidth disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Send Sign-in Link'}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default MagicLinkForm;