import React, { useState } from 'react'
import {elections as dummyElections} from "../data";
import ResultElection from "../components/ResultsElections";

const Results = () => {
  const [election, setElection] = useState(dummyElections);

  return (
    <section className="results">
      <div className="container results_container">
        {
          election.map(election => <ResultElection key =
            {election.id} {...election} />
          )
        }
      </div>
    </section>
  )
}

export default Results
