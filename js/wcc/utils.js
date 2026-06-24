const util = (flag , file_content , file) => {
switch (flag) {
  case '-c': { 
    console.log(Buffer.byteLength(file_content , 'utf8') , file);
    break;
  }
  case '-m': {
    const chars = file_content.length
    console.log(chars , file);
    break;
  }
  case '-l':{
    const lines = file_content.trim().split(/\n/).length;
    console.log(lines , file);
    break;
  }
  case '-w': {
    const words = file_content.trim().split(/\s+/).length;
    console.log(words , file);  
    break;
  }
  default:{
    const chars = file_content.length;
    const lines = file_content.trim().split(/\n/).length;
    const words = file_content.trim().split(/\s+/).length;
    console.log(lines, words, chars , Buffer.byteLength(file_content , 'utf8'),    file);
    break;
  }
}
}

export default util;