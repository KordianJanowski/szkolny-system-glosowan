import { create } from 'zustand'

type AccountStore = {
  account: string,
  setAccount: (account: string) => void,
}

export const useAccountStore = create<AccountStore>()((set) => ({
  account: '',
  setAccount: (account) => set(() => ({ account })),
}))
