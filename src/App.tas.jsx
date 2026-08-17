// // import TarefaItem from './components/TarefaItem'
// import "./index.css";
// import Header from "./components/Header";
// import ListaTarefas from "./components/ListaTarefas";
// import Contador from "./components/Contador";
// import { useState, useEffect } from "react";
// import TarefaItem from "./components/TarefaItem";
// import axios from "axios";

// function App() {
//   const [tarefas, setTarefas] = useState(() => {
//     const salvo = localStorage.getItem("tarefas");
//     return salvo ? JSON.parse(salvo) : [];
//   });
//   const [proximoId, setProximoId] = useState([1]);
//   const [texto, setTexto] = useState([""]);
//   const [prioridade, setPrioridade] = useState("media"); // em colchetes é um array

//   const [cep, setCep] = useState("");

//   const consultarCidade = async (cep) => {
// //procuar ao ce´  p
//   try {
//    const busca = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
//     return busca.data.erro ? '' : busca.data.localidade;
//     }  catch {
//         return '';
//     }

//     if (busca.data.erro) {
//       alert('CEP não encontrado!');
//       return '';
//     }

//     return busca.data.localidade; // Retorna apenas a cidade
//   }


// const adicionarTarefa = async (e) => {
//   if (e) e.preventDefault();
//   if (!texto.trim()) return;

//   let cidadeEncontrada = '';
//   if (cep.trim()) {
//     cidadeEncontrada = await consultarCidade(cep);
//   }

//   const novaTarefa = {
//     id: Date.now(),
//     texto: texto.trim(),
//     prioridade: prioridade,
//     coluna: 'afazer',
//     cidade: cidadeEncontrada // guarda  a cidade junto com a tarefa
//   };

//   setTarefas([...tarefas, novaTarefa]);
//   setTexto('');
//   setCep(''); // Limpar o do campo CEP
//   setTarefas([...tarefas, novaTarefa]); // os três pontinhos significam que esta fazendo uma cópia
//   //     // o set ele atualiza no react a "variavel" que ele esta indicando, o metodo que atualiza a variavel
//   setProximoId(proximoId + 1);
//   setTexto("");
//   setPrioridade("media");
//   };

  

  
  

//   const deletarTarefa = (id) => {
//     const tarefasAtualizadas = tarefas.filter((tarefa) => tarefa.id !== id);
//     setTarefas(tarefasAtualizadas);
//   };

//   function concluirTarefa(id) {
//     setTarefas(
//       tarefas.map((tarefa) =>
//         tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa,
//       ),
//     );
//   }

//   function moverTarefa(id, novaColuna) {
//     if (!novaColuna) return;
//     setTarefas(
//       tarefas.map((tarefa) =>
//         tarefa.id === id ? { ...tarefa, coluna: novaColuna } : tarefa,
//       ),
//     );
//   }
//   useEffect(() => {
//     localStorage.setItem("tarefas", JSON.stringify(tarefas));
//   }, [tarefas]);


//   return (
//     <>
//       <Contador/>
//       <Header
//         titulo="TaskFlow - Versão Brasileira "
//         subtitulo="Gerencie suas tarefas"
//       />
      
//       <main className="container">
//         <section id="formulario">
//           {/* 1. Formulário isolado */}
//           <div className="campo-linha">
//             <input
//               id="input-tarefa"
//               type="text"
//               placeholder="Nova tarefa..."
//               required
//               autoComplete="off"
//               value={texto}
//               onChange={(e) => setTexto(e.target.value)}
//             />
//             {/* <input
//             type="text"
//             placeholder="CEP"
//             value={cep}
//             onChange={(e) => setCep(e.target.value)}
//             /> */}

//             <select
//               id="sel-prioridade"
//               value={prioridade}
//               onChange={(e) => setPrioridade(e.target.value)}
//             >
//               <option value="alta">🔴 Alta</option>
//               <option value="media">🟡 Média</option>
//               <option value="baixa">🟢 Baixa</option>
//             </select>

//             <button id="btn-adicionar" type="button" onClick={adicionarTarefa}>
//               Adicionar
//             </button>
//           </div>

//           {/* 2. Container único para o Kanban */}
//           <div className="minikanban">
//             {/* Coluna: A Fazer */}
//             <div className="coluna">
//               <h2>A fazer</h2>
//               <span>{tarefas.filter((t) => t.coluna === "afazer").length}</span>
//               <ListaTarefas
//                 tarefas={tarefas.filter((t) => t.coluna === "afazer")}
//                 onDeletar={deletarTarefa}
//                 onConcluir={concluirTarefa}
//                 onMover={moverTarefa}
//                 colunaAnterior={null}
//                 colunaProxima={"andamento"}
//               />
//             </div>

//             {/* Coluna: Em Andamento */}
//             <div className="coluna">
//               <h2>Em andamento</h2>
//               <span>
//                 {tarefas.filter((t) => t.coluna === "andamento").length}
//               </span>
//               <ListaTarefas
//                 tarefas={tarefas.filter((t) => t.coluna === "andamento")}
//                 onDeletar={deletarTarefa}
//                 onConcluir={concluirTarefa}
//                 onMover={moverTarefa}
//                 colunaAnterior={"afazer"}
//                 colunaProxima={"concluido"}
//               />
//             </div>

//             {/* Coluna: Concluído */}
//             <div className="coluna">
//               <h2>Concluído</h2>
//               <span>
//                 {tarefas.filter((t) => t.coluna === "concluido").length}
//               </span>
//               <ListaTarefas
//                 tarefas={tarefas.filter((t) => t.coluna === "concluido")}
//                 onDeletar={deletarTarefa}
//                 onConcluir={concluirTarefa}
//                 onMover={moverTarefa}
//                 colunaAnterior={"andamento"}
//                 colunaProxima={null}
//               />
//             </div>
//           </div>
//         </section>
//       </main>

//       <footer>
//         <p>TaskFlow &copy; 2026 &mdash; Mariana Moura &mdash; SENAI CTGAS-ER</p>
//       </footer>
//     </>
//   );
// }

// export default App;
