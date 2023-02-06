const upperCaseRegex = /^[A-Z]$/;
const lowerCaseRegex = /^[a-z]$/;
const numberRegex = /^[0-9]$/;
const symbolRegex = /^[-#!$@£%^&*()_+|~=`{}\[\]:";'<>?,.\/ ]$/;

function countChars(str) {
    let result = {};
    Array.from(str).forEach((char) => {
      let curVal = result[char];
      if (curVal) {
        result[char] += 1;
      } else {
        result[char] = 1;
      }
    });
    return result;
  }
function analyzePassword(password) {
    let charMap = countChars(password);
    let analysis = {
      length: password.length,
      uniqueChars: Object.keys(charMap).length,
      uppercaseCount: 0,
      lowercaseCount: 0,
      numberCount: 0,
      symbolCount: 0,
    };
    Object.keys(charMap).forEach((char) => {
      if (upperCaseRegex.test(char)) {
        analysis.uppercaseCount += charMap[char];
      } else if (lowerCaseRegex.test(char)) {
        analysis.lowercaseCount += charMap[char];
      } else if (numberRegex.test(char)) {
        analysis.numberCount += charMap[char];
      } else if (symbolRegex.test(char)) {
        analysis.symbolCount += charMap[char];
      }
    });
    if(!analysis.uppercaseCount){
        return "Password must have atleast 1 uppercase letter";
    }else if(!analysis.lowercaseCount){
        return "Password must have atleast 1 lower case letter"
    }else if(!analysis.numberCount){
        return "Password must have atleast 1  number"
    }else if(!analysis.symbolCount){
        return "Password have atleast 1 symbol"
    }else if(analysis.length < 8){
        return "Password must have be 8 or more characters"
    }
  }
export default analyzePassword