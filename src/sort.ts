
const customSort = (a: string, b: string): number => {
    // Extract build number
    const regex =  /-(\d+)$/;
    const matchA = a.match(regex);
    const matchB = b.match(regex);
    // if ends with -<build-number> compare build numbers
    // if one ends with build number but not the other, put the no build number in front 
    // if none of them have build numbers, compare as strings 
    if(matchA != null && matchB != null) {
        return Number(matchA[1]) - Number(matchB[1]) 
    } else if(matchA == null && matchB != null) {
        return -1
    } else if(matchA != null && matchB == null) {
        return 1
    } else {
        return b.localeCompare(a)
    }
};


 export function sortByBuildNumber(arr: string[]): string[] {
    return [...arr].sort(customSort)
 } 

 export const nextBuildNumber = (arr: string[]): number => {
    const firstBuildNumber = 0
    if(!arr || arr.length == 0) {
        return firstBuildNumber
    }
    const sorted = sortByBuildNumber(arr)
    const lastElement = sorted[sorted.length - 1];
    const regex = /-(\d+)$/;
    const match = lastElement.match(regex);

    if(!match) {
        return firstBuildNumber
    }
    return Number(match[1]) + 1; 
}
