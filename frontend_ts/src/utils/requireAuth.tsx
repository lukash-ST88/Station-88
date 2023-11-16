import React, { ReactComponentElement, useEffect } from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";

export const requireAuth = (Component: any) => {
  const authenticatedComponent = (props: any) => {
    useEffect(() => {
      checkAuth();
    }, []);

    function checkAuth() {
      if (!props.isAuthenticated) {
        const redirectAfterLogin = props.location.pathname;
        console.log("redirect");
        props.dispatch(push(`/login?next=${redirectAfterLogin}`));
      }
    }
    return (
      <div>
       <Component {...props} />
      </div>
    );
  };
  const mapStateToProps = (state: any) => {
    return {
      isAuthenticated: state.auth.isAuthenticated,
      token: state.auth.token,
    };
  };
  return connect(mapStateToProps)(authenticatedComponent);
}
