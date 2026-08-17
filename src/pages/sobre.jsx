import style from './sobre.module.css';
function Sobre() {
    return (
        <div className={style.sobreContainer}>
            <h1>Sobre o TaskFlow</h1>
            <p>
                O TaskFlow é uma aplicação web desenvolvida com React, que permite aos usuários gerenciar suas tarefas de forma eficiente e organizada.
                Com uma interface intuitiva e recursos avançados, o TaskFlow ajuda a aumentar a produtividade e a manter o foco nas atividades importantes.
            </p>
            <h2>Tecnologias Utilizadas</h2>
                <dl >
                    <dt className={style.dt}>React</dt>
                    <dd>O React (ou React.js) é uma biblioteca JavaScript de código aberto focada em criar interfaces de usuário (UI) interativas para páginas web e aplicativos.</dd>
                    <dt className={style.dt}>CSS</dt>
                    <dd>O CSS (Cascading Style Sheets ou Folha de Estilo em Cascata) é a linguagem usada para estilizar e definir a aparência visual de páginas web criadas com HTML</dd>
                    <dt className={style.dt}>HTML</dt>
                    <dd>O HTML (Linguagem de Marcação de Hipertexto) é a linguagem de marcação padrão para criação de páginas web.</dd>
                    <dt className={style.dt}>Vite</dt>
                    <dd>O Vite é uma ferramenta de build moderna que oferece um ambiente de desenvolvimento rápido e eficiente para aplicações web.</dd>
                </dl>
              <footer>
                <p>TaskFlow &copy; 2026 &mdash; Mariana Moura &mdash; SENAI CTGAS-ER</p>
            </footer>
        </div>
    );
}

export default Sobre;