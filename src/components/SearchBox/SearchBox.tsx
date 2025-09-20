import React from 'react';
import { useDebouncedCallback } from 'use-debounce';
import css from './SearchBox.module.css';

interface SearchBoxProps {
  value: string;
  onSearch: (v: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ value, onSearch }) => {
  const [local, setLocal] = React.useState(value);

  const debounced = useDebouncedCallback((v: string) => onSearch(v), 500);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocal(e.target.value);
    debounced(e.target.value);
  };

  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      value={local}
      onChange={handleChange}
    />
  );
};

export default SearchBox;
