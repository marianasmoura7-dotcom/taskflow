import TarefaItem from './TarefaItem';
function ListaTarefas({ tarefas,onDeletar, onEditar, onMover, colunaAnterior, colunaProxima }) {
    return (
        <section id='lista-section'>
            {/* mensagem quando nao ha tarefas */}
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
                            concluida={tarefa.concluida}
                            prioridade={tarefa.prioridade}
                            onEditar={onEditar ? () => onEditar(tarefa) : undefined}
                            onDeletar={() => onDeletar (tarefa.id)}
                            cidade={tarefa.cidade}
                            onMover={onMover ? (novaColuna) => onMover(tarefa.id, novaColuna):null }
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