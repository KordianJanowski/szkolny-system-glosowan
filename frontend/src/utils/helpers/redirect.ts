import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { access_token, user } from '../constans/user'
import { isUserAdmin } from './permissions'

export const checkIfUserNotLogged = () => {
  const navigate = useNavigate()

  useEffect(() => {
    if (!user || !access_token) {
      navigate("/sign-in");
    }
  }, [user, access_token, navigate]);
}

export const checkIfUserLogged = () => {
  const navigate = useNavigate()

  useEffect(() => {
    if (user && access_token) {
      navigate("/");
    }
  }, [user, access_token, navigate]);
}

export const redirectWhenNotAdmin = () => {
  const navigate = useNavigate()

  useEffect(() => {
    if(!isUserAdmin()) {
      navigate(-1);
    }
  }, [user, access_token, navigate]);
}
