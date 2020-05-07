import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Color from '../client/src/components/Color';

// json data will be used to generate props
var data = require('../db/data.json');

function setup() {
  const props = {
    color: 0,
    product: data[0],
    isSelected: false,
    handleColorChange: () => {}
  };
  const wrapper = shallow(<Color color={props.color} product={props.product} isSelected={props.isSelected} handleColorChange={props.handleColorChange}/>);
  return { wrapper, props };
}

describe('Color Component Test Suite', () => {
  const { wrapper, props } = setup();

  it('It should render', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('It should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});