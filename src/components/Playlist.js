import React from 'react';
import axios from 'axios'
import { axiosConfig } from "../constants/axiosConstants"
import SearchPlaylist from './SearchPlaylist'
import styled from 'styled-components'

const All = styled.div`
    background-color: blueviolet;
    
`
const Container = styled.div`
    background-color: blueviolet;
    
    
`
const Delet = styled.span`
    color: red;
    padding: 5px;
    background-color: #696969;
    border-radius: 5px;
    align-self: center;
    &:hover {
        background-color: #9C9C9C;
    }
    @media(min-width: 800px) {
        margin-left: 15px;
    }
`
const ContainerTwo = styled.div`
    display:flex;
    justify-content: space-around;
    @media(min-width: 800px){
        justify-content: center;
        
    }
`

export default class Playlist extends React.Component {
    state = {
        playlist: [],
    }
    infoPlaylist = (id) => {
        axios.get(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${id}/tracks`,
        axiosConfig )

        .then((response) => {
            this.setState({
                playlist: response.data.result.tracks
            })
        })
        .catch((error) => {
            console.log(error)
        })
    }
    deletMusic = (idPlaylist, id) => {
        axios.delete(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${idPlaylist}/tracks/${id}`,
        axiosConfig )

        .then((response) => {
            alert(`Song deleted`)
            this.infoPlaylist(this.props.idPlaylist)
        })
        .catch((error) => {
            alert(`Please, try again`)
        })
    }
    componentDidMount = () => {
        this.infoPlaylist(this.props.idPlaylist)
    }
    render() {
        return(
            <All>
                {this.state.playlist.map((music) => {
                    return(
                         <Container>
                            <p key={music.id}>{music.name}</p>
                            <ContainerTwo>
                                <audio  controls="controls">
                                <source src={music.url} type="audio/mp3" />
                                </audio>
                                <Delet onClick={() => { if (window.confirm(`Do you want to procede ${music.name}?`)) this.deletMusic(this.props.idPlaylist, music.id) }}>X</Delet>
                            </ContainerTwo>
                        </Container>
                    )          
                    })}
            </All>
        )
    }
}