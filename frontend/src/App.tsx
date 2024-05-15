import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { useAccountStore } from "./utils/zustand/account"
import Cookies from 'js-cookie'
import { ethereum } from "./smart_contract"

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function App() {
  const navigate = useNavigate()

  const { setAccount } = useAccountStore();

  useEffect(() => {
    navigate('/home')
    setAccount(Cookies.get('account') ?? '')

    if(!ethereum) return

    ethereum.on('accountsChanged', function (accounts: string[]) {
      Cookies.set('account', accounts[0]);
      setAccount(accounts[0]);
      window.location.reload();
    });
  }, [])

  return (
    <div>
      <Outlet />
    </div>
  )
}