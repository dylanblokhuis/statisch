import { h } from 'preact';
import styled from 'styled-components';
import { Field } from 'formik';

const StyledInput = styled.input`
  padding: 5px 10px;
  border-radius: 5px;
  border: 1px solid rgba(15, 15, 15, 0.25);
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.02);
  outline: none;
  font: 500 14px ${(props) => props.theme.font.families.main};
  width: 100% !important;
  transition: 150ms;
  &:focus {
    border: 1px solid ${(props) => props.theme.color.accent};
  }
`;

const StyledField = styled(Field)`
  padding: 5px 10px;
  border-radius: 5px;
  color: ${(props) => props.theme.color.text};
  border: 1px solid rgba(15, 15, 15, 0.25);
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.02);
  background: #fff;
  outline: none;
  font: 500 16px ${(props) => props.theme.font.families.main};
  width: 100% !important;
  transition: 150ms;
  &:focus {
    border: 1px solid ${(props) => props.theme.color.accent};
  }
`;

const Input = ({ formik, ...rest }: any) => {
  if (formik) {
    return <StyledField {...rest} />;
  }
  return <StyledInput {...rest} />;
};

export default Input;
