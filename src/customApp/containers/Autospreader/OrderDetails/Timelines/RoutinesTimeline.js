import React from 'react'
import Timeline, {
  TimelineItem,
} from '../../../../components/uielements/timeline';
import ContentHolder from '../../../../components/utility/contentHolder';
import Button from "../../../../components/uielements/button";
import IntlMessages from "../../../../components/utility/intlMessages";
import Modals from "../../../../components/feedback/modal";

import ModalStyle, { ModalContent } from "../../../Feedback/Modal/modal.style";
import WithDirection from "../../../../settings/withDirection";

const isoModal = ModalStyle(Modals);
const Modal = WithDirection(isoModal);

const confirm = Modals.confirm;


class RoutinesTimeline extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      visible: false
    }
  }

  showModal = () => {
    this.setState({
      visible: true
    });
  };
  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 2000);
  };

  //To handle return button in Modal
  handleCancel = () => {
    this.setState({ visible: false });
  };

  render() {
    return (
      <div>
        <ContentHolder>
          <a onClick={this.showModal}>
            {this.props.cell}
          </a>
          <Modal
            visible={this.state.visible}
            title ={this.props.cell} //Title of modal routine id
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={[
              <Button key="back" size="large" onClick={this.handleCancel}>
                Return
                    </Button>,
              // <Button
              //   key="submit"
              //   type="primary"
              //   size="large"
              //   loading={this.state.loading}
              //   onClick={this.handleOk}
              // >
              // Submit
              //     </Button>
            ]}
          >
            <p>
              <ContentHolder>
                <Timeline>
                  <TimelineItem color="green">
                    Routine placed on 2018-08-01 at 11:17
              </TimelineItem>
                  <TimelineItem color="green">
                    Create a services site 2015-09-10
              </TimelineItem>
                  <TimelineItem color="red">
                    <p>Routine successfully completed in work exchange</p>
                    <p>Price changes</p>
                    <p>Solve initial network problems 3 2015-09-01</p>
                  </TimelineItem>
                  <TimelineItem>
                    <p>Routine successfully completed in work exchange</p>
                    <p>Technical testing 2</p>
                    <p>Routine successfully completed on 2018-08-01 at 11:34</p>
                  </TimelineItem>
                </Timeline>
              </ContentHolder>
            </p>
          </Modal>
        </ContentHolder>

      </div>
    )
  }
}
export default RoutinesTimeline