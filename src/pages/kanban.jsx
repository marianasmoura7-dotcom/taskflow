import Header from "../components/Header";
import Contador from "../components/Contador";
import ListaTarefas from "../components/ListaTarefas"; // reutilizado nas colunas
import { useState, useEffect } from "react";
import ModalTarefa from "../components/ModalTarefa";
// import axios from "axios";


function Kanban() {
    const [proximoId, setProximoId] = useState(1);
    const [tarefas, setTarefas] = useState(() => {
        const salvo = localStorage.getItem("tarefas");
        if (!salvo) return [];
        const tarefasConvertidas = JSON.parse(salvo);
        setProximoId(
            tarefasConvertidas[tarefasConvertidas.length - 1]?.id + 1 || 1,
        );
        return Array.isArray(tarefasConvertidas) ? tarefasConvertidas : [];
    });

    const [modalAberto, setModalAberto] = useState(false);
    const [tarefaEditando, setTarefaEditando] = useState(null);
    const [colunaAtiva, setColunaAtiva] = useState('afazer');



    function abrirModalCriar(coluna) {
        setTarefaEditando(null); 
        setColunaAtiva(coluna);
        setModalAberto(true);
    }
    function abrirModalEditar(tarefa) {
        setTarefaEditando(tarefa); 
        setModalAberto(true);
    }

    function salvarTarefa(dados) {
        if (dados.id !== undefined) {
            setTarefas(
                tarefas.map((tarefa) =>
                    tarefa.id === dados.id ? { ...tarefa, ...dados } : tarefa
                ),
            );
        } else {

            setTarefas([...tarefas, { ...dados, id: proximoId }]);

            setProximoId(proximoId + 1);
        }
    }
    useEffect(() => {
        localStorage.setItem("tarefas", JSON.stringify(tarefas));
    }, [tarefas]);
    useEffect(() => {
        const pendentes = tarefas.filter(
            (t) => t.coluna === 'afazer'

        ).length;

        if (pendentes > 0) {
            // Mostra o contador quando há tarefas a fazer
            document.title = `(${pendentes}) TaskFlow`;
        } else {
            // Título limpo quando não há pendências
            document.title = 'TaskFlow';
        }

    }, [tarefas]);





    // const adicionarTarefa = async () => {
    //     if (texto.trim() === '') return;

    //     const cidade = await consultarCidade(cep); // string 'Natal/RN'

    //     if (!cidade) return; // CEP inválido — abortar

    // const novaTarefa = {
    //     texto: texto,
    //     concluida: false,
    //     prioridade: prioridade,
    //     coluna: 'afazer',
    // };

    // setTarefas([...tarefas, novaTarefa]);
    // setTexto('');
    // setProximoId(proximoId + 1);
    // setPrioridade("media");


    const deletarTarefa = (id) => {

        const confirmado = window.confirm(
            'tem certeza que deseja deletar essa tarefa?'
        );

        if(confirmado){
            setTarefas(tarefas.filter((tarefa) => tarefa.id !== id));
        }
        
    };

   

    function moverTarefa(id, novaColuna) {
        if (!novaColuna) return;
        setTarefas(
            tarefas.map((tarefa) =>
                tarefa.id === id ? { ...tarefa, coluna: novaColuna } : tarefa,
            ),
        );
    }

    return (
        <>
            <Contador />
            <Header
                titulo="TaskFlow - Versão Brasileira "
                subtitulo="Gerencie suas tarefas"
            />

      <main className="container">
    <section id="formulario">
        <div className="container-quadros">
            
            
            <div className='minikanban'>
                <div className="coluna">
                    <h3>A Fazer</h3>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <span className='kanban-contador'>
                            {tarefas.filter(t => t.coluna === 'afazer').length}
                        </span>
                        <button className='kanban-btn-add' onClick={() => abrirModalCriar('afazer')}>
                            +
                        </button>
                    </div>
                </div>
                
                <ListaTarefas
                    tarefas={tarefas.filter((t) => t.coluna === "afazer")}
                    onDeletar={deletarTarefa}
                    onEditar={abrirModalEditar}
                    onMover={moverTarefa}
                    colunaAnterior={null}
                    colunaProxima="andamento"
                />
            </div>

            <div className='minikanban'>
                <div className="coluna">
                    <h3>Em andamento </h3>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <span className='kanban-contador'>
                            {tarefas.filter(t => t.coluna === 'andamento').length}
                        </span>
                        <button className='kanban-btn-add' onClick={() => abrirModalCriar('andamento')}>
                            +
                        </button>
                    </div>
                </div>
                
                <ListaTarefas
                    tarefas={tarefas.filter((t) => t.coluna === "andamento")}
                    onDeletar={deletarTarefa}
                    onEditar={abrirModalEditar}
                    onMover={moverTarefa}
                    colunaAnterior='afazer'
                    colunaProxima="concluido"
                />
            </div>

          
            <div className="minikanban">
                <div className="coluna">
                    <h3>Concluido</h3>
                    <div style={{ display: "flex", gap: '8px', alignItems: 'center' }}>
                        <span className="kanban-contador"> 
                            {tarefas.filter(t => t.coluna === "concluido").length}
                        </span>
                        <button className="kanban-btn-add" onClick={() => abrirModalCriar('concluido')}>
                            +
                        </button>
                    </div>
                </div>
                
                <ListaTarefas
                    tarefas={tarefas.filter((t) => t.coluna === "concluido")}
                    onDeletar={deletarTarefa}
                    onEditar={abrirModalEditar}
                    onMover={moverTarefa}
                    colunaAnterior='andamento'
                    colunaProxima={null}
                />
            </div>

        </div> 
    </section>
</main >


            <footer>
                <p>TaskFlow &copy; 2026 &mdash; Mariana Moura &mdash; SENAI CTGAS-ER</p>
            </footer>
            <ModalTarefa
                aberto={modalAberto}
                onFechar={() => setModalAberto(false)}
                onSalvar={salvarTarefa}
                tarefa={tarefaEditando}
                coluna={colunaAtiva}
            />
        </>

    );
}
export default Kanban;