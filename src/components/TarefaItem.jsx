import styles from './TarefaItem.module.css';

function TarefaItem({ texto,
  concluida = false,
  rotuloPrioridade = "",
  corPrioridade = null,
  onDeletar,
  onEditar,
  onMover = null,
  colunaAnterior = null,
  colunaProxima = null,
  usuario = null,
  projeto = null, }) {

  const classeItem = (concluida ? styles.tarefa + ' ' + styles.concluida : styles.tarefa) + ' ' ;
  const estiloCor = corPrioridade ? { "--cor-prioridade": corPrioridade } : undefined;
  const classeTexto = concluida ? styles.textoTarefa + " " + styles["texto-tarefa"] : styles.textoTarefa;
  const modoKanban = onMover !== null;
  return (
    <ul className={classeItem} style={estiloCor}>
      <span className={classeTexto} onDoubleClick={onEditar}>{texto}</span>
      {(usuario || projeto) && (
        <div className={styles.info}>
          {usuario && (
            <span className={styles.infoItem}>
              <span className={styles.infoRotulo}>Responsável</span>
              {usuario}
            </span>
          )}
          {projeto && (
            <span className={styles.infoItem}>
              <span className={styles.infoRotulo}>Projeto</span>
              {projeto}
            </span>
          )}
        </div>
      )}

      <div className={styles.rodape}>
        <span className={styles["badge-prioridade"]}>{rotuloPrioridade || "Sem prioridade"}</span>
        <div className={styles.acoes}>
          {modoKanban && colunaAnterior && (
            <button
              className={styles.btnMover}
              onClick={() => onMover(colunaAnterior)}
              title="Mover para coluna anterior"
            >
              ←
            </button>
          )}

          {modoKanban && colunaProxima && (
            <button
              className={styles.btnMover}
              onClick={() => onMover(colunaProxima)}
              title="Mover para próxima coluna"
            >
              →
            </button>
          )}

          <button className={styles.btnDeletar} onClick={onDeletar}>X </button>
        </div>
      </div>
    </ul>
  );
}
export default TarefaItem;