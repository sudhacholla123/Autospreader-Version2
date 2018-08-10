import React from 'react'
import firebase from 'firebase';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import './styleGrid.css'

let exchange_list = ["bitfinex", "bitmex", "cexio", "flyer", "flyer_fx", "coinfloor_uk", "cexio_euro"]
let bal_str = '';
let POS = '',health ='';
class GridData extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            grid_array: {},
            mps_status_arr: {},
            fiat_values: []
        }
    }
    componentDidMount() {
        for (let ex = 0; ex < exchange_list.length; ex++) {
            let exc = exchange_list[ex]
            //fetching all the firebase data into priceRef
            let priceRef = firebase.database().ref(exc);
            priceRef.on('value', snapshot => {
                let prices = snapshot.val().prices;
                let positions = snapshot.val().positions.avail
                //calculating ask and bid values
                let ask = (parseFloat(Math.round(prices.ask * 10) / 10) * parseFloat(prices.currency_multiplier)).toFixed(1)
                let bid = (parseFloat(Math.round(prices.bid * 10) / 10) * parseFloat(prices.currency_multiplier)).toFixed(1)
                let average = Math.round(((parseFloat(ask) + parseFloat(bid)) / 2))
                //Changing unix timeformat to ISO
                let date1 = prices.last_update_time
                let date_needed = (new Date(date1 * 1e3)).toISOString().slice(-13, -2);
                let a = date_needed.split('.');
                // console.log(a[0])
                prices.date = date_needed 
               
                //Balances string dispalying BTC,USD

                bal_str = positions

                prices.ask = ask
                prices.bid = bid
                prices.POS = POS
                prices.health = health
                prices.average = average
                prices.exchange = exchange_list[ex].toUpperCase()
                prices.balance = bal_str
                // console.log(positions)
                // console.log(prices.balance)
                let keys = Object.keys(positions)
                prices.BTC = positions[keys[0]].toFixed(2)
                prices.Fiat = positions[keys[1]].toFixed(2)
                //last update time in grid
                

                let grid_array = {
                    ...this.state.grid_array,
                    [exc]: prices
                };
                this.setState({ grid_array })
            })
            //MPS Table
            //fetching mps and latency values from firebase (url, exc:"bitmex")
            let mpsValuesRef = firebase.database().ref(exc);
            mpsValuesRef.on('value', snapshot => {
                let mps_values = snapshot.val()
                mps_values.exchanges = exc
                mps_values.latency = parseFloat(mps_values.latency).toFixed(2)
                mps_values.mps = parseFloat(mps_values.mps).toFixed(2)

                let mps_status_arr = {
                    ...this.state.mps_status_arr,
                    [exc]: mps_values
                };
                this.setState({ mps_status_arr })
            })
            //to fetch fiat currencies for fx and fx_update_Time
            let rateRef = firebase.database().ref("data_points/fiat_currencies");
            rateRef.on('value', snapshot => {
                this.setState({ fiat_values: snapshot.val() })
            })
        }
    }
    //Calculating spread for exchanges based on ask and bid values
    spreadCal(arr) {
        let spread_exc_arr = []
        for (let i in arr) {
            let min_array = {}
            // min_array['name'] = arr[i].exchange;
            // console.log(arr[i].ask);
            var first_ex_ask = parseFloat(arr[i].ask)
            var first_ex_bid = parseFloat(arr[i].bid)
            for (var j in arr) {
                var second_ex_ask = parseFloat(arr[j].ask)
                var second_ex_bid = parseFloat(arr[j].bid)
                var first_ex_avg = (first_ex_ask + first_ex_bid) / 2;
                var second_ex_avg = (second_ex_ask + second_ex_bid) / 2;
                let spread = (((first_ex_avg - second_ex_avg) * 100) / ((first_ex_avg + second_ex_avg) / 2)).toFixed(2);
                if (i === j) {
                    min_array[j] = Infinity;
                } else {
                    min_array[j] = spread
                }
            }
            spread_exc_arr.push(min_array)
        }
        return spread_exc_arr
    }
    mpsflattenObject() {
        let data = this.state.mps_status_arr;
        let mps_status = [];
        Object.keys(data).forEach((key) => {
            mps_status.push(data[key]);
        })
        return mps_status;
    }

    gridflattenObject() {
        let data = this.state.grid_array;
        let prices_array = [];
        Object.keys(data).forEach((key) => {
            prices_array.push(data[key]);
        })
        return prices_array;
    }

    //calculating foreign exchange and fx update time in MPS Status
    Foreign_X_Cal() {
        let index = '', rate = '', date_needed = '', buildString = ''
        let fiat_currencies = this.state.fiat_values
        let mps_status_arr = this.mpsflattenObject()
        if (mps_status_arr.some(item => "coinfloor_uk" === item.exchanges)) {
            index = this.getIndex("coinfloor_uk", mps_status_arr, "exchanges")
            //hasOwnProperty
            for (let key in fiat_currencies) {
                if (key === "GBPUSD") {
                    buildString = buildString + key;
                    date_needed = new Date(fiat_currencies[key].last_updated_time * 1e3).toISOString().slice(-13, -2);
                    rate = fiat_currencies[key].rate
                    mps_status_arr[index].date_needed = date_needed;
                    mps_status_arr[index].rate = rate
                }
            }
        }
        if (mps_status_arr.some(item => "flyer" === item.exchanges)) {
            index = this.getIndex("flyer", mps_status_arr, "exchanges")
            for (let key in fiat_currencies) {
                if (key === "JPYUSD") {
                    buildString = buildString + key;
                    date_needed = new Date(fiat_currencies[key].last_updated_time * 1e3).toISOString().slice(-13, -2);
                    rate = fiat_currencies[key].rate
                    mps_status_arr[index].date_needed = date_needed;
                    mps_status_arr[index].rate = rate
                }
            }
        }
        if (mps_status_arr.some(item => "flyer_fx" === item.exchanges)) {
            index = this.getIndex("flyer_fx", mps_status_arr, "exchanges")
            for (let key in fiat_currencies) {
                if (key === "JPYUSD") {
                    buildString = buildString + key;
                    date_needed = new Date(fiat_currencies[key].last_updated_time * 1e3).toISOString().slice(-13, -2);
                    rate = fiat_currencies[key].rate
                    mps_status_arr[index].date_needed = date_needed;
                    mps_status_arr[index].rate = rate
                }
            }
        }
        if (mps_status_arr.some(item => "cexio_euro" === item.exchanges)) {
            index = this.getIndex("cexio_euro", mps_status_arr, "exchanges")
            for (let key in fiat_currencies) {
                if (key === "EURUSD") {
                    buildString = buildString + key;
                    date_needed = new Date(fiat_currencies[key].last_updated_time * 1e3).toISOString().slice(-13, -2);
                    rate = fiat_currencies[key].rate
                    mps_status_arr[index].date_needed = date_needed;
                    mps_status_arr[index].rate = rate
                }
            }
        }

    }

    //function returns particular index of the exchange
    getIndex(value, arr, prop) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i][prop] === value) {
                return i;
            }
        }
    }


    //date is converted from unix timestamp to UTC 
    dateFormatter(fieldValue, row, rowIdx, colIdx) {
        let a = fieldValue.split('.');
        let b = a[0].split(':');
        let Dat1 = new Date();
        let Dat2 = Date.UTC(Dat1.getUTCFullYear(), Dat1.getUTCMonth(), Dat1.getUTCDate(), b[0], b[1], b[2], a[1]);
        return Number(Dat1) - Dat2 > 2 * 60 * 1000 ? 'danger_text' : '';
    }



    //Displaying balances column in grid
    positionsFormatter(cell, row) {
        // console.log({cell});
        let dat = ["<ul class='balance_style'>"];
        Object.keys(cell).forEach(key => {
            dat.push(`<li>${key} ${cell[key].toFixed(2)}</li>`)
        })
        dat.push('</ul>')
        return dat.join("");
    }
    exchangeFormatter(fieldValue, row, rowIdx, colIdx) {   // String example
        // return <cell style={{ backgroundColor : 'green', color:'white' }} > {cell} </cell>
        return fieldValue !== Infinity ? 'exchange' : '';
    }

    //Makes the cells in grid as grey if same exchange
    columnClassNameFormat(fieldValue, row, rowIdx, colIdx) {
        // fieldValue is column value
        // row is whole row object
        // rowIdx is index of row
        // colIdx is index of column
        // console.log({fieldValue, row, rowIdx, colIdx})
        return fieldValue === Infinity ? 'cellStyling' : '';
    }

    render() {
        let prices_array = this.gridflattenObject()
        let spread = this.spreadCal(prices_array)
        let mps_status = this.mpsflattenObject()
        this.Foreign_X_Cal()

        //array with both data of exchanges(ask,bid) and also calculations of spread based on ask and bid
        let grid = [];
        prices_array.forEach((itm, i) => {
            grid.push(Object.assign({}, itm, spread[i]));
        });

        let Final_Grid = [];
        mps_status.forEach((itm, i) => {
            Final_Grid.push(Object.assign({}, itm, grid[i]))
        })

        // console.log(Final_Grid)
        return (
            <div>
                {/* <MpsTable /> */}
                <BootstrapTable data={Final_Grid}>
                    <TableHeaderColumn dataField='health' dataAlign="center">Health </TableHeaderColumn>
                    <TableHeaderColumn dataField='mps'>MPS</TableHeaderColumn>
                    <TableHeaderColumn dataField='latency'>LAT</TableHeaderColumn>
                    <TableHeaderColumn dataField='rate'>FX</TableHeaderColumn>
                    {/* <TableHeaderColumn dataField='date_needed'>FX UPDATE TIME</TableHeaderColumn> */}
                    <TableHeaderColumn dataField='BTC' dataAlign="center">BTC </TableHeaderColumn>
                    <TableHeaderColumn dataField='Fiat' dataAlign="center">Fiat (B) </TableHeaderColumn>
                    <TableHeaderColumn dataField='POS' dataAlign="center">POS </TableHeaderColumn>
                    {/* <TableHeaderColumn dataField='balance' dataFormat={this.positionsFormatter} width='12%' >Balances </TableHeaderColumn> */}
                    <TableHeaderColumn dataField='bid' dataAlign="center">Bid </TableHeaderColumn>
                    <TableHeaderColumn dataField='ask' dataAlign="center">Ask </TableHeaderColumn>
                    <TableHeaderColumn dataField='average' dataAlign="center">Average </TableHeaderColumn>
                    <TableHeaderColumn dataField='date' dataAlign="center" columnClassName={this.dateFormatter} >Last Update </TableHeaderColumn>
                    <TableHeaderColumn isKey dataField={'exchange'} columnClassName={this.exchangeFormatter}> Exchanges</TableHeaderColumn>
                    <TableHeaderColumn dataField='0' columnClassName={this.columnClassNameFormat} dataAlign="center">Bitfinex </TableHeaderColumn>
                    <TableHeaderColumn dataField='1' columnClassName={this.columnClassNameFormat} dataAlign="center">Bitmex </TableHeaderColumn>
                    <TableHeaderColumn dataField='2' columnClassName={this.columnClassNameFormat} dataAlign="center">Cexio </TableHeaderColumn>
                    <TableHeaderColumn dataField='3' columnClassName={this.columnClassNameFormat} dataAlign="center">Flyer </TableHeaderColumn>
                    <TableHeaderColumn dataField='4' columnClassName={this.columnClassNameFormat} dataAlign="center">Flyer_Fx </TableHeaderColumn>
                    <TableHeaderColumn dataField='5' columnClassName={this.columnClassNameFormat} dataAlign="center">Coinfloor_uk</TableHeaderColumn>
                </BootstrapTable>
            </div>
        )
    }
}
export default GridData; 