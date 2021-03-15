import React from 'react';
import LinkAPI from './../Constants/LinkAPI'
import Axios from 'axios'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default class Login extends React.Component{

    state={

        error: null,
    }

    login = () => {

        let inputUser = this.refs.inputUser.value
        let inputPassword = this.refs.inputPassword.value

        Axios.get(LinkAPI + `?email=${inputUser}&password=${inputPassword}`)
        .then((res) => {

            if(res.data.length === 1){
                alert("Login Berhasil")

                localStorage.setItem('id', res.data[0].id)
                window.location = '/'

            }else if(res.data.length !== 1){
                console.log(res)
                alert("Akun belum terdaftar!")
            }
        })
        .catch((err) => {
            console.log(err)
        })
}

    render(){
        return(
            <div className='container d-flex justify-content-center'>
            <div className='row d-flex justify-content-center align-items-center ' style={{height: '80vh', width: '40vw'}}>
                <div className="col-10 px-5 pt-5 pb-5 border border-success">
                    <h1>
                        <center>Login</center>
                    </h1>
                    <br/>
                    <input type='text' ref='inputUser' placeholder='Enter your email' className='form form-control' onChange={this.registerForm} />
                    <input type="text" ref='inputPassword' placeholder='Masukan password' className='form form-control' onChange={this.passwordValidation}  /> 
                    <input type="text" ref='inputConfirmPassword' placeholder='Masukan password kembali' className='form form-control' onChange={this.passwordValidation}  /> 
                    
                    <p className='text-danger'>
                        {
                            this.state.error?
                                this.state.error
                            :
                                null
                        }
                    </p>
                    <input type='button' value='Register Account' className='btn border border-dark w-100 mt-3' onClick={this.login} /> 
                </div>
            </div>
    </div>
        )
    }
}