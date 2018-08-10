import React, { Component } from 'react';
import { Icon } from 'antd';
import Tabs, { TabPane } from '../../../components/uielements/tabs';
import Select, { SelectOption } from '../../../components/uielements/select';
import Button from '../../../components/uielements/button';
import Box from '../../../components/utility/box';
import LayoutWrapper from '../../../components/utility/layoutWrapper.js';import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import OrdersTab from './TabComponents/OrdersTab'
import RoutinesTab from './TabComponents/RoutinesTab';

// const TabPane = Tabs.TabPane;
const Option = SelectOption;

function callback(key) { }

const operations = <Button>Extra Action</Button>;

class OrderDetails extends React.Component {
    constructor(props) {
        super(props);
        this.newTabIndex = 0;
        const panes = [
            {
                title: 'Tab 1',
                content: 'Content of Tab 1',
                key: '1',
                closable: false
            },
            { title: 'Tab 2', content: 'Content of Tab 2', key: '2' }
        ];
        this.state = {
            activeKey: panes[0].key,
            panes
        };
    }


    //tab settings
    onChange = activeKey => {
        this.setState({ activeKey });
    };
    onEdit = (targetKey, action) => {
        this[action](targetKey);
    };
    add = () => {
        const panes = this.state.panes;
        const activeKey = `newTab${this.newTabIndex++}`;
        panes.push({
            title: 'New Tab',
            content: 'Content of new Tab',
            key: activeKey
        });
        this.setState({ panes, activeKey });
    };
    remove = targetKey => {
        let activeKey = this.state.activeKey;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (lastIndex >= 0 && activeKey === targetKey) {
            activeKey = panes[lastIndex].key;
        }
        this.setState({ panes, activeKey });
    };
    state = {
        tabPosition: 'top'
    };
    changeTabPosition = tabPosition => {
        this.setState({ tabPosition });
    };

    render() {
        return (
            <LayoutWrapper>
                {/* <Box title={<IntlMessages id="forms.Tabs.basicTitle" />}> */}
                <Box>
                    <Tabs defaultActiveKey="1" onChange={callback}>
                        
                        <TabPane tab="Routines(7)" key="1">
                            <RoutinesTab/>
                        </TabPane>
                        
                        <TabPane tab="Orders(15)" key="2" >
                            <OrdersTab/>
                        </TabPane>
                        
                        <TabPane tab="Routine Groups(4)" key="3">
                            Routine Groups comes here
                        </TabPane>
                        <TabPane tab="Stratagies(2)" key="4">
                            Stratagies comes here
                        </TabPane>
                    </Tabs>
                </Box>
            </LayoutWrapper>
        );
    }
}
export default OrderDetails
