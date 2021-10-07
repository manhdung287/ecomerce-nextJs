import React from 'react';
import Navbar from './Navbar';
import styles from '../styles/Layout.module.scss';
import Notification from './Notification';

export default function Layout({children}) {
    return (
        <div className={styles.container}>
            <Notification/>
           <Navbar/>
           {children}
        </div> 
      );
  }
  