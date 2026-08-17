import styles from './Header.module.css';
function Header({ titulo, subtitulo }) {

    return (
        <header className= {styles.header} > 
            <div className={styles.container}>
                <div className={styles.logo }>
                 </div>
                <h1>{titulo}</h1>
                <p>{subtitulo}</p>
            </div>

            <div id="contadores">
            <span id="cont-total">0 tarefas</span>
            <span className="separador">·</span>
            <span id="cont-pendentes">0 pendentes</span>
            <span className="separador">·</span>
            <span id="cont-concluidas">0 concluídas</span>
          </div>

      </header>
  );
}

export default Header;