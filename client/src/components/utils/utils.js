const numberWithCommas = (x) => {
    return (x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : x);
}

export { numberWithCommas };

// JSON Sort
// var people = [
//     {
//         "f_name": "john",
//         "l_name": "doe",
//         "sequence": "0",
//         "title" : "president",
//         "url" : "google.com",
//         "color" : "333333",
//     }
//     // etc
// ];

// function sortResults(prop, asc) {
//     people.sort(function(a, b) {
//         if (asc) {
//             return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
//         } else {
//             return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
//         }
//     });
//     renderResults();
// }