import clsx from 'clsx';
import Link from 'next/link';
import type { FC, PropsWithChildren } from 'react';
import { useState } from 'react';
import styles from './Layout.module.scss';

type LayoutProps = {
  // add what you want to expose
};

const Nav: FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div>
      <button onClick={() => setOpen(!open)}>{open ? 'Close' : 'Open'}</button>
      <nav
        role="navigation"
        className={clsx(styles.topNav, { [styles.test]: open })}
      >
        <ul>
          <li>
            <Link href="#">Home</Link>
          </li>
          <li>
            <Link href="#">GetServerSideProps</Link>
          </li>
          <li>
            <Link href="#">GetStaticProps</Link>
          </li>
          <li>
            <Link className="btn-main" href="#" aria-haspopup="true">
              Language (fr)
            </Link>
            <ul className="dropdown" aria-label="submenu">
              <li>
                <Link href="" locale={'fr'}>
                  Français
                </Link>
              </li>
              <li>
                <Link href="" locale={'en'}>
                  English
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export const Layout: FC<PropsWithChildren<LayoutProps>> = (props) => {
  const { children } = props;
  const img =
    'https://images.unsplash.com/photo-1472494731104-3ba69e52845b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80';
  return (
    <main className={styles.mainCtn}>
      <header className={styles.mainHeader}>
        {/* <img src={img} alt={'cover'} /> */}
        <div className={styles.sticky}>
          <Nav />
        </div>
      </header>
      <div className={styles.mainContent}>{children}</div>
      <footer className="main-footer">FOOTER</footer>
    </main>
  );
};
