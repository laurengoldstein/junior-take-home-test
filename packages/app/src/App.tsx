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
  ) {
    clinicalTrials(
      patientsSortDirection: $patientsSortDirection
      countriesSortDirection: $countriesSortDirection
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

  const [currentCountry, setCurrentCountry] = useState<String>("");

  const { loading, error, data } = useQuery(clinicalTrialsQuery, {
    variables: { patientsSortDirection, countriesSortDirection },
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
            currentCountry={currentCountry}
            setCurrentCountry={setCurrentCountry}
            clinicalTrials={data.clinicalTrials}
          />
        )}
      </Content>
    </Layout>
  );
};

export default App;
