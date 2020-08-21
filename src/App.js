import React from "react";
import { Container } from "react-bootstrap";

import { SearchPanel } from "./components/SearchPanel";
import { RepoList } from "./components/RepoList";
import { Loader } from './components/Loader';
import { IssuesOpen } from './components/issues/issuesOpen';
import { IssuesPage } from './components/issues/issuesPage';

import "./App.css";




function App() {

  const getRepo = (e) => {
    e.preventDefault();
    const repo = e.target.elements.searchBard.value
  };


  const isLoad = true;
  return (
    <div>
      <SearchPanel getRepo={getRepo} />
      <Container className='RepoList__wrapper'>


        {!isLoad ? <Loader /> : <RepoList />}
        <RepoList />
        <RepoList />


      </Container>
      {/* < div className="d-flex">
        <IssuesOpen />
        <IssuesPage />
      </div> */}


    </div >
  );
}

export default App;
