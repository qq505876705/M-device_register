function FdGlobal() {
  this.author = "liuYueQing";
}

FdGlobal.prototype = {
  /**
   * 二维码解析主程序
   */
  mainMethods(productArr, configArr) {
    let resultString = "";
    for (let i = 0; i < productArr.length; i++) {
      let strContent = "";
      if (configArr[i].type === "整型") {
        strContent = parseInt(productArr[i]).toString(2);
        var l = strContent.length; // 获取要格式化数字的长度，如二进制1的话长度为1
        if (l < configArr[i].length) {
          // 补全位数 0000，这里要显示4位
          for (var j = 0; j < configArr[i].length - l; j++) {
            strContent = "0" + strContent; // 不够的就在前面补0
          }
        }
        // console.log(strContent, strContent.length, "整型位数" + i);
      }
      if (configArr[i].type === "浮点") {
        strContent = this.float_to_binary(productArr[i]);
        // console.log(strContent, "strContent");
        if (strContent.length < configArr[i].length) {
          let temp = "";
          for (let n = 0; n < configArr[i].length - strContent.length; n++) {
            temp += "0";
          }
          strContent = temp + strContent;
        }
        // console.log(strContent, strContent.length, "浮点位数" + i);
      }

      if (configArr[i].type === "字符") {
        // console.log(this.stringToHex(this.productArr[i]), "this.stringToHex(this.productArr[i])");
        const hexString = this.stringToHex(productArr[i].toString());
        /**
         * 每两位数字转义一次
         */
        for (let n = hexString.length - 2; n > -1; n -= 2) {
          const tempHexString = hexString.substring(n, n + 2);
          // console.log(tempHexString, "tempHexString");
          let tempContent = parseInt("0x" + tempHexString, 16).toString(2);
          // 不足八位的时候补0
          while (tempContent.length < 8) {
            tempContent = "0" + tempContent;
          }
          strContent += tempContent;
          // console.log(tempContent, "tempContent");
        }
        // while()
        let tempStr = "";
        for (let n = strContent.length; n < configArr[i].length; n++) {
          tempStr += "0";
        }
        strContent = tempStr + strContent;
        // console.log(strContent, strContent.length, "字符位数位数" + i);
      }

      resultString = strContent + resultString;
    }

    if (resultString.length % 4 > 0) {
      let temp = "";
      for (let n = 0; n < 4 - (resultString.length % 4); n++) {
        temp += "0";
      }
      resultString = temp + resultString;
    }
    // const resultHex = parseInt(`'${resultString}'`, 2).toString(16);
    resultString = this.parseResult(resultString);
    return resultString;
  },
  /**
   * 处理最终的二进制字符串，转为16进制数
   */
  parseResult(resultString) {
    // console.log(resultString, "resultString");
    let result = "";
    for (let i = resultString.length / 8 - 1; i > -1; i--) {
      const string8Bite = resultString.substring(8 * i, 8 * (i + 1));
      result += this.binToIHex(string8Bite).toUpperCase();
    }
    return result;
  },
  /**
   * 字符串转16进制数
   */
  stringToHex(str) {
    if (str === "") {
      return "";
    }
    // if (str === "α") {
    //   return 128;
    // }
    var arr = [];
    // arr.push("0x");
    for (var i = 0; i < str.length; i++) {
      if (str[i] === "α") {
        arr.push((128).toString(16));
      } else {
        arr.push(str.charCodeAt(i).toString(16));
      }
    }
    console.log(arr, "arr");
    return arr.join("");
  },
  /**
   * 二进制数转16进制
   */
  binToIHex(data) {
    const stringArr = [];
    for (let i = 0; i < data.length / 4; i++) {
      let temp = "";
      temp = parseInt(data.slice(i * 4, 4 * (i + 1)), 2).toString(16);
      stringArr.push(temp);
    }
    return stringArr.join("");
  },
  /**
   * 浮点数转成二进制数
   */
  float_to_binary(data) {
    var str = Number(data).toString(); // 单精度浮点数转为字符串表示（十进制）
    var hexStr = this.get_float_hex(str); // 十进制字符串表示转为十六进制字符串表示
    // console.log(Number("0x" + hexStr).toString(2), "hexStr", hexStr);
    const toBin = Number("0x" + hexStr).toString(2);
    // var bin = new Uint8Array(4);
    // for (let i = 0, j = 0; i < 4; i++, j += 2) {
    //   // 将每个字节中的二进制数换算成十进制数，存到ArrayBuffer中
    //   const dec = parseInt(hexStr[j], 16) * 16 + parseInt(hexStr[j + 1], 16);
    //   bin[i] = dec;
    // }
    return toBin;
  },
  // 浮点数的十六进制
  get_float_hex(decString) {
    // var dec = decString; // 浮点数的十进制字符串
    // var sign;
    var signString;
    var decValue = parseFloat(Math.abs(decString)); // 获取浮点数的绝对值
    if (decString.toString().charAt(0) === "-") {
      // sign = 1; // 若为负数，符号位为1
      signString = "1";
    } else {
      // sign = 0; // 若为正数，符号位为0
      signString = "0";
    }
    // console.log(sign, "sign");
    if (decValue === 0) {
      // 对于0的特殊处理
      // fraction = 0;
      exponent = 0;
    } else {
      var exponent = 127; // 单精度浮点数的偏移值为127
      if (decValue >= 2) {
        // 若浮点数>=2，就不断除2，同时指数不断增加，直到浮点数小于2
        while (decValue >= 2) {
          exponent++;
          decValue /= 2;
        }
      } else if (decValue < 1) {
        // 若浮点数<1，就不断乘2，同时指数不断减少，直到浮点数大于1或指数为0
        while (decValue < 1) {
          exponent--;
          decValue *= 2;
          if (exponent === 0) {
            break;
          }
        }
      }
      if (exponent !== 0) decValue -= 1;
      else decValue /= 2; // 若指数不为0，取小数部分，否则除以2
    }
    var fractionString = this.DecToBinTail(decValue, 23); // 取23位尾数
    var exponentString = this.DecToBinHead(exponent, 8); // 取8位阶码
    return this.Right(
      "00000000" +
        parseInt(signString + exponentString + fractionString, 2).toString(16),
      8
    );
  },
  DecToBinTail(dec, pad) {
    var bin = "";
    var i;
    for (i = 0; i < pad; i++) {
      dec *= 2;
      if (dec >= 1) {
        dec -= 1;
        bin += "1";
      } else {
        bin += "0";
      }
    }
    return bin;
  },
  DecToBinHead(dec, pad) {
    var bin = "";
    var i;
    for (i = 0; i < pad; i++) {
      bin = parseInt(dec % 2).toString() + bin;
      dec /= 2;
    }
    return bin;
  },
  Right(String, Length) {
    if (String == null) {
      return false;
    }
    var dest = "";
    for (let i = String.length - 1; i >= 0; i--) {
      dest = dest + String.charAt(i);
    }
    String = dest;
    String = String.substr(0, Length);
    dest = "";
    for (let i = String.length - 1; i >= 0; i--) {
      dest = dest + String.charAt(i);
    }
    return dest;
  }
};
export default FdGlobal;
