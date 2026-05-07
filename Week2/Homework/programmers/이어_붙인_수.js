function solution(num_list) {
    const { odd, even } = num_list.reduce((acc, cur) => {
        if (cur % 2 === 1) acc.odd += cur;
        else acc.even += cur;
        return acc;
    }, { odd: "", even: "" });
    
    return Number(odd) + Number(even);
}