import React, { Component } from "react";
import { connect } from "react-redux";
import { Layout } from "antd";
import appActions from "../../redux/app/actions";
import TopbarNotification from "./topbarNotification";
import TopbarUser from "./topbarUser";
import TopbarWrapper from "./topbar.style";
import Clock from 'react-live-clock';
import SystemResources from "../Autospreader/SystemResources";

const { Header } = Layout;
const { toggleCollapsed } = appActions;

class Topbar extends Component {
  render() {
    const { toggleCollapsed, customizedTheme, locale } = this.props;
    const collapsed = this.props.collapsed && !this.props.openDrawer;
    const styling = {
      background: customizedTheme.backgroundColor,
      position: "fixed",
      width: "100%",
      height: 70
    };
    return (
      <TopbarWrapper>
        <Header
          style={styling}
          className={
            collapsed ? "isomorphicTopbar collapsed" : "isomorphicTopbar"
          }
        >
          <div className="isoLeft">
            <button
              className={
                collapsed ? "triggerBtn menuCollapsed" : "triggerBtn menuOpen"
              }
              style={{ color: customizedTheme.textColor }}
              onClick={toggleCollapsed}
            />
          </div>

          <h5><div style={{ display: 'flex', justifyContent: 'center', paddingTop:30, fontFamily:'sans-serif' }}><SystemResources /></div></h5>
          <ul className="isoRight">
            <div style={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: 20, paddingTop: 20, paddingRight: 45 }}>
                <div><b>Current Time (UTC):  {<Clock format={'HH:mm:ss'} ticking={true} timezone={'UTC'} />}</b></div>
            </div>

            <li
              onClick={() => this.setState({ selectedItem: "notification" })}
              className="isoNotify"
            >
              <TopbarNotification locale={locale} />
            </li>

            <li
              onClick={() => this.setState({ selectedItem: "user" })}
              className="isoUser"
            >
              <TopbarUser locale={locale} />
            </li>
          </ul>
        </Header>
      </TopbarWrapper>
    );
  }
}

export default connect(
  state => ({
    ...state.App,
    locale: state.LanguageSwitcher.language.locale,
    customizedTheme: state.ThemeSwitcher.topbarTheme
  }),
  { toggleCollapsed }
)(Topbar);
