export const CHALLENGES = [
  {
    id: 1, title: "Off-By-One Counter", difficulty: "Easy",
    description: "countLetters should count how many times a letter appears in a string. It's returning wrong results for some inputs.",
    brokenCode: `function countLetters(str, letter) {\n  let count = 0;\n  for (let i = 1; i <= str.length; i++) {\n    if (str[i] === letter) {\n      count++;\n    }\n  }\n  return count;\n}`,
    fixedCode: `function countLetters(str, letter) {\n  let count = 0;\n  for (let i = 0; i < str.length; i++) {\n    if (str[i] === letter) {\n      count++;\n    }\n  }\n  return count;\n}`,
    testCases: [
      { input: ['hello', 'h'], expected: 1, display: 'countLetters("hello", "h")' },
      { input: ['aaa', 'a'], expected: 3, display: 'countLetters("aaa", "a")' },
      { input: ['banana', 'b'], expected: 1, display: 'countLetters("banana", "b")' },
      { input: ['ababab', 'a'], expected: 3, display: 'countLetters("ababab", "a")' }
    ], functionName: 'countLetters', hint: 'Array indices start at 0, not 1. Check the loop boundaries carefully.'
  },
  {
    id: 2, title: "Voting Age Check", difficulty: "Easy",
    description: "canVote should return true if age is 18 or older. It incorrectly rejects exactly 18-year-olds.",
    brokenCode: `function canVote(age) {\n  if (age > 18) {\n    return true;\n  }\n  return false;\n}`,
    fixedCode: `function canVote(age) {\n  if (age >= 18) {\n    return true;\n  }\n  return false;\n}`,
    testCases: [
      { input: [21], expected: true, display: 'canVote(21)' },
      { input: [18], expected: true, display: 'canVote(18)' },
      { input: [17], expected: false, display: 'canVote(17)' },
      { input: [0], expected: false, display: 'canVote(0)' }
    ], functionName: 'canVote', hint: 'The > operator excludes the boundary. What should change to include 18?'
  },
  {
    id: 3, title: "The Missing Return", difficulty: "Easy",
    description: "findMax should return the largest number in an array, but it always returns undefined.",
    brokenCode: `function findMax(arr) {\n  let max = arr[0];\n  for (let i = 1; i < arr.length; i++) {\n    if (arr[i] > max) {\n      max = arr[i];\n    }\n  }\n}`,
    fixedCode: `function findMax(arr) {\n  let max = arr[0];\n  for (let i = 1; i < arr.length; i++) {\n    if (arr[i] > max) {\n      max = arr[i];\n    }\n  }\n  return max;\n}`,
    testCases: [
      { input: [[1, 5, 3, 9, 2]], expected: 9, display: 'findMax([1,5,3,9,2])' },
      { input: [[-1, -5, -3]], expected: -1, display: 'findMax([-1,-5,-3])' },
      { input: [[42]], expected: 42, display: 'findMax([42])' },
      { input: [[7, 7, 7]], expected: 7, display: 'findMax([7,7,7])' }
    ], functionName: 'findMax', hint: 'The function calculates the answer but forgets to give it back. What statement is missing?'
  },
  {
    id: 4, title: "Faulty Range Check", difficulty: "Medium",
    description: "isInRange should return true only when a number is strictly between 10 and 20. It currently accepts almost everything.",
    brokenCode: `function isInRange(num) {\n  if (num > 10 || num < 20) {\n    return true;\n  }\n  return false;\n}`,
    fixedCode: `function isInRange(num) {\n  if (num > 10 && num < 20) {\n    return true;\n  }\n  return false;\n}`,
    testCases: [
      { input: [15], expected: true, display: 'isInRange(15)' },
      { input: [5], expected: false, display: 'isInRange(5)' },
      { input: [25], expected: false, display: 'isInRange(25)' },
      { input: [20], expected: false, display: 'isInRange(20)' }
    ], functionName: 'isInRange', hint: 'Should BOTH conditions be true, or is EITHER enough? The logical operator makes all the difference.'
  },
  {
    id: 5, title: "Broken Array Merge", difficulty: "Medium",
    description: "mergeArrays should combine two arrays into one flat array. It's creating nested arrays instead.",
    brokenCode: `function mergeArrays(arr1, arr2) {\n  let result = arr1;\n  result.push(arr2);\n  return result;\n}`,
    fixedCode: `function mergeArrays(arr1, arr2) {\n  let result = [...arr1];\n  result.push(...arr2);\n  return result;\n}`,
    testCases: [
      { input: [[1, 2], [3, 4]], expected: [1, 2, 3, 4], display: 'mergeArrays([1,2], [3,4])' },
      { input: [[], [1, 2]], expected: [1, 2], display: 'mergeArrays([], [1,2])' },
      { input: [[5], [6]], expected: [5, 6], display: 'mergeArrays([5], [6])' },
      { input: [[1, 2, 3], []], expected: [1, 2, 3], display: 'mergeArrays([1,2,3], [])' }
    ], functionName: 'mergeArrays', hint: 'push() adds the entire array as one element. Spread the elements, and make a copy of arr1 to avoid mutating it.'
  },
  {
    id: 6, title: "Type Coercion Trap", difficulty: "Medium",
    description: "sumDigits should add up all digits in a number. It's concatenating strings instead of adding numbers.",
    brokenCode: `function sumDigits(num) {\n  const str = String(num);\n  let sum = 0;\n  for (let char of str) {\n    sum += char;\n  }\n  return sum;\n}`,
    fixedCode: `function sumDigits(num) {\n  const str = String(num);\n  let sum = 0;\n  for (let char of str) {\n    sum += Number(char);\n  }\n  return sum;\n}`,
    testCases: [
      { input: [123], expected: 6, display: 'sumDigits(123)' },
      { input: [999], expected: 27, display: 'sumDigits(999)' },
      { input: [10], expected: 1, display: 'sumDigits(10)' },
      { input: [505], expected: 10, display: 'sumDigits(505)' }
    ], functionName: 'sumDigits', hint: 'When you add a string to a number, JavaScript coerces the number. Convert the character first.'
  },
  {
    id: 7, title: "Palindrome Detector", difficulty: "Medium",
    description: "isPalindrome should check if a string reads the same forwards and backwards. It always returns false for real palindromes.",
    brokenCode: `function isPalindrome(str) {\n  const cleaned = str.toLowerCase().replace(/[^a-z]/g, '');\n  const reversed = cleaned.split('').reverse();\n  return cleaned === reversed;\n}`,
    fixedCode: `function isPalindrome(str) {\n  const cleaned = str.toLowerCase().replace(/[^a-z]/g, '');\n  const reversed = cleaned.split('').reverse().join('');\n  return cleaned === reversed;\n}`,
    testCases: [
      { input: ['racecar'], expected: true, display: 'isPalindrome("racecar")' },
      { input: ['madam'], expected: true, display: 'isPalindrome("madam")' },
      { input: ['hello'], expected: false, display: 'isPalindrome("hello")' },
      { input: ['A man a plan a canal Panama'], expected: true, display: 'isPalindrome("A man a plan...")' }
    ], functionName: 'isPalindrome', hint: 'split("").reverse() returns an array. You need a string to compare. Chain one more method.'
  },
  {
    id: 8, title: "Nested Flatten", difficulty: "Hard",
    description: "flatten should turn a nested array into a single flat array. It's only partially flattening.",
    brokenCode: `function flatten(arr) {\n  let result = [];\n  for (let item of arr) {\n    if (Array.isArray(item)) {\n      result.push(flatten(item));\n    } else {\n      result.push(item);\n    }\n  }\n  return result;\n}`,
    fixedCode: `function flatten(arr) {\n  let result = [];\n  for (let item of arr) {\n    if (Array.isArray(item)) {\n      result.push(...flatten(item));\n    } else {\n      result.push(item);\n    }\n  }\n  return result;\n}`,
    testCases: [
      { input: [[1, [2, 3], [4, [5]]]], expected: [1, 2, 3, 4, 5], display: 'flatten([1,[2,3],[4,[5]]])' },
      { input: [[[1, 2], [3, 4]]], expected: [1, 2, 3, 4], display: 'flatten([[1,2],[3,4]])' },
      { input: [[1, 2, 3]], expected: [1, 2, 3], display: 'flatten([1,2,3])' },
      { input: [[1, [2, [3, [4]]]]], expected: [1, 2, 3, 4], display: 'flatten([1,[2,[3,[4]]]])' }
    ], functionName: 'flatten', hint: 'push() inserts the whole sub-array as one element. Spread the recursive result instead.'
  },
  {
    id: 9, title: "The Sort Trap", difficulty: "Medium",
    description: "sortNumbers should sort an array of numbers in ascending order. The results look random for multi-digit numbers.",
    brokenCode: `function sortNumbers(arr) {\n  return arr.sort();\n}`,
    fixedCode: `function sortNumbers(arr) {\n  return arr.sort((a, b) => a - b);\n}`,
    testCases: [
      { input: [[10, 1, 2]], expected: [1, 2, 10], display: 'sortNumbers([10,1,2])' },
      { input: [[3, 30, 1, 10]], expected: [1, 3, 10, 30], display: 'sortNumbers([3,30,1,10])' },
      { input: [[5, 1, 4, 2, 3]], expected: [1, 2, 3, 4, 5], display: 'sortNumbers([5,1,4,2,3])' },
      { input: [[100, 1, 10]], expected: [1, 10, 100], display: 'sortNumbers([100,1,10])' }
    ], functionName: 'sortNumbers', hint: 'sort() without a comparator sorts lexicographically (as strings). "10" comes before "2". Provide a numeric comparator.'
  },
  {
    id: 10, title: "Replace All Bug", difficulty: "Easy",
    description: "removeVowels should remove all vowels from a string. It only removes the first one.",
    brokenCode: `function removeVowels(str) {\n  return str.replace(/[aeiou]/, '');\n}`,
    fixedCode: `function removeVowels(str) {\n  return str.replace(/[aeiou]/g, '');\n}`,
    testCases: [
      { input: ['hello'], expected: 'hll', display: 'removeVowels("hello")' },
      { input: ['aeiou'], expected: '', display: 'removeVowels("aeiou")' },
      { input: ['rhythm'], expected: 'rhythm', display: 'removeVowels("rhythm")' },
      { input: ['banana'], expected: 'bnn', display: 'removeVowels("banana")' }
    ], functionName: 'removeVowels', hint: 'replace() with a regex only replaces the first match by default. Add a flag to replace all occurrences.'
  },
  {
    id: 11, title: "Switch Fall-Through", difficulty: "Medium",
    description: "getDiscount should return different discount percentages based on tier. Every customer gets the lowest discount regardless of tier.",
    brokenCode: `function getDiscount(tier) {\n  let discount = 0;\n  switch(tier) {\n    case 'gold':\n      discount = 20;\n    case 'silver':\n      discount = 10;\n    case 'bronze':\n      discount = 5;\n  }\n  return discount;\n}`,
    fixedCode: `function getDiscount(tier) {\n  let discount = 0;\n  switch(tier) {\n    case 'gold':\n      discount = 20;\n      break;\n    case 'silver':\n      discount = 10;\n      break;\n    case 'bronze':\n      discount = 5;\n      break;\n  }\n  return discount;\n}`,
    testCases: [
      { input: ['gold'], expected: 20, display: 'getDiscount("gold")' },
      { input: ['silver'], expected: 10, display: 'getDiscount("silver")' },
      { input: ['bronze'], expected: 5, display: 'getDiscount("bronze")' },
      { input: ['none'], expected: 0, display: 'getDiscount("none")' }
    ], functionName: 'getDiscount', hint: 'Without break statements, execution "falls through" to the next case. Add breaks to stop after each match.'
  },
  {
    id: 12, title: "Last Item Access", difficulty: "Easy",
    description: "getLastItem should return the last element of an array. It always returns undefined.",
    brokenCode: `function getLastItem(arr) {\n  return arr[arr.length];\n}`,
    fixedCode: `function getLastItem(arr) {\n  return arr[arr.length - 1];\n}`,
    testCases: [
      { input: [[1, 2, 3]], expected: 3, display: 'getLastItem([1,2,3])' },
      { input: [['a', 'b']], expected: 'b', display: 'getLastItem(["a","b"])' },
      { input: [[42]], expected: 42, display: 'getLastItem([42])' },
      { input: [[10, 20, 30, 40]], expected: 40, display: 'getLastItem([10,20,30,40])' }
    ], functionName: 'getLastItem', hint: 'Array indices go from 0 to length-1. arr[arr.length] is always one past the end.'
  },
  {
    id: 13, title: "Array Chunking", difficulty: "Medium",
    description: "chunkArray should divide an array into smaller arrays of a specified size. It loops forever or returns the wrong chunks.",
    brokenCode: `function chunkArray(arr, size) {\n  let result = [];\n  for (let i = 0; i < arr.length; i++) {\n    result.push(arr.slice(i, i + size));\n  }\n  return result;\n}`,
    fixedCode: `function chunkArray(arr, size) {\n  let result = [];\n  for (let i = 0; i < arr.length; i += size) {\n    result.push(arr.slice(i, i + size));\n  }\n  return result;\n}`,
    testCases: [
      { input: [[1, 2, 3, 4], 2], expected: [[1, 2], [3, 4]], display: 'chunkArray([1,2,3,4], 2)' },
      { input: [[1, 2, 3], 2], expected: [[1, 2], [3]], display: 'chunkArray([1,2,3], 2)' },
      { input: [[1, 2], 3], expected: [[1, 2]], display: 'chunkArray([1,2], 3)' }
    ], functionName: 'chunkArray', hint: 'The loop iterator increments by 1, so it grabs overlapping chunks. It should increment by the chunk size.'
  },
  {
    id: 14, title: "Anagram Checker", difficulty: "Medium",
    description: "isAnagram should check if two strings contain the exact same characters. It fails on different casing.",
    brokenCode: `function isAnagram(str1, str2) {\n  const normalize = s => s.split('').sort().join('');\n  return normalize(str1) === normalize(str2);\n}`,
    fixedCode: `function isAnagram(str1, str2) {\n  const normalize = s => s.toLowerCase().replace(/[^a-z0-9]/g, '').split('').sort().join('');\n  return normalize(str1) === normalize(str2);\n}`,
    testCases: [
      { input: ['listen', 'silent'], expected: true, display: 'isAnagram("listen", "silent")' },
      { input: ['Hello', 'Olelh'], expected: true, display: 'isAnagram("Hello", "Olelh")' },
      { input: ['apple', 'papel'], expected: true, display: 'isAnagram("apple", "papel")' },
      { input: ['test', 'tset'], expected: true, display: 'isAnagram("test", "tset")' }
    ], functionName: 'isAnagram', hint: 'Sorting is case-sensitive! "H" and "h" have different char codes. Convert to lower case first.'
  },
  {
    id: 15, title: "Capitalize Words", difficulty: "Medium",
    description: "capitalize should capitalize the first letter of every word. It's capitalizing everything or failing.",
    brokenCode: `function capitalize(str) {\n  return str.split(' ').map(word => word[0].toUpperCase() + word).join(' ');\n}`,
    fixedCode: `function capitalize(str) {\n  return str.split(' ').map(word => word[0].toUpperCase() + word.slice(1)).join(' ');\n}`,
    testCases: [
      { input: ['hello world'], expected: 'Hello World', display: 'capitalize("hello world")' },
      { input: ['a short sentence'], expected: 'A Short Sentence', display: 'capitalize("a short sentence")' }
    ], functionName: 'capitalize', hint: 'word[0].toUpperCase() gets the first letter, but adding it to word just prefixes it. You need to slice the rest of the word.'
  },
  {
    id: 16, title: "Fibonacci Finder", difficulty: "Hard",
    description: "fib should return the nth Fibonacci number. The logic is slightly off for the base cases.",
    brokenCode: `function fib(n) {\n  if (n === 1) return 1;\n  if (n === 0) return 1;\n  return fib(n - 1) + fib(n - 2);\n}`,
    fixedCode: `function fib(n) {\n  if (n === 0) return 0;\n  if (n === 1) return 1;\n  return fib(n - 1) + fib(n - 2);\n}`,
    testCases: [
      { input: [0], expected: 0, display: 'fib(0)' },
      { input: [1], expected: 1, display: 'fib(1)' },
      { input: [4], expected: 3, display: 'fib(4)' },
      { input: [7], expected: 13, display: 'fib(7)' }
    ], functionName: 'fib', hint: 'The 0th Fibonacci number is 0, not 1.'
  },
  {
    id: 17, title: "FizzBuzz Factory", difficulty: "Easy",
    description: "fizzBuzz should return 'Fizz' for multiples of 3, 'Buzz' for 5, 'FizzBuzz' for both, and the number otherwise. The order of conditions is wrong.",
    brokenCode: `function fizzBuzz(n) {\n  if (n % 3 === 0) return "Fizz";\n  if (n % 5 === 0) return "Buzz";\n  if (n % 3 === 0 && n % 5 === 0) return "FizzBuzz";\n  return n;\n}`,
    fixedCode: `function fizzBuzz(n) {\n  if (n % 3 === 0 && n % 5 === 0) return "FizzBuzz";\n  if (n % 3 === 0) return "Fizz";\n  if (n % 5 === 0) return "Buzz";\n  return n;\n}`,
    testCases: [
      { input: [3], expected: 'Fizz', display: 'fizzBuzz(3)' },
      { input: [5], expected: 'Buzz', display: 'fizzBuzz(5)' },
      { input: [15], expected: 'FizzBuzz', display: 'fizzBuzz(15)' },
      { input: [7], expected: 7, display: 'fizzBuzz(7)' }
    ], functionName: 'fizzBuzz', hint: 'The most specific condition must be checked first, otherwise a less specific condition will intercept it.'
  },
  {
    id: 18, title: "Two Sum", difficulty: "Hard",
    description: "twoSum should return the indices of two numbers that add up to target. It's returning the numbers themselves.",
    brokenCode: `function twoSum(nums, target) {\n  for (let i = 0; i < nums.length; i++) {\n    for (let j = i + 1; j < nums.length; j++) {\n      if (nums[i] + nums[j] === target) {\n        return [nums[i], nums[j]];\n      }\n    }\n  }\n}`,
    fixedCode: `function twoSum(nums, target) {\n  for (let i = 0; i < nums.length; i++) {\n    for (let j = i + 1; j < nums.length; j++) {\n      if (nums[i] + nums[j] === target) {\n        return [i, j];\n      }\n    }\n  }\n}`,
    testCases: [
      { input: [[2, 7, 11, 15], 9], expected: [0, 1], display: 'twoSum([2,7,11,15], 9)' },
      { input: [[3, 2, 4], 6], expected: [1, 2], display: 'twoSum([3,2,4], 6)' },
      { input: [[3, 3], 6], expected: [0, 1], display: 'twoSum([3,3], 6)' }
    ], functionName: 'twoSum', hint: 'Look closely at what you are returning inside the if statement.'
  },
  {
    id: 19, title: "Remove Duplicates", difficulty: "Medium",
    description: "removeDuplicates should return a new array with unique values. It's skipping values.",
    brokenCode: `function removeDuplicates(arr) {\n  let unique = [];\n  for (let i = 0; i < arr.length; i++) {\n    if (unique.includes(arr)) {\n      unique.push(arr[i]);\n    }\n  }\n  return unique;\n}`,
    fixedCode: `function removeDuplicates(arr) {\n  let unique = [];\n  for (let i = 0; i < arr.length; i++) {\n    if (!unique.includes(arr[i])) {\n      unique.push(arr[i]);\n    }\n  }\n  return unique;\n}`,
    testCases: [
      { input: [[1, 1, 2]], expected: [1, 2], display: 'removeDuplicates([1,1,2])' },
      { input: [[0, 0, 1, 1, 1, 2, 2, 3, 3, 4]], expected: [0, 1, 2, 3, 4], display: 'removeDuplicates([0,0,1,1,1,2,2,3,3,4])' },
      { input: [[1, 2, 3]], expected: [1, 2, 3], display: 'removeDuplicates([1,2,3])' }
    ], functionName: 'removeDuplicates', hint: 'Check the condition inside the loop. Are you checking if the unique array DOES NOT include the item?'
  },
  {
    id: 20, title: "Find the Missing Number", difficulty: "Hard",
    description: "findMissing should find the missing number in an array of integers from 0 to n. It's crashing on empty arrays.",
    brokenCode: `function findMissing(nums) {\n  let n = nums.length;\n  let expectedSum = (n * (n + 1)) / 2;\n  let actualSum = nums.reduce((a, b) => a + b);\n  return expectedSum - actualSum;\n}`,
    fixedCode: `function findMissing(nums) {\n  let n = nums.length;\n  let expectedSum = (n * (n + 1)) / 2;\n  let actualSum = nums.reduce((a, b) => a + b, 0);\n  return expectedSum - actualSum;\n}`,
    testCases: [
      { input: [[3, 0, 1]], expected: 2, display: 'findMissing([3,0,1])' },
      { input: [[0, 1]], expected: 2, display: 'findMissing([0,1])' },
      { input: [[9, 6, 4, 2, 3, 5, 7, 0, 1]], expected: 8, display: 'findMissing([9,6,4...])' },
      { input: [[]], expected: 0, display: 'findMissing([])' }
    ], functionName: 'findMissing', hint: 'The reduce() method throws an error if called on an empty array without an initial value.'
  }
];

export const OPPONENT_NAMES = ['DebugDemon', 'StackOverlord', 'BugSquasher', 'NullPointer', 'SegFault', 'BitFlipper', 'HotFix', 'CodeCrusher', 'RootAccess', 'KernelPanic'];

export const SPEED_PROFILES = {
  chill: { analyze: [2000, 4000], baseDelays: [8000, 16000, 24000, 32000], label: 'Chill' },
  normal: { analyze: [1000, 2000], baseDelays: [5000, 12000, 19000, 26000], label: 'Normal' },
  intense: { analyze: [500, 1000], baseDelays: [3000, 8000, 13000, 18000], label: 'Intense' },
  insane: { analyze: [0, 500], baseDelays: [1500, 4000, 7000, 10000], label: 'Insane' }
};
