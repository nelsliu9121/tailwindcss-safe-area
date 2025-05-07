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

const safeArea = plugin(({ addUtilities, matchUtilities, theme }) => {
	const baseUtilities = {
		".m-safe": {
			marginTop: "var(--safe-area-inset-top, env(safe-area-inset-top))",
			marginRight: "var(--safe-area-inset-right, env(safe-area-inset-right))",
			marginBottom:
				"var(--safe-area-inset-bottom, env(safe-area-inset-bottom))",
			marginLeft: "var(--safe-area-inset-left, env(safe-area-inset-left))",
		},
		".mx-safe": {
			marginRight: "var(--safe-area-inset-right, env(safe-area-inset-right))",
			marginLeft: "var(--safe-area-inset-left, env(safe-area-inset-left))",
		},
		".my-safe": {
			marginTop: "var(--safe-area-inset-top, env(safe-area-inset-top))",
			marginBottom:
				"var(--safe-area-inset-bottom, env(safe-area-inset-bottom))",
		},
		".ms-safe": {
			marginInlineStart:
				"var(--safe-area-inset-left, env(safe-area-inset-left))",
		},
		".me-safe": {
			marginInlineEnd: "var(--safe-area-inset-left, env(safe-area-inset-left))",
		},
		".mt-safe": {
			marginTop: "var(--safe-area-inset-top, env(safe-area-inset-top))",
		},
		".mr-safe": {
			marginRight: "var(--safe-area-inset-right, env(safe-area-inset-right))",
		},
		".mb-safe": {
			marginBottom:
				"var(--safe-area-inset-bottom, env(safe-area-inset-bottom))",
		},
		".ml-safe": {
			marginLeft: "var(--safe-area-inset-left, env(safe-area-inset-left))",
		},
		".p-safe": {
			paddingTop: "var(--safe-area-inset-top, env(safe-area-inset-top))",
			paddingRight: "var(--safe-area-inset-right, env(safe-area-inset-right))",
			paddingBottom:
				"var(--safe-area-inset-bottom, env(safe-area-inset-bottom))",
			paddingLeft: "var(--safe-area-inset-left, env(safe-area-inset-left))",
		},
		".px-safe": {
			paddingRight: "var(--safe-area-inset-right, env(safe-area-inset-right))",
			paddingLeft: "var(--safe-area-inset-left, env(safe-area-inset-left))",
		},
		".py-safe": {
			paddingTop: "var(--safe-area-inset-top, env(safe-area-inset-top))",
			paddingBottom:
				"var(--safe-area-inset-bottom, env(safe-area-inset-bottom))",
		},
		".ps-safe": {
			paddingInlineStart:
				"var(--safe-area-inset-left, env(safe-area-inset-left))",
		},
		".pe-safe": {
			paddingInlineEnd:
				"var(--safe-area-inset-left, env(safe-area-inset-left))",
		},
		".pt-safe": {
			paddingTop: "var(--safe-area-inset-top, env(safe-area-inset-top))",
		},
		".pr-safe": {
			paddingRight: "var(--safe-area-inset-right, env(safe-area-inset-right))",
		},
		".pb-safe": {
			paddingBottom:
				"var(--safe-area-inset-bottom, env(safe-area-inset-bottom))",
		},
		".pl-safe": {
			paddingLeft: "var(--safe-area-inset-left, env(safe-area-inset-left))",
		},
		".scroll-m-safe": {
			scrollMarginTop: "var(--safe-area-inset-top, env(safe-area-inset-top))",
			scrollMarginRight:
				"var(--safe-area-inset-right, env(safe-area-inset-right))",
			scrollMarginBottom:
				"var(--safe-area-inset-bottom, env(safe-area-inset-bottom))",
			scrollMarginLeft:
				"var(--safe-area-inset-left, env(safe-area-inset-left))",
		},
		".scroll-mx-safe": {
			scrollMarginRight:
				"var(--safe-area-inset-right, env(safe-area-inset-right))",
			scrollMarginLeft:
				"var(--safe-area-inset-left, env(safe-area-inset-left))",
		},
		".scroll-my-safe": {
			scrollMarginTop: "var(--safe-area-inset-top, env(safe-area-inset-top))",
			scrollMarginBottom:
				"var(--safe-area-inset-bottom, env(safe-area-inset-bottom))",
		},
		".scroll-ms-safe": {
			scrollMarginInlineStart:
				"var(--safe-area-inset-left, env(safe-area-inset-left))",
		},
		".scroll-me-safe": {
			scrollMarginInlineEnd:
				"var(--safe-area-inset-left, env(safe-area-inset-left))",
		},
		".scroll-mt-safe": {
			scrollMarginTop: "var(--safe-area-inset-top, env(safe-area-inset-top))",
		},
		".scroll-mr-safe": {
			scrollMarginRight:
				"var(--safe-area-inset-right, env(safe-area-inset-right))",
		},
		".scroll-mb-safe": {
			scrollMarginBottom:
				"var(--safe-area-inset-bottom, env(safe-area-inset-bottom))",
		},
		".scroll-ml-safe": {
			scrollMarginLeft:
				"var(--safe-area-inset-left, env(safe-area-inset-left))",
		},
		".scroll-p-safe": {
			scrollPaddingTop: "var(--safe-area-inset-top, env(safe-area-inset-top))",
			scrollPaddingRight:
				"var(--safe-area-inset-right, env(safe-area-inset-right))",
			scrollPaddingBottom:
				"var(--safe-area-inset-bottom, env(safe-area-inset-bottom))",
			scrollPaddingLeft:
				"var(--safe-area-inset-left, env(safe-area-inset-left))",
		},
		".scroll-px-safe": {
			scrollPaddingRight:
				"var(--safe-area-inset-right, env(safe-area-inset-right))",
			scrollPaddingLeft:
				"var(--safe-area-inset-left, env(safe-area-inset-left))",
		},
		".scroll-py-safe": {
			scrollPaddingTop: "var(--safe-area-inset-top, env(safe-area-inset-top))",
			scrollPaddingBottom:
				"var(--safe-area-inset-bottom, env(safe-area-inset-bottom))",
		},
		".scroll-ps-safe": {
			scrollPaddingInlineStart:
				"var(--safe-area-inset-left, env(safe-area-inset-left))",
		},
		".scroll-pe-safe": {
			scrollPaddingInlineEnd:
				"var(--safe-area-inset-left, env(safe-area-inset-left))",
		},
		".scroll-pt-safe": {
			scrollPaddingTop: "var(--safe-area-inset-top, env(safe-area-inset-top))",
		},
		".scroll-pr-safe": {
			scrollPaddingRight:
				"var(--safe-area-inset-right, env(safe-area-inset-right))",
		},
		".scroll-pb-safe": {
			scrollPaddingBottom:
				"var(--safe-area-inset-bottom, env(safe-area-inset-bottom))",
		},
		".scroll-pl-safe": {
			scrollPaddingLeft:
				"var(--safe-area-inset-left, env(safe-area-inset-left))",
		},
		".inset-safe": {
			top: "var(--safe-area-inset-top, env(safe-area-inset-top))",
			right: "var(--safe-area-inset-right, env(safe-area-inset-right))",
			bottom: "var(--safe-area-inset-bottom, env(safe-area-inset-bottom))",
			left: "var(--safe-area-inset-left, env(safe-area-inset-left))",
		},
		".inset-x-safe": {
			right: "var(--safe-area-inset-right, env(safe-area-inset-right))",
			left: "var(--safe-area-inset-left, env(safe-area-inset-left))",
		},
		".inset-y-safe": {
			top: "var(--safe-area-inset-top, env(safe-area-inset-top))",
			bottom: "var(--safe-area-inset-bottom, env(safe-area-inset-bottom))",
		},
		".start-safe": {
			insetInlineStart:
				"var(--safe-area-inset-left, env(safe-area-inset-left))",
		},
		".end-safe": {
			insetInlineEnd: "var(--safe-area-inset-left, env(safe-area-inset-left))",
		},
		".top-safe": {
			top: "var(--safe-area-inset-top, env(safe-area-inset-top))",
		},
		".right-safe": {
			right: "var(--safe-area-inset-right, env(safe-area-inset-right))",
		},
		".bottom-safe": {
			bottom: "var(--safe-area-inset-bottom, env(safe-area-inset-bottom))",
		},
		".left-safe": {
			left: "var(--safe-area-inset-left, env(safe-area-inset-left))",
		},
		".min-h-screen-safe": {
			minHeight: [
				"calc(100vh - (var(--safe-area-inset-top, env(safe-area-inset-top)) + var(--safe-area-inset-bottom, env(safe-area-inset-bottom))))",
				"-webkit-fill-available",
			],
		},
		".max-h-screen-safe": {
			maxHeight: [
				"calc(100vh - (var(--safe-area-inset-top, env(safe-area-inset-top)) + var(--safe-area-inset-bottom, env(safe-area-inset-bottom))))",
				"-webkit-fill-available",
			],
		},
		".h-screen-safe": {
			height: [
				"calc(100vh - (var(--safe-area-inset-top, env(safe-area-inset-top)) + var(--safe-area-inset-bottom, env(safe-area-inset-bottom))))",
				"-webkit-fill-available",
			],
		},
	};
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
