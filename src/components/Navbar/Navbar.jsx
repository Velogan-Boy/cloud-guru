import React from 'react';
import { BsGithub } from 'react-icons/bs';

import styles from './Navbar.module.css';

function Navbar() {
   return (
      <div className={styles.navbar}>
         <div className={styles.logoText}>
            <a href="/">CloudGuru</a>
         </div>
         <div className={styles.githubLogo}>
            <a href="/">
               <BsGithub />
            </a>
         </div>
      </div>
   );
}

export default Navbar;
