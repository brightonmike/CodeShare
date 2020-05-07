import React from 'react';
import PropTypes from 'prop-types';

import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';

export default function PillRenderer(props) {
  const { type = '', items = [], values = [], onChange } = props;

  const isActive = value => {
    return values.includes(value) ? 'secondary' : 'default';
  };

  const valueList = [];
  for (const value of items) {
    valueList.push(<Chip
      size="small"
      avatar={<Avatar>{value.charAt(0)}</Avatar>}
      label={value}
      key={type + value}
      clickable
      color={isActive(value)}
      onClick={() => { onChange(value) }}
    />)
  }

  return (  
    <>
    {valueList}
    </>
  );
}

PillRenderer.propTypes = {
  type: PropTypes.string,
  items: PropTypes.array,
  values: PropTypes.array,
  onChange: PropTypes.func
};