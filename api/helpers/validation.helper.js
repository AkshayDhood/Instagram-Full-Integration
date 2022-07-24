// validate url correct or not 
const validation = (url, caption = '') => {
    let regex = /(https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    return regex.test(url) && (typeof caption === 'string') ? caption.trim() : false;
};


// export
module.exports = validation;