import * as React from 'react';
import PropTypes from 'prop-types';
import { experimentalStyled as styled } from '@mui/material/styles';

import Typography from '../components-of-css-temlate/Typography';

const Root = styled('div', {
  shouldForwardProp: (prop) => prop !== 'error' && prop !== 'success',
})(({ theme, error, success }) => ({
  padding: theme.spacing(2),
  ...(error && {
    backgroundColor: theme.palette.error.light,
    color: theme.palette.error.dark,
  }),
  ...(success && {
    backgroundColor: theme.palette.success.light,
    color: theme.palette.success.dark,
  }),
}));

function FormFeedback(props) {
  const { className, children, error, success, ...others } = props;

  return (
    <Root error={error} success={success} className={className} {...others}>
      <Typography color="inherit">{children}</Typography>
    </Root>
  );
}

FormFeedback.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  error: PropTypes.bool,
  success: PropTypes.bool,
};

export default FormFeedback;