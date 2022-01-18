import React from 'react';
import styled from 'styled-components'
import AddPlaylist from './components/AddPlaylist'
import SearchPlaylist from './components/SearchPlaylist'

const All = styled.div `
  text-align: center;
  background-color: yellow;
  color: black;
  width: 100vw;
  height: 100vh;
`
export default class App extends React.Component {
  state = {
    pagePlaylist: false,
    pageCreatePlaylist: true,
  }
  
  onClickListPage = () => {
    this.setState({
      pagePlaylist: true,
      pageCreatePlaylist: false,
    })
  }
  onClickCreatePage = () => {
    this.setState({
      pagePlaylist: false,
      pageCreatePlaylist: true,
    })
  }
  render(){
    const pages = () => {
      if (this.state.pageCreatePlaylist){
        return <AddPlaylist onClickListPage={this.onClickListPage}/>
      }
      if (this.state.pagePlaylist){
        return <SearchPlaylist onClickCreatePage={this.onClickCreatePage} />
      }
    }
    

    return (
      <All>
        {pages()}
      </All>
    )
  }
}
