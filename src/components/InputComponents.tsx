import { Form, useForm } from "react-hook-form";
import { styled } from "styled-components";

export default function InputComponents() {
  const Form = styled.form`
    display: flex;
    flex-direction: column;
    padding: 20px;
    width: 540px;
    height: 850px;
    border-radius: 12px;
    padding: 12px, 24px, 24px, 24px;
    gap: 21px;
    background: #eff2f5;
  `;
  const Div = styled.div`
    width: 490px;
    height: 66px;
    top: 20px;
    left: 20px;
    border-radius: 2px;
    gap: 4px;
  `;
  const Input = styled.input`
    width: 490px;
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
    width: 490px;
    height: 18px;
    font-size: 14px;
    color: #9394aa;
  `;
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (data: any) => console.log(data);
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Label>ФИО</Label>
        <Input
          placeholder="Заполнить"
          {...register("fio", { required: true, maxLength: 30, minLength: 10 })}
        />
        {errors.fio && <div>Это поле обязательно</div>}
      </div>

      <div>
        <Label>Рейтинг</Label>
        <Input
          type="number"
          placeholder="Введите значение от 1 до 100"
          {...register("rating", { required: true, min: 1, max: 100 })}
        />
        {errors.rating && <div>Это поле обязательно</div>}
      </div>
      <button type="submit">Submit</button>
    </Form>
  );
}
