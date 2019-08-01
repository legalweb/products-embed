import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import React from "react";
import { render } from "react-dom";
import EmbedWrapper from "./EmbedWrapper";
import { theme as muiTheme } from "./utils";

const renderProducts = ({
  selector,
  products,
  productsLimit,
  chosenFilters,
  availableFilters,
  cta,
  provider,
  onMoreDetails,
  onApply,
}) => {
  const element = document.querySelector(selector);

  if (!element) {
    throw new Error(
      `Cannot render products into ${selector} as it does not exist in the document.`
    );
  }

  render(
    <ThemeProvider theme={theme ? createMuiTheme(theme) : muiTheme}>
      <EmbedWrapper config={config} filters={filters} products={products} />
    </ThemeProvider>,
    element
  );
};

export default {
  renderProducts,
};
