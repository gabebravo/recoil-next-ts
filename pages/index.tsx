import React from 'react';
import type { NextPage } from 'next';
import Canvas from './Canvas';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Canvas />
    </div>
  );
};

export default Home;
