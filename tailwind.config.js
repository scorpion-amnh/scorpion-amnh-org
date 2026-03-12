/** @type {import('tailwindcss').Config} */
const brandColors = {
  "gray-00": "#F4F7FC",
  "gray-10": "#E1E2E5",
  "gray-20": "#C7C8CA",
  "gray-30": "#B0B1B3",
  "gray-40": "#969698",
  "gray-50": "#7E7F81",
  "gray-60": "#656767",
  "gray-70": "#4C4D4E",
  "gray-80": "#323232",
  "gray-90": "#181817",
  "cyan-10": "#5FCAE5", // light cyan
  "cyan-20": "#43AFCC",
  "cyan-30": "#2695B3",
  "cyan-40": "#0A7A9A", // dark cyan
  "cyan-50": "#005F81",
  "cyan-60": "#004468",
  "cyan-70": "#00294F",
  "cyan-80": "#000E36",
  "cyan-90": "#00001D",
  "rust-10": "#F4866E",
  "rust-20": "#D47051", // light rust
  "rust-30": "#B45A34", // dark rust
  "rust-40": "#944417",
  "rust-50": "#742E00",
  "rust-60": "#541800",
  "rust-70": "#340200",
  "rust-80": "#140000",
  "rust-90": "#000000",
  "olive-10": "#EAFF94",
  "olive-20": "#CADD82",
  "olive-30": "#AABC70",
  "olive-40": "#8A9A5E", // light olive
  "olive-50": "#6A784C", // dark olive
  "olive-60": "#4A563A",
  "olive-70": "#2A3428",
  "olive-80": "#0A1216",
  "olive-90": "#000004",
  "gold-10": "#D1A942",
  "gold-20": "#BE993F", // light gold
  "gold-30": "#AB893C", // dark gold
  "gold-40": "#987939",
  "gold-50": "#856936",
  "gold-60": "#725933",
  "gold-70": "#5F4930",
  "gold-80": "#4C392D",
  "gold-90": "#39292A",
};

const buildScale = (prefix, keys, steps) =>
  keys.reduce((acc, key, index) => {
    acc[key] = brandColors[`${prefix}-${steps[index]}`];
    return acc;
  }, {});

const grayScale = buildScale(
  "gray",
  [50, 100, 200, 300, 400, 500, 600, 700, 800, 900],
  ["00", 10, 20, 30, 40, 50, 60, 70, 80, 90]
);

const cyanScale = buildScale(
  "cyan",
  [100, 200, 300, 400, 500, 600, 700, 800, 900],
  [10, 20, 30, 40, 50, 60, 70, 80, 90]
);

const rustScale = buildScale(
  "rust",
  [100, 200, 300, 400, 500, 600, 700, 800, 900],
  [10, 20, 30, 40, 50, 60, 70, 80, 90]
);

const oliveScale = buildScale(
  "olive",
  [100, 200, 300, 400, 500, 600, 700, 800, 900],
  [10, 20, 30, 40, 50, 60, 70, 80, 90]
);

const goldScale = buildScale(
  "gold",
  [100, 200, 300, 400, 500, 600, 700, 800, 900],
  [10, 20, 30, 40, 50, 60, 70, 80, 90]
);

module.exports = {
  theme: {
    extend: {
      colors: {
        ...brandColors,
        gray: grayScale,
        zinc: grayScale,
        slate: grayScale,
        cyan: cyanScale,
        rust: rustScale,
        olive: oliveScale,
        gold: goldScale,
        blue: {
          500: brandColors["cyan-10"],
          600: brandColors["cyan-40"],
          800: brandColors["cyan-60"],
        },
      },
    },
  },
};
