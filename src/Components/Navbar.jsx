import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faShoppingCart, faHeart, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Axios from 'axios'
import LinkAPI from './../Constants/LinkAPI'




export default class Navbar extends React.Component{
    
    state = {

        currentTotalCarts: null,
        username: null
    }

    componentDidMount(){
        this.getUsername()
        this.getCurrentTotalCarts()
    }

    getUsername = () => {
        let id = localStorage.getItem('id')

        if(id){
            Axios.get(LinkAPI + `/${id}`)
            .then((res)=>{
                this.setState({username: res.data.email})
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    }

    getCurrentTotalCarts = () => {
        let id = localStorage.getItem('id')
        if(id==!0){
            Axios.get(`http://localhost:5000/cart?idUser=${id}`)
            .then((res) => {
                this.setState({currentTotalCarts: res.data.length})
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }

    onLogout = () => {
        let confirm = window.confirm("logout?")

        if(confirm){
            localStorage.removeItem("id")
            window.location='/home'
        }
    }

    render(){
        return(
            <div className="container.fluid bg-info" style={{height: "50px"}}>
               <div className='py-2'>
                <div className='container'>
                    <div className='row align-items-center'>
                        <div className='col-md-2 col-6'>
                        <Link to='/home' style={{textDecoration: "none"}} className="text-light"><span>HOME</span></Link>
                        </div>
                        <div className='col-6 d-none d-md-flex col-md-7'>
                        <Link to="/register" style={{textDecoration:"none"}} className="text-light"><span className="mx-2">Register</span></Link>
                        <Link to="/login" style={{textDecoration:"none"}} className="text-light"><span className="mx-2">Login</span></Link>
                        </div>

                            
                            <div className='col-6 col-md-3 d-flex align-items-center justify-content-center'>
                          
                            <span style={{fontSize: "15px"}}>
                                        {
                                            this.state.username?
                                                `${this.state.username}`
                                            :
                                                null
                                        }
                                    </span>
                                    <span className='ml-1 mr-3 font-weight-bold' onClick={this.onLogout}>
                                        {
                                            this.state.username?
                                                <FontAwesomeIcon icon={faSignOutAlt} color="white" size="lg" className="mx-2"/>
                                            :
                                                null
                                        }
                                    </span>


                                <span>
                                    <FontAwesomeIcon icon={faHeart} color="white" size="lg" className="mx-2"/>
                                </span>
                                <span className='d-none d-md-block bumiabdi-cursor'>
                                <Link to="/login"><FontAwesomeIcon icon={faUser} color="white" size="lg" className="mx-2"/></Link>
                                </span>
    
                                    <Link to="/cart"><span>
                                        <FontAwesomeIcon icon={faShoppingCart} color="white" size="lg" className="mx-2"/>
                                    </span></Link>
                                    <div className="border border-light" style={{width:"10%" , height:"30%" , borderRadius:"50%", textAlign:"center"}}> 
                                            {
                                              
                                                    this.state.currentTotalCarts
                                            }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
           </div>
        )
    }
}

