/*!

=========================================================
* Black Dashboard React v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, {useEffect, useState} from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import {Line, Bar} from "react-chartjs-2";
import $ from 'jquery';

// reactstrap components
import {
    Button,
    ButtonGroup,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    Label,
    FormGroup,
    Input,
    Table,
    Row,
    Col,
    UncontrolledTooltip, Modal, ModalHeader,
} from "reactstrap";
import Swal from 'sweetalert2'

function Cart(props) {
    const [items, setItems] = useState([]);

    useEffect(() => {
        let _items = localStorage.getItem('cart');
        if (_items) {
            _items = JSON.parse(_items);
            if (_items == null) _items = []
            setItems(_items);
        }
        getItems();

    }, [])

    const getItems = (filter) => {
        fetch('/api/role?' + (filter ? "filter=" + filter : ''), {

            credentials: 'same-origin'
        }).then(async (d) => {
            d = (await d.json())
            let role = d.role;
            if (role && (role === "admin" || role === "user")) {


            } else {

                return window.location.assign('/auth/Login');
            }
        })

    }


    return (
        <>
            <div className="content">
                <Row>
                    <Col lg="12" md="12">
                        <Card>
                            <CardHeader>
                                <CardTitle tag="h4">Simple Table</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <Table className="tablesorter" responsive>
                                    <thead className="text-primary">
                                    <tr>
                                        <th>img</th>
                                        <th>product number</th>
                                        <th>quantity</th>
                                        <th>expire date</th>
                                        <th>price</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {items.map((d) => <tr>
                                           <td><img src={d.img} style={{
                                            width: 50,
                                            height: 50,
                                        }} alt=""/></td>
                                        <td>{d.product_number}</td>
                                        <td>{d.need}</td>
                                        <td>{d.expire_date}</td>
                                        <td>{d.discount !== "0" ? (() => {
                                            let ds = +d.discount / 100;

                                            return d.price * (1 - ds);
                                        })() : d.price}</td>
                                        {d.discount !== "0" ?
                                            <td><span class="badge badge-danger">Discount {d.discount}%</span></td> :
                                            <td/>}
                                        <td>
                                            <button onClick={(e) => {
                                                let cart = localStorage.getItem('cart');

                                                if (cart) {
                                                    cart = JSON.parse(cart);
                                                } else {
                                                    cart = [];
                                                }
                                                d.need = 1;

                                                // check if exists before
                                                let found = false;
                                                for (let i in cart) {
                                                    if (cart[i].id === d.id) {
                                                        cart[i].need += 1;
                                                        found = true;
                                                        break
                                                    }
                                                }

                                                if (!found) {
                                                    cart.push(d);

                                                }
                                                setItems(cart)

                                                cart = JSON.stringify(cart);


                                                localStorage.setItem('cart', cart);

                                            }} type="button" class="btn btn-success">add one
                                            </button>

                                        </td>

                                        <td>
                                            <button onClick={(e) => {
                                                let cart = localStorage.getItem('cart');

                                                if (cart) {
                                                    cart = JSON.parse(cart);
                                                } else {
                                                    cart = [];
                                                }
                                                d.need = 1;

                                                // check if exists before
                                                let found = false;
                                                for (let i in cart) {
                                                    if (cart[i].id === d.id) {
                                                        cart[i].need -= 1;
                                                        if (cart[i].need === 0) {
                                                            cart.splice(i, 1);
                                                        }
                                                        found = true;
                                                        break
                                                    }
                                                }

                                                if (!found) {
                                                    cart.push(d);

                                                }
                                                setItems(cart)

                                                cart = JSON.stringify(cart);


                                                localStorage.setItem('cart', cart);

                                            }} type="button" class="btn btn-danger">less one
                                            </button>

                                        </td>
										 <td>
                                            <button onClick={(e) => {
                                                let cart = localStorage.getItem('cart');

                                                if (cart) {
                                                    cart = JSON.parse(cart);
                                                } else {
                                                    cart = [];
                                                }
                                                d.need = 1;

                                                // check if exists before
                                                let found = false;
                                                for (let i in cart) {
                                                    if (cart[i].id === d.id) {
														cart.splice(i, 1);
                                                        
                                                        break
                                                    }
                                                }

                                               
                                                setItems(cart)

                                                cart = JSON.stringify(cart);


                                                localStorage.setItem('cart', cart);

                                            }} type="button" class="btn btn-danger">remove
                                            </button>

                                        </td>
                                    </tr>)}
                                    <tr>
                                        <td></td>
                                        <td>total</td>
                                        <td>{(() => {
                                            let q = 0;
                                            for (let i in items) {
                                                q += items[i].need
                                            }

                                            return q;

                                        })()}
                                        </td>
                                        <td></td>
                                        <td>{(() => {
                                            let q = 0;
                                            for (let i in items) {
                                                let ds = +items[i].discount / 100;

                                                q += items[i].price * (1 - ds) * items[i].need;


                                            }

                                            return (Math.round(q * 100) / 100).toFixed(2);

                                        })()}</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>

                                    </tr>

                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                {items.length > 0 && <button onClick={(e) => {
                    document.querySelectorAll('table button').forEach((d) => {console.log(d.style.display = "none")})
                let h = document.querySelector('table').outerHTML;
                    document.querySelectorAll('table button').forEach((d) => {console.log(d.style.display = "inline-block")})
                    fetch('/api/cart/order', {
                        credentials: 'same-origin',
                        method: 'POST', headers: {
                            'Content-Type': 'application/json'
                            // 'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        body: JSON.stringify({
                            order: localStorage.getItem('cart'),
                            htmlMail: h,
                        })
                    }).then(async (d) => {
                        d = await d.json()

                        if (d.done === 1) {
                            Swal.fire(
                                'Good job!',
                                'You buy now!',
                                'success'
                            )

                        localStorage.setItem('cart', null);
                                                    setItems([])

                        } else {
                            Swal.fire({
  icon: 'error',
  title: 'Oops...',
  text: 'there a item out sale / or u buy a number of quantity greater then the available quantity!',
})

                        }


                    })

                }} type="button" class="btn btn-success">Order now!
                </button>}


            </div>
        </>
    );
}

export default Cart;
