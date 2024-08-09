## Chatbot Web Application - EBO

This project is a React-based chatbot web application that interacts with the Wit.ai Natural Language Processing (NLP) engine. It allows users to send messages and receive intelligent responses from the bot based on the Wit.ai model's understanding.

#### Features
- **Real-Time Chat:** Users can send messages and receive instant responses from the bot.
- **Natural Language Processing:** Integrated with Wit.ai to understand and process user inputs.
- **Responsive Design:** The chat interface is designed to be user-friendly and responsive across different screen sizes.
- **Message History:** Maintains a history of messages between the user and the bot.
- **Typing Indicator:** Displays a typing indicator when the bot is processing a response.
- **Material-UI and Emotion:** Uses Material-UI for UI components and Emotion for styling.

#### Getting Started
##### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

##### Installation
1. **Clone the Repository:**
    ```bash
    git clone https://github.com/deliteser112/ebo-chatbot-reactjs.git
    cd ebo-chatbot-reactjs
    ```

2. **Install Dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3. **Set Up Environment Variables:**
    - Create a `.env` file in the root directory.
    - Add your Wit.ai token:
        ```makefile
        REACT_APP_WITAI_TOKEN=your_wit_ai_token
        ```

4. **Run the Application:**
    ```bash
    npm start
    # or
    yarn start
    ```
    The application will run in development mode. Open http://localhost:3000 to view it in the browser.

#### Technologies Used
- React: A JavaScript library for building user interfaces.
- Redux: A state management library for JavaScript apps.
- Material-UI: A popular React UI framework.
- Emotion: A performant and flexible CSS-in-JS library.
- Wit.ai: NLP engine for understanding user inputs.

#### How It Works
- **Redux Store:** The app uses a single Redux store to manage the state of messages.
- **Wit.ai Integration:** User messages are sent to Wit.ai for processing. The bot's response is based on the recognized intent and entities.
- **UI Design:** The chat UI is designed using Material-UI components and styled with Emotion.
