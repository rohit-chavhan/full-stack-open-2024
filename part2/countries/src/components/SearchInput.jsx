const SearchInput = ({ onChange, value }) => (
  <div>
    find countries <input onChange={onChange} value={value} />
  </div>
);

export default SearchInput;
