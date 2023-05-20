import React from 'react';
import PropTypes from 'prop-types';
import { ButtonLM } from './Button.styled';

const Button = ({ onClick }) => {
  return (
    <>
      <ButtonLM type="button" onClick={onClick}>
        Load more
      </ButtonLM>
    </>
  );
};
export default Button;

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
