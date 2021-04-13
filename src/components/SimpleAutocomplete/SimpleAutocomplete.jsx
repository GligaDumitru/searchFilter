import React, { Component } from 'react';
import Input from './../shared/InputText/Input';
import Autocomplete from './../CustomAutocomplete/CustomAutocomplete';
import { getElementsMatched } from '../../utils/Helper';
import { KEYS, SEARCH_TERMS } from './../../data-mock';
import { AUTOCOMPLETE_TYPES } from '../../data-mock';
import { connect } from 'react-redux';
import { addFilter } from './../../redux/actions/main';
import { createStructuredSelector } from 'reselect';
import { selectCreatedFilters } from './../../redux/selectors/main';

const PHASES = {
  DEFAULT_PHASE: 'DEFAULT_PHASE',
  STEP_TWO_STATUS_SELECT: 'STEP_TWO_STATUS_SELECT',
  STEP_TWO_MULTI_SELECT_TYPE: 'STEP_TWO_MULTI_SELECT_TYPE',
  STEP_TWO_COMPLETE_TYPE: 'STEP_TWO_COMPLETE_TYPE',
  STEP_THREE_MULTI_SELECT_TYPE: 'STEP_THREE_MULTI_SELECT_TYPE',
};
const initialState = {
  searchField: '',
  searchFieldTemp: '',
  placeholder: 'Type Here..',
  open: false,
  items: [],
  phase: PHASES.DEFAULT_PHASE,
  currentItem: null,
  type: '',
};
class SimpleAutocomplete extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.inputRef = React.createRef();
  }

  onBlur = ({ relatedTarget }) => {
    if (!!relatedTarget === false) {
      this.setState({
        open: false,
      });
    }
  };

  setInitialPhase = (item) => {
    const { type, name, options } = item;
    switch (type) {
      case AUTOCOMPLETE_TYPES.MULTI_SELECT_TYPE:
        this.setState({
          searchField: `${name} `,
          items: options,
          open: true,
          phase: PHASES.STEP_TWO_MULTI_SELECT_TYPE,
          currentItem: item,
          type: '',
        });
        break;
      case AUTOCOMPLETE_TYPES.COMPLETE_TYPE:
        this.setState({
          searchFieldTemp: `${name} `,
          searchField: '',
          placeholder: `Type the value for ${name}...`,
          items: options,
          open: true,
          phase: PHASES.STEP_TWO_COMPLETE_TYPE,
          type: AUTOCOMPLETE_TYPES.COMPLETE_TYPE,
          currentItem: item,
        });
        break;
      default:
        break;
    }
  };

  setPhaseTwo = ({ name }) => {
    const {
      currentItem: { type = '', values = [] },
      searchField,
      searchFieldTemp,
    } = this.state;
    const arrayOfWords = name.split(' ');
    switch (type) {
      case AUTOCOMPLETE_TYPES.MULTI_SELECT_TYPE:
        this.setState({
          searchField: `${searchField}${arrayOfWords[0]} `,
          items: values,
          open: true,
          phase: PHASES.STEP_THREE_MULTI_SELECT_TYPE,
          type: AUTOCOMPLETE_TYPES.MULTI_SELECT_TYPE,
        });
        break;
      case AUTOCOMPLETE_TYPES.COMPLETE_TYPE:
        const _newFilter = `${searchFieldTemp}${arrayOfWords[0]} ${searchField}`;
        this.props.addFilter(_newFilter);
        this.setState({
          searchFieldTemp: '',
          searchField: '',
          placeholder: `Type here...`,
          items: SEARCH_TERMS,
          open: false,
          phase: PHASES.DEFAULT_PHASE,
          type: '',
        });
        break;
      default:
        break;
    }
  };

  setPhaseThree = (item) => {
    const {
      currentItem: { type = '' },
      searchField,
    } = this.state;
    switch (type) {
      case AUTOCOMPLETE_TYPES.MULTI_SELECT_TYPE:
      default:
        const _newItem = `${searchField} ${item.name}`;
        this.props.addFilter(_newItem);
        this.setState({
          searchFieldTemp: '',
          searchField: '',
          items: [],
          open: false,
          phase: PHASES.DEFAULT_PHASE,
          type: '',
        });
    }
  };

  focusOnInput = () => {
    this.inputRef.current.focus();
  };

  handleClickList = (item) => {
    const { phase } = this.state;
    this.focusOnInput();
    switch (phase) {
      case PHASES.STEP_THREE_MULTI_SELECT_TYPE:
        this.setPhaseThree(item);
        break;
      case PHASES.STEP_TWO_STATUS_SELECT:
      case PHASES.STEP_TWO_MULTI_SELECT_TYPE:
      case PHASES.STEP_TWO_COMPLETE_TYPE:
        this.setPhaseTwo(item);
        break;
      default:
        this.setInitialPhase(item);
    }
  };

  onChange = ({ target: { name, value } }) => {
    const { phase } = this.state;
    switch (phase) {
      case PHASES.STEP_TWO_COMPLETE_TYPE:
        this.setState({
          [name]: value,
          open: value.length > 0,
        });
        break;
      default:
        this.setState({
          [name]: value,
          open: value.length > 0,
          items: getElementsMatched(SEARCH_TERMS, value),
        });
    }
  };

  onKeyDown = (evt) => {
    if (evt.keyCode === KEYS.ESC_KEY) {
      this.setState(initialState);
    }
  };

  render() {
    const { searchField, placeholder, open, items, type } = this.state;
    return (
      <>
        <Input
          ref={this.inputRef}
          name='searchField'
          value={searchField}
          placeholder={placeholder}
          onChange={this.onChange}
          onBlur={this.onBlur}
          onKeyDown={this.onKeyDown}
        />
        <Autocomplete
          type={type}
          open={open}
          className='autocomplete_wrapper left-bottom'
          items={items}
          searchField={searchField}
          onClick={this.handleClickList}
        />
      </>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  createdFilters: selectCreatedFilters,
});

const mapDispatchToProps = (dispatch) => ({
  addFilter: (el) => dispatch(addFilter(el)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SimpleAutocomplete);
