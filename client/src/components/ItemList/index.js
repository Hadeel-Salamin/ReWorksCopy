import React, { Component } from 'react';
import axios from 'axios';
import Title from '../Shared/Title';
import GButton from '../Shared/GreenButton';
import Footer from '../Shared/Footer';
import Item from '../Item';
import {
  List, StyledHeader, StyledBottom, StyledLink, GButtonContainer,
} from './itemlist.style';

class ItemList extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    itemlist: [],
    logged: '',
  };

  componentDidMount() {
    this.setState({ logged: this.props.location.logged });
    axios.get('/items')
      .then(res => this.setState({ itemlist: res.data.data }))
      .catch(err => console.log(err));
  }

  uploadPhoto = () => {
    const { history } = this.props;
    history.push({ pathname: '/upload-photo', logged1: this.state.logged });
  };

  render() {
    return (
      <React.Fragment>
        <Title />
        <StyledHeader>Your Items</StyledHeader>
        <List>
          <StyledLink type="button" onClick={this.uploadPhoto}>+ ADD NEW ITEM</StyledLink>
          {this.state.itemlist.map(item => <Item key={item.id} />)}
        </List>
        <StyledBottom>
          <GButtonContainer><GButton title="EXPORT AS CSV" /></GButtonContainer>
          <Footer />
        </StyledBottom>
      </React.Fragment>
    );
  }
}

export default ItemList;
