import { Props, SearchInput } from "./search-input";

const useSeachInput = (props: Props) => {
  const { allVotings, setVotings } = props

  const search = ({ phrase }: SearchInput) => {
    setVotings(
      allVotings.filter(voting =>
        voting.title.toLowerCase().includes(phrase.toLowerCase()) ||
        voting.content.toLowerCase().includes(phrase.toLowerCase())
      )
    )
  }

  return {
    search
  }
}

export default useSeachInput;