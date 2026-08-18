import { NavLink } from 'react-router-dom';
import styles from './sidebar.module.css';
import {useAuth} from '../contexts/AuthContext';

function Sidebar() {
  const {logado, logout, cidade} = useAuth();
  const linkClass = ({ isActive }) =>
    isActive ? styles.link + ' ' + styles.ativo : styles.link;

  return (
    <aside className={styles.sidebar}>
      
      {/*  */}
       <div className={styles.logo}> <h1>TaskFlow</h1> </div>
      <nav className={styles.nav}>

        
        {logado && <NavLink to='/' className={linkClass}>Dashboard</NavLink>}

        <NavLink to='/sobre' className={linkClass}>Sobre</NavLink>
       {cidade && cidade !== '-' && (
 <span className={styles['badge-cidade']}>📍{cidade}</span>)}
        <NavLink to='/login' className={linkClass}>Login</NavLink>
        {logado && (<button className={styles.btnLogout} onClick={() => { alert('você saiu do taskFlow'); logout() }} >Sair</button>)}
       {/* <span className={styles['btnLogout']}>\ {logado &&   <span className={styles['btnLogout']}>  </span>}  */}
      </nav>
     
    </aside>

  ); 
}


export default Sidebar;