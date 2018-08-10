import React, { Component } from 'react';
import { SelectOption } from '../../../../components/uielements/select';
import Button from '../../../../components/uielements/button';
import { BootstrapTable, TableHeaderColumn, DeleteButton } from 'react-bootstrap-table'
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import OrdersTimeline from '../Timelines/OrdersTimeline'
import RoutinesTimeline from '../Timelines/RoutinesTimeline'

// const TabPane = Tabs.TabPane;
const Option = SelectOption;

function callback(key) { }

const operations = <Button>Extra Action</Button>;

let order = 'desc';
const dataSource = [{
    exchange: 'Bitmex',
    exchange_account: 'Margin',
    price: "6123",
    quantity: '3',
    orderid: '315c0b12-10e8-45e2-b2da-714eec077580',
    routineid: '18866'
}, {
    exchange: 'Bitfinex',
    exchange_account: 'Exchange',
    price: "6193",
    quantity: '2',
    orderid: '543c0b12-10e8-45e2-b2da-714eec077580',
    routineid: '13866'
}, {
    exchange: 'Cexio',
    exchange_account: 'Exchange',
    price: "7423",
    quantity: '2',
    orderid: '612c0b12-10e8-45e2-b2da-714eec077580',
    routineid: '23866'
}, {
    exchange: 'Flyer',
    exchange_account: 'Margin',
    price: "6423",
    quantity: '6',
    orderid: '5630b12-10e8-45e2-b2da-714eec077580',
    routineid: '93866'
}, {
    exchange: 'Cexio',
    exchange_account: 'Exchange',
    price: "6723",
    quantity: '5',
    orderid: '1340b12-10e8-45e2-b2da-714eec077580',
    routineid: '56766'
}
];

class OrdersTab extends React.Component {
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
    
    selectRow = {
        mode: 'radio' //radio or checkbox
    };

    //To get modal on clicking order id cell
    OrderscellButton(cell, row, enumObject, rowIndex) {
        return (
            <OrdersTimeline cell={cell} row={row} rowIndex={rowIndex} />
        )
    }
    RoutinescellButton(cell, row, enumObject, rowIndex) {
        return (
            <RoutinesTimeline cell={cell} row={row} rowIndex={rowIndex} />
        )
    }

    render() {
        return (
            <div>
                <BootstrapTable ref='table' data={dataSource} selectRow={this.selectRow} deleteRow >
                    <TableHeaderColumn dataField='exchange' dataSort={true}>Exchange</TableHeaderColumn>
                    <TableHeaderColumn dataField='exchange_account' >Exchange Account</TableHeaderColumn>
                    <TableHeaderColumn dataField='price' dataSort={true} dataAlign="center">Price(Local currency)</TableHeaderColumn>
                    <TableHeaderColumn dataField='price' dataSort={true} dataAlign="center">Price(USD)</TableHeaderColumn>
                    <TableHeaderColumn dataField='quantity' dataAlign="center">Quantity</TableHeaderColumn>
                    <TableHeaderColumn dataField='per_filled' dataAlign="center">% Filled</TableHeaderColumn>
                    <TableHeaderColumn dataField='orderid' isKey={true} dataSort={true}
                        dataFormat={this.OrderscellButton.bind(this)} width='30%' dataAlign="center">Exchange Order Id</TableHeaderColumn>
                    <TableHeaderColumn dataField='routineid'  dataFormat={this.RoutinescellButton.bind(this)} dataAlign="center" dataSort={true}>Routine Id</TableHeaderColumn>
                </BootstrapTable>
            </div>
        );
    }

}
export default OrdersTab
