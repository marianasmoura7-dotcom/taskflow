import TarefaItem from './TarefaItem';
function ListaTarefas({ tarefas, onDeletar, onEditar, onMover, colunaAnterior, colunaProxima }) {
    return (
        <section id='lista-section'>
            {tarefas.length === 0 && (
                <p className='msg-vazia' > Nenhuma tarefa aqui ainda.
                </p>

            )}
            {tarefas.length > 0 && (
                <ul id='lista-tarefas'>
                    {tarefas.map(tarefa => (
                        <TarefaItem
                            key={tarefa.id}
                            texto={tarefa.texto}
                            rotuloPrioridade={tarefa.prioridade}
                            corPrioridade={tarefa.prioridade_cor}
                            concluida={tarefa.concluida}
                            prioridade={tarefa.prioridade}
                            usuario={tarefa.usuario || 'Sem responsável'}
                            projeto={tarefa.projeto || 'Sem projeto'}
                            onEditar={onEditar ? () => onEditar(tarefa) : undefined}
                            onDeletar={() => onDeletar(tarefa.id)}
                            cidade={tarefa.cidade}
                            onMover={onMover ? (novaColuna) => onMover(tarefa.id, novaColuna) : null}
                            colunaAnterior={colunaAnterior}
                            colunaProxima={colunaProxima}


                        />
                    ))}
                </ul>
            )}
        </section>

    );
}
export default ListaTarefas