export const isValidEmail = (email: string): boolean => {
    if (!email || typeof email.match !== 'function') {
      return false;
    }
    return !!email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };
  
  export const isValidPassword = (password: string): boolean => {
    if (!password || typeof password.length !== 'number') {
      return false;
    }
    return password.length > 5;
  };
  