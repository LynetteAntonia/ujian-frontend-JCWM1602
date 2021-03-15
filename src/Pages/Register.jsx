import React from 'react';
import EmailValid from './../Functions/EmailValid'
import Axios from 'axios'
import LinkAPI from './../Constants/LinkAPI'


export default class Register extends React.Component{

    state = {

        error: null,
        passwordMatch: false,
        password: null,
        email: null

    }

    registerForm = () => {

        let inputUser = this.refs.inputEmail.value

        if(inputUser){
            
            let emailValidResult = EmailValid(inputUser)

            if(emailValidResult !== true){
                this.setState({error: "Email tidak sesuai!"})
            }else{
                this.setState({error: null, email: inputUser})
            }
        }else{
            this.setState({error: "Harap isi semua data!"})
        }
    }

    passwordValidation = () => {
        
        let inputPassword = this.refs.inputPassword.value
        let inputConfirmPassword = this.refs.inputConfirmPassword.value
    

        if(inputPassword === inputConfirmPassword){
            this.setState({passwordMatch: true, error: null, password: inputPassword})

        }else{
            this.setState({error: "Password tidak cocok!"})
        }
        if(inputPassword.length < 6 && inputConfirmPassword.length < 6){
            this.setState({error: "Password minimal 6 karakter!"})
        }
        if(inputPassword.length < 1){
            this.setState({error:"Isi semua kolom!"})
        }
        
    }
    
    cekEmail = () => {
        
        let inputEmail = this.refs.inputEmail.value
        let inputPassword = this.refs.inputPassword.value

        Axios.get(LinkAPI + `?email=${inputEmail}`)
        .then((res)=>{
            if(res.data.length === 1){
                alert("Email sudah terdaftar!")
            }else{
                alert("Register Sukses")
                Axios.post(LinkAPI, {email: this.state.email, password: inputPassword})
                window.location = "/login"
            }
        })
        .catch((err)=>{
            console.log(err)
        })

    }

    render(){
        return(
            <div className='container d-flex justify-content-center'>
            <div className='row d-flex justify-content-center align-items-center ' style={{height: '80vh', width: '40vw'}}>
                <div className="col-10 px-5 pt-5 pb-5 border border-success">
                    <h1>
                        <center>Register</center>
                    </h1>
                    <br/>
                    <input type='text' ref='inputEmail' placeholder='Enter your email' className='form form-control' onChange={this.registerForm} />
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
                    <input type='button' value='Register Account' className='btn border border-dark w-100 mt-3' onClick={this.cekEmail} /> 
                </div>
            </div>
</div>
        )
    }
}