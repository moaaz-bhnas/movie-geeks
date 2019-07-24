import React, { memo } from 'react';
import MovieList from '../../components/movie/MovieList';
import MemberList from '../../components/member/MemberList';
import './Dashboard.scss';

const Dashboard = () => {
  return (
    <section className="dashboard">
      <h2 className="dashboard__heading">Dashboard</h2>
      <div className="container">
        <MovieList />
        <MemberList />
      </div>
    </section>
  );
}

export default memo(Dashboard);