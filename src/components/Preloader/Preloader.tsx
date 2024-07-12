import React, { FC } from 'react';
import './Preloader.css';

interface PreloaderProps {
  loading: boolean;
}

export const Preloader: FC<PreloaderProps> = ({ loading }) => {
  return loading ? (
    <>
      <div className="preloader">
        <div></div>
        <div></div>
      </div>
    </>
  ) : null;
};
