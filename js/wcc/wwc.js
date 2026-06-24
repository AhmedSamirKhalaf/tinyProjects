import { existsSync, fstat, readFileSync } from "node:fs";
import {readFile} from "node:fs/promises";
import { stdin } from "node:process";
import util from "./utils.js";
import noTty from "./noTty.js";
import tty from "./tty.js";

const args = process.argv.slice(2 , 4);
const flags_maps = new Map();
flags_maps.set('-c' , '-c');
flags_maps.set('-m' , '-m');
flags_maps.set('-l' , '-l');
flags_maps.set('-w' , '-w');
flags_maps.set('' , '');

///
if(stdin.isTTY){
  tty(args , flags_maps);
}else{
  noTty(args , flags_maps);
}