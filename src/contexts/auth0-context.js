import createAuth0Client from "@auth0/auth0-spa-js";
import React, { useState, createContext, useEffect } from "react";

export const Auth0Context = createContext();

export function Auth0Provider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [auth0Client, setAuth0Client] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    initAuth0()

    async function initAuth0() {
      const auth0 = await createAuth0Client({
        domain: 'dev-2g4o78n1.us.auth0.com',
        client_id: '4XA9X9jCVzYeG9zaO5SAn2mRCC0omVO0',
        redirect_uri: window.location.origin,
      })
      setAuth0Client(auth0)

      // handle redirect when user comes back
      if(window.location.search.includes('code=') && window.location.search.includes('state=')){
        try {
          await auth0.handleRedirectCallback()
        }
        catch(err){
          alert(err)
        }
        window.location.replace(window.location.pathname)
      }

      // is a user authenticated?
      const isAuthenticated = await auth0.isAuthenticated();
      setIsAuthenticated(isAuthenticated)

      // go grab the user - only grab user info if they're authenticated
      if (isAuthenticated) {
        const user = await auth0.getUser();
        setUser(user)
      }
    }

    setIsLoading(false)
  }, [])

  return (
    <Auth0Context.Provider
    value={{
      isAuthenticated,
      user,
      isLoading,
      login: (...p) => auth0Client.loginWithRedirect(...p),
      logout:(...p) => auth0Client.logout(...p)
    }
    }>
    {children}
  </Auth0Context.Provider>
  )
}
