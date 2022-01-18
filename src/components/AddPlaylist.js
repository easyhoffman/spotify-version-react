import React from 'react';
import axios from 'axios'
import { axiosConfig } from "../constants/axiosConstants";
import Logotipo from '../img/labefy-logo.png'
import styled from 'styled-components'


const LogotipoStyled = styled.img`
    width: 45%;
    height: 50%;
    margin-top: 100px;
    @media(max-width: 380px){
        width: 85%;
    }
    
`
const AllCreate = styled.div`
font-family: 'Acme', sans-serif;
 
`
const CreateStyled = styled.div `
    margin-top: 100px;
    display:flex;
    justify-content:center;
    flex-direction: column;
    @media(max-width: 380px){
        font-size: 10px;
        margin-top: 70px;
    }
`
const ButtonPers = styled.button`
  background-color: #fd9024;
  margin: 20px 4px 10px 3px;
  text-decoration: none;
  border: none;
  border-radius: 10px;
  padding: 10px 10px;
  color: white;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: bold;
  width: 100px;
  outline: none;
  align-self: center;
  flex-direction: row;  
  
`
const InputPers = styled.input`
  background-color: #F1F1F3;
  border: none;
  width: ${props => props.width};
  height: 40px;
  outline: none;
  margin: 10px 2px 10px 3px;
  border-radius: 5px;
  width: 220px;
  align-self: center;
  @media(max-width: 380px){
       width: 180px;
    }
    
`
const AcessStyled = styled.h2`
    margin-top: 50px;
    text-decoration: underline;
    width: 330px;
    padding: 10px;
    border-radius: 10px;
    align-self: center;
`
export default class AddPlaylist extends React.Component {
    state = {
        namePlaylist: ""
    }

createName = (event) => {
    this.setState({
        namePlaylist: event.target.value
    })
}

createPlaylist = () => {
    const body = {
        name: this.state.namePlaylist
    }
    axios.post("https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists",
    body, axiosConfig )
    .then((response) => {
        alert(`Playlist ${this.state.namePlaylist} Done!`)
        this.setState({namePlaylist: ""})
    })
    .catch((error) => {
        alert(`Playlist ${this.state.namePlaylist} PLease, try again`)
    })
}
MouseOver = (event) => {
    event.target.style.background = '#363636';
  }
MouseOut = (event) =>{
    event.target.style.background="";
  }
  pressEnter = (event) => {
    if (event.key === 'Enter'){
      this.createPlaylist()
  } }
    render() {
    
        return (
            <AllCreate>
                <LogotipoStyled src={Logotipo} />
                <CreateStyled>
                    <h1>Create Playlist</h1>
                    <InputPers onKeyDown={this.pressEnter} placeholder="Playlist Name" onChange={this.createName} value={this.state.namePlaylist} />
                    <ButtonPers onClick={this.createPlaylist}>Enter!</ButtonPers>
                    <AcessStyled onMouseOver={this.MouseOver} onMouseOut={this.MouseOut} onClick={this.props.onClickListPage}>Check your playlists out!</AcessStyled>
                </CreateStyled>
                
            </AllCreate>
        )
    }
}