import React from "react";
import { getProductData } from "./utils";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productData: [],
    };
  }

  async componentDidMount() {
    const jsonData = await getProductData();

    this.setState({ productData: jsonData });
  }

  render() {
    return <div>hello!</div>;
  }
}

export default App;
