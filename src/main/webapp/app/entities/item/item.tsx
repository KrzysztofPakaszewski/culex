import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { openFile, byteSize, ICrudGetAllAction, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {Checkbox} from "@material-ui/core";
import { IRootState } from 'app/shared/reducers';
import { getEntities, getEntity } from './item.reducer';
import { IItem } from 'app/shared/model/item.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import {getCurrentlyLoggedUser, getUser} from "app/modules/administration/user-management/user-management.reducer";

export interface IItemProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type IItemState = IPaginationBaseState;

export class Item extends React.Component<IItemProps, IItemState> {
  state: IItemState = {
    ...getSortState(this.props.location, ITEMS_PER_PAGE)
  };

  componentDidMount() {
    this.getEntities();
  }

  sort = prop => () => {
    this.setState(
      {
        order: this.state.order === 'asc' ? 'desc' : 'asc',
        sort: prop
      },
      () => this.sortEntities()
    );
  };

  sortEntities() {
    this.getEntities();
    this.props.history.push(`${this.props.location.pathname}?page=${this.state.activePage}&sort=${this.state.sort},${this.state.order}`);
  }

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { itemList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="item-heading">
          All items
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create new item
          </Link>
        </h2>
        <div className="table-responsive">
          {itemList && itemList.length > 0 ? (
            <Table responsive aria-describedby="item-heading">
              <thead>
              <tr>
                <th className="hand" >
                  Image
                </th>
                <th className="hand" onClick={this.sort('title')}>
                  Title <FontAwesomeIcon icon="sort" />
                </th>
                <th  className="hand" onClick={this.sort('category')}>
                  Category <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" >
                  State
                </th>
                <th className="hand" onClick={this.sort('preferedDelivery')}>
                  Prefered Delivery <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('preferences')}>
                  Preferences <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" >
                  Hashtags
                </th>
                <th className="hand">
                  Owner
                </th>
                <th />
              </tr>
              </thead>
              <tbody>
              {itemList.map((item, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    {item.image ? (
                      <div>
                        <a onClick={openFile(item.imageContentType, item.image)}>
                          <img src={`data:${item.imageContentType};base64,${item.image}`} style={{ maxHeight: '30px' }} />
                          &nbsp;
                        </a>
                        <span>
                          </span>
                      </div>
                    ) : null}
                  </td>
                  <td>
                    <Button tag={Link} to={`${match.url}/${item.id}/detail`} color="link" size="sm">
                      {item.title}
                    </Button>
                  </td>
                  <td>{item.category}</td>
                  <td>{item.state}</td>
                  <td>{item.preferedDelivery}</td>
                  <td>{item.preferences}</td>
                  <td>{item.hash}</td>
                  <td>
                  {item.owner ?(
                    <Button tag={Link} to={`user/${item.owner.login}`} color="link" size="sm">
                      {item.owner.login}
                    </Button>
                    ) : ''}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${item.id}/detail`} color="info" size="sm" >
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${item.id}/edit`} color="primary" size="sm" >
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${item.id}/delete`} color="danger" size="sm" >
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">No Items found</div>
          )}
        </div>
        <div className={itemList && itemList.length > 0 ? '' : 'd-none'}>
          <Row className="justify-content-center">
            <JhiItemCount page={this.state.activePage} total={totalItems} itemsPerPage={this.state.itemsPerPage} />
          </Row>
          <Row className="justify-content-center">
            <JhiPagination
              activePage={this.state.activePage}
              onSelect={this.handlePagination}
              maxButtons={5}
              itemsPerPage={this.state.itemsPerPage}
              totalItems={this.props.totalItems}
            />
          </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  itemList: storeState.item.entities,
  totalItems: storeState.item.totalItems,
  item: storeState.item.entity,
  loggedUser: storeState.userManagement.user
});

const mapDispatchToProps = {
  getEntities,
  getCurrentlyLoggedUser,
  getEntity
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Item);
