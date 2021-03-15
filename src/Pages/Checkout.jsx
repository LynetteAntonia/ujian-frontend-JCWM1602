import React from 'react'
import Axios from 'axios'

export default class Checkout extends React.Component{


    state = {

        dataTransaction: null
    }

    componentDidMount(){
        this.getDataTransaction()
    }

    getDataTransaction = () => {
        let idUSerLocaleStorage = localStorage.getItem('id')
        let idTransaction = this.props.location.pathname.split('/')[2]

        Axios.get(`http://localhost:5000/transaction/${idTransaction}`)
        .then((res)=>{
            if(res.data.idUser === idUSerLocaleStorage){
                this.setState({dataTransaction: res.data})
            }else{
                window.history.back();
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }


    render(){
        return(
            <div className="container-fluid my-5 px-5">
                <div className="row justify-content-center">
                    {/* Shipping Address */}
                    <div className="col-12 col-md-6 py-3">
                        <div className="px-3 pt-3 pb-1">
                            <h4>Shipping Address</h4>
                        </div>
                        <div className="px-4 py-1 border myfsid-bg-light-grey">
                            <p className="mt-3 mb-0 font-weight-bold">
                                Lynette Antonia (081234567890)
                            </p>
                            <p className="mt-0 mb-0">
                                Jalan Merdeka IX no. 10 Renon Denpasar
                            </p>
                            <p className="mt-3 mb-0 font-weight-bold myfsid-secondary">
                                Notes :
                            </p>
                            <p>
                                -
                            </p>
                        </div>
                        
                        <div className="pt-3 pb-3">
                            <input type="button" value="Change Shipping Address" className="btn btn-outline-primary rounded-0 w-100 py-2"/>
                        </div>
                    </div>

                    <div className="col-12 col-md-6 py-3">
                            <div className="px-3 pt-3 pb-1">
                                <h4>My Orders</h4>
                                    <div className="col-8 py-2 border border-right-0 font-weight-bold myfsid-bg-light-grey">
                                        Items
                                    </div>
                                    <div className="col-4 py-2 border font-weight-bold myfsid-bg-light-grey">
                                        Sub-Total
                                    </div>
                                    {/* {
                                        this.state.dataTransaction.detail.map((value,index) => {
                                            return(
                                                <div key={index} className="col-12 row mx-0 px-0">
                                                    <div className="col-8 py-2 border border-top-0 border-right-0">
                                                        <span>{value.productName}<span className="font-weight-bold"> ( x{value.productQuantity} )</span></span>
                                                    </div>
                                                    <div className="col-4 ml-0 py-2 border border-top-0">
                                                        {
                                                            value.productDiscount?
                                                                <span>Rp.{(value.productPrice - (value.productPrice * (value.productDiscount / 100))).toLocaleString('id-ID')} <span className="myfsid-font-size-14"><del>{value.productPrice.toLocaleString('id-ID')}</del></span></span>
                                                            :
                                                                <span>Rp.{value.productPrice.toLocaleString('id-ID')}</span>
                                                        } */}
                                                    {/* </div>
                                                </div>
                                            )
                                        })
                                    } */}
                                 
                                    <div className="col-4 py-2 border border-top-0">
                                        {/* Rp.{(this.state.dataTransaction.total).toLocaleString('id-ID')} */}
                                    </div>
                                    <div className="col-8 py-2 border border-top-0 border-right-0">
                                        <span className="font-weight-bold">Shipping Rates</span>
                                    </div>
                                    <div className="col-4 py-2 border border-top-0">
                                        Rp.20.000
                                    </div>
                                    <div className="col-8 py-2 border border-top-0 border-right-0">
                                        <span className="myfsid-secondary font-weight-bold">Total</span>
                                    </div>
                                    {/* <div className="col-4 py-2 border border-top-0">
                                        Rp.{(this.state.dataTransaction.total).toLocaleString('id-ID')}
                                    </div> */}
                                </div>
                            </div>
                    </div>
            </div>
        )
    }
}