const Input = ({ type = 'text', title, value, update, placeholder }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      name={title}
      value={value}
      onChange={update}
    />
  )
}

export default Input
