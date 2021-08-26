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

// core components
import {
    chartExample1,
    chartExample2,
    chartExample3,
    chartExample4,
} from "variables/charts.js";

function Dashboard(props) {
    const [activeUploadTheData, setActiveUploadTheData] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const [items, setItems] = useState([[]]);
    const [page, setPage] = useState(0);

    const [progress, setProgress] = useState({
        display: false,
        width: '0%',
    })

    function chunk(ar, chunkSize) {
        var array = ar;
        return [].concat.apply([],
            array.map(function (elem, i) {
                return i % chunkSize ? [] : [array.slice(i, i + chunkSize)];
            })
        );
    }

    const getItems = (filter) => {
        fetch('/api/role?' + (filter ? "filter=" + filter : ''), {
            credentials: 'same-origin'
        }).then(async (d) => {
            d = (await d.json())
            let role = d.role;
            if (role && (role === "admin" || role === "user")) {
                setUserRole(role)


                if (d.items.length === 0) {
                    setItems([[]])

                } else {
                    setItems(chunk(d.items, (30)))

                }
                // console.log(chunk(d.items, 30));
                setPage(0);


                if (role === "admin") {
                    setActiveUploadTheData(true)

                }


            } else {

                return window.location.assign('/auth/Login');
            }
        })

    }


    useEffect(() => {
        getItems();


    }, [])
    const uploadFile = (event) => {

        const files = event.target.files
        const formData = new FormData()
        formData.append('myFile', files[0])
        $.ajax({
            // Your server script to process the upload
            url: '/api/save_as_excel',
            type: 'POST',

            // Form data
            data: formData,

            // Tell jQuery not to process data or worry about content-type
            // You *must* include these options!
            cache: false,
            contentType: false,
            processData: false,
            success: function (d) {

                setProgress({
                    display: false,
                    width: '0%',
                })
                // $('.progress-bar').parent().addClass('d-none');
                window.location.reload();
            },
            // Custom XMLHttpRequest
            xhr: function () {
                var myXhr = $.ajaxSettings.xhr();
                if (myXhr.upload) {
                    // For handling the progress of the upload
                    myXhr.upload.addEventListener('progress', function (e) {
                        if (e.lengthComputable) {
                            setProgress({
                                display: true,
                                width: e.loaded / e.total * 100 + "%"
                            })
                            // $('.progress-bar').parent().removeClass('d-none');
                            // // console.log(e.loaded, e.total, e.loaded / e.total * 100);
                            // $('.progress-bar').css("width", e.loaded / e.total * 100 + "%");

                        } else {


                        }
                    }, false);
                }
                return myXhr;
            }
        });


    }

    const edit = (d) => {

        localStorage.setItem('Edit_data', JSON.stringify(d));

        window.location.assign('/admin/item/edit');


    }

    const [modalSearch, setmodalSearch] = React.useState(false);
    const toggleModalSearch = () => {
        setmodalSearch(!modalSearch);
    };

    window.toggleModalSearch = toggleModalSearch;
    return (
        <>
            <Modal
                modalClassName="modal-search"
                isOpen={modalSearch}
                toggle={toggleModalSearch}
            >
                <ModalHeader>
                    <Input placeholder="SEARCH" type="text" onChange={(e) => {
                        getItems(e.target.value);
                    }}/>
                    <button
                        aria-label="Close"
                        className="close"
                        onClick={toggleModalSearch}
                    >
                        <i className="tim-icons icon-simple-remove"/>
                    </button>
                </ModalHeader>
            </Modal>
            <div className="content">
                <Row>
                    <Col>
                        <input onChange={uploadFile} type="file" className={'d-none'} id={'file'}/>
                        {activeUploadTheData ? <a href="#pablo" onClick={() => {
                            document.querySelector('#file').click();
                        }} className="btn btn-warning mb-4">Upload data</a> : <div/>}
                        {progress.display ? <div className="progress mb-4">
                            <div className="progress-bar   " role="progressbar" aria-valuenow="0"
                                 aria-valuemin="0"
                                 style={{
                                     width: progress.width
                                 }}
                                 aria-valuemax="100"/>
                        </div> : <div/>}
                    </Col>

                </Row>

                <Row>
                    <Col lg="12" md="12">

                        <Card>
                            <center class={'mt-3'}>
                                <button onClick={() => setPage(0)} type="button" class="btn btn-success">1
                                </button>

                                {items.length >= 2 ?
                                    <button onClick={() => setPage(1)} type="button" class="btn btn-success">2
                                    </button> : null}

                                {items.length >= 3 ?
                                    <button onClick={() => setPage(2)} type="button" class="btn btn-success">3
                                    </button> : null}
                            </center>
                            <CardHeader>
                                <CardTitle tag="h4">Simple Table</CardTitle>
                            </CardHeader>
                            <CardBody>


                                <Table className="tablesorter" responsive>
                                    <thead className="text-primary">
                                    <tr>
                                        <th>img</th>
                                        <th>product number</th>
                                        <th>Desc</th>
                                        <th>quantity</th>
                                        <th>expire date</th>
                                        <th>price</th>
                                        <th></th>
                                        <th></th>
                                        {userRole === "admin" ? <th></th> : null}
                                    </tr>
                                    </thead>
                                    <tbody>{(() => {
                                        console.log(items[page], items, page)
                                    })()}
                                    {(items[page]).map((d) => <tr>
                                        <td><img src={d.img} style={{
                                            width: 50,
                                            height: 50,
                                        }} alt=""/></td>
                                        <td>{d.product_number}</td>
                                        <td>{d.desc}</td>
                                        <td>{d.quantity}</td>
                                        <td>{d.expire_date ? d.expire_date.split('T')[0] : null}</td>
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
                                                    if (cart == null) cart = [];
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

                                                cart = JSON.stringify(cart);


                                                localStorage.setItem('cart', cart);
                                                e.target.style.display = 'none'


                                            }} type="button" class="btn btn-success">add to cart
                                            </button>

                                        </td>
                                        {userRole === "admin" ?
                                            <td>
                                                <button onClick={() => edit(d)} type="button"
                                                        class="btn btn-warning">edit
                                                </button>
                                            </td> : null}

                                    </tr>)}

                                    </tbody>
                                </Table>
                                <center>
                                    <button onClick={() => setPage(0)} type="button" class="btn btn-success">1
                                    </button>

                                    {items.length >= 2 ?
                                        <button onClick={() => setPage(1)} type="button" class="btn btn-success">2
                                        </button> : null}

                                    {items.length >= 3 ?
                                        <button onClick={() => setPage(2)} type="button" class="btn btn-success">3
                                        </button> : null}
                                </center>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default Dashboard;
