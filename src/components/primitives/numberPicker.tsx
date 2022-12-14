import { useState } from "react";
import styled from "styled-components";

interface NumberPickerContainerProps {
  bg?: string;
  color?: string;
}

const NumberPickerContainer = styled.div<NumberPickerContainerProps>`
  display: flex;
  height: 100%;
  width: 100px;

  > * {
    flex: 1;
    /* height: 100%; */
    padding: 0;
    border: none;
    width: 33%;
    text-align: center;
    background-color: ${(props) => props.bg || props.theme.colors.base.white};
    color: ${(props) => props.color || props.theme.colors.base.black};
    padding-block: 0.5em;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type="number"] {
    -moz-appearance: textfield;
  }

  button {
    cursor: pointer;
  }
`;

interface NumberPickerProps {
  onChangeNumber: (number: number) => void;
  color?: string;
  bg?: string;
  initialValue?: number;
}

export const NumberPicker: React.FC<NumberPickerProps> = function (props) {
  const { color, bg, onChangeNumber, initialValue } = props;

  const [value, setValue] = useState<number>(initialValue || 1);

  function handleSetValue(newValue: number) {
    const validNewValue = Math.max(newValue, 1);
    setValue(validNewValue);
    onChangeNumber(validNewValue);
  }

  function incrementValue() {
    handleSetValue(value + 1);
  }

  function decrementValue() {
    handleSetValue(value - 1);
  }

  return (
    <NumberPickerContainer bg={bg} color={color}>
      <button onClick={decrementValue}>-</button>
      <input type="number" value={value} onChange={({ target }) => handleSetValue(Number(target.value))} />
      <button onClick={incrementValue}>+</button>
    </NumberPickerContainer>
  );
};
