import React, { Fragment, Component } from "react";
import Repos from "../repos/Repos";
import Spinner from "../layout/Spinner";
import PropTypes from "prop-types";
import Moment from 'react-moment';
import { Link } from "react-router-dom";

class User extends Component {
  componentDidMount() {
    this.props.getUser(this.props.match.params.login);
    this.props.getUserRepos(this.props.match.params.login);
  }

  static propTypes = {
    loading: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    getUser: PropTypes.func.isRequired,
    repos: PropTypes.array.isRequired,
    getUserRepos: PropTypes.func.isRequired,
  };

  render() {
    const {
      name,
      avatar_url,
      location,
      bio,
      blog,
      login,
      html_url,
      company,
      followers,
      following,
      created_at,
      public_repos,
      public_gists,
      hireable,
    } = this.props.user;

    const { loading, repos } = this.props;

    if (loading) {
      return <Spinner />;
    }

    return (
      <Fragment>
        <Link to='/' className='btn btn-light'>
          Back to Search
        </Link>
        Hireable: {""}
        {hireable ? (
          <i className='fas fa-check text-success' />
        ) : (
          <i className='fas fa-times-circle text-danger' />
        )}
        <div className='card grid-2'>
          <div className='all-center'>
            <img
              src={avatar_url}
              alt='User-profile'
              className='round-img'
              style={{ width: "150px" }}
            />
            <h1>{name}</h1>
            <p>
              <strong>Location:</strong> {location}
            </p>
            <p>
              <strong>Joined-Github-on:</strong> <Moment format="DD-MM-YYYY">{created_at}</Moment>
            </p>
          </div>
          <div>
            {bio && (
              <Fragment>
                <h3>
                  <strong>Bio</strong>
                </h3>
                <p>{bio}</p>
              </Fragment>
            )}
            <a href={html_url} className='btn btn-dark my-1'>
              Visit Github Profile
            </a>
            <ul>
              <li>
                {login && (
                  <Fragment>
                    <strong>Username: </strong> {login}
                  </Fragment>
                )}
              </li>
              <li>
                {company && (
                  <Fragment>
                    <strong>Company: </strong> {company}
                  </Fragment>
                )}
              </li>
              <li>
                {blog && (
                  <Fragment>
                    <strong>Website: </strong> {blog}
                  </Fragment>
                )}
              </li>
            </ul>
          </div>
        </div>
        <div className='card text-center'>
          <div className='badge badge-primary'>Followers: {followers}</div>
          <div className='badge badge-dark'>Following: {following}</div>
          <div className='badge badge-success'>
            Public-Gists: {public_gists}
          </div>
          <div className='badge badge-light'>Public-Repos: {public_repos}</div>
        </div>
        <Repos repos={repos} />
      </Fragment>
    );
  }
}

export default User;
