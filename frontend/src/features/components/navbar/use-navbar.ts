import Cookies from 'js-cookie'

const useNavbar = () => {
  const logout = () => {
    Cookies.remove('user')
    Cookies.remove('access_token')

    location.reload()
  }

  return {
    logout
  }
}

export default useNavbar;