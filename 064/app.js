console.log('welcome to magic world of async programming');

// setTimeout(_ => {
//     console.log('Hi from setTimeout');
// }, 1000);

const buyCheesburger = _ => {
    return new Promise((resolveMD, rejectMD) => {
        setTimeout(_ => {
            // console.log('Cheeseburger is ready');
            resolveMD('Cheeseburger');
            // rejectMD('No cheeseburger');
        }, 2000);
    });
}

// buyCheesburger()
// .then(food => {
//     console.log('I got my', food);
// })
// .catch(err => {
//     console.log('She said: ', err);
// })
// .finally(_ => {
//     console.log('I go home now');
// });



const wantCheeseburger = async _ => {
    try {
        const food = await buyCheesburger();
        console.log('I got my', food);
    } catch (err) {
        console.log('She said: ', err);
    } finally {
        console.log('I go home now');
    }
}

wantCheeseburger();

console.log('End of the script');