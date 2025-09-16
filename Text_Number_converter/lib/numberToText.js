function numberToText(num) {
    if (typeof num !== 'number' || isNaN(num)) {
        throw new Error('Input must be a valid number');
    }

    if (num === 0) return 'zero';
    
    const belowTwenty = ['','one','two','three','four','five','six','seven','eight','nine','ten',
                         'eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen',
                         'eighteen','nineteen'];
    const tens = ['','','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];
    const thousands = ['','thousand','million','billion'];

    let word = '';
    let i = 0;

    function helper(n) {
        if (n === 0) return '';
        else if (n < 20) return belowTwenty[n] + ' ';
        else if (n < 100) return tens[Math.floor(n / 10)] + ' ' + helper(n % 10);
        else return belowTwenty[Math.floor(n / 100)] + ' hundred ' + helper(n % 100);
    }

    while (num > 0) {
        if (num % 1000 !== 0) {
            word = helper(num % 1000) + thousands[i] + (word ? ' ' + word : '');
        }
        num = Math.floor(num / 1000);
        i++;
    }

    return word.trim();



}

module.exports = {numberToText};
