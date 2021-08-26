import React, {Component, useState} from 'react';
import Swal from "sweetalert2";
import $ from 'jquery'

class Welcome extends Component {
    state ={
        items: []
    }
    componentDidMount() {
        fetch('/api/welcome/items', {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            credentials: 'same-origin',


        }).then(async (d) => {
            d = await d.json();


            this.setState({
                items: d.items,
            })


        })
    }

    render() {

        return (
            <div style={{
                background: 'linear-gradient(to right, #8360c3, #2ebf91)'
            }
            }>
                <div class="container py-5">

                    <div class="row text-center text-white mb-5">
                        <div class="col-lg-7 mx-auto">
                            <h1 class="display-4">Awesome product</h1>
                            <p class="lead mb-0">Here, you can find all Awesome product you want</p>
                            <p class="lead">if you dont sign up click <a href="/auth/register" class="text-white">
                                <u>here</u></a>
                            </p>
                        </div>
                    </div>

                    <div class="row" onClick={() => {
                        console.log('clicked1 ')
                        Swal.fire({
                            icon: 'info',
                            title: "Don't have account yet? do one now ",
                            showDenyButton: true,
                            showCancelButton: true,
                            confirmButtonText: `Log In`,
                            denyButtonText: `Sign Up Now!`,
                        }).then((result) => {
                            /* Read more about isConfirmed, isDenied below */
                            if (result.isConfirmed) {
                                window.location.assign('/auth/Login');

                            } else if (result.isDenied) {
                                window.location.assign('/auth/register');
                            }
                        })
                    }
                    }>

                        <div class="col-lg-8 mx-auto">

                            <ul class="list-group shadow">

                                {this.state.items.map((d, i) => {
                                    return    <li class="list-group-item">
                                    <div class="media align-items-lg-center flex-column flex-lg-row p-3">
                                        <div class="media-body order-2 order-lg-1">
                                            <h5 class="mt-0 font-weight-bold mb-2">Awesome product</h5>
                                            <p class="font-italic text-muted mb-0 small">{d.desc}.</p>
											<p class="font-italic text-muted mb-0 small">price {d.price}$</p>
                                            <div class="d-flex align-items-center justify-content-between mt-1">
                                                <h6 class="font-weight-bold my-2">${d.price}</h6>
                                                <ul class="list-inline small">
                                                    <li class="list-inline-item m-0"><i
                                                        class="fa fa-star text-success"></i></li>
                                                    <li class="list-inline-item m-0"><i
                                                        class="fa fa-star text-success"></i></li>
                                                    <li class="list-inline-item m-0"><i
                                                        class="fa fa-star text-success"></i></li>
                                                    <li class="list-inline-item m-0"><i
                                                        class="fa fa-star text-success"></i></li>
                                                    <li class="list-inline-item m-0"><i
                                                        class="fa fa-star-o text-gray"></i></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div
                                            class="ml-lg-5 order-1 order-lg-2 d-flex justify-content-center align-items-center   "
                                            style={{}}>
                                            <img
                                                src={d.img}
                                                alt="Generic placeholder image " className={'img_effect'} width="200"
                                                onMouseEnter={(e) => {
                                                    $(e.target).next().show()
                                                }}
                                                onMouseLeave={(e) => {
                                                    $(e.target).next().hide()
                                                }}
                                            />
                                            <h3 onMouseEnter={(e) => {
                                                $(e.target).show()
                                                $(e.target).prev().css('filter', 'blur(3px)')
                                            }} onMouseLeave={(e) => {
                                                $(e.target).hide()
                                                $(e.target).prev().css('filter', 'none')

                                            }} style={{
                                                color: '#00000090',
                                                fontWeight: 'bold',
                                                display: ' none',
                                                position: 'absolute',
                                                marginTop: 20,
                                                fontSize: 32,
                                                textShadow: '0 0 10px white'
                                            }}>Order Now!</h3>
                                        </div>


                                    </div>
                                </li>

                                })}

                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default Welcome;
