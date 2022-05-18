var TIME;

function timer(time) {
    return new Promise(function (resolve) {
        setTimeout(function(){
            resolve(time);
        }, time);
    });
}

async function run(){
    console.log('start');
    var time = await timer(1000);
    console.log('time: ', time);
    time = await timer(time + 1000);
    console.log('time: ', time);
    time = await timer(time + 1000);
    console.log('time: ', time);
    console.log('end');

    return time;
}

async function run2(){
    TIME = await run();    
    console.log(TIME);
}
run2();