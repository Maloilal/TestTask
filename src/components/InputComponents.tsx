import { useForm, Controller } from "react-hook-form";
import { styled } from "styled-components";
import { useMask } from "@react-input/mask";
import DropDown from "./DropDown";
import { useEffect, useState } from "react";

const Submit = styled.button<{ $isActive?: boolean }>`
  display: flex;
  flex-direction: column;
  padding: 20px;
  height: 40px;
  border-radius: 12px;
  padding: 12px, 24px, 24px, 24px;
  gap: 21px;
  background: ${(props) => (props.$isActive ? "#9394AA" : "green")};
  box-shadow: none;
  border: none;
  color: white;
  align-items: center;
  justify-content: center;
  font-size: 16px;
`;
const FormRow = styled.div`
  display: flex;
  flex-direction: column;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: auto;
  padding: 20px;
  width: 540px;
  height: 850px;
  border-radius: 12px;
  padding: 12px, 24px, 24px, 24px;
  gap: 21px;
  background: #eff2f5;
`;
const Input = styled.input`
  margin-top: 10px;
  height: 44px;
  padding: 0px 12px 0px 12px;
  gap: 10px;
  border-radius: 6px;
  border-color: white;
  outline: none;
  border: none;
  &:focus {
    border: 1px solid green;
  }
  box-shadow: none;
`;
const Label = styled.label`
  height: 18px;
  font-size: 14px;
  color: #9394aa;
  font-weight: bold;
`;
const Checkbox = styled.input`
  width: 16px;
  height: 16px;
  border-radius: 4px;
  border: 1.5 solid #9394aa;
`;
const Header = styled.h1`
  font-size: 20px;
  font-weight: bold;
`;
const ErrorMessage = styled.span`
  color: red;
  margin-top: 5px;
`;
const RequiredMark = styled.span`
  color: red;
`;

export default function InputComponents() {
  const [isClick, setIsClick] = useState(false);
  const {
    control,
    register,
    formState: { errors },
    setValue,
    watch,
    handleSubmit,
  } = useForm();

  const onSubmit = (data: any) => alert("success");

  const inputRef = useMask({
    mask: "___ ___.__",
    replacement: { _: /\d/ },
  });

  const [watchAmount, watchAcreditation] = watch(["amount", "acreditation"]);
  register("amount", { required: true });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Header>Заполните форму</Header>
      <FormRow>
        <Label>
          ФИО <RequiredMark>*</RequiredMark>
        </Label>
        <Input
          placeholder="Заполнить"
          {...register("fio", { required: true, maxLength: 30, minLength: 10 })}
        />
        {errors.fio && <ErrorMessage>Некорректное имя</ErrorMessage>}
      </FormRow>

      <FormRow>
        <Label>
          Рейтинг <RequiredMark>*</RequiredMark>
        </Label>
        <Input
          type="number"
          placeholder="Введите значение от 1 до 100"
          {...register("rating", { required: true, min: 1, max: 100 })}
        />
        {errors.rating && <ErrorMessage>Некорректное значение</ErrorMessage>}
      </FormRow>
      <div>
        <Checkbox
          id="acreditation"
          type="checkbox"
          {...register("acreditation")}
        />
        <label htmlFor="acreditation">Имеется аккредитация</label>
      </div>
      <FormRow>
        <Label>
          Желаемая сумма <RequiredMark>*</RequiredMark>
        </Label>
        <Input
          onChange={(event) => setValue("amount", event.target.value)}
          placeholder="0"
          ref={inputRef}
        ></Input>
        {errors.amount && <ErrorMessage>Это поле обязательно</ErrorMessage>}
      </FormRow>
      <FormRow>
        <Label>
          Категория <RequiredMark>*</RequiredMark>
        </Label>
        <Controller
          name="select"
          defaultValue={"Категория 1"}
          control={control}
          render={({ field }) => {
            return (
              <DropDown
                options={[
                  "Категория 1",
                  "Категория 2",
                  "Категория 3",
                  "Категория 4",
                ]}
                {...field}
              />
            );
          }}
        />
      </FormRow>
      <FormRow>
        <Label>Комментарий</Label>
        <Input
          placeholder="Комментарий"
          {...register("comment", { maxLength: 200 })}
        />
      </FormRow>

      <div>
        <b>Итоговая сумма: </b>
        {watchAmount && (
          <b>
            {watchAcreditation
              ? parseFloat(watchAmount.split(" ").join("")) * 1.2
              : parseFloat(watchAmount.split(" ").join(""))}
          </b>
        )}
      </div>
      <Submit
        $isActive={!isClick}
        onClick={() => setIsClick(!isClick)}
        type="submit"
      >
        Отправить
      </Submit>
    </Form>
  );
}
