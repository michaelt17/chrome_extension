import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Card from './Card.js'

class SecondPage extends Component{
  render() {
    return (
      <div>
        <Card textdata="Marbury v. Madison"/>
        <Card textdata="Roe v. Wade"/>
      </div>
    );
  }
};



export default SecondPage;
