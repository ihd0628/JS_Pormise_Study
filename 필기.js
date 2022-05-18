const { response } = require("express")

# Javascript Call back

프로그래밍에는 First Class Citizen 이라는 개념이있다.
1급시민, 1급객체 라고도 부른다. 

1급시민에 해당하는 문법들이 있는데 
1은 변수의 값이 될 수 있다. 그러니 숫자는 프로그래밍 세계에서 1급 시민인 것 이다. 
조건문은 변수의 값이 될 수 없다. 그러하니 1급 시민이 될 수 없다. 
함수는 Javascript에서 변수가 될 수 있다. 그러니 1급 시민이 될 수 있다. 

어떤 함수가 다름 함수의 return 값이 될 수 있다면 그 언어는 함수를 1급 시민으로 대우해주는거다. 
또한 함수가 다른 함수의 입력겂이 될 수 있다면 그 언어는 함수를 1급 시민으로 대우해주는거다. 

아니 그래서 콜백이 뭐냐 
아래의 코드를 보자. 

********************************************************************************************************************************
val = function(a){
    return a+1
}

function fn(arg){
    return arg();
}
fn(val)
********************************************************************************************************************************

fn이라는 함수는 arg라는 parameter를 받아서 함수안에서 저 arg parameter를 함수로서 호출하고 있다. 
그러니 맨 아래에 val 이 fn함수의 입력값으로 들어갔고 저 val은 fn함수안에서 arg라는 이름을 가진다. 
그리고 val 함수는 함수내에서 호출이 되는것이다. 

즉, val은 바로 실행되지는 않지만 다른 함수의 입력값으로 전달되서 다른함수에 의해서 나중에 호출된다. 
그리고 우린 이걸 CALLBACK 함수 라고 한다. 

즉, 저 val 자체는 콜백함수가 아니지만 저 val이 다른함수의 입력값으로 전달 되어서 그것이 호출된다면 
저 val은 이 맥락에서 CALLBACK 함수가 되는것 이다. 

아래는 내가 직접 callback함수와 그 calllback함수를 호출하는 함수를 작성해 본 것 이다. 
myfilter는 callback함수를 호출하는 함수 이며 
element => element.length > 4 <- 이것이 callback 함수 이다. 
********************************************************************************************************************************
corp = ['sk', 'lg', 'samsung', 'hyondai', 'lotte', 'kia'];
myfilter = function(origin, callback){
    let result = [];
    for (let i = 0; i < origin.length; i++) {
        let current = origin[i];
        if(callback(current)){
            result.push(current);
        }
    }
    return result;
}
newcorp = myfilter(corp, element => element.length >4);
console.log(newcorp)
********************************************************************************************************************************

callback 함수는 대체적으로 간단하고 일회용으로 쓰이고 마는 경우가 많아 위 처럼 별도로 네이밍하지 않고 간단하게 작성해주는 경우가 많다고 한다. 



# JavaScript - Promise (then, catch) 

JavaScript 를 공부하다보면 동기(Synchronous), 비동기(Asynchronous)라는 개념을 보게 된다. 
요것을 일단 먼저 아라보자, 

아래의 코드를 실행시키면 1,2,3,4 가 순차적으로 실행이 될 것 이다. 

console.log(1);
console.log(2);
console.log(3);
console.log(4);

앞에있는 명령이 끝나길 기다렸다가 앞의 명령이 다 실행되고나면 뒤의 명령들이 순차적으로 실행이 되는데 
이런식으로 실행되는것을 우리는 "동기적으로 실행된다" 라고 한다. 

그럼 이제 아래의 코드로 변경을 해보면 
1,2,4 가 출려된 뒤 5초 후 3 이 출력된다. 

console.log(1);
console.log(2);
setTimeout(function(){console.log(3);}, 5000);  <- console.log(3); 을 5초 뒤에 실행하라는 의미 
console.log(4);

즉, 저 setTimeout 안의 콜백함수는 메인이 되는 실행순서와는 별개로 독립적인 자기의 시간표에 따라서 동작하고 있다. 
이렇게 프로그램이 병렬적으로 실행되는 실행방식을 "비동기적으로 실행된다." 라고 한다. 

아래의 동기, 비동기 비교 이미지1를 보면 
Synchronous는 명령 실행이 끝나기까지 다음것이 실행이 안되고 있다가 끝나면 순차적으로 다음것이 실행이 된다. 
Asynchronous는 비동기적인 명령을 동시에 실행시켰다고하면 각자가 자신의 시간표에따라 동작하게 된다. 

Synchronous의 장점은 순차적으로 실행이 되기 때문에 어떻게 실행이 되는지를 파악하기가 용이하다. 
Asynchronous는 동시적으로 여러가지가 실행되니 혼란스럽지만 훨씬 빠른 속도로 실행이 완료된다. 

또한 동기, 비동기 비교 이미지2 를 보면 
Synchronous는 하나의 명령이 끝날때 까지 새로운 명령은 기다리고 있지만 
Asynchronous는 process_A 와 process_B 가 각자의 명령을 실행하다가 process_B의 명령실행이 끝나면 process_A 에 다시 합류하는것을 볼 수 있다. 

그렇다면 위의 setTimeout을 사용한 저 코드는 전혀 실용적이지 않다. 
어떠한 경우에 비동기적인 처리를 하느냐면 어떠한 명령을 실행할 떄 그 명령이 언제 끝날지 예측하기 어렵거나 
주가되는 작업이 아닐떄에 비동기적인 처리를 많이 사용한다. 

대표적으로는 통신을 할 떄 에 많이 사용하는데 서버와 웹브라우저가 통신할 떄 에는 그 통신에 언제 끝날지 알 수 없다. 
그렇다면 그 통신이 끝날 때 까지 아무것도 안하고 있기 기다리기 보다는 다른 작업들을 먼저 진행하다가 통신이 끝나면 콜백이 호출되면서 필요한 작업들을 나중에 진행하면 훨씬 효율적일 것 이다. 

예를 들어 네이버의 추천검색어기능이 그 대표적인 예시이다. 
검색창에 내가 어떠한 검색어를 입력하면 비동기적으로 브라우저와 서버는 통신하여 추천검색어들을 나에게 보여준다. 
 -> 페이지를 리로드하지않고 JavaScript를 이용하여 브라우저와 서버가 통신하지않는 ajax 방식. 

만약 추천검색어를 동기적으로 실행했다면 우리는 추천검색어가 다 뜰때까지 아무작업도 할 수 없을 것 이다. 
하지만 우리는 통신을 하고 있다는 사실조차 알지 못했다. 
왜냐면 비동기적으로 통신을 하고 있었기 때문이다. 

자 그렇다면 이제부터 브라우저와 웹서버가 통신할 때 사용하는 fetch 라는 API 를 살펴볼텐데 
이 fetch API 가 바로 Promise 를 사용한다. 

이 fetch를 통해서 Promise 를 어떻게 다뤄야 하는지를 아라보쟈. 

fetch('http://example.com/movies.json')
  .then((response) => response.json())
  .then((data) => console.log(data);

위는 MDN의 fetch API 사용법 예시이다. 
저것의 구체적인 사용법은 천천히 알아보기로 하고 
결과적으로 주소를 주고 실행을 시키면 저기 'data' 라는 파라미터를 통해서 웹서버가 return 해준 JSON 데이터타입을 
Javascript의 데이터 타입에 맞게 컨버팅한 결과를 가져올 수 있게 된다. 라는 취지의 코드이다. 

뭐.. 예를들어 JSON 형식으로 객체모양의 텍스트들을 실제 객체데이터로 만들어주는 코드였다 라고 생각해보면 되겠다. 

중요한건 이렇게 언제 끝날지 알 수 없는 서버와의 통신은  비동기적으로 처리하는 경우가 많다. 

********************************************************************************************************************************
console.log(1);
fetch('http://example.com/movies.json')
  .then((response) => response.json())
  .then((data) => console.log(data);
console.log(2);

(출력)
1
2
data
********************************************************************************************************************************

위의 코드를 실행하면 1,2 가 먼저 실행되고 그리고나서 통신이 끝난후 JSON타입의 데이터를 Javascript 타입으로 바꾸는 그 복잡한 작업이 끝난다음에 
console.log(data); 이 콜백함수가 호출 되면서 그 결과가 나중에 나오게된다. 

이 떄 우리가 사용한 저 then 이라고하는 저것 저것이 바로 Promise 이다. 

fetch 함수에 대해 알아보자.

const fetchReoponsePromise = fetch(resource, init);
->resource 부분에 URL을 준다. 그러면 저 fetch함수는 return 값 을 줄터인데 그 return 값이 무엇인지가 현재 내가 알아야할 것 이다. 
  공식문서를 보면 "Promise data type을 return 한다"고 나와있다. 
  그리고 "그 Promise data type은 response object 를 돌려줄것이다" 라고 되어있다. 
    
1. 어떠한 함수를 사용하는데 return 값으로 Promise type의 값을 준다면 그 함수는 비동기적으로 동작하는 함수일 가능성이 매우 높다. 
2. 그 함수가 return 한 값은 2개의 메소드(then, catch)를 사용할 수 있다. 2개의 메소드는 모두 콜백함수를 받는다. 
    2-1 ReoponsePromise.then()
        -> fetch 를 통한 통신 결과가 성공했을 때 then으로 전달된 콜백함수가 호출된다. 
           그리고 그 콜백함수가 호출되면서 통신의 결과값이 있다면 첫번째 파라미터로 받을 수 있다. 
    2-2 ReoponsePromise.cath()
        -> Promise 를 리턴하는 fetch 함수가 실행실패가 되었을 때 catch 안으로 전달된 콜백함수가 호출된다. 
           그리고 그 콜백함수의 인자로는 실패한 이유가 들어간다. 

********************************************************************************************************************************
var fetched = fetch('https://jsonplaceholder.typicode.com/posts');
console.log('fetched: ', fetched);
fetched.then(function(result) {
    console.log('result: ', result);
})
fetched.catch(function(reason) {})

(출력)
fetched:  Promise {<pending>}
result:  Response {type: 'cors', url: 'https://jsonplaceholder.typicode.com/posts', redirected: false, status: 200, ok: true, …}
********************************************************************************************************************************

-> A Promise that resolves to a Response object.

위의 출력값과 공식문서를 통해서 알 수 있듯이 
fetch 함수를 통해 fetched에 Promise type 의 객체가 return 되었고 fetch함수가 성공적으로 실행이 되면서 Response 객체를 then의 콜백함수의 인자로 넣어주게 된것이다.

이번엔 아래처럼 fetch 함수의 URL을 일부러 이상하게 써서 fetch 함수를 실패시키면 catch 메소드가 실행되고 실패한 이유에 대해 알 수 있게 된다. 

********************************************************************************************************************************
var fetched = fetch('ㅁㄴㅇㅁㄴㅇ');
console.log('fetched: ', fetched);
fetched.then(function(result) {
    console.log('result: ', result);
})
fetched.catch(function(reason) {
    console.log('reason: ', reason);
})

(출력)
reason:  TypeError: Failed to fetch
    at <anonymous>:1:15
********************************************************************************************************************************


Promise 를 사용하는 첫번쨰 이유는 비동기적인 어떤 작업을 처리할 때 그 작업이 성공했는지 실패했는지를 표준화된 방식을 이용해서 처리할 수 있도록 해주기 때문이다. 
    -> 성공하면 .then 으로 전달된 함수가 실행, 실패하면 .catch 로 전달된 함수가 실행 

자 그럼 위의 코드를 좀 더 가독성있고 일반적으로 사용하는 방식으로 바꿔보면 
fetch 는 Promise 를 return 하니까 일반적으로 변수에 담지 않고 바로 뒤에 .then 을 붙여준다. 
그리고 then도 실행시키고나면 또다시 Promise 를 준다. 그리고 그것은 catch 에서 받을 수 있기 때문에 아래와 같이 변경할 수 있다. 

********************************************************************************************************************************
fetch('https://jsonplaceholder.typicode.com/posts')
    .then(function(response) {
        console.log('response: ', response);
    })
    .catch(function(reason) {
        console.log('reason: ', reason)
    });

(출력)
response:  Response {type: 'cors', url: 'https://jsonplaceholder.typicode.com/posts', redirected: false, status: 200, ok: true, …}
********************************************************************************************************************************

위의 코드에서 나는 저 URL을 통해 객체모양의 텍스트들을 받았고 그것들을 JavaScript 형식의 데이터로 바꿔주면 내가 처리하기에 훨씬 용이할것이다. 
그러기 위해 response의 메소드중 하나인 response.json() 을 해주게되면 이 response 값이 json 형식의 데이터라는걸 Javascript 에 알려주는것이다. 

그러면 웹브라우저는 json 데이터 타입에 맞게 그 데이터를 해석해서 Javascript 의 데이터타입으로 돌려주게 된다. 
********************************************************************************************************************************
fetch('https://jsonplaceholder.typicode.com/posts')
    .then(function(response) {
        console.log('response.json(): ', response.json());
    })
    .catch(function(reason) {
        console.log('reason: ', reason)
    });

(출력)
response.json():  Promise {<pending>}
********************************************************************************************************************************

위의 코드를 실행시켰을 때 response.json() 은 promise 형식의 데이터가 나오는걸 볼 수 있다. 
그리고 이 Promise 의 역할은 json 텍스트를 Javascript 의 데이터타입으로 컨버팅하는 Promise 인 것 이다. 
그리고 이 Promise 는 데이터 컨버팅 작업이 끝났을 때 .then 을 호출할것이다 라는 추론할 수 있다. 

Response에 json 메서드를 입혔는데도 Promise가 나오는 것은,
아직 데이터를 다 받지 않은 상태여서 그렇다.(header만 도착하고 body가 오지 않음)
그래서 다시 체이닝을 통해 작업하는 것이다. (데이터가 다 도착한 이후에)
그것이 싫다면 전체에 await을 걸어서 기다린 이후에 json을 입히면 된다.

#######################################################################################################################################
(MDN 설명)
Promise는 프로미스가 생성된 시점에는 알려지지 않았을 수도 있는 값을 위한 대리자로, 비동기 연산이 종료된 이후에 결과 값과 실패 사유를 처리하기 위한 처리기를 연결할 수 있습니다. 
프로미스를 사용하면 비동기 메서드에서 마치 동기 메서드처럼 값을 반환할 수 있습니다. 
다만 최종 결과를 반환하는 것이 아니고, 미래의 어떤 시점에 결과를 제공하겠다는 '약속'(프로미스)을 반환합니다.
#######################################################################################################################################

즉, 아래처럼 저 response.json 또한 결과값에 따라 .then 또는 .catch 를 실행할것이고 그 안의 콜백함수를 또 다시 실행해주는것이다. 
그리고 그 안의 콜백함수의 첫번쨰 인자로 컨버팅된 값이 들어가게 되는것이다. 
아래코드의 출력값을 보면 json 텍스트를 JavaScript의 데이터타입으로 바꾼 그런 데이터가 출력이 되었다. 
그럼 이제 우린 저 JavaScript 데이터타입을 아주 쉽게 가공하여 여러가지 작업을 할 수 있게 된 것 이다. 

********************************************************************************************************************************
fetch('https://jsonplaceholder.typicode.com/posts')
    .then(function(response) {
        response.json().then(function(data){
            console.log('data: ', data);
        })
    })
    .catch(function(reason) {
        console.log('reason: ', reason)
    });

(출력)
data:  (100) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, .
    .
    .
    .
********************************************************************************************************************************

근데 일반적으로 위의 방법을 쓰지 않고 아래처럼 response.json() 을 return 받아서 새로운 .then의 콜백함수안에 넣어준다. 
아래의 코드 참고 위랑 같은 기능이다. 

********************************************************************************************************************************
fetch('https://jsonplaceholder.typicode.com/posts')
    .then(function(response) {
        return response.json()
    })
    .catch(function(reason) {
        console.log('reason: ', reason)
    })
    .then(function (data) {
        console.log('data: ', data);
    })

(출력)
data:  (100) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, .
    .
    .
    .
********************************************************************************************************************************

정리하자면 Promise 는 2가지 사용방식이 있다. 

1. Nested promise 
    -> then 안에 then을 사용하는 방법
********************************************************************************************************************************
fetch('https://jsonplaceholder.typicode.com/posts')
    .then(function(response) {
        response.json().then(function(data){
            console.log('data: ', data);
        })
    })
    .catch(function(reason) {
        console.log('reason: ', reason)
    });

(출력)
data:  (100) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, .
    .
    .
    .
********************************************************************************************************************************


2. Promise chaining
    -> then 안에서 Promise 를 return 하는 방법 그리고 바깥의 다음 then 과 연결시키는 방법
    -> 일반적으로 사용되는 방식이다.
********************************************************************************************************************************
fetch('https://jsonplaceholder.typicode.com/posts')
    .then(function(response) {
        return response.json()
    })
    .catch(function(reason) {
        console.log('reason: ', reason)
    })
    .then(function (data) {
        console.log('data: ', data);
    })

(출력)
data:  (100) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, .
    .
    .
    .
********************************************************************************************************************************

Javascript Promise 를 사용하게 되면 그 즉시 pending(대기중) 상태이다.
그리고 그 결과에 따라 .then 또는 .catch 안의 콜백함수를 실행해준다 
그리고 그 콜백함수가 새로운 Promise 를 return 하면 다시 pending 상태가 시작되고 위의 프로세스가 반복되는것이다. 




# JavaScript - async & await 

timer라는 함수가 있다고 하고 첫번쨰인자로받은 숫자값만큼의 시간이 지난뒤 두번쨰인자의 콜백함수가 실행된다고 가정하자. 

timer(1000, function(){
    console.log(작업);
    timer(1000, function(){
        console.log(작업);
        timer(1000, function(){
            console.log(작업);
        });
    });
});

위의 콜백지옥을 보라.
이렇게 비동기적인 작업을 할 때에는 콜백지옥이 흔하게 발생한다. 

코드도 어렵고 복잡해서 아주 실수하기 딱 좋은 형태다. 
이러한 문제를 해결하기 위해서 등장한게 Promise 다. 

timer(1000) 이 함수가 Promise 를 리턴한다고 하면 볼것도 없이 뒤에 .then을 붙여주면 된다. 
아래와같이 위의 콜백지옥과 똑같은 취지의 코드 이지만 
아래의 코드는 Promise 가 적용되었고 적용되니까 then을 통해서 각각의 작업들이 체이닝되니까 
함수안에 함수가 들어가는 콜백지옥으로부터 벗어날 수 있게된거다. 

********************************************************************************************************************************
timer(1000)
    .then(function(){
        console.log(작업);
        return timer(1000);
    })
    .then(function(){
        console.log(작업);
        return timer(1000);
    })
    .then(function(){
        console.log(작업);
    })
********************************************************************************************************************************

하지만 사람의 욕심은 끝이 없다. 
저것 마저도 then 과 function그리고 return 이 지저분하게 느껴진거다. 
저런거 없이 아래처럼 동기적인 코드인것처럼 작성을해도 비동기적인 코드들이 동기적인코드와 똑같이 동작하게 하는 문법적 단순함을 꿈꾸었다. 

********************************************************************************************************************************
timer(1000)

console.log(작업);  
timer(1000)

console.log(작업);  
timer(1000)

console.log(작업);  
********************************************************************************************************************************

이걸 하기위해서는 제약조건이 있다. 
비동기적인 함수앞에 다음 놈들은 이 함수가 실행되기까지 기다려라! 라는 의미로 await 를 달아주는것.

********************************************************************************************************************************
await timer(1000)

console.log(작업);  
await timer(1000)

console.log(작업);  
await timer(1000)

console.log(작업);  
********************************************************************************************************************************

한가지가 더 있다. 
await 가 붙어있는 Promise 를 return 하는 함수는 반드시 다른 함수 안에서 실행되어야한다는것 그리고 그 함수는 
async 라는 키워드가 앞에 붙어있어야 한다는것이다. 

최종적인 형태는 아래와 같다. 
********************************************************************************************************************************
async function run() {    
    await timer(1000)

        console.log(작업);  
    await timer(1000)

        console.log(작업);  
    await timer(1000)

        console.log(작업);  
}

run();
********************************************************************************************************************************


자 이제 async, await 를 어떻게 사용하는지 자세히 알아보자. 

자 일단 timer 라는 함수를 만들어보자. 
이 함수는 인자로 time 을 받고 그 time 만큼 타이머가 작동하고 그 시간이 끝났을 때 Promise 를 return 해주는 그런 함수이다. 
아래의 코드에서 Promise 를 만드는 방법은 추후 자세히 알아볼것이고 일단 아래의 코드는 time 이라는 인자를 받은 후 그 시간만큼이 지난 후 Promise 를 return 해준다고 알면된다. 

********************************************************************************************************************************
function timer(time) {
    return new Promise(function (resolve) {
        setTimeout(function(){
            resolve(time);
        }, time);
    });
}
********************************************************************************************************************************

자 그럼 위의 timer 함수를 이용하여 아래와같이 코드를 짜면 내가 원하는데로 
start -> timer:1000 -> timer:2000 -> timer:3000 -> end
의 순서로 출력이 될까?

********************************************************************************************************************************
function timer(time) {
    return new Promise(function (resolve) {
        setTimeout(function(){
            resolve(time);
        }, time);
    });
}

console.log('start');

timer(1000).then(function(time){    <- 그냥 timer 함수가 return 해준 time 값을 가져다 넣어준거다. 
    console.log('time:'+time);
    return timer(time+1000);
}).then(function(time){    
    console.log('time:'+time);
    return timer(time+1000);
}).then(function(time){    
    console.log('time:'+time);
});

console.log('end');

(출력)
start
end
time:1000
time:2000
time:3000
********************************************************************************************************************************

땡 아니다. 
왜냐면 console.log('start'); 실행되고 
timer 는 비동기적인 작업이니까 실행이 예약되고 Javascript 는 다시 자기갈길 가기 때문. 
그리고 바로 console.log('end'); 가 실행되는거다. 

end 를 가장 마지막에 출력하고 싶다면 아래처럼 쓰면 되겠다. 

********************************************************************************************************************************
function timer(time) {
    return new Promise(function (resolve) {
        setTimeout(function(){
            resolve(time);
        }, time);
    });
}

console.log('start');

timer(1000).then(function(time){    <- 그냥 timer 함수가 return 해준 time 값을 가져다 넣어준거다. 
    console.log('time:'+time);
    return timer(time+1000);
}).then(function(time){    
    console.log('time:'+time);
    return timer(time+1000);
}).then(function(time){    
    console.log('time:'+time);
    console.log('end');
});

(출력)
start
time:1000
time:2000
time:3000
end
********************************************************************************************************************************

이것이 우리가 Promise 를 사용하는 가장 기본적인 방법 이다. 
위의 코드 물론 뭐 훌륭하다. 하지만 좀 지저분허다. 

이걸 깔끔하게 마치 동기적인 코드인양 동작하게 해보자. 

********************************************************************************************************************************
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
}

run();

(출력)
start
time:1000
time:2000
time:3000
end
********************************************************************************************************************************

async 가 붙어있는 저 함수는 비동기적으로 동작하는 함수이다. 
아래의 코드를 보면 parent start 이후에 start 그리고 바로 parent end 가 출력된 후 timer 가 동작하는걸 통해 알 수 있다. 

********************************************************************************************************************************
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
}

console.log('parent start');
run();
console.log('parent end');

(출력)
parent start
start
parent end
time:1000
time:2000
time:3000
end
********************************************************************************************************************************

그렇다면 어떻게 해야 저 run() 함수마저도 동기적으로 실행되게 할 수 있을까?
그전에 console.log(run()); 을 해보면 Promise 가 return 된다. 
즉, async 를 사용한 함수는 Promise 를 암시적으로 return 해준다!!

그러면?
앞에 await 를 붙여줄 수 있다는거다. 
그리고 await 들어갔으니 또 async 함수로 묶어줘야한다. 
아래 코드처럼 작성하면 된다. 

********************************************************************************************************************************
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
}

async function run2(){
    console.log('parent start');
    await run();
    console.log('parent end');
}

run2();

(출력)
parent start
start
time:1000
time:2000
time:3000
end
parent end
********************************************************************************************************************************

async 를 이용한 함수는 Promise 를 return 해준다 하여으니 당연히 뒤에 .then() 을 통해 콜백함수를 사용할 수 있다. 

run2().then(console.log('parent parent end'));
    -> 이런게 가능하다는 뜻
    
또한 async 함수안에 별도로 return 값이 있다면 그 값또한 변수로 받을 수 있다. 
아래코드처럼. 

****************************************************************************************************************
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

(출력)
start
time:  1000
time:  2000
time:  3000
end
3000
****************************************************************************************************************


# JavaScript Promise 2 - new Promise

내가 직접 Promise 를 만들어 볼 것 이다. 

var job1 = new Promise();

이것만 실행해 보면 에러가 뜬다. 
왜냐? 

Promise 를 만들때 에는 그 Promise 를 이용해서 실행한 어떠한 작업의 성공/실패를 알려주기 위한 콜백함수가 공급되어야 하기 때문이다. 
그러니 함수를 하나 정의해주어야 한다. 
그리고 이 함수에는 2개의 인자가 들어가야한다. 

1. 성공했을 때 호출할 함수가 들어올 인자, resolve 를 변수명으로 많이 쓴다. 
2. 실패했을 때 호출할 함수가 들어올 인자, reject 를 변수명으로 많이 쓴다. 

var job1 = new Promise(function(resolve, reject){});
 -> 이것이 Promise 의 가장 기본적인 형태이다. 

그리고 Promise 는 대표적으로 .then 과 .cath 라는 두개의 메소드를 사용할 수 있다. 

아래의 코드를 통해 Promise 가 return 하는 data에 뭐가 출력되는 봐보자. 

************************************************************************************************************************************************************
var job1 = new Promise(function(resolve, reject){});
job1.then(function(data){
    console.log('data: ', data);
})

(출력)
음슴
************************************************************************************************************************************************************

당연히 아무것도 출력되지 않는다. 
왜냐면 내가 이 Promise 에 전달된 저 resolve 와 reject 를 인자로 받는 저 콜백함수 안에서  
성공/실패를 알려줘야 하는데 뭐 암것도 없응게. 

그리고 성공함을 알리기 위해서는 Promise 안의 콜백함수의 마지막에 resolve() 함수를 호출해주면 된다.
그리고 최종적으로 도출된 다음 .then 에 넘겨줄 결과값은 resolve() 함수의 인자로 넣어주면 된다. 
아래의 코드처럼.

************************************************************************************************************************************************************
var job1 = new Promise(function(resolve, reject){
    resolve('resolved ok!');
});
job1.then(function(data){
    console.log('data: ', data);
})

(출력)
data: resolved ok!
************************************************************************************************************************************************************

하지만 위의 경우처럼 Promise 를 쓰는 경우는 없다. 
Promise 를 쓰는 이유는 비동기적인 작업을 처리하기 위함이기 때문이다. 

************************************************************************************************************************************************************
var job1 = new Promise(function(resolve, reject){
    setTimeout(function(){
        resolve('resolved ok!');
    }, 2000);
});
job1.then(function(data){
    console.log('data: ', data);
})

(출력)
'2초지나고'
data: resolved ok!
************************************************************************************************************************************************************

위처럼 비동기작업이 실행이 되고 그 작업이 끝났을 때 Promise 의 콜백으로 전달된 첫번째 인자에 담겨있는 함수를 호출하면 작업이 끝났다 라는 사실을 우리가 알려줄 수 있게 된거다. 

그런데 일반적으로 Promise 를 날것 그대로 사용하는경우는 거의 없다. 
보통은 어떤 함수안에서 Promise 를 return 해준다.
아래처럼 짜주면 위의 코드와 똑같이 동작하지만 훨씬 재사용성이 높아진 코드를 만들 수 있게 되었다. 

************************************************************************************************************************************************************
function job1(){
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            resolve('resolved ok!');
        }, 2000);
    });    
}
job1().then(function(data){
    console.log('data: ', data);
})

(출력)
'2초지나고'
data: resolved ok!
************************************************************************************************************************************************************

그런데 이 Promise 는 여러개의 비동기적인 작업들이 중첩되어 사용될 때 빛을 발한다. 

************************************************************************************************************************************************************
function job1(){
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            resolve('job1 ok!');
        }, 2000);
    });    
}
function job2(){
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            resolve('job2 ok!');
        }, 2000);
    });    
}

job1()
    .then(function(data){
        console.log('data1: ', data);
        return job2() <- job2 는 Promise 를 return 한다. 
    })
    .then(function(data){
        console.log('data2: ', data);
    })

(출력)
'2초지나고'
data1: job1 ok!
'2초지나고'
data2: job2 ok!
************************************************************************************************************************************************************

만약 어떠한 원인으로 연결이 실패했다면 reject() 를 써주면 된다.     

************************************************************************************************************************************************************
function job1(){
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            reject('job1 fail');
        }, 2000);
    });    
}
function job2(){
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            resolve('job2 ok!');
        }, 2000);
    });    
}

job1()
    .then(function(data){
        console.log('data1: ', data);
        return job2() <- job2 는 Promise 를 return 한다. 
    })
    .then(function(data){
        console.log('data2: ', data);
    })

(출력)
Uncaught (in promise) job1 fail
************************************************************************************************************************************************************

위처럼 통신에 실패했다는 에러메세지를 뱉어주는것을 볼 수 있다. 
자 그럼 이렇게 프로그램이 종료되는것도 방법이지만   
저 에러를 처리하고 싶다면 .catch() 를 사용하여 종료된 이유를 받아줄 수 도 있다. 

************************************************************************************************************************************************************
function job1(){
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            reject('job1 fail');
        }, 2000);
    });    
}
function job2(){
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            resolve('job2 ok!');
        }, 2000);
    });    
}

job1()
    .then(function(data){
        console.log('data1: ', data);
        return job2() 
    })
    .catch(function(reason){
        console.log('reason: ', reason);
    })
    .then(function(data){
        console.log('data2: ', data);
    })

(출력)
reason:  job1 fail
data2:  undefined
************************************************************************************************************************************************************

위의 코드는 .then 이 아니라 .catch 가 실행된거다. 
즉, 에러메세지는 없어졌고 그 에러를 받아서 내가 처리 할 수 있게 된것이다. 

아니 그런데 data2 도 나온걸 보면 후속의 .then() 메소드도 호출이 되었다는 뜻이다. 
만일 에러로인해 .catch 이후에 .then 이 실행되고 싶지 않게 하고 싶다면 
아래처럼 Promise.reject() 를 호출하면  된다. 

************************************************************************************************************************************************************
function job1(){
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            reject('job1 fail');
        }, 2000);
    });    
}
function job2(){
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            resolve('job2 ok!');
        }, 2000);
    });    
}

job1()
    .then(function(data){
        console.log('data1: ', data);
        return job2() 
    })
    .catch(function(reason){
        console.log('reason: ', reason);
        return Promise.reject(reason);
    })
    .then(function(data){
        console.log('data2: ', data);
    })

(출력)
reason:  job1 fail
Uncaught (in promise) job1 fail <- Promise.reject(reason) 해주니까 에러가 딱 떠버리면서 .then() 은 실행이 안된다. 그리고 에러 이유는 또 보여준다. 
************************************************************************************************************************************************************
