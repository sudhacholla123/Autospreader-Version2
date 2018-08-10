import React from 'react'
import firebase from 'firebase';

//This component is to display system resources ()
class SystemResources extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cpu_usage_per: '',
            mem_usage_per: '',
            active_thread_num: '',
        }
    }
    componentDidMount() {
        let responseRef = firebase.database().ref("resources_used")
        responseRef.on('value', snapshot => {
            let resources = snapshot.val()
            this.setState({
                cpu_usage_per: parseFloat(resources.cpu_percentage),
                mem_usage_per: parseFloat(resources.memory_percentage).toFixed(2),
                active_thread_num: parseFloat(resources.active_thread_count)
            })
        })
    }
    render() {
        return (
            <div>
                <p> <span>CPU USAGE: {this.state.cpu_usage_per}% </span>--
                < span>MEMORY USAGE: {this.state.mem_usage_per}% </span>--
                <span>ACTIVE THREADS: {this.state.active_thread_num}</span>
                </p>
            </div>
        )
    }
}
export default SystemResources;