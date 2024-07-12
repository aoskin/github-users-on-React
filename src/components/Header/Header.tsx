import React, { FC, FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Header.css';

interface Props {
  title?: string;
}

export const Header: FC<Props> = ({ title }) => {
  const [searchValue, setSearchValue] = useState('');
  const history = useHistory();
  // eslint-disable-next-line no-undef
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!searchValue.trim().length) {
      return;
    }

    history.push(`/search?query=${encodeURIComponent(searchValue)}`);
  };

  return (
    <header className="header">
      <div className="container header__container">
        <nav className="header__navigation">
          <ul className="header__navigation-list">
            <li className="header__navigation-list-item">
              <a href="/" className="header__navigation-link">
                Пользователи гитхаба
              </a>
            </li>
            {title && (
              <li className="header__navigation-list-item">
                <a className="header__navigation-link header__navigation-link--user">{title}</a>
              </li>
            )}
          </ul>
        </nav>

        <div className="header__search">
          <form className="header__search-form" onSubmit={onSubmit}>
            <input
              type="search"
              className="header__search-input"
              placeholder="Поиск пользователя"
              value={searchValue}
              onChange={(event) => setSearchValue(event.currentTarget.value)}
            />
            <button type="submit" className="header__search-button">
              Найти
            </button>
          </form>
        </div>
      </div>
    </header>
  );
};
