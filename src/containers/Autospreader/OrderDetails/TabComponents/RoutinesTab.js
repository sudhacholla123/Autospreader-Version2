import React, { Component } from 'react';
import { Icon } from 'antd';
import Select, { SelectOption } from '../../../../components/uielements/select';
import Button from '../../../../components/uielements/button';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import LayoutWrapper from '../../../../components/utility/layoutWrapper.js';
import LayoutContentWrapper from "../../../../components/utility/layoutWrapper.js";
import RoutinesTimeline from '../Timelines/RoutinesTimeline';
import ContentHolder from '../../../../components/utility/contentHolder';
import { Col, Row } from 'antd';
import Box from '../../../../components/utility/box';


// const TabPane = Tabs.TabPane;
const Option = SelectOption;

function callback(key) { }

const operations = <Button>Extra Action</Button>;

let order = 'desc';
const data = [{
    routineid: '18861',
    type: 'straight',
    exchange: "Bitfinex",
    quantity: '3',
    price: '0.04',
    x: '0.01',
    exchange_account: 'Margin',
    hedge_exchange: '',
    hedge_account: '',
    per_filled: '30'

}, {
    routineid: '86998',
    type: 'Hedge',
    orderid: 'ae25001d-82d2-4716-802b-3e81cbddbb5f',
    exchange: "Bitmex",
    quantity: '2',
    price: '0.02',
    x: '0.03',
    exchange_account: 'Exchange',
    hedge_exchange: 'cexio',
    hedge_account: 'exchange',
    per_filled: '60'
}, {
    routineid: '12345',
    type: 'stop',
    orderid: ' 77ba6bfb-a84b-4dda-a4f1-a42532c54ccc',
    exchange: "Coinfloor_uk",
    quantity: '1',
    price: '0.05',
    x: '0.01',
    exchange_account: 'Exchange',
    hedge_exchange: '',
    hedge_account: '',
    per_filled: '40'
}];

class RoutinesTab extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    //sortable table
    handleBtnClick = () => {
        if (order === 'desc') {
            this.refs.table.handleSort('asc', 'name');
            order = 'asc';
        } else {
            this.refs.table.handleSort('desc', 'name');
            order = 'desc';
        }
    }

    routine_id_Formatter(cell, row) {   // String example
        return <a> {cell} </a>
    }
    selectRow = {
        mode: 'radio' //radio or checkbox
    };

    //To get modal on clicking routine_id cell
    cellButton(cell, row, enumObject, rowIndex) {
        return (
            <RoutinesTimeline cell={cell} row={row} rowIndex={rowIndex} />
        )
    }

    render() {
        const rowStyle = {
            width: '100%',
            display: 'flex',
            flexFlow: 'row wrap'
        };
        const colStyle = {
            marginBottom: '16px'
        };
        const gutter = 16;
        return (
            <Row style={rowStyle} >
                <Col span={24} >
                    <Box>
                        <div>
                            <ContentHolder>
                                <BootstrapTable ref='table' data={data} selectRow={this.selectRow} deleteRow>
                                    <TableHeaderColumn dataField='routineid' dataAlign="center"
                                        dataFormat={this.cellButton.bind(this)} isKey={true} dataSort={true}>Routine Id</TableHeaderColumn>
                                    <TableHeaderColumn dataField='type' dataSort={true}>Type</TableHeaderColumn>
                                    <TableHeaderColumn dataField='exchange' dataSort={true}>Exchange</TableHeaderColumn>
                                    <TableHeaderColumn dataField='exchange_account'>Exchange Account</TableHeaderColumn>
                                    <TableHeaderColumn dataField='x' dataAlign="center">X</TableHeaderColumn>
                                    <TableHeaderColumn dataField='price' dataSort={true} dataAlign="center">Price (Local currency)</TableHeaderColumn>
                                    <TableHeaderColumn dataField='price' dataSort={true} dataAlign="center">Price (USD)</TableHeaderColumn>
                                    <TableHeaderColumn dataField='quantity' dataAlign="center">Quantity</TableHeaderColumn>
                                    <TableHeaderColumn dataField='per_filled' dataAlign="center">% Filled</TableHeaderColumn>
                                    <TableHeaderColumn dataField='hedge_exchange' dataSort={true}>Hedge Exchange</TableHeaderColumn>
                                    <TableHeaderColumn dataField='hedge_account'>Hedge Exchange Account</TableHeaderColumn>
                                </BootstrapTable>
                            </ContentHolder>
                        </div>
                    </Box>
                </Col>
            </Row>


        );
    }
}
export default RoutinesTab
