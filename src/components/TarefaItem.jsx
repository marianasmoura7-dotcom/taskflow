import styles from './TarefaItem.module.css';

function TarefaItem({ texto, cidade, concluida = false, prioridade = 'media', onDeletar,onEditar, onMover, colunaAnterior, colunaProxima, }) {
  // Classe do li muda conforme o estado concluida
  const classeItem = (concluida ? styles.tarefa + ' ' + styles.concluida : styles.tarefa) + ' ' + styles[prioridade];

  // Classe do texto tambem muda
  // const classeTexto = concluida ? styles.textotarefa + ' ' + styles['texto-tarefa'] : styles.textotarefa;

  const classePrioridade = styles['badge-prioridade'] + ' ' + styles['badge-' + prioridade];

  return (
    <li className={classeItem}>
      <span onDoubleClick={onEditar}>{texto}</span>
      <span className={classePrioridade}> {prioridade} </span>
      <button className={styles.btnDeletar} onClick={onDeletar}>X </button>
      {cidade && cidade !== '-' && (
        <span className={styles['badge-cidade']}> {cidade}</span>
      )}
      {colunaAnterior && (<button className={styles.btnMover} onClick={() => onMover(colunaAnterior)}>  ←  </button>)}
      {colunaProxima && (<button className={styles.btnMover} onClick={() => onMover(colunaProxima)}>  →  </button>)}

      {/* <button className={styles.btnMover} onClick={() => onMover (colunaAnterior)}>  ←  </button>  
       <button className={styles.btnMover} onClick={() => onMover (colunaProxima)}>  →  </button>
     */}
    </li>
  );
}

export default TarefaItem;