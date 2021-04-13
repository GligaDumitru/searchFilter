import React, { Component } from 'react';

import CustomAutocomplete from './../CustomAutocomplete/CustomAutocomplete';
import InputText from './../shared/InputText/InputText';
import Chip from './../shared/Chip/Chip';

import {
  SEARCH_TERMS,
  MULTI_SELECT_OPTIONS,
  STATUS_OPTIONS,
  COMPLETE_OPTIONS,
  AUTOCOMPLETE_TYPES,
} from './../../data-mock';

export default class CustomSearchFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      autocompleteModalIsOpen: false,
      optionsForAutocomplete: SEARCH_TERMS,
      step: 1,
      filtersData: [],
      typeAutocomplete: '',
      placeholderText: 'Type here...',
      setFocusBoolean: false,
    };
  }
  beforeInput = () => {
    const { filtersData } = this.state;
    return (
      <div className='search_beforeInput'>
        <i className='fas fa-search '></i>
        {filtersData &&
          filtersData.map((filt, ind) => (
            <Chip
              key={ind}
              value={filt}
              index={ind}
              callback={this.removeItemFromFilters}
            />
          ))}
      </div>
    );
  };

  removeItemFromFilters = (value) => {
    let _tempArray = [...this.state.filtersData].filter((el) => el !== value);

    this.setState({
      filtersData: _tempArray,
    });
  };
  afterInput = () => {
    return (
      <div className='search_afterInput'>
        <i className='fas fa-filter'></i>
      </div>
    );
  };

  handleStepOne = ({ label, name }) => {
    const { setFocusBoolean } = this.state;
    switch (label) {
      case 'status':
        this.setState({
          searchQuery: name + ' ',
          autocompleteModalIsOpen: true,
          optionsForAutocomplete: MULTI_SELECT_OPTIONS,
          step: 2,
          typeAutocomplete: 'MULTI_SELECT_TYPE',
        });
        break;
      default:
        this.setState({
          backupQuery: name + ' ',
          searchQuery: '',
          placeholderText: `Type the value for ${name}..`,
          autocompleteModalIsOpen: true,
          optionsForAutocomplete: COMPLETE_OPTIONS,
          step: 2,
          typeAutocomplete: 'COMPLETE_TYPE',
          setFocusBoolean: !setFocusBoolean,
        });
    }
  };

  handleStepTwo = ({ name, label }) => {
    const {
      searchQuery,
      typeAutocomplete,
      filtersData,
      backupQuery,
    } = this.state;
    const arrayItem = name.split(' ');
    const _temp = [...filtersData, `${backupQuery}${name[0]} ${searchQuery}`];

    switch (typeAutocomplete) {
      case AUTOCOMPLETE_TYPES.MULTI_SELECT_TYPE:
        this.setState({
          searchQuery: searchQuery + arrayItem[0] + ' ',
          autocompleteModalIsOpen: true,
          optionsForAutocomplete: STATUS_OPTIONS,
          placeholderText: 'Type here...',
          step: 3,
          typeAutocomplete: AUTOCOMPLETE_TYPES.STATUS_TYPE,
        });
        break;
      default:
        this.setState({
          filtersData: _temp,
          searchQuery: '',
          placeholderText: 'Type here...',
          autocompleteModalIsOpen: false,
          optionsForAutocomplete: SEARCH_TERMS,
          step: 1,
          typeAutocomplete: '',
        });
    }
  };

  handleStepThree = ({ name, label }) => {
    const { typeAutocomplete } = this.state;
    const { searchQuery, filtersData } = this.state;
    const _temp = [...filtersData, `${searchQuery}${name}`];

    switch (typeAutocomplete) {
      case AUTOCOMPLETE_TYPES.STATUS_TYPE:
        this.setState({
          filtersData: _temp,
          searchQuery: '',
          autocompleteModalIsOpen: false,
          optionsForAutocomplete: SEARCH_TERMS,
          step: 1,
          typeAutocomplete: '',
          placeholderText: 'Type Here...',
        });
        break;
      default:
        break;
    }
  };

  handleOnClickAutocomplete = (item) => {
    const { step } = this.state;

    switch (step) {
      case 3:
        this.handleStepThree(item);
        break;
      case 2:
        this.handleStepTwo(item);
        break;
      default:
        this.handleStepOne(item);
    }
  };

  checkMatchFound = (value) => {
    const isMatch = SEARCH_TERMS.filter(
      (term) => `${term.label} ` === value.toLowerCase()
    );

    return isMatch;
  };

  handleOnChangeInput = ({ target: { value } }) => {
    const { typeAutocomplete } = this.state;

    switch (typeAutocomplete) {
      case AUTOCOMPLETE_TYPES.COMPLETE_TYPE:
        this.setState({
          searchQuery: value,
        });
        break;
      default: {
        const filteredValue = SEARCH_TERMS.filter((item) =>
          item.label.toLowerCase().includes(value.toLowerCase())
        );
        this.setState({
          optionsForAutocomplete: filteredValue,
          searchQuery: value,
        });
      }
    }
  };

  handleOnBlur = ({ relatedTarget }) => {
    if (!!relatedTarget === false) {
      this.setState({
        autocompleteModalIsOpen: false,
      });
    }
  };

  handleOnFocus = (e) => {
    const { typeAutocomplete } = this.state;

    switch (typeAutocomplete) {
      case AUTOCOMPLETE_TYPES.COMPLETE_TYPE:
        break;
      default: {
        const filteredValue = SEARCH_TERMS.filter((item) =>
          item.label
            .toLowerCase()
            .includes(this.state.searchQuery.toLowerCase())
        );
        this.setState({
          optionsForAutocomplete: filteredValue,
        });
      }
    }
  };

  handleOnClickInput = (e) => {
    this.setState({
      autocompleteModalIsOpen: true,
    });
  };

  render() {
    const {
      autocompleteModalIsOpen,
      optionsForAutocomplete,
      searchQuery,
      typeAutocomplete,
      placeholderText,
      setFocusBoolean,
    } = this.state;
    return (
      <div className='CustomSearchFilterNav'>
        <div className='search_container'>
          {this.beforeInput()}
          <InputText
            className='search_inputFilter flex_full'
            name='searchQuery'
            value={searchQuery}
            placeholder={placeholderText}
            setFocusBoolean={setFocusBoolean}
            onChange={this.handleOnChangeInput}
            onFocus={this.handleOnFocus}
            onClick={this.handleOnClickInput}
            onBlur={this.handleOnBlur}
          />
          {this.afterInput()}

          <CustomAutocomplete
            open={autocompleteModalIsOpen}
            className='search_autocompleteOptions left-bottom'
            items={optionsForAutocomplete}
            onClickFn={this.handleOnClickAutocomplete}
            searchQuery={searchQuery}
            optionType={typeAutocomplete}
          />
          {/* <CustomAutocomplete className='search_historyFilter right-bottom' /> */}
        </div>
      </div>
    );
  }
}
