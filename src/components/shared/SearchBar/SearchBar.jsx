import React, { Component } from 'react';
import { createStructuredSelector } from 'reselect';
import SimpleAutocomplete from './../../SimpleAutocomplete/SimpleAutocomplete';
import {
  selectCreatedFilters,
  selectHistoryFilters,
} from './../../../redux/selectors/main';
import { connect } from 'react-redux';
import { removeFilter } from '../../../redux/actions/main';
import Chip from './../Chip/Chip';
import { clearFilters, addFilter } from './../../../redux/actions/main';
import Autocomplete from './../../CustomAutocomplete/CustomAutocomplete';
import noop from 'lodash/noop';
import PropTypes from 'prop-types';

class SearchBar extends Component {
  state = {
    openHistory: false,
  };
  renderCreatedFilters = () => {
    const { createdFilters, removeFilter } = this.props;
    return (
      createdFilters &&
      createdFilters.length > 0 &&
      createdFilters.map((item, index) => (
        <Chip key={index} value={item} onClick={removeFilter} />
      ))
    );
  };
  renderSavedFilters = () => (
    <div className='search_saved-filters'>
      <i className='fas fa-search '></i>
      {this.renderCreatedFilters()}
    </div>
  );
  renderHistoryFilters = () => (
    <div
      onClick={() => this.setState({ openHistory: !this.state.openHistory })}
      className='search_history-filters'
    >
      <i className='fas fa-filter '></i>
      <Autocomplete
        open={this.state.openHistory}
        className='autocomplete_wrapper right-bottom'
        items={this.props.historyFilters}
        onClick={this.handleClickHistoryFilter}
      />
    </div>
  );
  renderClearAllFilters = () => {
    const { clearFilters } = this.props;
    return (
      <div
        title='Clear All Filters'
        onClick={() => clearFilters()}
        className='search_history-filters'
      >
        <i className='fas fa-trash-alt'></i>
      </div>
    );
  };
  handleClickHistoryFilter = (item) => {
    this.props.addFilter(item);
    this.setState({
      openHistory: false,
    });
  };
  render() {
    return (
      <div className='search_container'>
        <div className='search_wrapper'>
          {this.renderSavedFilters()}
          <SimpleAutocomplete />
          {this.renderHistoryFilters()}
        </div>
        {this.renderClearAllFilters()}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  createdFilters: selectCreatedFilters,
  historyFilters: selectHistoryFilters,
});

const mapDispatchToProps = (dispatch) => ({
  addFilter: (el) => dispatch(addFilter(el)),
  removeFilter: (el) => dispatch(removeFilter(el)),
  clearFilters: () => dispatch(clearFilters()),
});

SearchBar.propTypes = {
  createdFilters: PropTypes.array,
  historyFilters: PropTypes.array,
  addFilter: PropTypes.func,
  removeFilter: PropTypes.func,
  clearFilters: PropTypes.func,
};

SearchBar.defaultProps = {
  createdFilters: [],
  historyFilters: [],
  addFilter: noop,
  removeFilter: noop,
  clearFilters: noop,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
