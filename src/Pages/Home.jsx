import React from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'

export default class Home extends React.Component{

    state = {
        dataProducts: null,
        userLogin: null
    }

    componentDidMount(){
        this.getDataProducts()
    }

    getDataProducts = () => {
        Axios.get("http://localhost:5000/products")
        .then((res)=>{
            this.setState({dataProducts: res.data})
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    onCheckUserLogin = () => {
        let id = localStorage.getItem('id')

        if(id){
            this.setState({userLogin: true})
        }else{
            this.setState({userLogin: false})
        }
    }



    render(){
        return(
            <div className="container" style={{height: '100%'}}>
                    <div className="row">
                        {
                            this.state.dataProducts? //apakah dia true? kalo true...
                                this.state.dataProducts.map((value, index) => { // mapping dan {value.(nama)} masukkan ke layouting
                                    return(
                                        <>
                                            <div className="mt-5 col-3 px-3 py-3 bumiabdi-font-size-20 bumiabdi-fontfam-primary shadow p-3 mb-3 bg-white rounded" key={index}>
                                                <div>
                                                <Link to={`/detail/${value.id}`} ><img src={value.img} width='100%' height='200%' /></Link>
                                                </div>
                                                <div>
                                                    <br/>
                                                    <h5>
                                                        <center>{value.name}</center>
                                                    </h5>
                                                </div>
                                                <div>
                                                    <h5 className="bumiabdi-font-size-16 bumiabdi-fontfam-secondary text-weight-bold">
                                                    <center>Rp.
                                                        {value.price.toLocaleString()}       
                                                    </center>
                                                    </h5>
                                                </div>
                                            </div>
                                        </>
                                    )
                                })
                            : //kalau data products tidak true maka null
                                null
                        }
                    </div>
                </div>
        )
    }
}