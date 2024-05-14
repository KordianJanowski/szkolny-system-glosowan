import * as yup from "yup";

export interface SignInInputs {
  login: string
  password: string
}

export const signInFormSchema = yup.object().shape({
  login: yup.string().required("Pole login jest wymagane"),
  password: yup.string().required("Pole hasło jest wymagane"),
});