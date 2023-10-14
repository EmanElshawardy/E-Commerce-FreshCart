import MainSlider from "../MainSlider/MainSlider";
import CategorySlider from "../CategorySlider/CategorySlider";
import Products from "../Products/Products";
import { Helmet } from "react-helmet";

function Home() {


  return (
    <>
    
    <Helmet>
            <title> Home </title>
        </Helmet>
    <MainSlider />
    <CategorySlider />
    <Products/>
    </>
  );
}

export default Home;
