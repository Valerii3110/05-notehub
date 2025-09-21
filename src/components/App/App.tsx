import React, { useState, useEffect } from 'react';
import css from './App.module.css';
import SearchBox from '../SearchBox/SearchBox';
import Pagination from '../Pagination/Pagination';
import NoteList from '../NoteList/NoteList';
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';
import { useNotes } from '../hooks/useNotes';

const App: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>('');
  const [debouncedSearch, setDebouncedSearch] = useState<string>('');

  // debounce для пошуку
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); // скидати сторінку при новому пошуку
    }, 500);

    return () => clearTimeout(handler);
  }, [search]);

  const { data, isLoading, isError } = useNotes(page, 12, debouncedSearch);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onSearch={setSearch} />
        {data?.totalPages && data.totalPages > 1 && (
          <Pagination page={page} pageCount={data.totalPages} onChangePage={setPage} />
        )}
        <button className={css.button} onClick={() => setModalOpen(true)}>
          Create note +
        </button>
      </header>

      <main>
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error loading notes</p>}
        {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
        {data && data.notes.length === 0 && <p>No notes found.</p>}
      </main>

      {isModalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <NoteForm onSuccess={() => setModalOpen(false)} onCancel={() => setModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
};

export default App;
