import '../styles/globals.css'

import {ApolloClient, InMemoryCache, ApolloProvider,} from '@apollo/client'

function MyApp({ Component, pageProps }) {

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: 'http://localhost:4000/graphql',
  })
  
  return(
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
