import { useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Rating,
  Typography,
} from "@mui/material";
import { menuType, usePosts } from "../PostProvider";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate } from "react-router-dom";
// interface postsType {
//   getMenu: () => void;
//   menuData: menuType[];
// }

export default function Home() {
  const { getMenu, menuData, userData } = usePosts();
  console.log(userData);

  console.log(menuData);
  const useNavigation = useNavigate();
  function cardClickHandler(id: string): void {
    useNavigation(`/product/${id}`, { state: id });
  }
  useEffect(function () {
    getMenu();
  }, []);
  return (
    <Grid container spacing={3} style={{ width: "80vw", margin: "30px auto" }}>
      {menuData?.map((item: menuType) => (
        <Grid item xs={6} sm={4} md={3} key={item.id}>
          <Card
            onClick={() => cardClickHandler(item.id)}
            sx={{
              borderRadius: "5px",
              background: "#F6F5F5",
              boxShadow: "none",
              cursor: "pointer",
            }}
          >
            <Box
              sx={{
                height: "270px",
                width: "100%",
                overflow: "hidden",
                borderRadius: "5px",
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image={item.imageUrl}
                alt="green iguana"
                sx={{
                  height: "270px",
                  width: "100%",
                  borderRadius: "5px",
                  display: "inline-block",
                  overflow: "hidden !important",
                  transition: ".3s ease-in-out",
                  "&:hover": {
                    filter: "alpha(opacity=30)",
                    transform: "scale(1.1)",
                  },
                }}
              />
            </Box>
            <CardContent
              sx={{
                paddingBottom: "0px",
                ".css-40j6uv-MuiCardContent-root:last-child": {
                  paddingBottom: "0px",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  gutterBottom
                  variant="body1"
                  component="div"
                  sx={{ fontSize: "15px", fontWeight: "600", color: "#3b3b3b" }}
                >
                  {item.name}
                </Typography>
                <img
                  src={`./public/${item.isVeg ? "veglogo" : "nonVeglogo"}.jpg`}
                  alt=""
                  style={{ width: "20px", borderRadius: "2px" }}
                />
              </Box>
              <Rating
                name="half-rating-read"
                size="medium"
                defaultValue={4.5}
                precision={0.5}
                readOnly
                emptyIcon={
                  <StarIcon style={{ color: "#cecece" }} fontSize="inherit" />
                }
              />
              <Typography
                variant="body2"
                sx={{ fontSize: "17px", fontWeight: "600", color: "#3b3b3b" }}
              >
                ${item.price}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
