import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import api from '../../services/api';

import logo from '../../assets/logo.svg';
import like from '../../assets/like.svg';
import dislike from '../../assets/dislike.svg';

export default ({ match }) => {

    const [ users, setUsers ] = useState([]);

    useEffect(() => {

        async function loadUsers() {
            const response = await api.get('/devs',{
                headers: {
                    user: match.params.id
                }
            });
            setUsers(response.data);
        }
        loadUsers();

    }, [match.params.id])

    
    async function pushLike(id) {

        const userId = match.params.id;

        const response = await api.post(`/devs/${id}/likes`, null, {
            headers: {
                user: userId
            }
        });
        if (response.data.likes.includes(userId)) {
            console.log('DEU MATCH');
        }
        
        setUsers(users.filter(user => user._id !== id ));
        
    }

    
    async function pushDislike(id) {

        const userId = match.params.id;        
        
        await api.post(`/devs/${id}/dislikes`, null ,{
            headers: {
                user: userId
            }
        });

        setUsers(users.filter(user => user._id !== id ));
        
    }

    return (
        <div className="main-container">
            
            <Link to='/'>
                <img src={logo} alt="Tindev" />
            </Link>
            
            <div className="row pt-4 px-4 mx-0">
                
                { users.length > 0 ? users.map(user => {

                    return (
                        <div key={user._id} className="d-flex flex-column col-12 col-md-4 py-3">                    
                            <img src={user.avatar} alt="" />
                            <footer className="flex-grow-1 bg-white p-3">
                                <strong>{user.name}</strong>
                                <p className="m-0 mt-1">{ user.bio ? user.bio : '...' }</p>
                            </footer>   
                            <div className="d-flex buttons mt-1">
                                <button onClick={e => pushDislike(user._id)} type="button" className="flex-fill mr-1">
                                    <img src={dislike} alt="Dislike" />
                                </button>
                                <button onClick={e => pushLike(user._id)} type="button" className="flex-fill ml-1">
                                    <img src={like} alt="Like" />
                                </button>
                            </div>
                        </div>
                    );

                }) : <div className="col-12 text-center py-5">Nenhum usuário</div> }

                
                
            </div>
            
        </div>
    );
}
