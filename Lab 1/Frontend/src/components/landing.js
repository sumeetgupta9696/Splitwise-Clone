import React from 'react';
import '../styles/landing.css'
import  Header  from './Header';
export const Landing = ()=>{
    return (
        <div className = "landing ">
           <Header/>
            <main >
                <div className = "landing-heading">
                    <img align="middle" className = "landing-logo" src={require('../images/logo.png')} alt=""/>
                    <h1 className = "landing-header">Splitwise landing page</h1>
                    <br/>
                    <a href="http://localhost:3000/signup">   <button className = "landing-button">  Go to SignUp</button></a>   
                </div>
            </main>
        </div>
    )
}