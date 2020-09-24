import theme from "@styles/theme";

class StyleUtils {

  public conditionalStyle = (condition: boolean, style: object | object[]) => {
    return condition ? style : {};
  }

  public widthPercentage(percentage: any) {
    const value = percentage * theme.viewport.width / 100;
    return Math.round(value);
  }
}

const styleUtils = new StyleUtils();
export {styleUtils as StyleUtils};
