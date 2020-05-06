import React, { Component } from 'react';
import styled from 'styled-components';
import ThumbNail from './ThumbNail.jsx';

const RenderDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 60px;
  position: relative;
  top: 100px;
  overflow: hidden;
  z-index: 1000;
  margin-right: 10px;
`;

class ThumbNailList extends Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  // Click handler is passed to child component ThumbNail
  // and will be called by child component
  handleClick(index, url) {
    this.props.handleClick(index);
  }

  render() {
    // Render an array of ThumbNails pics depending on
    // how many images there are for the current product
    let arrayOfThumbNails = [];
    for (let i = 0; i < this.props.images.length; i++) {
      // currently selected ThumbNail is passed prop isSelected = true
      // because it needs to be styled differnetly
      if(i === this.props.indexOfSelected) {
        arrayOfThumbNails.push(<ThumbNail key={i} index={i} image={this.props.images[i]} handleClick={this.handleClick} isSelected={true}/>)
      } else {
        arrayOfThumbNails.push(<ThumbNail key={i} index={i} image={this.props.images[i]} handleClick={this.handleClick} isSelected={false}/>)
      }
    }

    return (
      <RenderDiv>
        {arrayOfThumbNails}
      </RenderDiv>
    );
  }
}

export default ThumbNailList;