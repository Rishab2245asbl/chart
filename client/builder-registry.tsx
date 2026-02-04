import { Builder } from "@builder.io/react";
import PropertyRates from "./components/PropertyRates";
import { Card } from "./components/ui/card";
import { Button } from "./components/ui/button";

// Register PropertyRates as a Builder component
Builder.registerComponent(PropertyRates, {
  name: "PropertyRates",
  inputs: [],
  image:
    "https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F6bef27ee40d24f3b88239fd7e616f82a",
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
