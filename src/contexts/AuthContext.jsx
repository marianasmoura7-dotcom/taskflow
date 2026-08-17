import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
const [logado, setLogado] = useState(false);

function login() { setLogado(true); }

function logout() { setLogado(false); }

return (

<AuthContext.Provider value={{ logado, login, logout }}>
{children}
</AuthContext.Provider>
);
}
 
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {

const context = useContext(AuthContext);
if (!context) {
throw new Error('useAuth deve ser usado dentro do AuthProvider');
}


return context; // { logado, login, logout }

}