import React from 'react';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import LoadingButton from '@mui/lab/LoadingButton';
import { LoadingStates } from './LoadingStates';

const getIcon = (state?: LoadingStates): JSX.Element | undefined => {
  if (state === LoadingStates.Success) return <CheckIcon color="success" />;
  if (state === LoadingStates.Error) return <CloseIcon color="error" />;
};

interface ButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  state?: LoadingStates;
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
    <LoadingButton
      loading={state === LoadingStates.Loading}
      loadingPosition="end"
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
    </LoadingButton>
  );
};

export default Button;
