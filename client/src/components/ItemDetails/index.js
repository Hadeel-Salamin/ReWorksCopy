import React, { Component } from 'react';
import axios from 'axios';
import Title from '../Shared/Title';
import Form from '../Shared/Form';
import GButton from '../Shared/GreenButton';
import Button from '../Shared/Button';
import Footer from '../Shared/Footer';
import deleteIcon from './garbage.png';
import {
  itemType, condition, labelSize, age, colors,
} from '../../data';

import { ImgDiv, DeleteButton } from './itemdetails.style';

class ItemDetails extends Component {
  state = {
    itemDetails: this.props.location.itemDetails,
    isOpen: false,
    selectedCat: null,
    selected_brands: { id: '', brandName: '', name: '' },
    itemType,
    colors: [],
    brands: [],
    condition,
    labelSize,
    age,
    showDefaultOption: false,
  };

  componentDidMount() {
    const { itemDetails } = this.state;
    const clarifaiColors = itemDetails.colors.split(',');

    const clarifaiHex = itemDetails.colorshex.split(',');
    const allColors = [];
    clarifaiColors.map((color, i) => {
      allColors.push({ name: color, hex: clarifaiHex[i] });
    });


    allColors.filter((color) => {
      colors.map((color2, i) => {
        if (color.name === color2.name) {
          colors.splice(i, 1);
        }
      });
    });
    this.setState({
      selected_brands: {
        id: itemDetails.brandId,
        brandName: itemDetails.brand,
        name: itemDetails.brand,
      },
      selected_condition: itemDetails.condition,
      selected_labelSize: itemDetails.size,
      selected_age: itemDetails.age,
      selected_colors: itemDetails.color,
      selected_hex: itemDetails.hex,
      selected_itemType: itemDetails.type,
      selected_price: itemDetails.price,
      selected_details: itemDetails.details,
      colors: [...allColors, ...colors],
      clarifaiColors,
      clarifaiHex,
    });

    axios.get('/getbrands').then(({ data }) => {
      if (data.success) {
        const brands = data.data;
        this.setState({ brands });
      }
    });
  }

  goBack = () => {
    const { history } = this.props;
    history.push('/item-list');
  };

  deleteItem = () => {
    const { history } = this.props;
    const id = this.state.itemDetails.itemId;

    axios
      .get(`/delete-item/${id}`)
      .then(({ data }) => {
        if (data.success) {
          history.push('/item-list');
        }
      })
      .catch(() => history.push('/error'));
  };

  toggleOpen = (e) => {
    const { value, name } = e.target;
    if (value === 'more') {
      this.setState({ isOpen: true, selectedCat: name });
    } else if (name === 'brands') {
      const value1 = JSON.parse(value);
      this.setState({ [`selected_${name}`]: { id: value1.id, brandName: value1.name } });
    } else if (name === 'colors') {
      const { colors } = this.state;
      const color = colors.filter(x => (x.name === value ? x.hex : null));
      this.setState({ selected_hex: color[0].hex, selected_colors: color[0].name, isOpen: false });
    } else {
      this.setState({ [`selected_${name}`]: value });
    }
  };

  toggleClose = (e) => {
    e.preventDefault();
    this.setState({ isOpen: false });
  };

  changeSelected = (e) => {
    e.preventDefault();
    const { value, name, id } = e.target;
    const selected = `selected_${this.state.selectedCat}`;
    if (name === 'brands') {
      const value1 = JSON.parse(value);
      this.setState({ [selected]: { id, brandName: value1.name, name: value }, isOpen: false });
    } else if (name === 'colors') {
      const { colors } = this.state;
      const color = colors.filter(x => (x.name === value ? x.hex : null));
      this.setState({ selected_hex: color[0].hex, selected_colors: color[0].name, isOpen: false });
    } else {
      this.setState({ [selected]: value, isOpen: false });
    }
  };

  checkForChanges = () => {
    const {
      selected_brands,
      selected_condition,
      selected_labelSize,
      selected_age,
      selected_colors,
      selected_itemType,
      selected_price,
      selected_details,
      itemDetails,
    } = this.state;

    const itemDetailsArray = [];
    const updateItemDetails = [];

    const keys = Object.keys(itemDetails);

    keys.map((key) => {
      itemDetailsArray.push(itemDetails[key]);
    });

    updateItemDetails.push(
      itemDetails.itemId,
      selected_itemType,
      selected_labelSize,
      itemDetails.url,
      itemDetails.name,
      selected_price,
      selected_colors,
      selected_brands.brandName,
      selected_condition,
      selected_age,
      selected_details,
      selected_brands.id,
      itemDetails.colors,
    );

    let flag = false;
    itemDetailsArray.map((object, i) => {
      if (object !== updateItemDetails[i]) {
        flag = true;
      }
    });

    return flag;
  };

  updateItem = () => {
    const updatedFlag = this.checkForChanges();
    const { history } = this.props;
    const id = this.state.itemDetails.itemId;
    const {
      selected_brands,
      selected_condition,
      selected_labelSize,
      selected_age,
      selected_colors,
      selected_hex,
      selected_itemType,
      selected_price,
      selected_details,
      itemDetails,
    } = this.state;

    const newUpdates = {
      size: selected_labelSize,
      type: selected_itemType,
      price: selected_price,
      brandId: selected_brands.id,
      condition: selected_condition,
      details: selected_details,
      color: selected_colors,
      hex: selected_hex,
      age: selected_age,
    };

    if (updatedFlag) {
      axios
        .put(`/edit-item/${id}`, newUpdates)
        .then(({ data }) => {
          if (data.success) {
            history.push('/item-list');
          }
        })
        .catch(() => history.push('/error'));
    }
    history.push('/item-list');
  };

  render() {
    const { url } = this.state.itemDetails;
    return (
      <React.Fragment>
        <Title {...this.props} />
        <ImgDiv>
          <DeleteButton onClick={this.deleteItem}>
            <img src={deleteIcon} alt="delete icon" />
          </DeleteButton>
        </ImgDiv>
        <Form
          image={url}
          {...this.state}
          toggleOpen={this.toggleOpen}
          toggleClose={this.toggleClose}
          changeSelected={this.changeSelected}
        />
        <Button onClick={this.goBack} />
        <GButton title="Save" onClick={this.updateItem} />
        <Footer />
      </React.Fragment>
    );
  }
}

export default ItemDetails;
