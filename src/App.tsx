import { Box, Typography } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAssetPairs, getTicker } from "./api";
import { FormValuesType } from "./models/form-values";
import AssetPairsForm from "./components/asset-pairs-form";
import { useState } from "react";

const App = () => {
  const [price, setPrice] = useState(0);
  const [values, setValues] = useState({ base: "", quote: "" });
  const postQuery = useQuery<[], Error>({
    queryKey: ["assetPairs"],
    queryFn: () => getAssetPairs(),
  });

  const mutateQuery = useMutation<void>(
    (values: FormValuesType) => values && getTicker(`pair=${values.base}${values.quote}`),
    {
      onSuccess: (data, variables) => {
        setPrice(data[Object.keys(data)[0]]["a"][0]);
        setValues({ base: variables.base, quote: variables.quote });
      },
    }
  );

  if (postQuery.isLoading) {
    return (
      <Typography variant="h2" component="h2" textAlign={"center"} mt={10}>
        Loading...
      </Typography>
    );
  }

  return (
    <Box>
      <AssetPairsForm data={postQuery.data} onSubmit={mutateQuery.mutate} />
      {price ? (
        <Typography variant="h3" component="h3" textAlign={"center"}>
          1<Typography variant="h4" component="span">{values.base}</Typography> = {price}
          <Typography  variant="h4"component="span">{values.quote}</Typography>
        </Typography>
      ) : (
        ""
      )}
    </Box>
  );
};

export default App;
