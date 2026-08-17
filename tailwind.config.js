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
  "cyan-00": "#F5FAFC",
  "cyan-10": "#D3ECF3",
  "cyan-20": "#A7DCEA",
  "cyan-30": "#7DD0E6",
  "cyan-40": "#4AC4E4",
  "cyan-50": "#1BBAE4",
  "cyan-60": "#1098BC",
  "cyan-70": "#097491",
  "cyan-80": "#054C5F",
  "cyan-90": "#02242D",
  "rust-00": "#FBF6F5",
  "rust-10": "#F3DBD3",
  "rust-20": "#F0B4A1",
  "rust-30": "#F48F6F",
  "rust-40": "#E3704B",
  "rust-50": "#CD5732",
  "rust-60": "#9F492D",
  "rust-70": "#783622",
  "rust-80": "#4F2315",
  "rust-90": "#25100A",
  "olive-00": "#FAFCF5",
  "olive-10": "#EAF2D4",
  "olive-20": "#D7E6AB",
  "olive-30": "#C7DE85",
  "olive-40": "#AEC767",
  "olive-50": "#95AD52",
  "olive-60": "#727F4D",
  "olive-70": "#555F3B",
  "olive-80": "#383E26",
  "olive-90": "#1A1D12",
  "gold-00": "#FBF9F5",
  "gold-10": "#F0E8D6",
  "gold-20": "#E2D2AF",
  "gold-30": "#D7C08C",
  "gold-40": "#CAAA64",
  "gold-50": "#BF9840",
  "gold-60": "#937739",
  "gold-70": "#6E5A2C",
  "gold-80": "#483A1C",
  "gold-90": "#221B0D",
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
  [50, 100, 200, 300, 400, 500, 600, 700, 800, 900],
  ["00", 10, 20, 30, 40, 50, 60, 70, 80, 90]
);

const rustScale = buildScale(
  "rust",
  [50, 100, 200, 300, 400, 500, 600, 700, 800, 900],
  ["00", 10, 20, 30, 40, 50, 60, 70, 80, 90]
);

const oliveScale = buildScale(
  "olive",
  [50, 100, 200, 300, 400, 500, 600, 700, 800, 900],
  ["00", 10, 20, 30, 40, 50, 60, 70, 80, 90]
);

const goldScale = buildScale(
  "gold",
  [50, 100, 200, 300, 400, 500, 600, 700, 800, 900],
  ["00", 10, 20, 30, 40, 50, 60, 70, 80, 90]
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
          500: brandColors["cyan-30"],
          600: brandColors["cyan-70"],
          800: brandColors["cyan-80"],
        },
      },
    },
  },
};
