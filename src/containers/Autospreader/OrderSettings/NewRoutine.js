import React from 'react'
import { Col, Row } from 'antd';
import ContentHolder from '../../../components/utility/contentHolder';
import basicStyle from '../../../settings/basicStyle';
import Button from "../../../components/uielements/button";
import Card from '../../Uielements/Card/card.style';
import { Modal } from 'react-bootstrap'
import Input, {
    InputSearch,
    InputGroup,
    Textarea
} from '../../../components/uielements/input';
import Select, { SelectOption } from '../../../components/uielements/select';


const Option = SelectOption;

//Displays Component with "+RoutineGroup"
//OnClick "+RoutineGroup" renders to NewRoutine
let routine_dict = []

class NewRoutine extends React.Component {
    constructor(props) {
        super()
        this.state = {
            showComponent: false,
            back: false,
            showModal: true,
            price: '',
            type1: '',
            workex: '',
            work_ex_ac: '',
            quantity: '',
            adjust_price: '',
            routine_dictt: []

        }
        //to handle all the dropdowns in new routine form
        this.handleChange_type1 = this.handleChange_type1.bind(this);
        this.handleChange_workex = this.handleChange_workex.bind(this);
        this.handleChange_work_ex_ac = this.handleChange_work_ex_ac.bind(this);
        this.handleChange_adjust_price = this.handleChange_adjust_price.bind(this);
        this.onSaveButtonClick = this.onSaveButtonClick.bind(this);
        this.handleHide = this.handleHide.bind(this);
    }

    //This is for Modal Hiding
    handleHide() {
        this.setState({ showModal: true });
    }

    updateInput = (key, value) => {
        this.setState({ [key]: value });
    }

    handleChange_type1 = (val) => {
        this.setState({
            type1: val
        });
    };
    handleChange_workex = (val) => {
        this.setState({
            workex: val
        });
    };
    handleChange_work_ex_ac = (val) => {
        this.setState({
            work_ex_ac: val
        });
    };
    handleChange_adjust_price = (val) => {
        this.setState({
            adjust_price: val
        });
    };
    //save button to go back to routine group
    onSaveButtonClick() {
        this.setState({
            showComponent: true,
        });

        let routine_id = this.props.index + 1;
        let price = this.state.price;
        let type = this.state.type1
        let work_ex = this.state.workex
        let work_ex_ac = this.state.work_ex_ac
        let quantity = this.state.quantity
        let adjust_price = this.state.adjust_price
        //The object that stores all the values of the form (new routine)
        let obj = {
            'routine_id': routine_id, 'price': price, 'type': type, 'work_ex': work_ex,
            'work_ex_ac': work_ex_ac, 'quantity': quantity, 'adjust_price': adjust_price
        };
        routine_dict.push(obj);
        console.log(routine_dict);
        this.setState({
            routine_dictt: [...this.state.routine_dictt, obj]
        })
        this.forceUpdate()
    }

    render() {
        if (this.state.showComponent) {
            return (<NewRoutine index={this.props.index} routine_dict={this.state.routine_dictt}
                price={this.state.price}
                type={this.state.type1} routine_id={this.state.routine_id} work_ex={this.state.work_ex}
                work_ex_ac={this.state.work_ex_ac} quantity={this.state.quantity}
                adjust_price={this.state.adjust_price} />)
        }
        const { rowStyle, colStyle, gutter } = basicStyle;
        const routines_array = routine_dict.map((Routine, index) => {
            i => <li key={i.id}>{i.price}</li>

        });

        let myForm;
        if (this.state.straight_order == true) {
            myForm = (
                <Col style={{ display: 'flex', direction: 'row' }} >
                    <Col span="8"><b>Price (%) </b></Col>
                    <Input type="text" value={this.state.price}
                        onChange={e => this.updateInput("price", e.target.value)} />
                </Col>
            );
        }
        else if (this.state.straight_order == false) {
            myForm = (
                <Col style={{ display: 'flex', direction: 'row' }} >
                    <Col span="8"><b>Price (local currency) </b></Col>
                    <Input type="text" value={this.state.price}
                        onChange={e => this.updateInput("price", e.target.value)} />
                </Col>
            )
        }


        let local_arr = []
        let price = this.props.price
        let type = this.props.type
        let obje = { 'price': price, 'type': type }
        local_arr.push(obje);
        // console.log(local_arr)
        return (
            <Row>
                <ContentHolder style={{ overflow: 'hidden' }}>
                    <ContentHolder>
                        <Card title={"Routine Group" + " " + (this.props.index + 1)}>
                            <p>Price:{this.props.price}</p>
                            <p>Routine_id:{this.props.index + 1}</p>
                            <p>type:{this.props.type}</p>
                            {/* {console.log(local_arr)} */}
                            {/* Array:{local_arr.map(i => <li key={i.type}>Type:{i.type}  Price:{i.price}
                                routine_id: {i.routine_id}  work_ex:{i.work_ex}
                                work_ex_ac: {i.work_ex_ac} quantity: {i.quantity}
                                adjust_price: {i.adjust_price}</li>)
                            } */}
                            <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: 45 }}>
                                <Button type="primary" onClick={() => this.setState({ show: true })}
                                    className="isoOrderBtn">
                                    <b>Add Routine</b>
                                </Button>

                                {/* modal form to create new routine */}
                                <Modal
                                    show={this.state.show}
                                    onHide={this.handleHide}
                                    container={this}
                                    aria-labelledby="contained-modal-title"
                                >
                                    <Modal.Header closeButton onClick={() => this.setState({ show: false })}>
                                        <Modal.Title id="contained-modal-title">
                                            New Routine
                                            </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <ContentHolder>
                                            <InputGroup compact style={{ marginBottom: '15px' }} >
                                                <Col style={{ display: 'flex', direction: 'row' }} >
                                                    <Col span="8"><b>Type</b></Col>
                                                    <Select style={{ width: '100%' }} value={this.state.type1}
                                                        onChange={this.handleChange_type1}>
                                                        <Option value="Straight">Straight</Option>
                                                        <Option value="Hedge">Hedge</Option>
                                                        <Option value="Stop">Stop</Option>
                                                    </Select>
                                                </Col>
                                                <br />
                                                <Col style={{ display: 'flex', direction: 'row' }} >
                                                    <Col span="8"><b>Work Exchange</b></Col>
                                                    <Select style={{ width: '100%' }} defaultValue=""
                                                        value={this.state.workex}
                                                        onChange={this.handleChange_workex}>
                                                        <Option value="Bitmex">Bitmex</Option>
                                                        <Option value="Bitfinex">Bitfinex</Option>
                                                        <Option value="Cexio">Cexio</Option>
                                                        <Option value="Flyer">Flyer</Option>
                                                        <Option value="Flyer_Fx">Flyer_Fx</Option>
                                                        <Option value="Coinfloor_uk">Coinfloor_uk</Option>
                                                    </Select>
                                                </Col>
                                                <br />
                                                <Col style={{ display: 'flex', direction: 'row' }} >
                                                    <Col span="8"><b>Work Exchange Account</b></Col>
                                                    <Select style={{ width: '100%' }} defaultValue=""
                                                        value={this.state.work_ex_ac}
                                                        onChange={this.handleChange_work_ex_ac}>
                                                        <Option value="Exchnage">Exchnage</Option>
                                                        <Option value="Margin">Margin</Option>
                                                    </Select>
                                                </Col>
                                                <br />
                                                {myForm}
                                                <br />
                                                <Col style={{ display: 'flex', direction: 'row' }} >
                                                    <Col span="8"><b> Quantity</b></Col>
                                                    <Input defaultValue="" type="text" value={this.state.quantity}
                                                        onChange={e => this.updateInput("quantity", e.target.value)} />
                                                </Col>
                                                <br />
                                                <Col style={{ display: 'flex', direction: 'row' }} >
                                                    <Col span="8"><b>Adjust Price</b></Col>
                                                    <Select style={{ width: '100%' }} defaultValue=""
                                                        value={this.state.adjust_price}
                                                        onChange={this.handleChange_adjust_price}>
                                                        <Option value="yes">Yes</Option>
                                                        <Option value="no">No</Option>
                                                    </Select>
                                                </Col>
                                                <br />
                                                <Col style={{ display: 'flex', direction: 'row' }} >
                                                    <Col span="8"><b>X</b></Col>
                                                    <Input defaultValue="" type="text" value={this.state.x}
                                                        onChange={e => this.updateInput("x", e.target.value)} />
                                                </Col>
                                                <br />
                                                <Col style={{ display: 'flex', direction: 'row' }} >
                                                    <Col span="8"><label>Hedge Exchange </label></Col>
                                                    <Select style={{ width: '100%' }} defaultValue=""
                                                        value={this.state.hedgeex}
                                                        onChange={this.handleChange_hedgeex}
                                                        disabled={this.state.hedge_true}>
                                                        <Option value="H_Bitmex">Bitmex</Option>
                                                        <Option value="H_Bitfinex">Bitfinex</Option>
                                                        <Option value="H_Cexio">Cexio</Option>
                                                        <Option value="H_Flyer">Flyer</Option>
                                                        <Option value="H_Flyer_Fx">Flyer_Fx</Option>
                                                        <Option value="H_Coinfloor_uk">Coinfloor_uk</Option>
                                                    </Select>
                                                </Col>
                                                <br />
                                                <Col style={{ display: 'flex', direction: 'row' }}  >
                                                    <Col span="8" ><label disabled={this.state.hedge_true}>Hedge Exchange Account</label></Col>
                                                    <Select style={{ width: '100%' }} defaultValue=""
                                                        value={this.state.hedge_ex_ac}
                                                        onChange={this.handleChange_hedge_ex_ac}
                                                        disabled={this.state.hedge_true}>
                                                        <Option value="Exchnage">Exchnage</Option>
                                                        <Option value="Margin">Margin</Option>
                                                    </Select>
                                                </Col>
                                            </InputGroup>
                                        </ContentHolder>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button type="primary" onClick={this.onSaveButtonClick} className="isoOrderBtn">
                                            Save
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </div>
                        </Card>
                    </ContentHolder>
                </ContentHolder>
            </Row>
        )
    }
}
export default NewRoutine              