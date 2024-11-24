const Form = ({ title, cliFunc, value, data }) => (
  <div>
    {title} <input data-form={data} onChange={cliFunc} value={value} />
  </div>
);

export default Form;
