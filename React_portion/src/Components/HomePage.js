import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar.js'

class HomePage extends Component{
  render() {
    return (
      <div>
        <SearchBar/>
      </div>
    )
  }
}

export default HomePage;
