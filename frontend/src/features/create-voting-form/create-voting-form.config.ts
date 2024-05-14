import * as yup from "yup";

export interface CreateVotingInputs {
  title: string
  content: string
  options?: string | undefined
  expiration_time: string
}

export const getVotingFormSchema = (votingOptions:string[]) => {
  const createVotingFormSchema = yup.object().shape({
    title: yup.string()
      .min(4, "Tytuł musi zawierać minimum 4 znaki")
      .max(150, "Tytuł może zawierać maksymalnie 150 znaków")
      .required("Pole tytuł jest wymagane"),
    content: yup.string()
      .min(20, "Opis musi zawierać minimum 20 znaków")
      .max(1500, "Opis może zawierać maksymalnie 1500 znaków")
      .required("Pole zawartość jest wymagane"),
    options: yup.string()
      .test("Minimum voting options", "Dodaj minimum dwie opcje głosowania", () => {
        if(votingOptions.length >= 2) {
          return true
        } else {
          return false
        }
      }),
    expiration_time: yup.string()
      .required("Wybierz czas wygaśnięcia")
      // .test("Required", "Wybierz czas wygaśnięcia", (expiration_time) => {
      //   if(expiration_time) {
      //     return true
      //   } else {
      //     return false
      //   }
      // })
  });

  return createVotingFormSchema;
}

