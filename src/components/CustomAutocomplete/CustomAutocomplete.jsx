import React from 'react';
import PropTypes from 'prop-types';
import { AUTOCOMPLETE_TYPES } from '../../data-mock';
import { findAndBoldChars } from './../../utils/Helper';
import noop from 'lodash/noop';

const DefaultType = ({ onClick, searchField, item }) => (
  <span
    tabIndex='0'
    className='autocomplete_item'
    onClick={() => onClick(item)}
    dangerouslySetInnerHTML={{
      __html: findAndBoldChars(item.name || item, searchField),
    }}
  ></span>
);

const CustomType = ({ onClick, item, type, value }) => {
  const customClassName = `autocomplete_item ${type}`;

  return (
    <div tabIndex='0' className={customClassName} onClick={() => onClick(item)}>
      <span>{item.name}</span>
      {type === AUTOCOMPLETE_TYPES.MULTI_SELECT_TYPE && (
        <span className={`type ${item.label}`}>&bull;</span>
      )}
      {type === AUTOCOMPLETE_TYPES.COMPLETE_TYPE && (
        <span className='value'>{value && ` "${value}"`}</span>
      )}
    </div>
  );
};

const Autocomplete = ({
  className,
  open,
  items,
  onClick,
  searchField,
  type,
}) => {
  const renderCustomOptions = () => {
    return items.map((item, index) => (
      <CustomType
        key={`${item.label}-${index}`}
        onClick={onClick}
        item={item}
        value={searchField}
        type={type}
      />
    ));
  };

  const renderDefaultOptions = () => {
    return items.map((item, index) => (
      <DefaultType
        key={`${item.label}-${index}`}
        onClick={onClick}
        searchField={searchField}
        item={item}
      />
    ));
  };

  const renderAutocomplete = () => {
    switch (type) {
      case AUTOCOMPLETE_TYPES.MULTI_SELECT_TYPE:
      case AUTOCOMPLETE_TYPES.COMPLETE_TYPE:
        return renderCustomOptions();
      default:
        return renderDefaultOptions();
    }
  };

  return (
    <div className={className}>{open && items && renderAutocomplete()}</div>
  );
};

Autocomplete.propTypes = {
  onClick: PropTypes.func,
  open: PropTypes.bool,
  type: PropTypes.string,
  items: PropTypes.array,
  searchField: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
};

Autocomplete.defaultProps = {
  onClick: noop,
  open: false,
  type: '',
  items: [],
  searchField: '',
  className: '',
};

export default Autocomplete;
