import "./App.css";
import React from "react";
import {
  getProductData,
  getLocalStorage,
  setLocalStorage,
  getRandom,
} from "./utils";
import { RECENT_PRODUCT } from "./constant";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productData: [],
      recentProduct: [],
      nowProduct: {},
    };

    this.randomSearch = this.randomSearch.bind(this);
    this.disInterest = this.disInterest.bind(this);

    (async () => {
      const jsonData = await getProductData();
      const recentProduct = getLocalStorage(RECENT_PRODUCT) || [];

      this.setState(
        { productData: jsonData, recentProduct: recentProduct },
        this.randomSearch
      );
    })();
  }

  addRecentProduct(product, callback) {
    const prevProduct = this.findRecentProduct(product) ? product : null;

    if (prevProduct) {
      const subProductList = this.state.recentProduct.filter(
        (item) => item.title !== product.title
      );
      const newProduct = { ...prevProduct };

      this.setState(
        { recentProduct: [...subProductList, newProduct] },
        callback
      );
      setLocalStorage(RECENT_PRODUCT, [...subProductList, newProduct]);
    } else {
      const newProduct = { ...product };

      this.setState({
        recentProduct: [...this.state.recentProduct, newProduct],
        callback,
      });
      setLocalStorage(RECENT_PRODUCT, [
        ...this.state.recentProduct,
        newProduct,
      ]);
    }
  }

  findRecentProduct(product) {
    const prevProduct = this.state.recentProduct.find(
      (item) => item.title === product.title
    );

    return prevProduct;
  }

  getRandomProduct(allProductList, excludeProductList) {
    const targetProductList = allProductList.filter(
      (item) =>
        !excludeProductList.find(
          (excludeItem) => excludeItem.title === item.title
        )
    );

    const randValue = getRandom(0, targetProductList.length);
    return targetProductList[randValue];
  }

  randomSearch() {
    const product = this.getRandomProduct(this.state.productData, [
      this.state.nowProduct,
    ]);

    product.date = new Date();
    if (product.isIgnore === undefined) product.isIgnore = false;
    this.setState({ nowProduct: product });
    this.addRecentProduct(product);
  }

  disInterest() {
    const product = { ...this.state.nowProduct };

    product.date = new Date();
    product.isIgnore = true;
    this.addRecentProduct(product, this.randomSearch());
  }

  getProductComponent(product, isRecent = false) {
    const { title, brand, price, date } = product;

    return (
      <div key={title} className="product-div">
        <span className="block-span">title: {title}</span>
        <span className="block-span">brand: {brand}</span>
        <span className="block-span">price: {price}</span>
        {isRecent && (
          <span className="block-span">date: {date.toString()}</span>
        )}
      </div>
    );
  }

  getRecentProductCompoent() {
    const recentProduct = this.state.recentProduct;

    return recentProduct.map((item) => this.getProductComponent(item, true));
  }

  render() {
    return (
      <>
        <div>
          <div>
            <button onClick={this.randomSearch}>?????? ??????</button>
            <button onClick={this.disInterest}>?????? ??????</button>
          </div>
          <div>
            ?????? ??????
            {this.getProductComponent(this.state.nowProduct)}
          </div>
        </div>
        <div>
          ?????? ??????
          {this.getRecentProductCompoent()}
        </div>
      </>
    );
  }
}

export default App;
