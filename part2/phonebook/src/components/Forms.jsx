const Form = ({ title, cliFunc, value }) => (
  <div>
    {title} <input onChange={cliFunc} value={value} />
  </div>
);

export default Form;
