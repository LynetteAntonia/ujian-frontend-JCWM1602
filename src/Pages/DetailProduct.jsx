import React from 'react';
import Axios from 'axios'

export default class DetailProduct extends React.Component{

    
    state ={
        dataDetailProduct: null,
        userLogin : null,
        melebihiStock: false
    }

    componentDidMount(){
    
        let idProduct = this.props.location.pathname.split('/')[2]

        Axios.get(`http://localhost:5000/products/${idProduct}`)
        .then((res)=>{
            this.setState({dataDetailProduct: res.data})
        })
        .catch((err)=>{
            console.log(err)
        })

        this.checkUserLogin()
    }


    checkUserLogin = () => {
        let id = localStorage.getItem("id")

        if(id){
            this.setState({userLogin: true})
        }else{
            this.setState({userLogin: false})
        }
    }

    checkStock = () => {
        let stock=this.refs.inputStock.value

        if(stock > this.state.dataDetailProduct.stock){
            this.setState({melebihiStock: true})
        }else{
            this.setState({melebihiStock: false})
        }
    }
   

    addToCart = () => {
        let idProduct = this.props.location.pathname.split('/')[2] 
        let idUser = localStorage.getItem('id') 

        let dataToSend = {
            idProduct: idProduct,
            idUser: idUser,
            quantity: 1
        }
        Axios.get(`http://localhost:5000/cart?idProduct=${idProduct}`)
        .then((res)=>{
            if(res.data.length === 0){
                Axios.post(`http://localhost:5000/cart`, dataToSend)
                .then((res)=>{
                    console.log(res)

                    let urlAddress = this.props.location.pathname
                    window.location = urlAddress
                })
                .catch((err)=>{
                    console.log(err)
                })
            }else{
                let currentQty = res.data[0].quantity
                let idCart = res.data[0].id
              
    
                Axios.patch(`http://localhost:5000/cart/${idCart}`, {quantity: currentQty + 1} ) //bug
                .then((res)=>{
                    console.log(res)

                    let urlAddress = this.props.location.pathname
                    window.location = urlAddress
                })
        .catch((err)=>{
            console.log(err)
        })

    }

})
.catch((err) => {
    console.log(err)
})

}
       
    render(){
        if(this.state.dataDetailProduct === null){
            return(
                <div>
                    Loading
                </div>
            )
        }
        return(
            <div className="row">
            <div className="col-12 col-md-6">
                {/* Gambar Produk (Kolom Kiri) */}
                <div className="row justify-content-center">
                    <div className='col-12'>
                        <img src={this.state.dataDetailProduct.img} style={{height:"60vh", width:"40vw", marginTop:"30px", marginLeft:"0px", marginLeft:"10px"}} alt=""/>
                    </div>
                </div>
            </div>

            {/* Detail Produk (Kolom Kanan) */}
            <div className="col-12 col-md-6">
                <div className='mt-5 mt-md-0'>
                    <h1>
                        {this.state.dataDetailProduct.name}
                    </h1>
                    <p>
                        Sold : 0 Products
                    </p>
                
                    <h3>
                        Rp.{this.state.dataDetailProduct.price.toLocaleString()}
                    </h3>
                    <hr/>
                </div>
                <div className='mt-4'>
                    <p className='font-weight-bold' style={{lineHeight: '0px'}}>
                        Stock
                    </p>
                    <p>
                        {this.state.dataDetailProduct.stock} Item
                    </p>
                    <hr/>
                </div>

                <div>
                    <p>Masukkan Jumlah:</p>
                    <input ref="inputStock" type="number" min="1" defaultValue="1" onChange={this.checkStock}></input>
                    <div>
                        {
                            this.state.melebihiStock?
                            <p className="text-danger">Melebihi stock!</p>
                            :
                            null
                        }
                    </div>
                </div>
                <br/>
                <div>
                    <p className='font-weight-bold' style={{lineHeight: '0px'}}>
                        Description
                    </p>
                    <p style={{textAlign: 'justify'}}>
                       {this.state.dataDetailProduct.description}
                    </p>
                </div>
                
               
                <div className='mt-5'>
                    {
                        this.state.userLogin?
                            <button type="button" class="w-100 btn btn-warning" onClick={this.addToCart}>Add To Cart</button>
                        :
                        
                        <div class="alert alert-warning" role="alert">
                        Login Terlebih Dahulu Untuk Mendapatkan Product Kedalam Cart!
                        </div>
                    }
                </div>


            </div>
        </div>
        )
    }
}