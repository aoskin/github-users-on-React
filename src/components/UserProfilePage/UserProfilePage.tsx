import React, { FC, useState, useEffect } from 'react';
import './UserProfilePage.css';
import { Header } from '../Header/Header';
import { useParams } from 'react-router-dom';
import { User } from '../../types';

interface RouteParams {
  id: string;
}

interface Repo {
  id: number;
  name: string;
  full_name: string;
}

export const UserProfilePage: FC = () => {
  const { id } = useParams<RouteParams>();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch(`https://api.github.com/user/${id}`)
      .then((response) => response.json())
      .then((user: User) => {
        return Promise.all([
          Promise.resolve(user),
          fetch(`https://api.github.com/users/${user.login}/repos`).then((response) => response.json()),
        ]);
      })
      .then(([user, reposList]) => {
        setUser({
          ...user,
          reposList,
        });
      });
  }, []);

  return (
    <>
      <Header title={user?.login} />
      <main>
        <div className="container">
          <section className="user-profile">
            <div className="user-profile__image-container">
              <img className="user-profile__image" src={user?.avatar_url} alt={`${user?.login} profile photo`} />
            </div>
            <div className="user-profile__content">
              <h1 className="user-profile__title">
                {user?.name}, <span className="user-profile__accent">{user?.login}</span>
              </h1>
              <p className="user-profile__text">
                <span className="user-profile__accent">{user?.followers}</span> followers ·{' '}
                <span className="user-profile__accent">{user?.following}</span> following ·{' '}
                <a href={user?.blog} className="link">
                  {user?.blog}
                </a>
              </p>
            </div>
          </section>

          <section className="repository-list">
            <div className="repository-list__header">
              <h2 className="repository-list__title">Репозитории</h2>
              <a href={`https://github.com/${user?.login}?tab=repositories`} className="link" target="_blank">
                Все репозитории
              </a>
            </div>

            <div className="repository-list__container">
              {user?.reposList?.map((item: Repo) => (
                <section className="repository-list__item" key={item.id}>
                  <h3 className="repository-list__item-title">
                    <a href={`https://github.com/${user?.login}/${item.name}`} className="link" target="_blank">
                      {item.name}
                    </a>
                  </h3>
                  <p className="repository-list__item-text">{item.full_name}</p>
                </section>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
};
