const a = [829, 2476, 2116, 1969, 638, 1797, 4652, 1070, 6748, 1027, 3405, 6608, 6511, 6019, 6431, 1644, 6839, 3851, 6716, 6804, 4272, 1461, 1184, 3548, 6554, 1341, 7058, 1310];
let x = 0;
const total = a.every((element) => {
    return element > 1;
});
console.log(total);