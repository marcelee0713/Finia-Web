export const generateYellowShades = (
  startColor: string,
  numberOfShades: number
): string[] => {
  const hexToRgb = (hex: string) => {
    let r = 0,
      g = 0,
      b = 0;
    if (hex.length == 4) {
      r = parseInt(hex[1] + hex[1], 16);
      g = parseInt(hex[2] + hex[2], 16);
      b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length == 7) {
      r = parseInt(hex[1] + hex[2], 16);
      g = parseInt(hex[3] + hex[4], 16);
      b = parseInt(hex[5] + hex[6], 16);
    }
    return [r, g, b];
  };

  const rgbToHex = (r: number, g: number, b: number) => {
    const toHex = (n: number) => {
      const hex = n.toString(16);
      return hex.length == 1 ? "0" + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

  const adjustBrightness = (rgb: number[], factor: number) => {
    return rgb.map((channel) =>
      Math.min(255, Math.max(0, Math.floor(channel * factor)))
    );
  };

  const startRgb = hexToRgb(startColor);
  const shades: string[] = [];

  for (let i = 0; i < numberOfShades; i++) {
    const factor = 1 - i * 0.05;
    const newRgb = adjustBrightness(startRgb, factor);
    shades.push(rgbToHex(newRgb[0], newRgb[1], newRgb[2]));
  }

  return shades;
};
