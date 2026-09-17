import { Navigate } from 'react-router';
import {useAuth} from  '../contexts/AuthContext';

// Props:
// logado → boolean vindo do App.jsx via prop
// children → o componente filho a ser protegido
// (ex: <Dashboard /> passado entre as tags)

function RotaPrivada({children }) {
const {token} = useAuth () ; 
    // Usuário não logado → redireciona para /login
    // replace={true}: substitui o histórico para que
    // o botão Voltar não retorne para o Dashboard

    if (!token) {

        return <Navigate to='/login' replace={true} />;

    }

    // Usuário logado → renderiza o componente filho

    return children; 

}

export default RotaPrivada;