class ExpressError extends Error{
 constructor(status,message){
    super();
    this.name = "Custom Error";
    this.status = status;
    this.message = message;
 }
}

module.exports = ExpressError;