import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

export default function FormControlLabelPlacement({ setMatchThreshold }) {
    const handleThresholdChange = (ev) => {
        setMatchThreshold(ev.target.value);
    }

  return (
    <FormControl component="fieldset">
      {/* <FormLabel component="legend">labelPlacement</FormLabel> */}
      <RadioGroup row aria-label="position" name="position" defaultValue="top">
        <FormControlLabel
          value="Low"
          control={<Radio color="primary" />}
          label="Low"
          labelPlacement="bottom"
          onChange={handleThresholdChange}
        />
         <FormControlLabel
          value="Average"
          control={<Radio color="primary" />}
          label="Average"
          labelPlacement="bottom"
          onChange={handleThresholdChange}

        />
       <FormControlLabel
          value="Strong"
          control={<Radio color="primary" />}
          label="Strong"
          labelPlacement="bottom"
          onChange={handleThresholdChange}
        />
        <FormControlLabel
          value="Very Strong"
          control={<Radio color="primary" />}
          label="Very Strong"
          labelPlacement="bottom"
          onChange={handleThresholdChange}
        />
         <FormControlLabel
          value="Ideal"
          control={<Radio color="primary" />}
          label="Ideal"
          labelPlacement="bottom"
          onChange={handleThresholdChange}
        />
      </RadioGroup>
    </FormControl>
  );
}
