# ByteGenie Test - Frontend UI🎨

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Key Functionalities of the UI

- **Chat Interface**: A seamless chat interface that allows users to interact with a bot using natural language queries.
- **Sidebar with Conversations**: A collapsible sidebar that lists previous conversations, grouped by datetime (Today, Yesterday, Previous 7 Days). Users can select a conversation to view it or delete specific conversations.
- **Real-time Updates**: The sidebar updates in real-time when new conversations are created.
- **Tooltips**: Buttons within the UI have tooltips for improved user guidance.

## API Endpoints Used

1. **Fetch Conversations**: `GET http://127.0.0.1:5000/conversation`
   - Response:
     ```json
     {
       "conversations": [
         {
           "id": 3,
           "user_query_summary": "Find Exabeam employee emails.",
           "date_time": "2024-08-07T01:49:36.657088"
         },
         ...
       ]
     }
     ```

2. **Retrieve Specific Conversation**: `GET http://127.0.0.1:5000/conversation?id=2`
   - Response:
     ```json
     {
       "id": 2,
       "user_query_summary": "Company employee count analysis.",
       "user_query": "What company has the biggest number of employee",
       "retrieved_data": "[{'company_name': 'Satrec Initiative Co., Ltd.'}]",
       "model_response": "Satrec Initiative Co., Ltd. has the biggest number of employees.",
       "date_time": "2024-08-07T01:48:09.099224",
       "query_status": "successful"
     }
     ```

3. **Delete Specific Conversation**: `DELETE http://127.0.0.1:5000/conversation/delete`
   - Request Body:
     ```json
     {
       "id": 1
     }
     ```
   - Response:
     ```json
     {
       "message": "Conversation deleted successfully"
     }
     ```

4. **Send User Query and Get Answer**: `POST http://127.0.0.1:5000/query`
   - Request Body:
     ```json
     {
       "query": "I want to find the email of exabeam employees"
     }
     ```
   - Response:
     ```json
     {
       "response": "The email addresses of exabeam employees are: ..."
     }
     ```

## Key Challenges Faced in Building the Front-End

- **State Management**: Managing the state of the chat interface and sidebar to ensure real-time updates and seamless user experience was challenging.
- **Responsive Design**: Ensuring the UI is responsive and looks good on different screen sizes required careful CSS adjustments and testing.
- **API Integration**: Integrating with the backend APIs and handling various response scenarios and errors required thorough testing and handling.

## Improvements If More Time Was Available

- **Enhanced UI/UX**: Further refining the UI/UX with animations, better styling, and improved responsiveness.
- **Error Handling**: Adding more robust error handling and user notifications for API errors or other issues.
- **Testing**: Implementing comprehensive unit and integration tests to ensure the application is robust and handles edge cases gracefully.
- **Performance Optimization**: Optimizing the performance of the application, especially for loading and updating conversation lists in real-time.

# Getting Started with the Project

To run this project locally, follow these steps:

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js
- npm (Node Package Manager)

### Installation

1. Clone the repository to your local machine:

   ```sh
   git clone https://github.com/your-username/bytegenie-frontend.git
   ```

2. Navigate to the project directory:

   ```sh
   cd bytegenie-frontend
   ```

3. Install the required dependencies:

   ```sh
   npm install
   ```

### Running the App
To start the development server, run:
```sh
npm start
```

This will run the app in development mode. Open http://localhost:3000 to view it in your browser. The page will reload when you make changes, and you may also see any lint errors in the console.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
