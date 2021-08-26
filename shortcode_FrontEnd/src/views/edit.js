/*!

=========================================================
* Argon Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, {useEffect, useState} from "react";

// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Row,
    Col,
} from "reactstrap";
import Swal from "sweetalert2";
import $ from 'jquery';


const Edit = () => {
    const [item, setItem] = useState(null);
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


    useEffect(() => {
        getItems();
        let _item = localStorage.getItem('Edit_data')
        if (_item && JSON.parse(_item) !== null) {
            _item = JSON.parse(_item);
            setItem(_item);
            SetProductNumber(_item.product_number);
            setDesc(_item.desc);
            setQuantity(_item.quantity);
            setPrice(_item.price);
            setDiscount(_item.discount);
            let expire_date = _item.expire_date.split('T')[0];

            setExpireDate(expire_date)

        } else {
            window.location.assign('/');
        }
    }, [])
    const [productNumber, SetProductNumber] = useState('');
    const [desc, setDesc] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState('');
    const [discount, setDiscount] = useState(0);
    const [expireDate, setExpireDate] = useState('');


    const [progress, setProgress] = useState({
        display: false,
        width: '0%',
    })

    const update = () => {


        fetch('/api/item/update', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            credentials: 'same-origin',

            body: JSON.stringify({
                id: item.id,
                body: {
                    expire_date: expireDate + " 00:00:00",
                    price: price,
                    product_number: productNumber,
                    quantity: quantity,
                    discount: discount,
                    desc: desc
                }
            })
        }).then(async (d) => {
            d = await d.json();
            if (d.success) {
                // window.location.assign('/')
                  await Swal.fire({
                    icon: 'success',
                    title: 'Done!',
                    text: 'thanks for update!',
                })
            } else {
                await Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'something going wrong!',
                })
            }

        })

    }
    const uploadFile = () => {

        const files = $('#file')[0].files;

        const formData = new FormData()
                // debugger
        if (files.length === 0) return;
        formData.append('myFile', files[0])
        formData.append('id', item.id);
        $.ajax({
            // Your server script to process the upload
            url: '/api/update/item/img',
            type: 'POST',

            // Form data
            data: formData,

            // Tell jQuery not to process data or worry about content-type
            // You *must* include these options!
            cache: false,
            contentType: false,
            processData: false,
            success:async function (d) {

                setProgress({
                    display: false,
                    width: '0%',
                })
                $('.progress-bar').parent().addClass('d-none');
                //   window.location.assign('/')
                     await Swal.fire({
                    icon: 'success',
                    title: 'Done!',
                    text: 'thanks for update!',
                })
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
    };


    return (
        <>
            <Col className="content">
                <Card className=" shadow border-0">
                    <CardBody className="px-lg-5 py-lg-5">
                        <div className="text-center text-muted mb-4">
                            <small>Edit info</small>
                        </div>
                        <Form role="form">
                            <FormGroup>
                                <InputGroup className="input-group-alternative mb-3">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-hat-3"/>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input value={productNumber} placeholder="Product Number" onChange={(d) => {
                                        SetProductNumber(d.target.value)
                                    }} name={'f_name'} type="text"/>
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup className="input-group-alternative mb-3">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-hat-3"/>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input value={desc} placeholder="Desc" name={'l_name'} onChange={(d) => {
                                        setDesc(d.target.value)
                                    }} type="text"/>
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup className="input-group-alternative mb-3">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-email-83"/>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        placeholder="Quantity"
                                        type="number"
                                        autoComplete="new-email"
                                        name={'email'}
                                        value={quantity}
                                        onChange={(d) => {
                                            setQuantity(d.target.value)
                                        }}
                                    />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup className="input-group-alternative mb-3">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-email-83"/>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        placeholder="discount"
                                        type="number"
                                        autoComplete="new-email"
                                        name={'email'}
                                        max={100}
                                        value={discount}
                                        onChange={(d) => {
                                            setDiscount(d.target.value)
                                        }}
                                    />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-lock-circle-open"/>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        placeholder="Price"
                                        type="text"
                                        name={'password'}
                                        value={price}
                                        autoComplete="new-password"
                                        onChange={(d) => {
                                            setPrice(d.target.value)
                                        }}
                                    />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-lock-circle-open"/>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        name={'repassword'}
                                        placeholder="expire date"
                                        type="date"
                                        value={expireDate}
                                        autoComplete="new-password"
                                        onChange={(d) => {
                                            let v = d.target.value;
                                            setExpireDate(v)
                                        }}
                                    />
                                </InputGroup>
                            </FormGroup>
                            <Row>
                                <Col>
                                    <input  type="file" className={'d-none'} id={'file'}/>
                                    <a href="#pablo" onClick={() => {
                                        document.querySelector('#file').click();
                                    }} className="btn btn-warning mb-4">Upload Image</a>
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


                            <div className="text-center">
                                <Button className="mt-4" color="primary" onClick={() => {
                                    uploadFile();
                                    update();
                                }} type="button">
                                    Update
                                </Button>
                            </div>
                        </Form>
                    </CardBody>
                </Card>
            </Col>
        </>
    );
};

export default Edit;
