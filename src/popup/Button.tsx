import React from 'react';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import MUIButton from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

import { State } from './State';

const getIcon = (state?: State): JSX.Element | undefined => {
  switch (state) {
    case State.Success:
      return <CheckIcon color="success" />;
    case State.Loading:
      return (
        <CircularProgress
          size={16}
          color="inherit"
          sx={{ marginRight: '2px' }}
        />
      );
    case State.Error:
      return <CloseIcon color="error" />;
  }
};

interface ButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  state?: State;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, state }) => {
  const onlyText = !onClick;
  const extraStyles = onlyText
    ? {
        margin: '0 12px 12px',
        justifyContent: 'space-between',
        padding: '0 8px',
        '.MuiLoadingButtonLoadingIndicatorEnd': {
          right: '7px',
        },
      }
    : {
        margin: '12px',
      };
  return (
    <MUIButton
      endIcon={getIcon(state)}
      onClick={onClick}
      style={{
        display: 'flex',
        width: '300px',
        textTransform: 'none',
        ...extraStyles,
      }}
      disabled={onlyText}
      variant={onlyText ? 'text' : 'outlined'}
    >
      {children}
    </MUIButton>
  );
};

export default Button;
