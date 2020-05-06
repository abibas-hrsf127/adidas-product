import React, { Component } from 'react';
import styled from 'styled-components';

const RenderDiv = styled.div`
  justify-content: space-between;
  font-weight: 700;
  font-style: bold;
  font-family: AdihausDIN,Helvetica;
  font-size: 11px;
  margin: 0 0 30px 0;
  text-transform: uppercase;
`;

const SizeTable = styled.div`
  display: grid;
  font-weight: 400;
  font-style: regular;
  font-size: 13px;
  grid-template-columns: repeat(4, 25%);
  flex-wrap: wrap;
  box-sizing: border-box;
  border-left: 1px solid #ebedee;
  border-top: 1px solid #ebedee;
`

const StyledInventory = styled.div`
  line-height: 3em;
  font-size: 13px;
  cursor: pointer;
  letter-spacing: -1px;
  justify-content: center;
  align-items: center;
  text-align: center;
  border: 1px solid #ebedee;
  border-left: none;
  border-top: none;
  &:hover {
    color: #fff;
    background-color: #000;
  }
`
class Size extends Component {
  constructor(props){
    super(props);
  }

  render() {
    let inventory = this.props.product.colors[this.props.color].inventory;
    let stock = [];
    for (var i = 0; i < inventory.length; i++) {
      if (inventory[i].quantity > 0) {
        stock.push(<StyledInventory key={i} inventory={inventory[i]}>{inventory[i].size}</StyledInventory>)
      }
    }
    return (
      <RenderDiv>
        Select Size
        <br/><br/>
        <SizeTable>{stock}</SizeTable>
      </RenderDiv>
    );
  }
}

export default Size;