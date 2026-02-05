import { Builder } from "@builder.io/react";
import { builder } from "@builder.io/sdk";
import PropertyRates from "./components/PropertyRates";
import { Card } from "./components/ui/card";
import { Button } from "./components/ui/button";

// Initialize Builder SDK with your Public API Key
builder.init(import.meta.env.VITE_PUBLIC_BUILDER_KEY);

// Register PropertyRates as a Builder component
Builder.registerComponent(PropertyRates, {
  name: "PropertyRates",
  inputs: [],
  image:
    "https://cdn.builder.io/api/v1/image/assets%2F770b5ae7fc584faebcf10a33186df6f8%2F25396a48c928458e8936faafe8307f3b",
  defaultStyles: {
    width: "100%",
  },
});

// Register Card component (simple wrapper)
Builder.registerComponent(Card, {
  name: "Card",
  inputs: [],
  hideFromInsertMenu: false,
});

// Register Button component with editable text
Builder.registerComponent(Button, {
  name: "Button",
  inputs: [{ name: "children", type: "string", defaultValue: "Click" }],
  noWrap: true,
});

export {};

