import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown icon="th-list" name="Entities" id="entity-menu">
    <MenuItem icon="asterisk" to="/review">
      Review
    </MenuItem>
    <MenuItem icon="asterisk" to="/item">
      Item
    </MenuItem>
    <MenuItem icon="asterisk" to="/search">
      Search
    </MenuItem>
    <MenuItem icon="asterisk" to="/exchange/matching">
      Matching
    </MenuItem>
    <MenuItem icon="asterisk" to="/exchange">
      Ongoing Exchanges
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
