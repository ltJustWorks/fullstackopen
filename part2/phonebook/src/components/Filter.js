const Filter = ({keyword, handleKeyword}) => {
  return (
    <div>
      filter shown with <input value={keyword} onChange={handleKeyword}/>
    </div>
  )
}

export default Filter