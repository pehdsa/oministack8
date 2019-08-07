import React, { useState } from 'react';
import './styles.css'

import api from '../../services/api';

import logo from '../../assets/logo.svg';

export default props => {

    // CRIANDO O ESTADO "USERNAME" COM HOOKS
    const [username, setUsername] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        
        const response = await api.post('/devs', {
            username
        });     
        
        const { _id } = response.data;

        props.history.push(`/dev/${_id}`);
    }

    return (
        <main className="login-container d-flex justify-content-center align-items-center">
            <div>
                <img src={logo} alt="Tindev" />                
                <form onSubmit={handleSubmit} className="d-flex flex-column pt-3">
                    <input type="text" placeholder="Digite seu usuário no Github" value={username} onChange={e => setUsername(e.target.value)} />
                    <button type="submit" className="mt-2">Enviar</button>
                </form>                
            </div>
        </main>
    );
}
