import { stdin } from "node:process";
import util from "./utils.js";

const noTty = (args , flags_maps)=>{
    const chuncks = [];
    const flag = args[0]; 
    stdin.on('data' , (chunck) => chuncks.push(chunck));
    stdin.on('end' , async () => {
        util( flag, chuncks.toString() , '')
    })
    
}
export default noTty;