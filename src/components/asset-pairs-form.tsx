import { Autocomplete, Box, Button, Grid, TextField } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface ChildProps {
  data: any;
  onSubmit: any;
}

const AssetPairsForm: FC<ChildProps> = ({ data, onSubmit }) => {
  const [quotes, setQuotes] = useState([""]);
  const [bases, setBases] = useState({});

  const { register, handleSubmit, getValues } = useForm({
    defaultValues: { base: "", quote: "" },
  });

  useEffect(() => {
    let temp = {};
    Object.keys(data).forEach((key) => {
      const value = data[key] || "";
      const [base, quote] = value.wsname.split("/");
      temp = {
        ...temp,
        [base]: temp[base] ? [...temp[base], quote] : [quote],
      };
    });
    console.log(temp);
    setBases(temp);
  }, []);

  return (
    <Box p={5}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Grid px={2}>
            <Autocomplete
              id="controllable-states-demo"
              options={Object.keys(bases)}
              onChange={(event, newValue: string | null) =>
                setQuotes(bases[newValue])
              }
              renderInput={(params) => (
                <TextField {...params} {...register("base")} label="Base" />
              )}
              sx={{ width: 300 }}
            />
          </Grid>
          <Grid px={2}>
            <Autocomplete
              id="controllable-states-demo"
              options={quotes}
              renderInput={(params) => (
                <TextField {...params} {...register("quote")} label="Quote" />
              )}
              sx={{ width: 300 }}
            />
          </Grid>
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AssetPairsForm;
