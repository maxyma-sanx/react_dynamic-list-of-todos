/* eslint-disable max-len */
import React, { useContext, useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { TodoContext, TodoUpdateContext } from './context/TodoContext';
import { getTodos } from './api/api';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { todo } = useContext(TodoContext);
  const { setTodos } = useContext(TodoUpdateContext);

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(data => setTodos(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter />
            </div>

            <div className="block">
              {loading && <Loader />}
              <TodoList />
            </div>
          </div>
        </div>
      </div>

      {todo && <TodoModal />}
    </>
  );
};
