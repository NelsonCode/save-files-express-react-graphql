import UploadImages from "./components/UploadImages";
import { ApolloProvider } from "@apollo/client";
import { client } from "./graphql/ApolloClient";
function App() {
  return (
    <div>
      <ApolloProvider client={client}>
        <h1>Hola</h1>
        <UploadImages />
      </ApolloProvider>
    </div>
  );
}

export default App;
