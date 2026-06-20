import { throws } from "node:assert";
import { readFile } from "node:fs/promises";
import { stdin, stdout } from "node:process";

const args = process.argv.slice(2);

if(! stdin.isTTY){

    const chunks = [];

    stdin.on("data" , (chunk)=> chunks.push(chunk));

    stdin.on("end", async ()=>{
        const std = Buffer.concat(chunks).toString("utf8");
        const stdArr = std.split('\n');
        if(args.includes('-n')){
            let j = 1;
            for( let i = 0 ; i<stdArr.length ; i++ ){
                
                    console.log(`${j}  ${stdArr[i]}`);
                    j++;
            }
        }else if(args.includes('-b')){
            let j = 1;
            for( let i = 0 ; i < stdArr.length ; i++){
                if( stdArr[i].trim().length === 0 ){
                    console.log(stdArr[i]);
                }else{
                    console.log(`${j}  ${stdArr[i]}`);
                    j++;
                }
            }
        }else{
            console.log(std);
        }
    })
}else{
    try{
        let res = "";
        const content = await  Promise.all(
            args.map(  (file => 
                readFile(String(file), {encoding:"utf8"})
            ))
        );
        res = content.join('');
        console.log(res);
    }catch(err){
        console.error(err);
    }
}








