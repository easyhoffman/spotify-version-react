import React from 'react';
import axios from 'axios'
import { axiosConfig } from "../constants/axiosConstants";
import styled from 'styled-components'

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
       width: 100px;
    }
    
`
const ButtonPers = styled.button`
    background-color: #696969;
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
    &:hover {
        background-color: #9C9C9C;
    }

`

export default class AddMusic extends React.Component {
    state = {
        nameMusic: "",
        nameArtist: "",
        url: "",
    }
    createMusic = (id) => {
        const body = {
            name: this.state.nameMusic,
            artist: this.state.nameArtist,
            url: this.state.url
        }
        axios.post(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${id}/tracks`,
        body, axiosConfig )
        .then((response) =>{
            alert(`Track added!`)
            
        })
        .catch((error) => {
            alert(`Please try again`)
        })
    }
    onChangeNameArtist = (event) =>{
        this.setState({
            nameArtist: event.target.value
        })
    }
    onChangeNameMusic = (event) =>{
        this.setState({
            nameMusic: event.target.value
        })
    }
    onChangeUrl = (event) =>{
        this.setState({
            url: event.target.value
        })
    }
    
    render() {
        return (
            <div>
                <InputPers onChange={this.onChangeNameArtist} placeholder="Artist"/>
                <InputPers onChange={this.onChangeNameMusic} placeholder="Track"/>
                <InputPers onChange={this.onChangeUrl} placeholder="URL"/>
                <ButtonPers onClick={() => this.createMusic(this.props.idPlaylist)}>Add</ButtonPers>
            </div>
        )
    }
}