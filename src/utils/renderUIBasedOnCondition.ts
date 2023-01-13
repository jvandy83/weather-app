import { timeOfDay } from "./dates";

const renderDaytimeClearConditions = (context) => {
  switch (context) {
    case "page":
      return "bg-gradient-to-b from-navyBlue to-lightSkyBlue";
    case "input":
      return "bg-skyBlue";
    case "subnav":
      return "bg-darkBlue";
    case "favNav":
      return "bg-skyBlue";
  }
};

const renderNightTimeClearConditions = (context) => {
  switch (context) {
    case "page":
      return "bg-gradient-to-b from-darkBlue to-blue";
    case "input":
      return "bg-blue";
    case "subnav":
      return "bg-darkestBlue";
    case "favNav":
      return "bg-blue";
  }
};

const renderNightTimeCloudyConditions = (context) => {
  switch (context) {
    case "page":
      return "bg-gradient-to-b from-nightTimeDarkPurple to-nightTimeLightPurple";
    case "input":
      return "bg-searchFormInputNightTimePurple";
    case "subnav":
      return "bg-darkPurple";
    case "favNav":
      return "bg-searchFormInputNightTimePurple";
  }
};
const renderDayTimeCloudyConditions = (context) => {
  switch (context) {
    case "page":
      return "bg-gradient-to-b from-dayTimeDarkPurple to-dayTimeLightPurple";
    case "input":
      return "bg-searchFormInputDayTimePurple";
    case "subnav":
      return "bg-darkPurple";
    case "favNav":
      return "bg-searchFormInputDayTimePurple";
  }
};

export const renderBGColors = (condition, context) => {
  const tod = timeOfDay();
  switch (tod) {
    case "day":
      if (condition === "Clear") {
        return renderDaytimeClearConditions(context);
      } else {
        return renderDayTimeCloudyConditions(context);
      }
    case "night":
      if (condition === "Clear") {
        return renderNightTimeClearConditions(context);
      } else {
        return renderNightTimeCloudyConditions(context);
      }

    default:
      return "bg-gradient-to-b from-skyBlue to-lightSkyBlue";
  }
};
