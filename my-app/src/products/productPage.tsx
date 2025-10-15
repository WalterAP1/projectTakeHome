import { useState, useEffect } from "react";
import { 
    Box, 
    Card, 
    CardContent, 
    CardMedia, 
    Chip, 
    FormControl, 
    Grid, 
    InputLabel, 
    MenuItem, 
    OutlinedInput, 
    Paper, 
    Select, 
    Stack, 
    Typography 
} from "@mui/material";

type Product = {
  id: number;
  name: string;
  blurb: string;
  tags: string[];
  description: string;
  image:string;
};

type Config = {
  filters: string[];
  products: Product[];
};

export const ProductList = () => {
  const [products, setProducts] = useState<Config | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    fetch("/config/product.json")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => console.error("Error loading config:", err));
  }, []);

  if (!products) return <p>Loading products...</p>;

  const handleFilterChange = (event: any) => {
    const { target: { value }} = event;
    setSelectedTags(value);
  };

  const filteredProducts = selectedTags.length === 0 ? products.products : products.products.filter(product => selectedTags.some(tag => product.tags.includes(tag)));

  return (
    <Box sx={{ backgroundColor: 'gray'}}>
        <Paper elevation={8} sx={{ marginLeft: 3, marginRight: 3, marginBottom: 3 }}>
            <Typography variant="h4" sx={{ marginTop: 3 }}>
                Products
            </Typography>
        <FormControl sx={{ m: 1, width: 300}}>
            <InputLabel id="filter-chip-label">Filter</InputLabel>
            <Select
                labelId="filter-chip-label"
                id="filter-multiple"
                multiple
                value={selectedTags}
                onChange={handleFilterChange}
                input={<OutlinedInput id="multiple-filter-chip" label="Chip" />}
                renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                            <Chip key={value} label={value}/>
                        ))}
                    </Box>
                )}
            >
            {products.filters.map((filter) => {
                return (
                    <MenuItem value={filter}> {filter} </MenuItem>
                )
            })}
            </Select>
        </FormControl>
        <Grid container spacing={12}>
            {filteredProducts.map(product => {
                return (
                    <Grid size={{ xs: 12, sm: 6, md: 3}}>
                        <Card sx= {{ height: "100%", ml: 3, mr: 3, mb: 3 }}>
                            <CardMedia 
                                component="img"
                                height="200"
                                image={product.image}
                            />
                            <CardContent>
                                <Typography variant="h6">{product.name}</Typography>
                                <Typography variant="caption" marginBottom={1} gutterBottom>
                                    {product.blurb}
                                </Typography>
                                <Stack
                                    direction={{ xs: 'column', sm: 'row'}}
                                    justifyContent="center"
                                    spacing={0.5}
                                    useFlexGap
                                    sx={{ flexWrap: 'wrap' }}
                                >
                                    {product.tags.map((tag) => {
                                        return (
                                            <Chip key={tag} label={tag} size="small" variant="outlined"/>
                                        )
                                    })}
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                )
            })}
        </Grid>
        </Paper>
    </Box>
  );
}