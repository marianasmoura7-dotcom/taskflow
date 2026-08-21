import Header from "../components/Header";
import Contador from "../components/Contador";
import ListaTarefas from "../components/ListaTarefas"; // reutilizado nas colunas
import { useState, useEffect } from "react";
import ModalTarefa from "../components/ModalTarefa";
import axios from "axios";
// import { data } from "react-router-dom";


function Kanban() {

    const [tarefas, setTarefas] = useState([])
    const [modalAberto, setModalAberto] = useState(false);
    const [tarefaEditando, setTarefaEditando] = useState(null);
    const [colunaAtiva, setColunaAtiva] = useState('afazer');
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState('');
    const URL_API = 'https://6a85ac989c451dc67a63f197.mockapi.io/';


    function abrirModalCriar(coluna) {
        setTarefaEditando(null);
        setColunaAtiva(coluna);
        setModalAberto(true);
    }
    function abrirModalEditar(tarefa) {
        setTarefaEditando(tarefa);
        setModalAberto(true);
    }

    async function salvarTarefa(dados) {
        try {
            if (dados.id !== undefined) {
                const { data: tarefaEditada } = await axios.put(URL_API + '/tarefas/' + dados.id, {
                    texto: dados.texto,
                    prioridade: dados.prioridade,
                    cidade: dados.cidade,
                    coluna: dados.coluna,
                });
                setTarefas(tarefasAtuais => tarefasAtuais.map(t => t.id === dados.id ? tarefaEditada : t));

            } else {
                const { data: novaTarefa } = await axios.post(URL_API + '/tarefas/', dados);
                setTarefas(tarefasAtuais => [...tarefasAtuais, novaTarefa]);
            }
        } catch (e) {
            setErro('Erro ao salvar tarefa. Tente novamente.');
            console.error(e);
        }
    }

    useEffect(() => {
        async function carregarTarefas() {
            try {
                setCarregando(true);
                setErro("");
                const resposta = await axios.get(URL_API + "/tarefas/");

                setTarefas(resposta.data);
            } catch (e) {
                setErro('Erro ao carregar tarefas. Verifique a conexão.');
                console.log(e);
            } finally {
                setCarregando(false);
            }
        }
        carregarTarefas();
    }, []);

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


    async function deletarTarefa(id) {

        // const confirmado = window.confirm(
        //     'tem certeza que deseja deletar essa tarefa?'
        // );

        try {
            await axios.delete(URL_API + '/tarefas/' + id);

            setTarefas(tarefasAtuais =>
                tarefasAtuais.filter(tarefa => tarefa.id !== id));
        } catch (e) {
            setErro('Erro ao deletar  tarefa. Tente novamente.');
            console.log(e);
        }

    };



    async function moverTarefa(id, novaColuna) {

        try {
            
            const { data: tarefaMovida } = await axios.put(
                URL_API + '/tarefas/' + id ,
                { coluna: novaColuna }
            );
            
            setTarefas(tarefasAtuais =>
                tarefasAtuais.map(t =>
                    t.id === id ? tarefaMovida : t
                )
            );
        } catch (e) {
            setErro('Erro ao mover tarefa. Tente novamente.');
            console.error(e);
        }
    }
    return (
        <>
            <Contador />
            <Header
                titulo="TaskFlow - Versão Brasileira " tarefas={tarefas}
                subtitulo="Gerencie suas tarefas"
            />

            <main className="container">
                {carregando && (<p style={{ textAlign: 'center', color: '#94A3B8' }}>Carregando tarefas...</p>)}
                {erro && (<p style={{ textAlign: 'center', color: '#EF4444' }}>{erro}</p>)}

                <section id="formulario">
                    <div className="container-quadros">


                        <div className='minikanban'>
                            <div className="coluna">
                                <h3 >A Fazer</h3>
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