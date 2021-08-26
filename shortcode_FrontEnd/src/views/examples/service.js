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
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js"
import moment from 'moment';
// react plugin used to create charts
import {Line, Bar} from "react-chartjs-2";
import $ from 'jquery'
// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    NavItem,
    NavLink,
    Nav,
    Progress,
    Table,
    Container,
    Row,
    Col,
} from "reactstrap";

// core components
import {
    chartOptions,
    parseOptions,
} from "variables/charts.js";

import Header from "components/Headers/Header.js";

const Service = (props) => {

        // const data = {
        //     labels: ['1', '2', '3', '4', '5', '6'],
        //     datasets: [
        //         {
        //             label: '# of Red Votes',
        //             data: [16, 19, 13, 5, 2, 3],
        //             backgroundColor: 'rgb(255, 99, 132)',
        //         },
        //         {
        //             label: '# of Blue Votes',
        //             data: [2, 3, 20, 5, 1, 4],
        //             backgroundColor: 'rgb(54, 162, 235)',
        //         },
        //         {
        //             label: '# of Green Votes',
        //             data: [3, 10, 13, 15, 22, 30],
        //             backgroundColor: 'rgb(75, 192, 192)',
        //         },
        //     ],
        // };
        let data;

        const options = {
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true,
                        },
                    },
                ],
            },
        };
        const [chartShow, setChartShow] = useState(true);
        const [items, setItems] = useState({
            labels: [],
            data: []
        });

        const [modal, setModal] = useState({
            display: false,
            item_number: '',
            item_description: '',
            comment: '',
            last_sale_date: '',
        });


        if (window.Chart) {
            parseOptions(Chart, chartOptions());
        }
        const getQuery = (q) => {
            return (window.location.search.match(new RegExp('[?&]' + q + '=([^&]+)')) || [, null])[1];
        }
        useEffect(() => {

            fetch('/api/user/getService', {
                credentials: 'same-origin'
            }).then(async (d) => {
                    d = (await d.json())
                    // get labels
                    let labels = [];
                    let names = [];
                    let data = {};
                    let TARGET = d.TARGET ? d.TARGET.value : 0;
                    let WTD = d.WTD ? d.WTD.value : 0;
                    let services = d.services;
                    let filterDataForTable = {};
                    for (let i in services) {
                        let day = moment(services[i].createdAt).format('YYYY-MM-DD');
                        let dayName = moment(services[i].createdAt).format('dddd');

                        // bottom days labels
                        if (!labels.includes(dayName + " " + day)) {
                            labels.push(dayName + " " + day);
                        }
                        // console.log('services[i].Buyer', services[i].Buyer)
                        // console.log('services[i].buyer', filterDataForTable, services[i].Buyer)

                        if (filterDataForTable[services[i].Buyer]) {
                            filterDataForTable[services[i].Buyer].data.push({
                                ...services[i]
                            })
                        } else {
                            filterDataForTable[services[i].Buyer] = {
                                name: services[i].Buyer,
                                WTD: services[i].WTD,
                                TARGET: services[i].TARGET,
                                data: [{
                                    ...services[i]
                                }]
                            }
                        }

                        // add name of hover label
                        if (services[i].Buyer) {
                            names.push(services[i].Buyer);
                        }
                        if (data[`${day}`]) {
                            data[`${day}`].push({name: services[i].Buyer, value: services[i].service_level})
                        } else {
                            data[`${day}`] = [{name: services[i].Buyer, value: services[i].service_level}];
                        }
                    }


                    // console.log('test ====>', labels, names, data);
                    // console.log('filterDataForTable', filterDataForTable)


                    // create the data for multi lines
                    let filterData = [];
                    setItems({
                        labels: labels,
                        data: filterDataForTable
                    });
                    let localData = ([])

                    for (let i in labels) {
                        // debugger
                        for (let ii in data) {
                            for (let iii in data[ii]) {
                                if (data[ii][iii] && labels[i].split(' ')[1] === ii) {
                                    let n = data[ii][iii].name;
                                    // console.log('local Names data', data, n, i, ii, data[ii][iii].name, data[ii][iii] && labels[i].split(' ')[1] === ii)
                                    if (localData[n]) {
                                        localData[n].push(Math.floor(data[ii][iii].value * 100))
                                    } else {
                                        localData[n] = [Math.floor(data[ii][iii].value * 100)]
                                    }


                                } else {
                                    continue;
                                }
                            }
                        }


                    }
                    // let convertToPer100 = [];
                    let _names = [];
                    // console.log('localData', localData, localNames)
                    // debugger

                    for (let o in localData) {
                        console.log('each row', {
                            label: o,
                            data: localData[o],
                            backgroundColor: ['rgb(222, 49, 99)', 'rgb(64, 224, 208)', 'rgb(100, 149, 237)', 'rgb(159, 226, 191)', 'rgb(223, 255, 0)', 'rgb(222, 49, 99)'][Math.floor(Math.random() * 6)],
                        })
                        filterData.push({
                            label: o,
                            data: localData[o],
                            backgroundColor: ['rgb(222, 49, 99)', 'rgb(64, 224, 208)', 'rgb(100, 149, 237)', 'rgb(159, 226, 191)', 'rgb(223, 255, 0)', 'rgb(222, 49, 99)'][Math.floor(Math.random() * 6)],
                        });
                    }

                    // console.log('filterData', filterData)
                    labels.push('WTD');
                    labels.push('TARGET');
                    let maxNumber = 0;
                    for (let i in filterData) {

                        if (filterData[i].data.length > maxNumber) {
                            maxNumber = filterData[i].data.length;
                        }

                    }


                    let emptySpace = [];

                    for (let i = 0; i < maxNumber; i++) {
                        emptySpace.push(0);
                    }

                    // for (let i in filterData) {
                    //     if (filterData[i].label !== "Total") {
                    //         delete filterData[i];
                    //     }
                    // }

                    filterData = filterData.filter((v) => v.label === "Total")


                    console.log(labels, [...filterData,
                        {
                            label: 'WTD',
                            data: [...emptySpace, Math.floor(WTD * 100)],
                            backgroundColor: 'rgb(255, 99, 132)',
                        }, {
                            label: 'TARGET',
                            data: [...emptySpace, 0, Math.floor(TARGET * 100)],
                            backgroundColor: 'rgb(255, 191, 0)',
                        }
                    ])

                    // console.log('emptySpace', filterData, emptySpace, maxNumber)
                    new Chart(document.getElementsByClassName('chartjs-render-monitor'), {
                            type: 'bar',
                            data: {
                                labels: labels,
                                datasets: [...filterData,
                                    {
                                        label: 'WTD',
                                        data: [...emptySpace, Math.floor(WTD * 100)],
                                        backgroundColor: 'rgb(255, 99, 132)',
                                    }, {
                                        label: 'TARGET',
                                        data: [...emptySpace, 0, Math.floor(TARGET * 100)],
                                        backgroundColor: 'rgb(255, 191, 0)',
                                    }
                                ]
                            },
                            options: {
                                title: {
                                    display: false,
                                    text: 'Population growth (millions)'
                                }
                            }
                        }
                    );


                }
            )
        }, []);


        return (
            <>
                <Header service={true}/>
                {/* Page content */}
                <Container className="mt--7" fluid>
                    <Row>
                        <Col className="mb-5 mb-xl-0" xl="12">
                            <Card className="bg-gradient-default shadow">
                                <CardHeader className="bg-transparent">
                                    <Row className="align-items-center">
                                        <div className="col">
                                            <h6 className="text-uppercase text-light ls-1 mb-1">
                                                Overview
                                            </h6>
                                            <h2 className="text-white mb-0">values</h2>
                                        </div>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    {/* Chart */}
                                    <div className="chart">
                                        {chartShow ? <Bar data={data} options={options}/> : <div/>}

                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row className="mt-5">
                        <Col className="mb-12 mb-xl-0" xl="12">
                            <Card className="shadow">
                                <CardHeader className="border-0">
                                    <Row className="align-items-center">
                                        <div className="col">
                                            <h3 className="mb-0">Services</h3>
                                        </div>
                                        {/*<div className="col text-right">*/}
                                        {/*    <Button*/}
                                        {/*        color="primary"*/}
                                        {/*        href="#pablo"*/}
                                        {/*        onClick={(e) => e.preventDefault()}*/}
                                        {/*        size="sm"*/}
                                        {/*    >*/}
                                        {/*        See all*/}
                                        {/*    </Button>*/}
                                        {/*</div>*/}
                                    </Row>
                                </CardHeader>
                                <Table className="align-items-center table-flush" responsive>
                                    <thead className="thead-light">

                                    <tr>
                                        <th scope="col">Name</th>
                                        {items.labels.map((d) => {
                                            return <th scope="col">{d}</th>
                                        })}
                                        <th scope="col">WTD</th>
                                        <th scope="col">TOTAL</th>

                                    </tr>
                                    </thead>
                                    <tbody>

                                    {Object.keys(items.data).map((d, i) => {
                                        let item = items.data[d];
                                        return <tr key={i}>

                                            <th scope="row">{item.name}</th>
                                            {item.data.map((d) => {
                                                return <th scope="row">{parseFloat(d.service_level * 100).toFixed(2)}%</th>
                                            })}
                                            {/* make empty column */}
                                            {items.labels.length > item.data.length ? [...Array(items.labels.length - item.data.length).keys()].map(() =>
                                                <th></th>) : null}
                                            <td>{parseFloat(item.WTD * 100).toFixed(2)}%</td>
                                            <td>{parseFloat(item.TARGET * 100).toFixed(2)}%</td>
                                            {/*parseFloat(+Not_Supplied / +Quantity_ordered) * 100).toFixed(2)*/}
                                        </tr>
                                    })}

                                    </tbody>
                                </Table>
                            </Card>
                        </Col></Row>


                </Container>
            </>
        )
            ;
    }
;

export default Service;
