import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, LocaleProvider } from 'antd';
import { Debounce } from 'react-throttle';
import WindowResizeListener from 'react-window-size-listener';
import { ThemeProvider } from 'styled-components';
import { Col, Row, Icon } from 'antd';
import authAction from '../../redux/auth/actions';
import appActions from '../../redux/app/actions';
import Sidebar from '../Sidebar/Sidebar';
import PageHeader from '../../components/utility/pageHeader';
import Box from '../../components/utility/box';
import LayoutWrapper from '../../components/utility/layoutWrapper.js';
import Topbar from '../Topbar/Topbar';
import { siteConfig } from '../../settings';
import { AppLocale } from '../../dashApp';
import themes from '../../settings/themes';
import AppHolder from './commonStyle';
import './global.css';
import LayoutContentWrapper from "../../components/utility/layoutWrapper.js";
import AppRouter from './AppRouter';
import TableDemoStyle from '../Tables/antTables/demo.style';
import * as TableViews from '../Tables/antTables/tableViews/';
import IntlMessages from '../../components/utility/intlMessages';

import GridData from '../Autospreader/GridData';
import PlaceOrder from '../Autospreader/OrderSettings/PlaceOrder'
import OrderDetails from '../Autospreader/OrderDetails/OrderDetailsTab'


const { Content, Footer } = Layout;
const { logout } = authAction;
const { toggleAll } = appActions;
export class App extends Component {
  state = {
    dataSource: []
  };


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

    const { url } = this.props.match;
    const { locale, selectedTheme, height } = this.props;
    const currentAppLocale = AppLocale[locale];
    const appHeight = window.innerHeight;

    return (
      <LocaleProvider locale={currentAppLocale.antd}>
        <ThemeProvider theme={themes[selectedTheme]}>
          <AppHolder>
            <Layout style={{ height: appHeight }}>
              <Debounce time="1000" handler="onResize">
                <WindowResizeListener
                  onResize={windowSize =>
                    this.props.toggleAll(
                      windowSize.windowWidth,
                      windowSize.windowHeight
                    )
                  }
                />
              </Debounce>
              <Topbar url={url} />
              <Layout style={{ flexDirection: 'row', overflowX: 'hidden' }}>
                <Sidebar url={url} />
                <Layout
                  className="isoContentMainLayout"
                  style={{
                    height: height
                  }}
                >
                  <Content
                    className="isomorphicContent"
                    style={{
                      padding: '70px 0 0',
                      flexShrink: '0',
                      background: '#f1f3f6',
                      position: 'relative'
                    }}
                  >
                    <LayoutContentWrapper>
                      <PageHeader>
                        <IntlMessages id="uiElements.cards.grid" />
                      </PageHeader>
                      <TableDemoStyle className="isoLayoutContent">
                        <GridData />
                      </TableDemoStyle>
                    </LayoutContentWrapper>

                    <LayoutContentWrapper>
                      <PageHeader>
                        <IntlMessages id="forms.input.header" />
                      </PageHeader>
                      <Row style={rowStyle} >
                        <Col span={24} >
                          <Box>
                            <PlaceOrder />
                          </Box>
                        </Col>
                      </Row>
                    </LayoutContentWrapper>

                    <LayoutContentWrapper>
                      <PageHeader>
                        <IntlMessages id="forms.input.orders" />
                      </PageHeader>
                      <Row style={rowStyle} >
                        <Col span={24} >
                          <Box>
                            <OrderDetails />
                          </Box>
                        </Col>
                      </Row>
                    </LayoutContentWrapper>

                    {/* <AppRouter url={url} /> */}
                  </Content>

                  <Footer
                    style={{
                      background: '#ffffff',
                      textAlign: 'center',
                      borderTop: '1px solid #ededed'
                    }}
                  >
                    {siteConfig.footerText}
                  </Footer>
                </Layout>
              </Layout>
            </Layout>
          </AppHolder>
        </ThemeProvider>
      </LocaleProvider>
    );
  }
}

export default connect(
  state => ({
    auth: state.Auth,
    locale: state.LanguageSwitcher.language.locale,
    selectedTheme: state.ThemeSwitcher.changeThemes.themeName,
    height: state.App.height
  }),
  { logout, toggleAll, TableViews }
)(App);
