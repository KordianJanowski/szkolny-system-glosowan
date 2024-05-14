import { useState } from "react";
import { AuthService } from "../../utils/api";
import { User } from "../../utils/types/user";
import { SignInInputs } from "./sign-in-form.config";
import Cookies from 'js-cookie'
import { Ierror } from "../../utils/types/api";


const useSignInForm = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [errorMsg, setErrorMsg] = useState<string>('')
  const [isError, setIsError] = useState<boolean>(false)

  const signIn = async (loginData: SignInInputs) => {
    setIsError(false)
    setLoading(true)

    try {
      const res = await AuthService.login(loginData)

      const user:User = {
        ...res.user,
        roles: res.user.roles.toString().match(/[\w.-]+/g) as unknown as string[]
      }

      Cookies.set('user', JSON.stringify(user), { expires: 7 })
      Cookies.set('access_token', res.access_token, { expires: 7 })

      location.reload()
    } catch (err) {
      const error = err as unknown as Ierror;
      setIsError(true)
      setErrorMsg(error.response.data.message);
    } finally {
      setLoading(false)
    }
  }

  return {
    signIn,
    loading,
    errorMsg,
    isError
  }
}

export default useSignInForm;