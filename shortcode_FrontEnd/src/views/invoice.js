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

function InVoice(props) {
    const [items, setItems] = useState([]);

    useEffect(() => {

        getItems();

    }, [])

    const getItems = (filter) => {
        fetch('/api/role?' + (filter ? "filter=" + filter : ''), {

            credentials: 'same-origin'
        }).then(async (d) => {
            d = (await d.json())
            let role = d.role;
            if (role && (role === "admin" )) {
            setItems(d.invoice);

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
                                        <th>Invoice Id</th>
                                        <th>User Id</th>
                                        <th>date</th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {items.map((d) => <tr>

                                        <td>{d.id}</td>
                                        <td>{d.user_id}</td>
                                        <td>{d.createdAt}</td>

                                        <td>
                                            <button onClick={(e) => {


                                                localStorage.setItem('show_invoice', JSON.stringify(d));

                                                window.location.assign('/admin/invoiceShow');
                                            }} type="button" class="btn btn-danger">Show invoice
                                            </button>

                                        </td>
                                    </tr>)}


                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>


            </div>
        </>
    );
}

export default InVoice;
