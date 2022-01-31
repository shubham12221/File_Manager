const { dir } = require("console");
let fs=require("fs");
let path=require("path");
let inputArr=process.argv.slice(2);
let types=
{
    media:["mp4","mp3"],
    archives:["zip","7z","rar","tar","gz","ar","ixo","js"],
    documents:["docx","doc","pdf","txt"],
    apps:["exe","dmg"]
}
//console.log(inputArr);
//node main.js organize path
//node main.js tree path
//node main.js help
let command=inputArr[0];
switch(command)
{
    case "organize": organizeFn(inputArr[1]);
                        break;
    case "tree": treeFn(inputArr[1]);
                        break;
    case "help": helpFn();
                        break;
    default: console.log("Enter right command");
                        break;
}




function organizeFn(dirPath)
{
    //1. Input directory path given
    let destPath;
    if(dirPath==undefined)
    {
        console.log("Kindly Enter path");
        return;
    }
    let doesExist=fs.existsSync(dirPath);
    if(doesExist)
    {
    //2. Create a directory with name organizedDirectory
    destPath=path.join(dirPath,"Organized_Files");
        if(fs.existsSync(destPath)==false){
        fs.mkdirSync(destPath);}

    }
    else
    {
        Console.log("Kindly enter the right path");
        return;
    }

    organizeHelper(dirPath,destPath);

}
function organizeHelper(src,dest)
{
    //3. Identify category of files in source directory
    let childName=fs.readdirSync(src);
   // console.log(childName);
   for(let i=0;i<childName.length;i++)
   {
        let childAddress=path.join(src,childName[i]);
        if(fs.lstatSync(childAddress).isFile())
        {
           // console.log(childName[i]);
           let category=getCategory(childName[i]);
           console.log(childName[i]," belongs to ",category," Category");
           //4. Copy the files and paste in individual category folder in organizedDirectory.
            sendFiles(childAddress,dest,category);
        }
   }
}

function getCategory(name)
{
    //This gives the extension of file
    let ext=path.extname(name);
    ext=ext.slice(1);
    //console.log(ext);
    for(let type in types)
    {
        let cTypeArray=types[type];
        for(let i=0;i<cTypeArray.length;i++)
        {
            if(ext==cTypeArray[i])
            {
                return type;
            }
        }
    }
    return "others";
}

function sendFiles(srcFilePath,dest,category)
{
    //Create category wise subfolder into organized folder
    let categoryPath=path.join(dest,category)
    if(fs.existsSync(categoryPath)==false)
    {
        fs.mkdirSync(categoryPath);
    }
    //To copy file from one location to another location, first create a new empty file with same
    //name to destination and then copy the content
    let fileName=path.basename(srcFilePath);
    let destFilePath=path.join(categoryPath,fileName);
    fs.copyFileSync(srcFilePath,destFilePath);

}






function treeFn(dirPath)
{
    if(dirPath==undefined)
    {
        console.log("Kindly Enter path");
        return;
    }
    let doesExist=fs.existsSync(dirPath);
    if(doesExist)
    {
        TreeHelper(dirPath,"");

    }
    else
    {
        Console.log("Kindly enter the right path");
        return;
    }
}

function TreeHelper(dirPath,indent)
{
    let isFile=fs.lstatSync(dirPath).isFile();
    if(isFile)
    {
        let fileName=path.basename(dirPath);
        console.log(indent+"|-- "+fileName);
    }
    else
    {
        let dirName=path.basename(dirPath);
        console.log(indent+" --|"+dirName);
        let childrens=fs.readdirSync(dirPath);
        for(let i=0;i<childrens.length;i++)
        {
            let childPath=path.join(dirPath,childrens[i]);
            TreeHelper(childPath,indent+"\t");
        }
    }
}





function helpFn()
{
    console.log(
        `node main.js organize path
         node main.js tree path
         node main.js help`
    );
}