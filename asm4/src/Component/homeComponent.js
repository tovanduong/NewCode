import React from "react";
import { IMG } from "../shared/staffs";
import { Loading } from "./loadingComponent";
import { FadeTransform } from "react-animation-components";

function Home(props) {
  if (props.items.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (props.items.errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.items.errMess}</h4>
        </div>
      </div>
    );
  } else
    return (
      <FadeTransform
        in
        transformProps={{
          exitTransform: "scale(0.5) translateY(-50%)",
        }}
      >
        <div>
              <img src={IMG.image} alt={"anh"} />
        </div>
      </FadeTransform>
    );
}

export default Home;
