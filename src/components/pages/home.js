import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { Base64 } from "../base64/base64"

export default class Home extends Component {
   constructor(props) {
      super(props)

      this.state = {
         resumeFile: ""
      }
      this.handleChange = this.handleChange.bind(this)
   }

   handleChange(event) {
      var file = event.target.files[0];
      var tempDate = new Date(file.lastModified)
      var formattedDate = `${tempDate.getFullYear()}-${tempDate.getMonth() + 1}-${tempDate.getDate()}`
      console.log('data file, last modif', file, formattedDate);

      var reader = new FileReader();
      // reader.readAsArrayBuffer(file)

      reader.onload = (event) => {
         // var binaryData = event.target.result;
         // var base64String = window.btoa(binaryData);

         var base64Text = Base64.encodeArray(event.target.result);
         // console.log('base64', base64Text);

         const data = {
            DocumentAsBase64String: base64Text,
            RevisionDate: "2020-08-28"
         }

         const headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Sovren-AccountId": "12345678",
            "Sovren-ServiceKey": "eumey7feY5zjeWZW397Jks6PBj2NRKSH"
         }

         axios.post('https://rest.resumeparsing.com/v9/parser/resume',
            {
               data: JSON.stringify(data)
            },
            { headers: headers }
         )
            .then(response => {
               console.log('response', response.data);

            })
            .catch(error => {
               console.log('handleChange error', error);
            })


         // var obj = {
         //    method: 'POST',
         //    mode: 'no-cors',
         //    headers,
         //    body: JSON.stringify(data)
         // }

         // fetch('https://rest.resumeparsing.com/v9/parser/resume', obj)
         //    .then(response => {
         //       console.log('res', response.data);
         //    })
         //    .catch(error => {
         //       console.log('handleChange error', error);

         //    })
      }

      reader.readAsArrayBuffer(file);
   }

   render() {
      return (
         <div className="home-main-wrapper">
            <h2>Upload resume file</h2>

            <input type="file" name="file" onChange={this.handleChange} />
         </div>
      )
   }
}