import axios from "axios";

const API_URL = "https://api.wit.ai/message";
const ACCESS_TOKEN = process.env.REACT_APP_WITAI_TOKEN;

export const fetchWitAiResponse = async (message) => {
  try {
    const response = await axios.get(API_URL, {
      params: { q: message },
      headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
    });
    const data = response.data;

    if (data.intents.length > 0) {
      const intent = data.intents[0].name;
      const datetime = data.entities["wit$datetime:datetime"]
        ? new Date(
            data.entities["wit$datetime:datetime"][0].value
          ).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : "today";

      switch (intent) {
        case "greeting":
          return "Hi there! How’s it going?";
        case "wit$get_time":
          return `Right now, it’s ${new Date().toLocaleTimeString()}. Anything else you need?`;
        case "get_mui_info":
          return `Material-UI (MUI) is a popular React UI framework that provides a set of pre-built, customizable components that help you build user interfaces faster. It follows Google's Material Design guidelines and includes components like buttons, cards, grids, and more. It’s widely used in the React ecosystem for its ease of use and comprehensive component library. Would you like to know more about a specific MUI component?`;
        case "get_react_hooks_info":
          return `React Hooks are functions that let you use state and other React features without writing a class. They allow you to manage the component's state and lifecycle more easily within functional components. Hooks like \`useState\`, \`useEffect\`, and \`useContext\` are some of the most commonly used ones. Would you like to learn more about any specific hook?`;
        case "wit$set_timer":
          if (data.entities["wit$duration"]) {
            const duration = data.entities["wit$duration"][0].value;
            return `Setting a timer for ${duration}. Anything else I can help with?`;
          } else {
            return "How long should the timer be?";
          }
        case "wit$get_temperature":
          return `Let me find the temperature for ${datetime}.`;
        case "wit$get_weather":
          const location = data.entities["wit$location:location"]
            ? data.entities["wit$location:location"][0].resolved.values[0].name
            : "your location";

          return `Sure! I'll check the weather in ${location} for ${datetime}.`;
        case "wit$create_alarm":
          if (data.entities["wit$datetime"]) {
            const datetime = data.entities["wit$datetime"][0].value;
            const time = new Date(datetime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });
            return `Got it! I’ll set the alarm for ${time}. Need anything else?`;
          } else {
            return "When would you like to set the alarm?";
          }
        case "wit$set_reminder":
          if (data.entities["wit$reminder"]) {
            const reminder = data.entities["wit$reminder"][0].value;
            return `Sure, I’ll remind you about ${reminder}. Anything else on your mind?`;
          } else {
            return "What would you like to be reminded about?";
          }
        case "wit$search_query":
          if (data.entities["wit$search_query"]) {
            const query = data.entities["wit$search_query"][0].value;
            return `Let me search for ${query} and get back to you.`;
          } else {
            return "What would you like to search for?";
          }
        default:
          return "Sorry, I didn’t quite catch that. Could you try rephrasing?";
      }
    } else if (data.entities && Object.keys(data.entities).length > 0) {
      const entities = Object.keys(data.entities)
        .map((entity) => `${entity}: ${data.entities[entity][0].value}`)
        .join(", ");
      return `I detected the following: ${entities}. What would you like to do next?`;
    } else if (data.traits && Object.keys(data.traits).length > 0) {
      const trait = Object.keys(data.traits)[0];
      return `I noticed a trait: ${trait}. How can I assist further?`;
    } else {
      return "Hmm, I’m not sure I understood that. Could you clarify?";
    }
  } catch (error) {
    console.error("Error fetching wit.ai response:", error);
    return "Oops, something went wrong while trying to fetch the response. Please try again.";
  }
};
