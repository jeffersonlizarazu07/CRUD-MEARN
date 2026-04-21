const SearchBar = ({ value, onChange }) => (
  <input 
    type="text" 
    className="form-control w-25" 
    placeholder="Buscar..." 
    value={value}
    onChange={onChange}
  />
);

export default SearchBar;