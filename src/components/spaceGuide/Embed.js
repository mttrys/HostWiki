import React from "react"
import Iframe from 'react-iframe'
import { Modal, Button } from 'react-bootstrap'
import './Embed.css'




class Embed extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    let height
    if (this.props.api.type === 'Embed Speedtest' || 
          this.props.api.type === 'New Tab') { 
      return (
        <a href={this.props.api.url} target='_blank'> {this.props.api.title}</a>
      )
    } else if(this.props.api.type === 'Embed Typeform') { 
      height = '80vh';
    }

    return (

      <div className='embed-container'> 
        <button className='embed-button'>
          {this.props.api.title}
          <a>
        </button>

      </div>
    );
  }
}

export default Embed;
