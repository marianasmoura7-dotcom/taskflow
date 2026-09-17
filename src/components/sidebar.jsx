import { NavLink } from 'react-router-dom';
import styles from './sidebar.module.css';
import { useAuth } from '../contexts/AuthContext';


function Sidebar() {
  const { login, logout, cidade } = useAuth();
  const linkClass = ({ isActive }) =>
    isActive ? styles.link + ' ' + styles.ativo : styles.link;

  return (

    <aside className={styles.sidebar}>



      {/*  */}
      <div className={styles.logo}> <h1>TaskFlow</h1> </div>
      <nav className={styles.nav}>
        {login && <NavLink to='/' className={linkClass}>Dashboard</NavLink>}

        <NavLink to='/sobre' className={linkClass}>Sobre</NavLink>
        {cidade && cidade !== '-' && (
          <span className={styles['badge-cidade']}>📍{cidade}</span>)}

        {logout && (<NavLink to='/login' className={linkClass}>Login</NavLink>)}
        {login && <NavLink to='/perfil' className={linkClass}>Meu perfil</NavLink>}

        {/* <span className={styles['btnLogout']}>\ {login &&   <span className={styles['btnLogout']}>  </span>}  */}

        {login && (<button className={styles.btnLogout} onClick={() => { alert('você saiu do taskFlow'); logout() }} >Sair</button>)}
      </nav>
    </aside>

  );
}


export default Sidebar;