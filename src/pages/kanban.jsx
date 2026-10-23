import Header from "../components/Header";
// import Contador from "../components/Contador";
import ListaTarefas from "../components/ListaTarefas"; // reutilizado nas colunas
import { useState, useEffect } from "react";
import ModalTarefa from "../components/ModalTarefa";
import api, { mensagensDeErro } from "../api";


// import { data } from "react-router-dom";


function Kanban() {

    const [tarefas, setTarefas] = useState([])
    const [modalAberto, setModalAberto] = useState(false);
    const [tarefaEditando, setTarefaEditando] = useState(null);
    const [colunaAtiva, setColunaAtiva] = useState('afazer');
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState('');
    const [listaPrioridades, setListaPrioridades] = useState();
    const [listaUsuarios, setListaUsuarios] = useState();
    const [listaProjetos, setListaProjetos] = useState();


    function abrirModalCriar(coluna) {
        setTarefaEditando(null);
        setColunaAtiva(coluna);
        setModalAberto(true);
    }
    function abrirModalEditar(tarefa) {
        setTarefaEditando(tarefa);
        setModalAberto(true);
    }

    useEffect(() => {
        async function carregar() {
            try {
                setCarregando(true);
                setErro("");

                const [respPrioridades, respTarefas, respUsuarios, respProjetos] = await Promise.all([
                    api.get('/prioridades/'),
                    api.get('/tarefas/'),
                    api.get('/usuarios/'),
                    api.get('/projetos/')
                ]);
                setListaPrioridades(respPrioridades.data);
                setTarefas(respTarefas.data);
                setListaUsuarios(respUsuarios.data);
                setListaProjetos(respProjetos.data);
            } catch (e) {
                setErro('Erro ao carregar tarefas. Verifique a conexão.');

                console.log(e);
            } finally {
                setCarregando(false);
            }
        }
        carregar();
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


    async function salvarTarefa(dados) {
        if (dados.id) {
            const resposta = await api.put(`/tarefas/${dados.id}`, dados);
            setTarefas(tarefas.map((t) => (t.id === dados.id ? resposta.data : t)));
        } else {
            const resposta = await api.post("/tarefas/", dados);
            setTarefas([...tarefas, resposta.data]);
            // setErro('Erro ao editar tarefa. Tente novamente.');
        }
    }

    async function deletarTarefa(id) {
        const confirmou = window.confirm("Deseja realmente deletar essa tarefa?");
        if (!confirmou) 
            return;
        
        try {
            await api.delete(`/tarefas/${id}`);

            setTarefas(
                tarefas.filter(t => t.id !== id));
        } catch (err) {
            alert(mensagensDeErro(err).join("\n"));
            console.log(err);
        }


    };



    async function moverTarefa(id, novaColuna) {
        const tarefa = tarefas.find((t) => t.id === id);

        try {
            const resposta = await api.put(`/tarefas/${id}`, {
                ...tarefa,
                coluna: novaColuna,
            });
            setTarefas(tarefas.map((t) => t.id === id ? resposta.data : t));
        } catch (err) {
            alert(mensagensDeErro(err).join("\n"));
            console.error(err);
        }
    }
    return (
        <>
        
            <Header
                titulo="TaskFlow - Versão Brasileira " tarefas={tarefas}
                subtitulo="Gerencie suas tarefas"
            />

            <main className="container">

                {carregando && <svg viewBox="25 25 50 50">''
                    <circle r="20" cy="50" cx="50"> setTimeout(()  {

                    }, 1000s);</circle>
                </svg>}

                {erro && (<p style={{ textAlign: 'center', color: '#EF4444' }}>{erro}</p>)}
                {!carregando && !erro &&

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
                                    prioridade={listaPrioridades}
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
                                    prioridade={listaPrioridades}
                                    onDeletar={deletarTarefa}
                                    onEditar={abrirModalEditar}
                                    onMover={moverTarefa}
                                    colunaAnterior='afazer'
                                    colunaProxima="concluido"
                                    criadoEm={true}
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
                                    prioridade={listaPrioridades}
                                    onDeletar={deletarTarefa}
                                    onEditar={abrirModalEditar}
                                    onMover={moverTarefa}
                                    colunaAnterior='andamento'
                                    colunaProxima={null}
                                />
                            </div>

                        </div>
                    </section>
                }
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
                prioridades={listaPrioridades}
                usuarios={listaUsuarios}
                projetos={listaProjetos}
            />
        </>

    );
}

export default Kanban;