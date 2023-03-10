import React, { Fragment, useCallback } from "react";
import styled from "styled-components";

const Table = styled.div`
  border-collapse: separate;
  border-spacing: 0px 8px;
  display: table;
`;

const Header = styled.div`
  display: table-header-group;
`;

const Body = styled.div`
  display: table-row-group;
`;

const Row = styled.div`
  display: table-row;
`;

const HeaderCell = styled.div`
  display: table-cell;
  padding: 8px 32px;
  border-radius: 4px;
`;

const ClickableHeaderCell = styled(HeaderCell)`
  cursor: pointer;
  &:hover {
    background-color: #b5b6ba;
  }
`;

const Cell = styled.div`
  --border-color: #eaedf1;
  display: table-cell;
  vertical-align: middle;
  padding: 16px 32px;
  background: #ffffff;
  border-width: 1px;
  border-style: solid none;
  border-color: var(--border-color);
  &:first-child {
    border-left: 1px solid var(--border-color);
    border-radius: 4px 0 0 4px;
  }
  &:last-child {
    border-right: 1px solid var(--border-color);
    border-radius: 0 4px 4px 0;
  }
`;

const DropdownMenu = styled.form`
  padding: 0px 32px;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #b5b6ba;
  }
`;

const DropdownMenuSelect = styled.select`
  border-radius: 4px;
`;

const DropdownMenuOption = styled.option`
  border-radius: 4px;
`;

export type SortDirection = "asc" | "desc" | null;

type ClinicalTrial = {
  country: string;
  patients: number;
  city: string;
  site: string;
};

interface Props {
  clinicalTrials: Array<any>;
  patientsSortDirection: SortDirection;
  setPatientsSortDirection: (patientsSortDirection: SortDirection) => void;
  countriesSortDirection: SortDirection;
  setCountriesSortDirection: (countriesSortDirection: SortDirection) => void;
  selectedCountry: string;
  setSelectedCountry: (selectedCountry: string) => void;
  allCountries: string[];
}

const ClinicalTrials: React.FC<Props> = ({
  clinicalTrials,
  patientsSortDirection,
  setPatientsSortDirection,
  countriesSortDirection,
  setCountriesSortDirection,
  selectedCountry,
  setSelectedCountry,
  allCountries,
}: Props) => {
  const togglePatientsSortDirection = useCallback(() => {
    setCountriesSortDirection(null);
    if (patientsSortDirection == null) {
      setPatientsSortDirection("asc");
    } else if (patientsSortDirection === "asc") {
      setPatientsSortDirection("desc");
    } else {
      setPatientsSortDirection(null);
    }
  }, [patientsSortDirection, setPatientsSortDirection]);

  const toggleCountriesSortDirection = useCallback(() => {
    setPatientsSortDirection(null);
    if (countriesSortDirection == null) {
      setCountriesSortDirection("asc");
    } else if (countriesSortDirection === "asc") {
      setCountriesSortDirection("desc");
    } else {
      setCountriesSortDirection(null);
    }
  }, [countriesSortDirection, setCountriesSortDirection]);

  const handleCountrySelect = useCallback(
    (e: string) => {
      if (e === "Filter by country") {
        setSelectedCountry("");
      } else {
        setSelectedCountry(e);
      }
    },
    [selectedCountry, setSelectedCountry]
  );

  const uniqueCountryList = (allCountries: string[]) => {
    return allCountries.sort().map((c) => (
      <DropdownMenuOption key={c} value={c}>
        {c}
      </DropdownMenuOption>
    ));
  };

  return (
    <Fragment>
      <h1>Clinical trials</h1>
      <Table>
        <Header>
          <HeaderCell>site</HeaderCell>
          <HeaderCell>city</HeaderCell>
          <HeaderCell>
            <ClickableHeaderCell onClick={toggleCountriesSortDirection}>
              country{sortDirectionIndicator(countriesSortDirection)}
            </ClickableHeaderCell>
            <DropdownMenu>
              {/* <DropdownMenuLabel>Filter by country</DropdownMenuLabel>
              <br /> */}
              <DropdownMenuSelect
                id="country"
                name="country"
                value={selectedCountry}
                onChange={(e) => handleCountrySelect(e.target.value)}
              >
                <DropdownMenuOption>Filter by country</DropdownMenuOption>
                {uniqueCountryList(allCountries)}
              </DropdownMenuSelect>
            </DropdownMenu>
          </HeaderCell>

          <ClickableHeaderCell onClick={togglePatientsSortDirection}>
            patients{sortDirectionIndicator(patientsSortDirection)}
          </ClickableHeaderCell>
        </Header>
        <Body>
          {clinicalTrials.map((clinicalTrial) => (
            <Row key={clinicalTrial.site}>
              <Cell>{clinicalTrial.site}</Cell>
              <Cell>
                {clinicalTrial.city
                  .toLowerCase()
                  .split(" ")
                  .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
                  .join(" ")}
              </Cell>
              <Cell>{clinicalTrial.country}</Cell>
              <Cell>{clinicalTrial.patients}</Cell>
            </Row>
          ))}
        </Body>
      </Table>
    </Fragment>
  );
};

const sortDirectionIndicator = (sortDirection: SortDirection) => {
  if (sortDirection === "asc") return "???";
  if (sortDirection === "desc") return "???";
  return "";
};

export default ClinicalTrials;
