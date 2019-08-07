import React from 'react';
import './styles.css';

import logo from '../../assets/logo.svg';
import like from '../../assets/like.svg';
import dislike from '../../assets/dislike.svg';

export default ({ match }) => {

    const { id } = match.params;

    return (
        <div className="main-container">
            
            <img src={logo} alt="Tindev" />
            
            <div className="row pt-4 px-4 mx-0">
                <div className="col-12 col-md-4">                    
                    <img src="https://avatars2.githubusercontent.com/u/2254731?v=4" alt="" />
                    <footer>
                        <strong>Diego Fernandes</strong>
                        <p>CTO na @Rocketseat. Apaixonado por Javascript, ReactJS, React Native, ...</p>
                    </footer>   
                    <div className="buttons">
                        <button type="button">
                            <img src={dislike} alt="Dislike" />
                        </button>
                        <button type="button">
                            <img src={like} alt="Like" />
                        </button>
                    </div>
                </div>
                <div className="col-12 col-md-4">                    
                    <img src="https://avatars2.githubusercontent.com/u/2254731?v=4" alt="" />
                    <footer>
                        <strong>Diego Fernandes</strong>
                        <p>CTO na @Rocketseat. Apaixonado por Javascript, ReactJS, React Native, ...</p>
                    </footer>   
                    <div className="buttons">
                        <button type="button">
                            <img src={dislike} alt="Dislike" />
                        </button>
                        <button type="button">
                            <img src={like} alt="Like" />
                        </button>
                    </div>
                </div>
                <div className="col-12 col-md-4">                    
                    <img src="https://avatars2.githubusercontent.com/u/2254731?v=4" alt="" />
                    <footer>
                        <strong>Diego Fernandes</strong>
                        <p>CTO na @Rocketseat. Apaixonado por Javascript, ReactJS, React Native, ...</p>
                    </footer>   
                    <div className="buttons">
                        <button type="button">
                            <img src={dislike} alt="Dislike" />
                        </button>
                        <button type="button">
                            <img src={like} alt="Like" />
                        </button>
                    </div>
                </div>
                <div className="col-12 col-md-4">                    
                    <img src="https://avatars2.githubusercontent.com/u/2254731?v=4" alt="" />
                    <footer>
                        <strong>Diego Fernandes</strong>
                        <p>CTO na @Rocketseat. Apaixonado por Javascript, ReactJS, React Native, ...</p>
                    </footer>   
                    <div className="buttons">
                        <button type="button">
                            <img src={dislike} alt="Dislike" />
                        </button>
                        <button type="button">
                            <img src={like} alt="Like" />
                        </button>
                    </div>
                </div>
            </div>
            
        </div>
    );
}
