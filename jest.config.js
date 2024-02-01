module.exports={
    roots: ["<rootDir>/tests"],
    transform:{
        "^.+\\.tsx?$":"ts-jest",
    
    },
    testRegex:"(/__testes__/.*|(\\.|/)(test|spec))\\.tsx?$",
    moduleFileExtensions:["ts","tsx","js","jsx","json","node"],
}