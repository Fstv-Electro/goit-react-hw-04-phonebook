import styled from "@emotion/styled";
import { Field } from "formik";

export const Label = styled.label`
    margin: 8px;
    display flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
`

export const Input = styled(Field)`
    margin: 4px;
    padding: 8px;
    width: 200px;
    outline: none;
    border: 1px solid #2a2a2a;
    border-radius: 4px;
`

export const Button = styled.button`
    margin-top: 12px;
    padding: 8px;
    width: 100px;
    border: 1px solid #2a2a2a;
    border-radius: 4px;
`