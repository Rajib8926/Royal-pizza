import { useEffect } from "react";
import { Box, CardContent, CardMedia, Rating, Typography } from "@mui/material";
import { menuType, usePosts } from "../PostProvider";
import StarIcon from "@mui/icons-material/Star";
import { NavigateFunction, useNavigate } from "react-router-dom";
import LoginLoading from "../../components/LoginLoading";

export default function Home() {
  const { getMenu, menuData } = usePosts();

  console.log(menuData);
  const useNavigation: NavigateFunction = useNavigate();
  function cardClickHandler(id: string | undefined): void {
    if (id) {
      useNavigation(`/product/${id}`);
    }
  }
  useEffect(function () {
    getMenu();
  }, []);

  return (
    <Box
      sx={{
        width: { md: "80%", sm: "90vw", xxxs: "100vw" },
        margin: { xs: "30px auto", xxxs: "15px auto 30px" },
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: { sm: "10px", xxxs: "5px" },
      }}
    >
      {menuData ? (
        menuData?.map((item: menuType) => (
          <Box
            key={item.id}
            sx={{
              width: { lg: "340px", sm: "280px", xxxs: "49%" },
            }}
          >
            <Box
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
                  height: { lg: "270px", sm: "200px", xxxs: "180px" },
                  width: "100%",
                  overflow: "hidden",
                  borderRadius: "5px",
                }}
              >
                <CardMedia
                  component="img"
                  // height={lg:"140"}
                  image={item.imageUrl}
                  alt="green iguana"
                  sx={{
                    height: { lg: "270px", md: "230px", xxxs: "190px" },
                    width: { sm: "100%" },
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
                  padding: "7px",
                  ".css-t18pfy-MuiCardContent-root": {
                    padding: "0px",
                  },

                  ".css-40j6uv-MuiCardContent-root:last-child": {
                    paddingBottom: "0px",
                  },
                }}
              >
                <Typography
                  gutterBottom
                  variant="body1"
                  component="div"
                  sx={{
                    fontSize: { sm: "15px", xxxs: "13px" },
                    fontWeight: "600",
                    color: "#3b3b3b",
                  }}
                >
                  {item.name}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Rating
                    name="half-rating-read"
                    size="small"
                    defaultValue={4.5}
                    precision={0.5}
                    readOnly
                    emptyIcon={
                      <StarIcon
                        style={{ color: "#cecece" }}
                        fontSize="inherit"
                      />
                    }
                  />
                  <img
                    src={`./${item.isVeg ? "veglogo" : "nonVeglogo"}.jpg`}
                    alt=""
                    style={{ width: "15px", borderRadius: "2px" }}
                  />
                </Box>

                <Typography
                  variant="body2"
                  sx={{
                    fontSize: { sm: "17px", xxxs: "14px" },
                    fontWeight: "600",
                    color: "#3b3b3b",
                  }}
                >
                  ${item.price}
                </Typography>
              </CardContent>
            </Box>
          </Box>
        ))
      ) : (
        <LoginLoading isOpen={true} backgroundColor="transparent" />
      )}
      {}
    </Box>
  );
}
