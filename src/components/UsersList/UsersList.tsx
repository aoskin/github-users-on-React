import React, { FC, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './UsersList.css';
import { User, Users } from '../../types';
import { Preloader } from '../Preloader/Preloader';

const getWordRepos = (num: number): string => {
  if (num % 10 === 1 && num % 100 !== 11) {
    return 'репозиторий';
  } else if (num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20)) {
    return 'репозитория';
  } else {
    return 'репозиториев';
  }
};

interface UsersListProps {
  query?: string | null;
  // eslint-disable-next-line no-unused-vars
  onUsersCount?: (count: number) => void;
}

export const UsersList: FC<UsersListProps> = ({ query = null, onUsersCount }) => {
  const [users, setUsers] = useState<Users>({ items: [] });
  const [loading, setLoading] = useState(true);

  const filterItems = (items: User[], query: string | null) => {
    return items.filter((item) => query === null || item.login.includes(query));
  };
  const filteredItems = filterItems(users.items, query);
  const filteredItemCount = filteredItems.length;

  useEffect(() => {
    fetch('https://api.github.com/users')
      .then((response) => response.json())
      .then((response: User[]) => {
        return Promise.all(
          response.map((user) =>
            fetch(`https://api.github.com/users/${user.login}`)
              .then((response) => response.json())
              .then((details) => ({
                ...user,
                repos: details.public_repos,
                company: details.company,
              })),
          ),
        );
      })
      .then((users) => {
        setUsers({ items: users });

        setTimeout(() => {
          setLoading(false);
        }, 1000);
      });
  }, []);

  useEffect(() => {
    if (onUsersCount) {
      onUsersCount(filteredItemCount);
    }
  }, [filteredItemCount]);

  return (
    <div className="users-list">
      {loading && filteredItemCount !== 0 ? (
        <Preloader loading={loading} />
      ) : (
        filteredItems.map((item) => (
          <section className="users-list__item" key={item.id}>
            <div className="users-list__image-container">
              <img className="users-list__image" src={item.avatar_url} alt={item.login} />
            </div>
            <div className="users-list__content">
              <h2 className="users-list__title">
                <Link to={`/users/${item.id}`} className="link">
                  {item.login}
                </Link>
                , {item.repos} {getWordRepos(item.repos)}
              </h2>
              <p className="users-list__text">{item.company}</p>
            </div>
          </section>
        ))
      )}
    </div>
  );
};
