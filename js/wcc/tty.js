import util from "./utils.js";
import { existsSync , readFileSync } from "node:fs";
const tty = (args , flags_maps) => {
if(args.length < 2 ){
  args.push('');
  args.reverse();
}
const flag = args[0];
const file = args[1];
if( !flags_maps.has(flag)){
  console.error('not a valid flag');
  process.exit(0);
}else if(! existsSync(file)){
  console.error('enter a valid file path');
  process.exit(0);
}
const file_content = readFileSync(file , {encoding:'utf8'});
util(flag , file_content , file);
}

export default tty;