import React from 'react';
import { Link } from 'react-router-dom'
import Axios from 'axios'

export default class Cart extends React.Component{

    state={
        dataCarts: null,
        dataProducts: null,
        totalItem: 0,
        totalPrice: 0,
        stock: null,
        stockTersedia: 0,
        stockMelebihi: false
    }

    componentDidMount(){
        this.getDataCarts()
    }
    

    getDataCarts = () => {

        let id = localStorage.getItem('id')

        Axios.get(`http://localhost:5000/cart?idUser=${id}`)
        .then((res)=>{
            let URLtoGetDataProduct = ""

            res.data.forEach((value, index)=> {
                URLtoGetDataProduct += `id=${value.idProduct}&`
            })
            res.data.sort((a,b)=>{
                return a.idProduct - b.idProduct
            })
            this.setState({dataCarts: res.data})
            
            Axios.get(`http://localhost:5000/products?${URLtoGetDataProduct}`) 
            .then((res) => {
                this.setState({dataProducts: res.data}) 
                console.log(this.state.dataProducts)  
                this.getOrderSummary()
            })
            .catch((err) => {       
                console.log(err)
            })
        })
    }

    getOrderSummary = () => {
        let totalItem = 0
        let totalPrice = 0

        this.state.dataCarts.forEach((value, index) => {
            totalItem += value.quantity
            totalPrice += this.state.dataProducts[index].price * value.quantity
        })
        console.log(totalPrice, totalPrice)
        this.setState({totalItem: totalItem, totalPrice: totalPrice})
        
    }
    
    toCheckout = () => {

        let idUser = localStorage.getItem('id')

        let totalPrice = this.state.totalPrice

        let detailItems = this.state.dataCarts.map((value, index)=>{
            return{
                name: this.state.dataCarts[index].name,
                price: this.state.dataCarts[index].price,
                description: this.state.dataCarts[index].description,
                quantity: value.quantity,
                img: this.state.dataCarts[index].img
            }
        })

        const dataToSend = {

            idUser: idUser,
            status: "belum dibayar",
            total: totalPrice,
            detail: detailItems
        }

        Axios.post("http://localhost:5000/transaction", dataToSend)
        .then((res)=>{

            let idTransaction = res.data.id

            this.state.dataCarts.forEach((value,index)=>{
                let stockLama = this.state.dataProducts[index].stock
                let stockBaru = stockLama - value.quantity

                Axios.patch(`http://localhost:5000/products/${value.idProduct}`, {stock: stockBaru})
                .then((res)=>{
                    Axios.delete(`http://localhost:5000/cart/${value.id}`)
                    .then((res)=>{
                        window.location = `/checkout/` + idTransaction
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                })
                .catch((err) => {
                    console.log(err)
            })
        })
    })
}


    render(){
        if(this.state.dataCarts === null || this.state.dataProducts === null){
            return(
                null
            )
        }

        return(
            
            <div className = 'bg-light'>
            <div className ='container'>
                <div className = 'row d-flex' style={{marginTop:"10%"}}>

                    {/* row kiri */}
                    <div className='col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8'>
                        <div className='p-2 bg-white my-5'>
                            <div className='col-12 mt-3'>
                                <h3>
                                    Shopping Cart
                                </h3>
                                <hr/>
                            </div>
                            {
                                this.state.dataCarts.map((value, index) => {
                                    return(
                                        <div className='row my-5'>
                                            <div className ='col-4 '>
                                                <img src={this.state.dataProducts[index].img} className='ml-3' style={{height:'100%', width:'100%'}} />
                                            </div>
                                            <div className ='col-8'>
                                                <div className='ml-3'>
                                                    <h4>{this.state.dataProducts[index].name}</h4>
                                                    <h5>Rp.{this.state.dataProducts[index].price.toLocaleString()}</h5>
                                                </div>
                                                <div>
                                                <p>Masukkan Jumlah:</p>
                                                <input ref="inputStock" type="number" min="1" max={this.state.dataProducts[index].stock} defaultValue="1" onChange={this.checkStock}></input>
                                                </div>
                                                <div className='mt-3'>
                                                    <button className='btn btn-danger px-1' onClick={() => this.deleteProduct(value.id)}>
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>

                    {/* row kanan */}
                    <div className='col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 ' style={{height: '400px'}}>
                        <div className='p-4 mt-0 mt-md-5 bg-white' style={{borderRadius: '3px'}}>
                            <div className='col-12 mt-3'>
                                <h5>
                                    Order Summary
                                </h5>
                                <hr/>
                                <div className ='d-flex justify-content-between my-2'>
                                    <div>
                                        Total Items :
                                    </div>
                                    <div>
                                        {this.state.totalItem} Item
                                    </div>
                                </div>
                                <hr/>
                            </div>
                            <div className='col-12 mb-3'>
                                <div className='d-flex justify-content-between'>
                                    <div>
                                        <h5>
                                            Total : 
                                        </h5>
                                    </div>
                                    <div>
                                        <h5 className='font-weight-bold'>
                                            Rp.{this.state.totalPrice.toLocaleString()}
                                        </h5>
                                    </div>
                                </div> 
                            </div> 
                        </div>
                        <div className='mt-4'>
                            <div>
                        <Link to="/checkout"><input type='button' value='Checkout' className ='w-100 btn btn-primary font-weight-bold' onClick={this.toCheckout} /> </Link>
                        
                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}