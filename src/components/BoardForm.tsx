import React from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../atoms";

const Form = styled.form`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: center;
  position: relative;
  top: 50px;

  input {
    background-color: transparent;
    padding: 10px 5px 10px 10px;
    border: none;
    font-size: 1.2rem;
    border-bottom: 2px solid ${(props) => props.theme.cardColor};
    color: ${(props) => props.theme.cardColor};

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: ${(props) => props.theme.cardColor};
    }
  }
`;

interface IForm {
  board: string;
}

function BoardForm() {
  const [todos, setTodos] = useRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onValid = ({ board }: IForm) => {
    const newData = { [board]: [], ...todos };
    setTodos(newData);
    setValue("board", "");
  };
  return (
    <Form onSubmit={handleSubmit(onValid)}>
      <input
        {...register("board", { required: true })}
        placeholder="Add Board Here"
        type="text"
      />
    </Form>
  );
}

export default BoardForm;
