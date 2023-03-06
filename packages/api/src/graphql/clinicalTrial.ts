import { stringArg, extendType, nullable, objectType } from "nexus";
import { data } from "./data";

export const ClinicalTrial = objectType({
  name: "ClinicalTrial",
  definition(t) {
    t.string("site");
    t.string("city");
    t.string("country");
    t.int("patients");
  },
});

export const ClinicalTrialQuery = extendType({
  type: "Query",

  definition(t) {
    t.nonNull.list.field("clinicalTrials", {
      type: "ClinicalTrial",
      args: {
        patientsSortDirection: nullable(stringArg()),
        countriesSortDirection: nullable(stringArg()),
        selectedCountry: nullable(stringArg()),
      },
      resolve(
        _,
        { patientsSortDirection, countriesSortDirection, selectedCountry }
      ) {
        if (selectedCountry) {
          return data.filter((ct) => ct.country === selectedCountry);
        }
        if (patientsSortDirection === "desc") {
          return data.sort((a, b) => b.patients - a.patients);
        }
        if (patientsSortDirection === "asc") {
          return data.sort((a, b) => a.patients - b.patients);
        }
        if (countriesSortDirection === "desc") {
          return data.sort((a, b) => b.country.localeCompare(a.country));
        }
        if (countriesSortDirection === "asc") {
          return data.sort((a, b) => a.country.localeCompare(b.country));
        }
        return data;
      },
    });
  },
});
