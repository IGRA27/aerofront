import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";
import { countries } from "../../utils/constants";

import config from "../../config/index.json";

interface CountryType {
  code: string;
  label: string;
  phone: string;
  suggested?: boolean;
}
interface IProps {
  origin: any;
  destination: any;
}

const AutoCompleteBooking = ({ origin, destination }: IProps) => {
  const oneWay = config.booking.sections.items[0];
  // const roundedWay = config.booking.sections.items[1];
  const widthStyle = 200;

  return (
    <div className="relative flex row my-10 items-center">
      <AirplaneTicketIcon fontSize="large" sx={{ marginRight: "15px" }} />
      <Autocomplete
        id="country-select-demo"
        sx={{ width: widthStyle, marginRight: "6rem" }}
        options={countries}
        blurOnSelect
        // getOptionLabel={(option) => {
        //   console.log("GETOPTION?=", option);
        //   return option.label;
        // }}
        onChange={(event: any, newValue: any) => {
        
          origin(newValue);
        }}
        renderOption={(props, option) => (
          <Box
            component="li"
            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
            {...props}
          >
            <img
              loading="lazy"
              width="20"
              src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
              srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
              alt=""
            />
            {option.label} ({option.code})
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label={oneWay?.element1}
            inputProps={{
              ...params.inputProps,
              autoComplete: "new-password", // disable autocomplete and autofill
            }}
          />
        )}
      />
      <Autocomplete
        id="country-select-demo"
        sx={{ width: widthStyle }}
        options={countries}
        autoHighlight
        onChange={(event: any, newValue: any) => {
        
          destination(newValue);
        }}
        renderOption={(props, option) => (
          <Box
            component="li"
            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
            {...props}
          >
            <img
              loading="lazy"
              width="20"
              src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
              srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
              alt=""
            />
            {option.label} ({option.code})
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label={oneWay?.element2}
            inputProps={{
              ...params.inputProps,
              autoComplete: "new-password", // disable autocomplete and autofill
            }}
          />
        )}
      />
    </div>
  );
};

export default AutoCompleteBooking;

