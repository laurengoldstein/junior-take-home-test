import { useQuery, gql } from "@apollo/client";
import React, { useState } from "react";
import styled from "styled-components";

import ClinicalTrials from "./ClinicalTrials";

const Layout = styled.div`
  background: #f6f7fa;
  display: flex;
  height: 100%;
  justify-content: center;
  width: 100%;
`;

const Content = styled.div`
  margin-top: 48px;
  max-width: 1300px;
  width: 100%;
`;

const clinicalTrialsQuery = gql`
  query ClinicalTrials(
    $patientsSortDirection: String
    $countriesSortDirection: String
    $filterByCountry: String
  ) {
    clinicalTrials(
      patientsSortDirection: $patientsSortDirection
      countriesSortDirection: $countriesSortDirection
      filterByCountry: $filterByCountry
    ) {
      site
      city
      country
      patients
    }
  }
`;

export type SortDirection = "asc" | "desc" | null;

const App: React.FC = () => {
  const [patientsSortDirection, setPatientsSortDirection] =
    useState<SortDirection>(null);

  const [countriesSortDirection, setCountriesSortDirection] =
    useState<SortDirection>(null);

  const [filterByCountry, setFilterByCountry] = useState<string>("");

  const { loading, error, data } = useQuery(clinicalTrialsQuery, {
    variables: {
      patientsSortDirection,
      countriesSortDirection,
      filterByCountry,
    },
  });

  return (
    <Layout>
      <Content>
        {!loading && !error && (
          <ClinicalTrials
            patientsSortDirection={patientsSortDirection}
            setPatientsSortDirection={setPatientsSortDirection}
            countriesSortDirection={countriesSortDirection}
            setCountriesSortDirection={setCountriesSortDirection}
            filterByCountry={filterByCountry}
            setFilterByCountry={setFilterByCountry}
            clinicalTrials={data.clinicalTrials}
          />
        )}
      </Content>
    </Layout>
  );
};

export default App;
