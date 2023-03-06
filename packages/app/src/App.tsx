import { useQuery, gql } from "@apollo/client";
import React, { useState, useEffect } from "react";
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
    $selectedCountry: String
  ) {
    clinicalTrials(
      patientsSortDirection: $patientsSortDirection
      countriesSortDirection: $countriesSortDirection
      selectedCountry: $selectedCountry
    ) {
      site
      city
      country
      patients
    }
  }
`;

export type SortDirection = "asc" | "desc" | null;

type ClinicalTrial = {
  country: string;
  patients: number;
  city: string;
  site: string;
};

const App: React.FC = () => {
  const [patientsSortDirection, setPatientsSortDirection] =
    useState<SortDirection>(null);

  const [countriesSortDirection, setCountriesSortDirection] =
    useState<SortDirection>(null);

  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [allCountries, setAllCountries] = useState<string[]>([]);

  const { loading, error, data } = useQuery(clinicalTrialsQuery, {
    variables: {
      patientsSortDirection,
      countriesSortDirection,
      selectedCountry,
    },
  });

  const getAllCountries = (clinicalTrials: ClinicalTrial[]) => {
    let countries: string[] = [];
    clinicalTrials.forEach((c) => {
      if (!countries.includes(c.country)) {
        countries.push(c.country);
      }
    });
    setAllCountries(countries);
  };

  useEffect(() => {
    if (data && !allCountries.length) {
      getAllCountries(data.clinicalTrials);
    }
  }, [data]);

  return (
    <Layout>
      <Content>
        {!loading && !error && (
          <ClinicalTrials
            patientsSortDirection={patientsSortDirection}
            setPatientsSortDirection={setPatientsSortDirection}
            countriesSortDirection={countriesSortDirection}
            setCountriesSortDirection={setCountriesSortDirection}
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
            allCountries={allCountries}
            clinicalTrials={data.clinicalTrials}
          />
        )}
      </Content>
    </Layout>
  );
};

export default App;
