import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

class SearchBar extends Component{
  render() {
    return (
      <NewDiv>
        <form>
          Search for legal documents here:<br/>
            <NewInput type="text" name="Search"/>
            <Link to={`/SecondPage`} style={{textDecoration: 'none'}} >
              <button>
                Submit
              </button>
            </Link>
        </form>
      </NewDiv>
    );
  }
};

export default SearchBar;

const NewDiv = styled.div`
  width: 100%;
  vertical-align: middle;
  padding-top: 100px;
`
const NewInput = styled.input`
  width: 50%;
`
