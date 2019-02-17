import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

class Card extends Component{

  submitData = (buttonColor,articleName) => {
    if (buttonColor == "Green"){
      console.log("you liked this article: " + articleName);
    }
    else if (buttonColor == "Red") {
      console.log("you did not like this article: " + articleName);
    }

    // let greeting = "hello";
    // console.log(greeting);
    // try{
    //   let Excel = require("exceljs");
    //   var workbook = new Excel.Workbook();
    //   workbook.xlsx.readFile("../../extension_sheet");
    //   var worksheet = workbook.getWorksheet('Sheet1');
    //   console.log(worksheet.getCell('A1').value);
    // }
    // catch(error){
    //   console.log(error);
    // }



    // var fileName = "/Users/michaeltamkin/Desktop/Compsci/EECS397_Law/extension_sheet";
    // var sheetName = "Sheet1";
    // var sheet = book.Sheets.Item(sheetName);
    // console.log(sheet.Cells.Item(1,1));
    // rowCount = app.ActiveSheet.UsedRange.Rows.Count + 1;
    // colCount = 1;
    //sheet.Cells(1,1) = "test";  //-----> try sheet.Cells(1,1)= "test";  instead of  app.Cells(1,1)= "test";

  }


  render() {
    return (
      <CardDiv>
        <GreenButton type="submit" onClick={() => this.submitData("Green",this.props.textdata)}>+</GreenButton>
        <RedButton type="submit" onClick={() => this.submitData("Red",this.props.textdata)}>-</RedButton>
        <TitleDiv>
          <h3>{this.props.textdata}</h3>
        </TitleDiv>
      </CardDiv>
    );
  }
};

const CardDiv = styled.div`
  height: 100px;
  background-color: lightgray;
`

const TitleDiv = styled.div`
  vertical-align:middle;
`

const RedButton = styled.button`
  background-color: red;
  border: none;
  color: white;
  padding: 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  border-radius: 50%;
  float: left;
  vertical-align:middle;
`

const GreenButton = styled.button`
  background-color: green;
  border: none;
  color: white;
  padding: 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  border-radius: 50%;
  float: left;
  vertical-align:middle;
`

export default Card
