import React from 'react';
import axios from 'axios'
import { axiosConfig } from "../constants/axiosConstants";
import Playlist from './Playlist'
import AddMusic from './AddMusic'
import Logotipo from '../img/labefy-logo.png'
import styled from 'styled-components'

const LogoStyled = styled.img`
    width: 60%;
    height: 10%;
    margin-top: 50px;
    margin-bottom: 50px;
    @media(min-width: 800px){
        width: 20%;
    }
`
const All = styled.div`
    font-family: 'Acme', sans-serif;
    height: 100vh;
` 
const Container = styled.div`
    background-color: grey;
    @media(min-width: 800px){
       font-size: 26px;
    }
    
`
const H5Styled = styled.h5`
    background-color: white;
    padding: 5px;
    border-radius: 10px;
    margin: 10px;

    &:hover {
        background-color: #8B5A2B;
    }
    
`
const ContainerSub = styled.div`
    display: flex;
    justify-content: center;
    margin: 5px;
    @media(min-width: 800px){
        
    }
    
`
const VoltarStyled = styled.h4`
    background-color: white;
    padding: 10px;
    margin: 10px;
    margin-top: 50px;
    width: 100px;
    border-radius:10px;
    align-self: center;
    @media(min-width: 800px){
       font-size: 26px;
    }
`
const ContainerVolt = styled.div`
    display: flex;
    justify-content: center;
    
`
const TitlePlaylist = styled.h3`
    color: yellow;
    
    
    
`
export default class SearchPlaylist extends React.Component {
    state = {
        allPlaylists: [],
        info: false,
        addMusic: false,
    }
    deletePlaylist = (id) => {
        axios.delete(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${id}`,
        axiosConfig )

        .then((response) => {
            alert(`Playlist deletada com sucesso!`)
            this.allPlaylists()
        })
        .catch((error) => {
            alert(`Não foi possível deletar sua Playlist, por favor tente novamente mais tarde.`)
        })

    }

    allPlaylists = () => {
        axios.get("https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists",
        axiosConfig )

        .then((response) => {
            this.setState({
                allPlaylists: response.data.result.list
            })
        })
        .catch((error) => {
            console.log(error)
        })
    }
   
    onClickInfo = () => {
        this.setState({
            info: !this.state.info,
            addMusic: false,
        })
    }
    onClickAddMusic = () => {
        this.setState({
            addMusic: !this.state.addMusic,
            info: false,
        })
    }

    componentDidMount = () => {
        this.allPlaylists()
    }
    MouseOver = (event) => {
        event.target.style.background = '#363636';
      }
    MouseOut = (event) =>{
        event.target.style.background="";
      }
    render() {
        const pageInfo = (id) => {
            if (this.state.info){
                return <Playlist idPlaylist={id}/>
            }
            if(this.state.addMusic){
                return <AddMusic idPlaylist={id} />
            }
        }
        return (
            <All>
                <LogoStyled src={Logotipo} />
                <h2>All Playlists</h2>
                
                {this.state.allPlaylists.map((list) => {
                    return (
                        <Container>
                            <TitlePlaylist key={list.id}>{list.name}</TitlePlaylist>
                            <ContainerSub>
                                <H5Styled onClick={() => { if (window.confirm(`Do you want to procede ${list.name}?`)) this.deletePlaylist(list.id) }}>Delete</H5Styled>
                                <H5Styled onClick={this.onClickInfo}>info +</H5Styled>
                                <H5Styled onClick={this.onClickAddMusic}>Add Track</H5Styled> 
                            </ContainerSub>
                            {pageInfo(list.id)}
                        </Container>
                    )
                })}
                <ContainerVolt>
                    <VoltarStyled onMouseOver={this.MouseOver} onMouseOut={this.MouseOut} onClick={this.props.onClickCreatePage}>Go back</VoltarStyled>
                </ContainerVolt>
            </All>
        )
    }
}