  const host = window.location.hostname;
  const port = window.location.port;
  //http://10.9.110.37:7410
  if(host==='localhost'){
    window.config = {
      baseUrl: "http://10.9.110.37:7410",
    };
  }else{
    window.config = {
      baseUrl: `http://${host}:${port}`,
    };
  }
