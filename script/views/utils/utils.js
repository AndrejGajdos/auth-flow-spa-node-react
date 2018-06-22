/**
 * Checks if input String is valid URL address
 *
 * @param  {String} str - URL address
 * @returns {Boolean} - True if string is valid URL, false otherwise
 */
module.exports.isValidURL = (str) => {
  const regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
  if (!regex.test(str)) {
    return false;
  }
  return true;
};
