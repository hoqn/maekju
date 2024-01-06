const colorScales = [
  50,
  100,
  200,
  300,
  400,
  500,
  600,
  700,
  800,
  900,
  950,
] as const;

export function generateColorVars(varPrefix: string) {
  // 50부터 950까지 var($) 형태 생성
  return colorScales.reduce<{
    [key in typeof colorScales[number]]: string
  }>((ac, scale) => ({
    ...ac,
    [scale]: `rgb(var(--${varPrefix}-${scale}) / <alpha-value>)`,
  }), {} as any);
}