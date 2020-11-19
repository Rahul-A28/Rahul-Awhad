let strings = ["Tom","Ivan","Jerry"];

let convert1 = (arr) => {
    let ans = [];
    
    for(let i of arr){
        ans.push({name:i,length:i.length});
    } 
    return ans;
};

let res = convert1(strings);
console.log(res);

// return [{arr[0],arr[0].length}].concat(convert(arr.slice(1,0))); 