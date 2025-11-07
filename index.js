const plugin = require("tailwindcss/plugin");

function generateVariantUtilities(baseUtilities, variant, generateValue) {
  return Object.entries(baseUtilities).reduce(
    (acc, [selector, propertyValue]) => {
      const className = selector.slice(1);
      acc[`${className}-${variant}`] = (x) =>
        Object.entries(propertyValue).reduce((result, [property, value]) => {
          if (Array.isArray(value)) {
            result[property] = value.map((v) =>
              v === "-webkit-fill-available" ? v : generateValue(v, x),
            );
          } else {
            result[property] = generateValue(value, x);
          }
          return result;
        }, {});
      return acc;
    },
    {},
  );
}

const safeArea = plugin(({ addBase, addUtilities, matchUtilities, theme }) => {
  const baseVars = {
    "--safe-area-top": "var(--safe-area-inset-top, env(safe-area-inset-top))",
    "--safe-area-right":
      "var(--safe-area-inset-right, env(safe-area-inset-right))",
    "--safe-area-bottom":
      "var(--safe-area-inset-bottom, env(safe-area-inset-bottom))",
    "--safe-area-left":
      "var(--safe-area-inset-left, env(safe-area-inset-left))",
  };
  const baseUtilities = {
    ".m-safe": {
      marginTop: "var(--safe-area-top)",
      marginRight: "var(--safe-area-right)",
      marginBottom: "var(--safe-area-bottom)",
      marginLeft: "var(--safe-area-left)",
    },
    ".mx-safe": {
      marginRight: "var(--safe-area-right)",
      marginLeft: "var(--safe-area-left)",
    },
    ".my-safe": {
      marginTop: "var(--safe-area-top)",
      marginBottom: "var(--safe-area-bottom)",
    },
    ".ms-safe": {
      marginInlineStart: "var(--safe-area-left)",
    },
    ".me-safe": {
      marginInlineEnd: "var(--safe-area-left)",
    },
    ".mt-safe": {
      marginTop: "var(--safe-area-top)",
    },
    ".mr-safe": {
      marginRight: "var(--safe-area-right)",
    },
    ".mb-safe": {
      marginBottom: "var(--safe-area-bottom)",
    },
    ".ml-safe": {
      marginLeft: "var(--safe-area-left)",
    },
    ".p-safe": {
      paddingTop: "var(--safe-area-top)",
      paddingRight: "var(--safe-area-right)",
      paddingBottom: "var(--safe-area-bottom)",
      paddingLeft: "var(--safe-area-left)",
    },
    ".px-safe": {
      paddingRight: "var(--safe-area-right)",
      paddingLeft: "var(--safe-area-left)",
    },
    ".py-safe": {
      paddingTop: "var(--safe-area-top)",
      paddingBottom: "var(--safe-area-bottom)",
    },
    ".ps-safe": {
      paddingInlineStart: "var(--safe-area-left)",
    },
    ".pe-safe": {
      paddingInlineEnd: "var(--safe-area-left)",
    },
    ".pt-safe": {
      paddingTop: "var(--safe-area-top)",
    },
    ".pr-safe": {
      paddingRight: "var(--safe-area-right)",
    },
    ".pb-safe": {
      paddingBottom: "var(--safe-area-bottom)",
    },
    ".pl-safe": {
      paddingLeft: "var(--safe-area-left)",
    },
    ".scroll-m-safe": {
      scrollMarginTop: "var(--safe-area-top)",
      scrollMarginRight: "var(--safe-area-right)",
      scrollMarginBottom: "var(--safe-area-bottom)",
      scrollMarginLeft: "var(--safe-area-left)",
    },
    ".scroll-mx-safe": {
      scrollMarginRight: "var(--safe-area-right)",
      scrollMarginLeft: "var(--safe-area-left)",
    },
    ".scroll-my-safe": {
      scrollMarginTop: "var(--safe-area-top)",
      scrollMarginBottom: "var(--safe-area-bottom)",
    },
    ".scroll-ms-safe": {
      scrollMarginInlineStart: "var(--safe-area-left)",
    },
    ".scroll-me-safe": {
      scrollMarginInlineEnd: "var(--safe-area-left)",
    },
    ".scroll-mt-safe": {
      scrollMarginTop: "var(--safe-area-top)",
    },
    ".scroll-mr-safe": {
      scrollMarginRight: "var(--safe-area-right)",
    },
    ".scroll-mb-safe": {
      scrollMarginBottom: "var(--safe-area-bottom)",
    },
    ".scroll-ml-safe": {
      scrollMarginLeft: "var(--safe-area-left)",
    },
    ".scroll-p-safe": {
      scrollPaddingTop: "var(--safe-area-top)",
      scrollPaddingRight: "var(--safe-area-right)",
      scrollPaddingBottom: "var(--safe-area-bottom)",
      scrollPaddingLeft: "var(--safe-area-left)",
    },
    ".scroll-px-safe": {
      scrollPaddingRight: "var(--safe-area-right)",
      scrollPaddingLeft: "var(--safe-area-left)",
    },
    ".scroll-py-safe": {
      scrollPaddingTop: "var(--safe-area-top)",
      scrollPaddingBottom: "var(--safe-area-bottom)",
    },
    ".scroll-ps-safe": {
      scrollPaddingInlineStart: "var(--safe-area-left)",
    },
    ".scroll-pe-safe": {
      scrollPaddingInlineEnd: "var(--safe-area-left)",
    },
    ".scroll-pt-safe": {
      scrollPaddingTop: "var(--safe-area-top)",
    },
    ".scroll-pr-safe": {
      scrollPaddingRight: "var(--safe-area-right)",
    },
    ".scroll-pb-safe": {
      scrollPaddingBottom: "var(--safe-area-bottom)",
    },
    ".scroll-pl-safe": {
      scrollPaddingLeft: "var(--safe-area-left)",
    },
    ".inset-safe": {
      top: "var(--safe-area-top)",
      right: "var(--safe-area-right)",
      bottom: "var(--safe-area-bottom)",
      left: "var(--safe-area-left)",
    },
    ".inset-x-safe": {
      right: "var(--safe-area-right)",
      left: "var(--safe-area-left)",
    },
    ".inset-y-safe": {
      top: "var(--safe-area-top)",
      bottom: "var(--safe-area-bottom)",
    },
    ".start-safe": {
      insetInlineStart: "var(--safe-area-left)",
    },
    ".end-safe": {
      insetInlineEnd: "var(--safe-area-left)",
    },
    ".top-safe": {
      top: "var(--safe-area-top)",
    },
    ".right-safe": {
      right: "var(--safe-area-right)",
    },
    ".bottom-safe": {
      bottom: "var(--safe-area-bottom)",
    },
    ".left-safe": {
      left: "var(--safe-area-left)",
    },
    ".min-h-screen-safe": {
      minHeight: [
        "calc(100vh - (var(--safe-area-top) + var(--safe-area-bottom)))",
        "-webkit-fill-available",
      ],
    },
    ".max-h-screen-safe": {
      maxHeight: [
        "calc(100vh - (var(--safe-area-top) + var(--safe-area-bottom)))",
        "-webkit-fill-available",
      ],
    },
    ".h-screen-safe": {
      height: [
        "calc(100vh - (var(--safe-area-top) + var(--safe-area-bottom)))",
        "-webkit-fill-available",
      ],
    },
    ".min-h-fill-safe": {
      minHeight: ["-webkit-fill-available"],
    },
    ".max-h-fill-safe": {
      maxHeight: ["-webkit-fill-available"],
    },
    ".h-fill-safe": {
      height: ["-webkit-fill-available"],
    },
    ".min-h-vh-safe": {
      minHeight: [
        "calc(100vh - (var(--safe-area-top) + var(--safe-area-bottom)))",
      ],
    },
    ".max-h-vh-safe": {
      maxHeight: [
        "calc(100vh - (var(--safe-area-top) + var(--safe-area-bottom)))",
      ],
    },
    ".h-vh-safe": {
      height: [
        "calc(100vh - (var(--safe-area-top) + var(--safe-area-bottom)))",
      ],
    },
    ".min-h-dvh-safe": {
      minHeight: [
        "calc(100dvh - (var(--safe-area-top) + var(--safe-area-bottom)))",
      ],
    },
    ".max-h-dvh-safe": {
      maxHeight: [
        "calc(100dvh - (var(--safe-area-top) + var(--safe-area-bottom)))",
      ],
    },
    ".h-dvh-safe": {
      height: [
        "calc(100dvh - (var(--safe-area-top) + var(--safe-area-bottom)))",
      ],
    },
    ".min-h-svh-safe": {
      minHeight: [
        "calc(100svh - (var(--safe-area-top) + var(--safe-area-bottom)))",
      ],
    },
    ".max-h-svh-safe": {
      maxHeight: [
        "calc(100svh - (var(--safe-area-top) + var(--safe-area-bottom)))",
      ],
    },
    ".h-svh-safe": {
      height: [
        "calc(100svh - (var(--safe-area-top) + var(--safe-area-bottom)))",
      ],
    },
    ".min-h-lvh-safe": {
      minHeight: [
        "calc(100lvh - (var(--safe-area-top) + var(--safe-area-bottom)))",
      ],
    },
    ".max-h-lvh-safe": {
      maxHeight: [
        "calc(100lvh - (var(--safe-area-top) + var(--safe-area-bottom)))",
      ],
    },
    ".h-lvh-safe": {
      height: [
        "calc(100lvh - (var(--safe-area-top) + var(--safe-area-bottom)))",
      ],
    },
  };

  addBase({ ":root": baseVars });
  addUtilities(baseUtilities);

  const offsetUtilities = generateVariantUtilities(
    baseUtilities,
    "offset",
    (v, x) => `calc(${v} + ${x})`,
  );
  matchUtilities(offsetUtilities, {
    values: theme("spacing"),
    supportsNegativeValues: true,
  });

  const orUtilities = generateVariantUtilities(
    baseUtilities,
    "or",
    (v, x) => `max(${v}, ${x})`,
  );
  matchUtilities(orUtilities, {
    values: theme("spacing"),
    supportsNegativeValues: true,
  });
});

module.exports = safeArea;
