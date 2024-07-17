const {connect} = require("mongoose");

module.exports = () => {
  connect(process.env.MONGODB).then((connect) => {
    console.log('#### DB CONNECTED #### -', connect.connection.host, connect.connection.name);
  })
  .catch((err)=>console.log('*** Failed to DB CONNECTING! *** -',err))
};
