import React from 'react';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import LoadingButton from '@material-ui/lab/LoadingButton';

export enum LoadingStates {
  HasntStarted = 0,
  Loading,
  Success,
  Error,
}

const getIcon = (state?: LoadingStates): JSX.Element | undefined => {
  if (state === LoadingStates.Success) return <CheckIcon color="success" />;
  if (state === LoadingStates.Error) return <CloseIcon color="error" />;
};

interface ButtonProps {
  state?: LoadingStates;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, state }) => (
  <LoadingButton
    loading={state === LoadingStates.Loading}
    loadingPosition="end"
    endIcon={getIcon(state)}
    onClick={onClick}
    style={{
      display: 'flex',
      margin: '12px',
      textTransform: 'none',
      width: '220px',
    }}
    variant="outlined"
  >
    {children}
  </LoadingButton>
);

export default Button;
