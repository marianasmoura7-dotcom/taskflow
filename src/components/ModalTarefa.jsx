import { useState, useEffect } from "react";
import styles from './ModalTarefa.module.css';
import { mensagensDeErro } from "../api";
import { useAuth } from "../contexts/AuthContext";

function paraNumero(valor) {
    return valor ? Number(valor) : null;
}

function ModalTarefa({
    aberto,
    onFechar,
    onSalvar,
    tarefa = null,
    coluna = "afazer",
    prioridades = [],
    usuarios = [],
    projetos = [],
}) {
    const { usuario } = useAuth(); // usuário logado = responsável padrão

    const [texto, setTexto] = useState("");
    const [idPrioridade, setIdPrioridade] = useState(2); // 2 = Médio
    const [idUsuario, setIdUsuario] = useState("");
    const [idProjeto, setIdProjeto] = useState("");
    const [erros, setErros] = useState([]);
    const [salvando, setSalvando] = useState(false);

    useEffect(() => {
        setErros([]);
        if (tarefa) {
            setTexto(tarefa.texto);
            setIdPrioridade(tarefa.id_prioridade);
            setIdUsuario(tarefa.usuario_id);
            setIdProjeto(tarefa.idprojeto);
        } else {
            setTexto("");
            setIdPrioridade(2);
            setIdUsuario(usuario?.id || usuarios[0]?.id || "");
            setIdProjeto(projetos[0]?.id || "");
        }
    }, [tarefa, aberto]);

    useEffect(() => {

    })

    async function handleSalvar() {
        setErros([]);
        setSalvando(true);
        try {
            await onSalvar({
                ...tarefa,
                id: tarefa?.id,
                texto,
                coluna: tarefa?.coluna || coluna,
                id_prioridade: paraNumero(idPrioridade),
                usuario_id: paraNumero(idUsuario),
                idprojeto: paraNumero(idProjeto),
            });
            onFechar();
        } catch (e) {
            setErros(mensagensDeErro(e)); // 400 → lista de detalhes da validação
        }
        finally {
            setSalvando(false);
        }
    }



    useEffect(() => {
        if (!aberto) return;
        function handleEsc(e) {

            if (e.key === 'Escape') onFechar();

        }
        document.addEventListener('keydown', handleEsc);
        return () => {
            document.removeEventListener('keydown', handleEsc);

        };
    });
    if (!aberto) return; { null }


    return (

        <div className={styles.overlay} onClick={onFechar}>

            <div className={styles.card} onClick={e => e.stopPropagation()}>
                <h2>{tarefa ? 'Editar tarefa' : 'Nova tarefa'}</h2>
                <input placeholder='Texto da tarefa' value={texto}
                    onChange={e => setTexto(e.target.value)} />

                <div className={styles.campo}>
                    <label htmlFor="tarefa-responsavel">Responsável</label>
                    <select
                        id="tarefa-responsavel"
                        value={idUsuario}
                        onChange={(e) => setIdUsuario(e.target.value)}
                    >{usuarios.map((u) => (
                        <option key={u.id} value={u.id}>
                            {u.nome}
                        </option>
                    ))}
                    </select>
                </div>
                <div className={styles.campo}>
                    <label htmlFor="tarefa-projeto">Projeto</label>
                    <select
                        id="tarefa-projeto"
                        value={idProjeto}
                        onChange={(e) => setIdProjeto(e.target.value)}
                    >
                        {projetos.map((p) => (
                            <option key={p.id} value={p.id}>
                                {p.nome}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={styles.campo}>
                    <label htmlFor="tarefa-prioridade">Prioridade</label>
                    <select
                        id="tarefa-prioridade"
                        value={idPrioridade}
                        onChange={(e) => setIdPrioridade(e.target.value)}
                    >
                        {prioridades.map((p) => (
                            <option key={p.id} value={p.id}>
                                {p.descricao}
                            </option>
                        ))}
                    </select>
                </div>
                {erros.length > 0 && (
                    <ul className={styles.erros}>
                        {erros.map((mensagem, i) => (
                            <li key={i}>{mensagem}</li>
                        ))}
                    </ul>
                )}


                <div className={styles.botoes}>
                    <button onClick={onFechar}>Cancelar</button>
                    <button onClick={handleSalvar} disabled={salvando}>
                        {salvando ? "Salvando..." : "Salvar"}
                    </button>
                </div>
            </div>
        </div >
    );
}

export default ModalTarefa;