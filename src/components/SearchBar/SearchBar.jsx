import css from "./SearchBar.module.css";
import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';

export default function SearchBar ({ onSubmit }) {
  const [input, setInput] = useState( "" );
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) {
      toast("Please enter your search");
      return;
    }
    onSubmit(e, input); 
  };
  return (
    <header className={css.header}>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          onChange={e => setInput(e.target.value)}
          value={input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
         
        <button className={css.btn} type="submit">Search</button>
        <Toaster />
      </form>
    </header>  
  )
}

