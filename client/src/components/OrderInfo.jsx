import React, { Component } from 'react';
import styled from 'styled-components';
import Review from './Review.jsx';

const RenderDiv = styled.div`
  min-height: 300px;
  min-width: 300px;
  flex-grow: 1;
  border: 1px solid gray;
  font-family: AdineuePRO,Helvetica;
`;

class OrderInfo extends Component {
  constructor(props){
    super(props);

    this.state = {
      product: this.props.product
    }
  }
  // Update state and render if props change
  componentDidUpdate(prevProps) {
    if (this.props.product !== prevProps.product) {
      this.setState({
        product: this.props.product,
      })
    }
  }

  render() {
    return (
      <RenderDiv>
        <Review product = {this.state.product}></Review>
      </RenderDiv>
    );
  }
}

export default OrderInfo;