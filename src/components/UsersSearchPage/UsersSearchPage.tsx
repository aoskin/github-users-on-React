import React, { FC, useState } from 'react';
import { Header } from '../Header/Header';
import { UsersList } from '../UsersList/UsersList';
import { useLocation } from 'react-router-dom';

export const UsersSearchPage: FC = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');
  const [userCount, setUserCount] = useState<number | null>(null);

  const usersCountChange = (count: number) => {
    setUserCount(count);
  };

  return (
    <>
      <Header title="Поиск" />
      <main>
        <div className="container">
          <h1 className="title">
            {(userCount ?? 0) > 0 ? `Пользователи по запросу ${query}` : `Ничего не найдено по запросу ${query}`}
          </h1>
          <UsersList query={query} onUsersCount={usersCountChange} />
        </div>
      </main>
    </>
  );
};
