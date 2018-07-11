const request = require('request');

module.exports = randomNumber = function ( min, max ) {
  let options = {
    method: 'GET',
    url: `https://www.random.org/integers/?num=1&min=${min}&max=${max}&col=1&base=10&format=plain&rnd=new`
  }

  return  new Promise( ( resolve, reject ) => {
    request( options, ( error, response, body ) => {
      resolve( parseInt( body )  );
       reject( new Error( error ) );
     });
  });
}
