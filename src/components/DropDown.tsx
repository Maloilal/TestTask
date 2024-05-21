import { useState, forwardRef } from "react";
import { Form, useForm } from "react-hook-form";
import { styled } from "styled-components";

const InputBox = styled.div<{ $isActive?: boolean }>`
  width: 490px;
  height: 45px;
  background: white;
  padding: 0px 12px 0px 12px;
  gap: 10px;
  border-radius: 6px;
  box-shadow: none;
  line-height: 45px;
`;
const DropdownContainer = styled.div`
  position: relative;
`;
const DropdownList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: absolute;
  top: 55px;
`;

interface DropDownProps {
  options: string[];
  value: string;
  onChange: (option: string) => void;
}

const DropDown = forwardRef((props: DropDownProps, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownContainer>
      <InputBox
        $isActive={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        style={isOpen ? { border: "2px solid green" } : { border: "none" }}
      >
        {props.value}
      </InputBox>
      {isOpen && (
        <DropdownList>
          {props.options.map((option, key) => {
            return (
              <InputBox
                onClick={() => {
                  props.onChange(option);
                  setIsOpen(false);
                }}
                key={key}
              >
                {option}
              </InputBox>
            );
          })}
        </DropdownList>
      )}
    </DropdownContainer>
  );
});

export default DropDown;
