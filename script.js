// Data
const account1 = {
    owner: 'Jangchub Dorji',
    movements: [200, 450, -400, 300, -650, -130, 70, 1300],
    interesRate: 1.2, // %
    pin:1111,
};
const account2 = {
    owner: 'Tashi Dorji',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interesRate: 1.5, // %
    pin:2222,
};

const account3 = {
    owner: 'Kezang Dorji',
    movements: [200, -200, -340, -300, -20, 50, 400, -460],
    interesRate: 0.7, // %
    pin:3333,
};

const account4 = {
    owner: 'Leki Wangmo',
    movements: [430, 1000, 700, 50, 90],
    interesRate: 1, // %
    pin:4444,
};
const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

//function
//morgan.codes-theme


const displayMovements = function(movements, sort = false) {
    containerMovements.innerHTML = '';
    // textContent

    const movs = sort ? movements.slice().sort((a, b) =>
    a - b) : movements;
    movs.forEach(function(mov, i){
        const type = mov > 0 ? 'deposit' : 'withdrawal';
        const html = `
        <div class="movements__row">
          <div class="movements__type 
          movements__type--${type}">
          ${i + 1 }${type}€</div>
          <div class="movements__value">${mov}€</div>
        </div>
        `;
        containerMovements.insertAdjacentHTML('afterbegin', html)
    });
};

const calcDisplayBalance = function(acc){
    acc.balance = acc.movements.reduce((acc, mov) => 
    acc + mov, 0);
    labelBalance.textContent = `${acc.balance} €`;
};

const calcDisplaySummary = function(acc){
    const incomes = acc.movements
        .filter(mov => mov > 0)
        .reduce((acc, mov) => acc + mov, 0);
    labelSumIn.textContent = `${incomes}€`

    const outdrew = acc.movements
        .filter(mov => mov < 0 )
        .reduce((acc, mov) => acc + mov, 0);
    labelSumOut.textContent = `${Math.abs(outdrew)}€`;

    const interest = acc.movements
        .filter(mov => mov > 0)
        .map(deposit => (deposit * acc.interesRate) / 100)
        .filter((int, i, arr) => {
            console.log(arr);
            return int >= 1;
        })
        .reduce((acc, int) => acc + int, 0);
    labelSumInterest.textContent = `${interest}€`;
}

const createUsername = function(accs){
    accs.forEach(function(acc){
    acc.username = acc.owner
    .toLowerCase()
    .split(' ')
    .map(name => name[0])
    .join('');
    });
};
createUsername(accounts);
const updateUI = function(acc){
    // Display movements
displayMovements(acc.movements);
//Display balance
calcDisplayBalance(acc);
// Display Summary
calcDisplaySummary(acc);

}
// event handler
let currentAccount;
btnLogin.addEventListener('click', function(e){
    // Prevent from default submitting
    e.preventDefault();
currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
console.log(currentAccount);

if(currentAccount?.pin === Number(inputLoginPin.value));
// Display UI and Message
labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
containerApp.style.opacity = 100;

// clear input field
inputLoginUsername.value = inputLoginPin.value = '';
// or
// inputLoginUsername.value = '';
// inputLoginPin.value = '';
inputLoginPin.blur();
// Update UI
updateUI(currentAccount);
});

btnTransfer.addEventListener('click', function(e){
    (e).preventDefault()
    const amount = Number(inputTransferAmount.value);
    const receiverAcc = accounts.find(
        acc => acc.username === inputTransferTo.value
    );
    inputTransferAmount.value = inputTransferTo.value = '';

    if(amount > 0 && 
       receiverAcc &&
       currentAccount.balance >= amount &&
       receiverAcc?.username !== currentAccount.username) {
        // Doing the transfar 
        currentAccount.movements.push(-amount);
        receiverAcc.movements.push(amount);
        // Update UI
        updateUI(currentAccount);
       }
    
});
btnLoan.addEventListener('click', function(e){
    e.preventDefault();
    const amount = Number(inputLoanAmount.value);
    if(amount > 0 && currentAccount.movements.some(mov =>
        mov >= amount * 0.1)){
            currentAccount.movements.push(amount);
        // update UI
        updateUI(currentAccount);
        }
    inputLoanAmount.value = '';
})
btnClose.addEventListener('click', function(e){
    e.preventDefault();
    if(
        inputCloseUsername.value === currentAccount
        .username && 
        inputClosePin.value === currentAccount.pin );

        const index = accounts.findIndex(acc =>
            acc.username === currentAccount.username);
            console.log(index);
            // delete account
        accounts.splice(index, 1);
        // Hide UI
        containerApp.style.opacity = 0;
inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function(e){
    e.preventDefault();
    displayMovements(currentAccount.movements, !sorted);
    sorted = !sorted;
});
 //td

/*
let arr = ['a', 'b', 'c', 'd', 'e'];
// slice
console.log(arr.slice(2));
console.log(arr.slice(2,4));
console.log(arr.slice(-2));
console.log(arr.slice(1,-2));
console.log(arr.slice());
console.log([...arr]);

//splice
// console.log(arr.splice(2));
arr.splice(-1)
console.log(arr);
arr.splice(1, 2);
console.log(arr);

//REVERSE
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());
console.log(arr2);

//concat
const letter = arr.concat(arr2);
console.log(letter)
console.log([...arr, ...arr2]);

//join
console.log(letter.join(' - '));

// At Method
const arr3 = [23, 35, 46];
console.log(arr3[0]);
console.log(arr3.at(0));
console.log(arr.at(-1));

// with string
console.log('jangchub'.at(0));
console.log('jangchub'.at(-1));
*/
// const movements = [200, 450, -400, 300, -650, -130, 70, 1300];
// for(const [i, movement] of movements.entries()) {
//     if(movement > 0) {
//         console.log(`movement${i + 1}: You deposited ${movement}`);
//     } else{
//         console.log(`movement${i + 1}: You withdrew ${Math.abs(movement)}`);
//     }
// }

// console.log('----forEach---');

// movements.forEach(function(mov, i, arr) {
//     if(mov > 0){
//         console.log(`movement ${i + 1}: You deposited ${mov}`)
//     } else {
//         console.log(`movement ${i + 1}:You have withdrew ${Math.abs(mov)}`);
//     }
// });
// //0: function(200);

// const currencies = new Map([
//     ['USD', 'United States dollar'],
//     ['EUR', 'Euro'],
//     ['GBP', 'Pound Sterling'],
// ]);
// currencies.forEach(function(value, key, map){
//     console.log(`${key}: ${value}`);
// });
// //set
// const currenciesUnique = new Set(['USD', 'GEP', 'USD', 'ERD']);
// console.log(currenciesUnique);

// currenciesUnique.forEach(function(values , _ , map){
//     console.log(`${values}: ${values}`);
// })

// const dogs = [2, 3, 4, 6, 6]
// console.log(dogs.slice());
// console.log(dogs.splice(2, 3));

// const checkDogs = function(dogs1, dogs2){
//     const dogsJuliaCorrected = dogs1.slice();
//     dogsJuliaCorrected.splice(0,1);
//     dogsJuliaCorrected.splice(-2);
//     //dogs1.slice(1, 3);
//     const dogs = dogsJuliaCorrected.concat(dogs2);
//     console.log(dogs);
//     dogs.forEach(function(dog, i){
//         if(dog >= 3){
//         console.log(`Dog numbers ${i+1} is an adult, and is ${dog} years old`);
//         } else {
//             console.log(`Dog number ${i+1} is still a puppy`);
//         }
//     })

// }
// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);

//  const eurToUsd = 1.1;
// //  const movementsUSD = movements.map(function(mov){
// //     return mov * eurToUsd;
// //  })

// const movementsUSD = movements.map(mov => mov * eurToUsd);
//  console.log(movements);
//  console.log(movementsUSD);

//  const palce = [];
// for(const mov of movements) {
//     palce.push((mov * eurToUsd));
// };
// console.log(palce);

// for(const mov of movements) palce.push(mov * eurToUsd);
// console.log(palce);

// const movementsDescription = movements.map(
//     (mov, i,) =>
//     `movement ${i + 1}: You ${mov > 0 ? 'deposit' : 'withdrew'} ${Math.abs(mov)}`
// );
// console.log(movementsDescription);

// const deposit = movements.filter(function(mov){
//     return mov > 0;
// })
// console.log(movements);
// console.log(deposit);

// const depositsFor = [];
// for(const mov of movements) if(mov > 0) depositsFor.push(mov)
// console.log(depositsFor);

// //Reduce method of data transmission
// // accumulator -> SNOWBALL
// const balance = movements.reduce((acc, cur) =>
//     acc + cur, 0);
// console.log(balance);
// // const balance = movements.reduce(function(acc, cur, i , arr){
// //     console.log(`Iteration ${i}: ${acc}`);
// //     return acc + cur;
// // }, 0)
// // console.log(balance);

// let balance2 = 0;
// for(const mov of movements)
// balance2 += mov;
// console.log(balance2);

// // maximun
// const max = movements.reduce((acc, mov) => {
//     if(acc > mov) return acc;
//     else return mov;
// }, movements[0]);
// console.log(max);

// const calcAverageHumanAge = function(ages){
//     const humanAge = ages.map( age => (age <= 2 ? 2 * age : 
//         16 + age * 4 ))
//     const adult = humanAge.filter(age => age >= 18);
//     console.log(humanAge);
//     console.log(adult);

// // const avg = adult.reduce((acc, age) => acc + 
// // age, 0) / adult.length;
// // return avg;
// const avg = adult.reduce((acc, age, i, arr) =>
// acc + age / arr.length, 
// 0);
// return avg;
// }
//  const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 6]);
//  const avg2 = calcAverageHumanAge([4, 6, 34, 40, 15, 8, 26]);
// console.log(avg1, avg2);

// const eurToUSD = 1.1;
// //PIPELINE
// const totalDepositsUSD = movements
//   .filter(mov => mov > 0)
//   .map(mov => mov * eurToUSD)
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(totalDepositsUSD);

// let employee = {
//     basesalary: 30_000,
//     overtime: 10,
//     rate: 20,
//     getWage: function(){
//         return this.basesalary + (this.overtime * this.rate);
//     }
// }
// employee.getWage();
// //console.log(result);
// // Creating objects using 
// // Factory function
// function craeteCircle(radius){
//     return {
//         radius,
//         draw: function(){
//             console.log('draw');
//         }
//     };
// }
// const circle = craeteCircle(1);

// // Constructor
// // Function name should satrt with Capslock

// function Circle(radius){
//     this.radius = radius;
//     this.draw = function(){
//         console.log('draw');
//     }
// }
// const another = new Circle(1);

// //Find method
// const checkdr = movements.find(mov => mov < 0);
// console.log(movements);
// console.log(checkdr);

// const account = accounts.find(acc => acc.owner === 'Jangchub Dorji');
// console.log(account);
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
console.log(movements);
// check for equality
console.log(movements.includes(-130));
// Some: used for condation
const depoistes = movements.some(mov => mov > 0)
console.log(depoistes);
// Every: return true only all condition are true like call back function

console.log(movements.every(mov => mov > 0));
console.log(account4.movements.every(mov => mov > 0));

// Separate callback

const anydeposite = mov => mov > 0;
console.log(movements.some(anydeposite));
console.log(movements.every(anydeposite));
console.log(movements.filter(anydeposite));

// flat method
const arr = [[1, 2, 3], [4, 5, 6], 7,8]
console.log(arr);
console.log(arr.flat());

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat(2));

const accountMovement = accounts.map(acc => acc.
    movements);
console.log(accountMovement);
const allmovements = accountMovement.flat();
console.log(allmovements);
const overbalance = allmovements.reduce((acc , mov)=>
acc + mov, 0);
console.log(overbalance);

const totalbalance = accounts
    .map(acc => acc.movements)
    .flat()
    .reduce((acc, mov) => 
        acc + mov, 0);
console.log(totalbalance);

// flatMap method
const totalbalance2 = accounts
    .flatMap(acc => acc.movements)
    .reduce((acc, mov) => 
        acc + mov, 0);
console.log(totalbalance2);

// Sorting
const owners = ['Jangchub', 'Karsal', 'Dorji', 'Apple'];
console.log(owners.sort());
console.log(owners);

// ascending
// movements.sort((a, b) =>{
//     if (a > b) return 1;
//     if(a < b) return -1;
// });
// console.log(movements);
movements.sort((a, b) => a - b)
console.log(movements);
// Descending
movements.sort((a, b) => b - a)
console.log(movements);
// movements.sort((a, b) => {
//     if (a > b) return -1;
//     if (a < b) return 1;
// });
// console.log(movements);

const numb = [ 23, 34, 300, 45, 78];
numb.sort((a, b) => a - b)
console.log(numb);

numb.sort((a, b) => b - a)
console.log(numb);

const arrss = [1, 2, 3, 4, 5, 6, 7];

// Empty arrys + fill method
const x = new Array(7);
console.log(x);

x. fill(1);
x.fill(1, 3, 5);
console.log(x);

arrss.fill(23, 2, 6);
console.log(arrss);

// Array.form
const y = Array.from({ length:7}, () => 1);
console.log(y);

const z = Array.from({length:7}, (_, i) => i + 1);
console.log(z);

labelBalance.addEventListener('click', function(){
const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number( el.textContent.replace('€', ''))
    );
    console.log(movementsUI);

    const movementsUI2 = [...document.querySelectorAll('.movements__value')];
    console.log(movementsUI2);
});

const balanceDepositSum = accounts
    .flatMap(acc => acc.movements)
    .filter(mov => mov > 0)
    .reduce((sum, cur) =>
    sum + cur, 0);
console.log(balanceDepositSum);

const deposite1000 = accounts
    .flatMap(acc => acc.movements)
    .filter(depo => depo >= 100).length;
console.log(deposite1000);

const deposite1000II = accounts
    .flatMap(acc => acc.movements)
    .reduce((count, cur) => (cur >= 100 ? ++count : count),0);
console.log(deposite1000II);

// prefixed++ operator
let a = 10;
console.log(++a);
console.log(a);
// creating object using reduce

const { depoiste, withdrawals} = accounts
    .flatMap(acc => acc.movements)
    .reduce((sum, cur) => {
        // cur > 0 ? (sum.depoiste += cur) 
        // : (sum.withdrawals += cur);
    sum[cur > 0 ? 'depoiste' : 'withdrawals'] += cur;
    return sum;
    },
    { depoiste: 0, withdrawals: 0}
);
console.log(depoiste, withdrawals);

//converting of string
const converTitleCase = function (title){
    const capitalize = str => str[0].toUpperCase() + str.slice(1);
    const expection = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with', 'is', 'not'];
    const titleCase = title
            .toLowerCase()
            .split(' ')
            .map(word => (expection.includes(word) ? word : capitalize(word))
            ) 
            .join(' ');
        return capitalize(titleCase);
}
console.log(converTitleCase('this is a nice title'));
console.log(converTitleCase('this is a LONG title but not to long'));
console.log(converTitleCase('And here is another title with an EXAMPLE'));


//TEST DATA
const dogs = [
    {weight: 22, curfood: 250, owners: ['Alice', 'Bob']},
    {weight: 8, curfood: 200, owners: ['Matilda']},
    {weight: 13, curfood: 275, owners: ['Sarah', 'john']},
    {weight: 32, curfood: 340, owners: ['Michael']}
];

dogs.forEach(dog => (dog.recFood = Math.trunc(dog.weight ** 0.75 * 28)));
console.log(dogs);

const dogSarah = dogs.find(dog => 
    dog.owners.includes('Sarah'));
console.log(dogSarah);
console.log(`Sarah dog is eating to ${dogSarah.curfood > dogSarah.recFood ? 'much' :
'litle'}`);

const ownersEatTooMuch = dogs
        .filter(dog => dog.curfood > dog.recFood)
        .flatMap(dog => dog.owners);
console.log(ownersEatTooMuch)

const ownersLessTooMuch = dogs
        .filter(dog => dog.curfood < dog.recFood)
        .flatMap(dog => dog.owners);
console.log(ownersLessTooMuch);

console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much`);
console.log(`${ownersLessTooMuch.join(' and ')}'s dogs eat little `);

console.log(`${dogs.some(dog => dog.curfood === dog.recFood)}`);

const checkEatok = dog => dog.curfood > dog.recFood * 0.9
    && dog.curfood < dog.recFood * 1.1
console.log(dogs.some(checkEatok));

console.log(dogs.filter(checkEatok));

const dogsSorted = dogs.slice().sort((a, b) => a.recFood - b.recFood );
console.log(dogsSorted);