export const CHALLENGES = [
  {
    id: 1, title: "", difficulty: "Easy", topic: "javascript",
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
    id: 2, title: "", difficulty: "Easy", topic: "javascript",
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
    id: 3, title: "", difficulty: "Easy", topic: "javascript",
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
    id: 4, title: "", difficulty: "Medium", topic: "javascript",
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
    id: 5, title: "", difficulty: "Medium", topic: "javascript",
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
    id: 6, title: "", difficulty: "Medium", topic: "javascript",
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
    id: 7, title: "", difficulty: "Medium", topic: "javascript",
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
    id: 8, title: "", difficulty: "Hard", topic: "javascript",
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
    id: 9, title: "", difficulty: "Medium", topic: "javascript",
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
    id: 10, title: "", difficulty: "Easy", topic: "javascript",
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
    id: 11, title: "", difficulty: "Medium", topic: "javascript",
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
    id: 12, title: "", difficulty: "Easy", topic: "javascript",
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
    id: 13, title: "", difficulty: "Medium", topic: "javascript",
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
    id: 14, title: "", difficulty: "Medium", topic: "javascript",
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
    id: 15, title: "", difficulty: "Medium", topic: "javascript",
    description: "capitalize should capitalize the first letter of every word. It's capitalizing everything or failing.",
    brokenCode: `function capitalize(str) {\n  return str.split(' ').map(word => word[0].toUpperCase() + word).join(' ');\n}`,
    fixedCode: `function capitalize(str) {\n  return str.split(' ').map(word => word[0].toUpperCase() + word.slice(1)).join(' ');\n}`,
    testCases: [
      { input: ['hello world'], expected: 'Hello World', display: 'capitalize("hello world")' },
      { input: ['a short sentence'], expected: 'A Short Sentence', display: 'capitalize("a short sentence")' }
    ], functionName: 'capitalize', hint: 'word[0].toUpperCase() gets the first letter, but adding it to word just prefixes it. You need to slice the rest of the word.'
  },
  {
    id: 16, title: "", difficulty: "Hard", topic: "javascript",
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
    id: 17, title: "", difficulty: "Easy", topic: "javascript",
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
    id: 18, title: "", difficulty: "Hard", topic: "javascript",
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
    id: 19, title: "", difficulty: "Medium", topic: "javascript",
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
    id: 20, title: "", difficulty: "Hard", topic: "javascript",
    description: "findMissing should find the missing number in an array of integers from 0 to n. It's crashing on empty arrays.",
    brokenCode: `function findMissing(nums) {\n  let n = nums.length;\n  let expectedSum = (n * (n + 1)) / 2;\n  let actualSum = nums.reduce((a, b) => a + b);\n  return expectedSum - actualSum;\n}`,
    fixedCode: `function findMissing(nums) {\n  let n = nums.length;\n  let expectedSum = (n * (n + 1)) / 2;\n  let actualSum = nums.reduce((a, b) => a + b, 0);\n  return expectedSum - actualSum;\n}`,
    testCases: [
      { input: [[3, 0, 1]], expected: 2, display: 'findMissing([3,0,1])' },
      { input: [[0, 1]], expected: 2, display: 'findMissing([0,1])' },
      { input: [[9, 6, 4, 2, 3, 5, 7, 0, 1]], expected: 8, display: 'findMissing([9,6,4...])' },
      { input: [[]], expected: 0, display: 'findMissing([])' }
    ], functionName: 'findMissing', hint: 'The reduce() method throws an error if called on an empty array without an initial value.'
  },
  {
    id: 21, title: "", difficulty: "Easy", topic: "javascript",
    description: "reverseString should return the string reversed. It currently returns undefined.",
    brokenCode: `function reverseString(str) {\n  let reversed = '';\n  for (let i = str.length - 1; i > 0; i--) {\n    reversed += str[i];\n  }\n  return reversed;\n}`,
    fixedCode: `function reverseString(str) {\n  let reversed = '';\n  for (let i = str.length - 1; i >= 0; i--) {\n    reversed += str[i];\n  }\n  return reversed;\n}`,
    testCases: [
      { input: ['hello'], expected: 'olleh', display: 'reverseString("hello")' },
      { input: ['world'], expected: 'dlrow', display: 'reverseString("world")' },
      { input: ['a'], expected: 'a', display: 'reverseString("a")' }
    ], functionName: 'reverseString', hint: 'Check the loop condition. Is it missing the first character of the string?'
  },
  {
    id: 22, title: "", difficulty: "Medium", topic: "javascript",
    description: "factorial should return the factorial of a number n. It causes a stack overflow or returns wrong answers.",
    brokenCode: `function factorial(n) {\n  if (n === 0) return 1;\n  return n * factorial(n);\n}`,
    fixedCode: `function factorial(n) {\n  if (n === 0) return 1;\n  return n * factorial(n - 1);\n}`,
    testCases: [
      { input: [5], expected: 120, display: 'factorial(5)' },
      { input: [3], expected: 6, display: 'factorial(3)' },
      { input: [0], expected: 1, display: 'factorial(0)' }
    ], functionName: 'factorial', hint: 'A recursive function needs to progress towards the base case.'
  },
  {
    id: 30, title: "Center the Div", difficulty: "Easy", topic: "css", evalMethod: "regex",
    description: "Use Flexbox to center the content both vertically and horizontally.",
    brokenCode: `.container {\n  display: block;\n}`,
    fixedCode: `.container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}`,
    testCases: [
      { regex: /display:\s*flex/, display: 'Must use display: flex' },
      { regex: /justify-content:\s*center/, display: 'Must center horizontally' },
      { regex: /align-items:\s*center/, display: 'Must center vertically' }
    ], hint: 'You need display: flex, justify-content, and align-items.'
  },
  {
    id: 31, title: "React Counter", difficulty: "Medium", topic: "react", evalMethod: "regex",
    description: "Fix the counter component so it updates state correctly.",
    brokenCode: `function Counter() {\n  let count = 0;\n  return <button onClick={() => count++}>{count}</button>;\n}`,
    fixedCode: `function Counter() {\n  const [count, setCount] = useState(0);\n  return <button onClick={() => setCount(count + 1)}>{count}</button>;\n}`,
    testCases: [
      { regex: /useState/, display: 'Must use useState hook' },
      { regex: /setCount\s*\(/, display: 'Must call state setter' }
    ], hint: 'Standard variables do not trigger re-renders. Use the useState hook.'
  },
  {
    id: 32, title: "Python List Comprehension", difficulty: "Medium", topic: "python", evalMethod: "regex",
    description: "Create a list of squares for even numbers from 0 to 9.",
    brokenCode: `squares = []\nfor i in range(10):\n  if i % 2 == 0:\n    squares.append(i * i)`,
    fixedCode: `squares = [i * i for i in range(10) if i % 2 == 0]`,
    testCases: [
      { regex: /\[.*for.*in.*if.*\]/, display: 'Must use list comprehension syntax' },
      { regex: /i\s*\*\s*i|\*\*/, display: 'Must calculate the square' }
    ], hint: 'Combine the loop and condition into a single bracket expression.'
  },
  {
    id: 33, title: "HTML Basic Structure", difficulty: "Easy", topic: "html", evalMethod: "regex",
    description: "Fix the basic HTML5 structure. The doctype is missing and the title is unclosed.",
    brokenCode: `<html>\n  <head>\n    <title>My App\n  </head>\n  <body></body>\n</html>`,
    fixedCode: `<!DOCTYPE html>\n<html>\n  <head>\n    <title>My App</title>\n  </head>\n  <body></body>\n</html>`,
    testCases: [
      { regex: /<!DOCTYPE html>/i, display: 'Must include HTML5 Doctype' },
      { regex: /<\/title>/, display: 'Must close the title tag' }
    ], hint: 'Start with <!DOCTYPE html> and close your title tag.'
  },
  {
    id: 34, title: "Node Export Bug", difficulty: "Medium", topic: "node", evalMethod: "regex",
    description: "Export the router correctly in Express.",
    brokenCode: `const express = require('express');\nconst router = express.Router();\n\n// routes here\n\nexport default router;`,
    fixedCode: `const express = require('express');\nconst router = express.Router();\n\n// routes here\n\nmodule.exports = router;`,
    testCases: [
      { regex: /module\.exports\s*=\s*router/, display: 'Must use CommonJS module.exports' }
    ], hint: 'Node.js requires CommonJS syntax by default, not ES6 exports.'
  },
  {
    id: 35, title: "Vue Data Function", difficulty: "Medium", topic: "vue", evalMethod: "regex",
    description: "In Vue components, data must be a function that returns an object.",
    brokenCode: `export default {\n  name: 'App',\n  data: {\n    message: 'Hello'\n  }\n}`,
    fixedCode: `export default {\n  name: 'App',\n  data() {\n    return {\n      message: 'Hello'\n    }\n  }\n}`,
    testCases: [
      { regex: /data\s*\(\)\s*\{\s*return/, display: 'data must be a function returning an object' }
    ], hint: 'If data is just an object, it gets shared across all instances.'
  },
  {
    id: 36, title: "Java Main Method", difficulty: "Easy", topic: "java", evalMethod: "regex",
    description: "Fix the signature of the Java main method so the program can execute.",
    brokenCode: `public class Main {\n  public void main(String[] args) {\n    System.out.println("Hello");\n  }\n}`,
    fixedCode: `public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello");\n  }\n}`,
    testCases: [
      { regex: /public\s+static\s+void\s+main/, display: 'Must be public static void' }
    ], hint: 'The JVM needs the method to be static so it can call it without instantiating the class.'
  },
  {
    id: 37, title: "PHP Echo String", difficulty: "Easy", topic: "php", evalMethod: "regex",
    description: "Concatenate two strings and echo them.",
    brokenCode: `<?php\n  $a = 'Hello';\n  $b = 'World';\n  echo $a + $b;\n?>`,
    fixedCode: `<?php\n  $a = 'Hello';\n  $b = 'World';\n  echo $a . $b;\n?>`,
    testCases: [
      { regex: /\$a\s*\.\s*\$b/, display: 'Must use dot (.) for string concatenation' }
    ], hint: 'PHP uses the dot (.) operator to concatenate strings, not plus (+).'
  },
  {
    id: 38, title: "SQL Select All", difficulty: "Easy", topic: "sql", evalMethod: "regex",
    description: "Select all columns from the users table where age is over 18.",
    brokenCode: `SELECT username FROM users\nWHERE age > 18;`,
    fixedCode: `SELECT * FROM users\nWHERE age > 18;`,
    testCases: [
      { regex: /SELECT\s+\*\s+FROM/i, display: 'Must select all columns (*)' }
    ], hint: 'Use the asterisk (*) wildcard to select everything.'
  },
  {
    id: 39, title: "Docker Base Image", difficulty: "Easy", topic: "docker", evalMethod: "regex",
    description: "Start the Dockerfile using the node 18 alpine image.",
    brokenCode: `START node:18-alpine\nWORKDIR /app\nCOPY . .`,
    fixedCode: `FROM node:18-alpine\nWORKDIR /app\nCOPY . .`,
    testCases: [
      { regex: /^FROM\s+node:18-alpine/i, display: 'Must use FROM instruction' }
    ], hint: 'Dockerfiles must start with the FROM keyword.'
  },
  {
    id: 40, title: "Git Push Branch", difficulty: "Easy", topic: "git", evalMethod: "regex",
    description: "Push the 'feature' branch to the 'origin' remote.",
    brokenCode: `git send origin feature`,
    fixedCode: `git push origin feature`,
    testCases: [
      { regex: /git\s+push\s+origin\s+feature/, display: 'Must use git push' }
    ], hint: 'The command to upload local commits is push.'
  },
  {
    id: 101, title: "Python Syntax Error", difficulty: "Easy", topic: "python", evalMethod: "regex",
    description: "print_hello should output 'Hello World', but it has a syntax error.",
    brokenCode: `def print_hello() {\n  print("Hello World")\n}`,
    fixedCode: `def print_hello():\n  print("Hello World")`,
    testCases: [
      { regex: /def\s+print_hello\s*\(\)\s*:/, display: 'Uses correct Python function syntax (colon instead of braces)' },
      { regex: /print\s*\(\s*(['"])Hello World\1\s*\)/, display: 'Prints "Hello World"' }
    ], hint: 'Python uses colons to start a block, not curly braces.'
  },
  {
    id: 102, title: "React JSX Return", difficulty: "Medium", topic: "react", evalMethod: "regex",
    description: "The component should render a button, but it's returning undefined.",
    brokenCode: `function Button() {\n  return\n    <button>Click me</button>;\n}`,
    fixedCode: `function Button() {\n  return (\n    <button>Click me</button>\n  );\n}`,
    testCases: [
      { regex: /return\s*\(\s*<button>Click me<\/button>\s*\)/, display: 'Returns the JSX properly (uses parentheses or same-line return)' }
    ], hint: 'In JavaScript, returning on a new line without parentheses causes an automatic semicolon insertion, returning undefined.'
  },
  {
    id: 103, title: "CSS Text Properties", difficulty: "Easy", topic: "css", evalMethod: "regex",
    description: "Make the text color red and the font bold. The current CSS has incorrect properties.",
    brokenCode: `.highlight {\n  text-color: red;\n  font-weight: strong;\n}`,
    fixedCode: `.highlight {\n  color: red;\n  font-weight: bold;\n}`,
    testCases: [
      { regex: /color:\s*red;?/, display: 'Sets text color to red' },
      { regex: /font-weight:\s*bold;?/, display: 'Sets font weight to bold' }
    ], hint: 'The CSS property for text color is just "color". "strong" is an HTML tag, not a valid font-weight.'
  },
  {
    id: 104, title: "HTML Hyperlinks", difficulty: "Easy", topic: "html", evalMethod: "regex",
    description: "Create a hyperlink to 'https://zidi.com' that says 'Visit Zidi'. The tag used is wrong.",
    brokenCode: `<link href="https://zidi.com">Visit Zidi</link>`,
    fixedCode: `<a href="https://zidi.com">Visit Zidi</a>`,
    testCases: [
      { regex: /<a\s+href\s*=\s*['"]https:\/\/zidi\.com['"]\s*>/, display: 'Uses the anchor <a> tag with href' },
      { regex: /Visit Zidi<\/a>/, display: 'Closes the anchor tag properly' }
    ], hint: 'The <link> tag is used for stylesheets. Hyperlinks use the Anchor <a> tag.'
  },
  {
    id: 105, title: "SQL Sorting", difficulty: "Medium", topic: "sql", evalMethod: "regex",
    description: "Select all users whose age is over 18. The query has a syntax error.",
    brokenCode: `SELECT * FROM users WHERE age > 18 AND SORT BY age DESC;`,
    fixedCode: `SELECT * FROM users WHERE age > 18 ORDER BY age DESC;`,
    testCases: [
      { regex: /ORDER\s+BY\s+age\s+DESC/i, display: 'Uses ORDER BY instead of SORT BY' },
      { regex: /SELECT\s+\*\s+FROM\s+users/i, display: 'Selects from users table' }
    ], hint: 'In SQL, sorting is done using the ORDER BY clause, not SORT BY.'
  },
  {
    id: 106, title: "Docker Port Exposure", difficulty: "Medium", topic: "docker", evalMethod: "regex",
    description: "The Dockerfile should expose port 8080 and start the node server. The commands are mixed up.",
    brokenCode: `FROM node:18\nCOPY . .\nRUN npm start\nPORT 8080`,
    fixedCode: `FROM node:18\nCOPY . .\nEXPOSE 8080\nCMD ["npm", "start"]`,
    testCases: [
      { regex: /EXPOSE\s+8080/i, display: 'Uses EXPOSE to open the port' },
      { regex: /(CMD\s*\[\s*"npm"\s*,\s*"start"\s*\]|CMD\s+npm\s+start)/i, display: 'Uses CMD to start the server at runtime' }
    ], hint: 'PORT is not a Docker command (use EXPOSE). RUN executes during build time, CMD executes when the container starts.'
  },
  {
    id: 107, title: "Git Commit Flags", difficulty: "Easy", topic: "git", evalMethod: "regex",
    description: "Commit the staged changes with the message 'Fix login bug'. The flag used is incorrect.",
    brokenCode: `git commit -text "Fix login bug"`,
    fixedCode: `git commit -m "Fix login bug"`,
    testCases: [
      { regex: /git\s+commit\s+-m\s+['"]Fix login bug['"]/, display: 'Uses the -m flag for the commit message' }
    ], hint: 'The flag to add a message directly in the commit command is -m.'
  },
  {
    id: 108, title: "CSS Flex Layout", difficulty: "Medium", topic: "css", evalMethod: "regex",
    description: "Make the items wrap to the next line if they run out of space.",
    brokenCode: `.container {\n  display: flex;\n  flex-direction: row;\n}`,
    fixedCode: `.container {\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n}`,
    testCases: [ { regex: /flex-wrap:\s*wrap;?/, display: 'Must apply flex-wrap' } ],
    hint: 'By default, flexbox tries to fit everything on one line.'
  },
  {
    id: 109, title: "CSS Grid Columns", difficulty: "Medium", topic: "css", evalMethod: "regex",
    description: "Create a 3-column grid layout with equal widths.",
    brokenCode: `.grid-container {\n  display: grid;\n  columns: 3;\n}`,
    fixedCode: `.grid-container {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n}`,
    testCases: [ { regex: /grid-template-columns:\s*(repeat\(3,\s*1fr\)|1fr\s+1fr\s+1fr);?/, display: 'Defines 3 equal columns' } ],
    hint: 'Use grid-template-columns with the repeat() function.'
  },
  {
    id: 110, title: "React State Update", difficulty: "Medium", topic: "react", evalMethod: "regex",
    description: "Update the user's name in the state object correctly without mutating.",
    brokenCode: `function updateName(newName) {\n  user.name = newName;\n  setUser(user);\n}`,
    fixedCode: `function updateName(newName) {\n  setUser({ ...user, name: newName });\n}`,
    testCases: [ { regex: /setUser\(\s*\{\s*\.\.\.user,\s*name:\s*newName\s*\}\s*\)/, display: 'Spreads previous state and updates name' } ],
    hint: 'React state should be treated as immutable. Use the spread operator.'
  },
  {
    id: 111, title: "React Effect Cleanup", difficulty: "Hard", topic: "react", evalMethod: "regex",
    description: "Return a cleanup function to remove the event listener when unmounting.",
    brokenCode: `useEffect(() => {\n  window.addEventListener('resize', handleResize);\n}, []);`,
    fixedCode: `useEffect(() => {\n  window.addEventListener('resize', handleResize);\n  return () => window.removeEventListener('resize', handleResize);\n}, []);`,
    testCases: [ { regex: /return\s*\(\)\s*=>\s*window\.removeEventListener\(/, display: 'Returns a cleanup function' } ],
    hint: 'Return an arrow function that calls removeEventListener.'
  },
  {
    id: 112, title: "Python Dictionary Access", difficulty: "Easy", topic: "python", evalMethod: "regex",
    description: "Get the 'age' from the dictionary, falling back to 0 if it doesn't exist.",
    brokenCode: `user_age = user["age"]`,
    fixedCode: `user_age = user.get("age", 0)`,
    testCases: [ { regex: /\.get\(\s*['"]age['"]\s*,\s*0\s*\)/, display: 'Uses .get() method with a default value' } ],
    hint: 'Direct dictionary access throws a KeyError. Use the .get() method.'
  },
  {
    id: 113, title: "Python For Loop", difficulty: "Easy", topic: "python", evalMethod: "regex",
    description: "Iterate through the range from 1 to 10 (inclusive).",
    brokenCode: `for i in range(10):`,
    fixedCode: `for i in range(1, 11):`,
    testCases: [ { regex: /range\(\s*1\s*,\s*11\s*\)/, display: 'Uses correct range boundaries' } ],
    hint: 'range(start, stop) goes up to, but not including, the stop value.'
  },
  {
    id: 114, title: "HTML Image Alt", difficulty: "Easy", topic: "html", evalMethod: "regex",
    description: "Add alternative text 'Company Logo' to the image for accessibility.",
    brokenCode: `<img src="logo.png" />`,
    fixedCode: `<img src="logo.png" alt="Company Logo" />`,
    testCases: [ { regex: /alt\s*=\s*['"]Company Logo['"]/, display: 'Includes alt text attribute' } ],
    hint: 'Use the alt attribute for screen readers.'
  },
  {
    id: 115, title: "HTML Input Required", difficulty: "Easy", topic: "html", evalMethod: "regex",
    description: "Make the email input field mandatory before form submission.",
    brokenCode: `<input type="email" name="email">`,
    fixedCode: `<input type="email" name="email" required>`,
    testCases: [ { regex: /required(\s*>|\s+\/?>|\s*=\s*['"]required['"])/, display: 'Adds the required boolean attribute' } ],
    hint: 'Add the required attribute to the input tag.'
  },
  {
    id: 116, title: "SQL Insert Record", difficulty: "Medium", topic: "sql", evalMethod: "regex",
    description: "Insert a new record into the users table with name 'Alice' and age 25.",
    brokenCode: `ADD TO users (name, age) VALUES ('Alice', 25);`,
    fixedCode: `INSERT INTO users (name, age) VALUES ('Alice', 25);`,
    testCases: [ { regex: /INSERT\s+INTO\s+users/i, display: 'Uses INSERT INTO syntax' } ],
    hint: 'The SQL command to add records is INSERT INTO.'
  },
  {
    id: 117, title: "SQL Update Record", difficulty: "Medium", topic: "sql", evalMethod: "regex",
    description: "Update the status to 'Active' for user with ID 5.",
    brokenCode: `MODIFY users SET status = 'Active' WHERE id = 5;`,
    fixedCode: `UPDATE users SET status = 'Active' WHERE id = 5;`,
    testCases: [ { regex: /UPDATE\s+users\s+SET/i, display: 'Uses UPDATE syntax' } ],
    hint: 'The SQL command to modify existing records is UPDATE.'
  },
  {
    id: 118, title: "Git Undo Commit", difficulty: "Hard", topic: "git", evalMethod: "regex",
    description: "Undo the last commit while keeping the changes in your working directory.",
    brokenCode: `git reset --hard HEAD~1`,
    fixedCode: `git reset --soft HEAD~1`,
    testCases: [ { regex: /git\s+reset\s+--soft/, display: 'Uses --soft instead of --hard' } ],
    hint: '--hard deletes your changes. Use --soft or --mixed to keep them.'
  },
  {
    id: 119, title: "Git Checkout Branch", difficulty: "Easy", topic: "git", evalMethod: "regex",
    description: "Create and switch to a new branch named 'feature/login'.",
    brokenCode: `git branch new feature/login`,
    fixedCode: `git checkout -b feature/login`,
    testCases: [ { regex: /(git\s+checkout\s+-b|git\s+switch\s+-c)\s+feature\/login/, display: 'Uses checkout -b or switch -c' } ],
    hint: 'You can use checkout with the -b flag.'
  },
  {
    id: 120, title: "Docker Copy File", difficulty: "Easy", topic: "docker", evalMethod: "regex",
    description: "Copy package.json to the current working directory in the container.",
    brokenCode: `ADD package.json`,
    fixedCode: `COPY package.json ./`,
    testCases: [ { regex: /COPY\s+package\.json\s+(\.\/|\.)/, display: 'Uses COPY instruction with destination' } ],
    hint: 'COPY requires both a source and a destination.'
  },
  {
    id: 121, title: "Docker Env Var", difficulty: "Easy", topic: "docker", evalMethod: "regex",
    description: "Set an environment variable NODE_ENV to 'production'.",
    brokenCode: `SET NODE_ENV=production`,
    fixedCode: `ENV NODE_ENV=production`,
    testCases: [ { regex: /ENV\s+NODE_ENV(\s*=\s*|\s+)production/, display: 'Uses the ENV instruction' } ],
    hint: 'The Dockerfile instruction for environment variables is ENV.'
  },
  {
    id: 122, title: "Node HTTP Server", difficulty: "Medium", topic: "node", evalMethod: "regex",
    description: "Listen on port 3000.",
    brokenCode: `server.start(3000, () => {});`,
    fixedCode: `server.listen(3000, () => {});`,
    testCases: [ { regex: /server\.listen\(\s*3000/, display: 'Uses the listen method' } ],
    hint: 'Node.js http servers use the .listen() method.'
  },
  {
    id: 123, title: "Node Read File", difficulty: "Medium", topic: "node", evalMethod: "regex",
    description: "Read a file synchronously using the fs module.",
    brokenCode: `const data = fs.read('data.txt');`,
    fixedCode: `const data = fs.readFileSync('data.txt', 'utf8');`,
    testCases: [ { regex: /fs\.readFileSync\(/, display: 'Uses readFileSync' } ],
    hint: 'Synchronous file reading is done via readFileSync().'
  },
  {
    id: 124, title: "Vue v-for Loop", difficulty: "Medium", topic: "vue", evalMethod: "regex",
    description: "Iterate over an array of items and render an <li> for each.",
    brokenCode: `<li v-loop="item in items">{{ item.name }}</li>`,
    fixedCode: `<li v-for="item in items" :key="item.id">{{ item.name }}</li>`,
    testCases: [ { regex: /v-for\s*=\s*['"]item\s+in\s+items['"]/, display: 'Uses the v-for directive' } ],
    hint: 'The directive to loop in Vue is v-for.'
  },
  {
    id: 125, title: "Vue Click Handler", difficulty: "Easy", topic: "vue", evalMethod: "regex",
    description: "Attach a click event listener that calls the save method.",
    brokenCode: `<button onClick="save">Save</button>`,
    fixedCode: `<button @click="save">Save</button>`,
    testCases: [ { regex: /(@click|v-on:click)\s*=\s*['"]save['"]/, display: 'Uses Vue event binding' } ],
    hint: 'Use @click or v-on:click for Vue event binding.'
  },
  {
    id: 126, title: "Java List Setup", difficulty: "Medium", topic: "java", evalMethod: "regex",
    description: "Instantiate an ArrayList of Strings correctly.",
    brokenCode: `List<String> list = new List<String>();`,
    fixedCode: `List<String> list = new ArrayList<>();`,
    testCases: [ { regex: /new\s+ArrayList<>\(\)/, display: 'Instantiates an ArrayList' } ],
    hint: 'List is an interface. You must instantiate a concrete class like ArrayList.'
  },
  {
    id: 127, title: "Java Array Length", difficulty: "Easy", topic: "java", evalMethod: "regex",
    description: "Get the number of elements in a standard primitive array.",
    brokenCode: `int size = numbers.size();`,
    fixedCode: `int size = numbers.length;`,
    testCases: [ { regex: /numbers\.length/, display: 'Uses .length property' } ],
    hint: 'Primitive arrays use the .length property, not the .size() method.'
  },
  {
    id: 128, title: "PHP Array Push", difficulty: "Medium", topic: "php", evalMethod: "regex",
    description: "Add a new value 'Apple' to the end of the array.",
    brokenCode: `$fruits.push('Apple');`,
    fixedCode: `$fruits[] = 'Apple';`,
    testCases: [ { regex: /(\$fruits\[\]\s*=\s*['"]Apple['"]|array_push\(\s*\$fruits\s*,\s*['"]Apple['"]\s*\))/, display: 'Uses [] operator or array_push' } ],
    hint: 'In PHP, you can use the [] syntax to append to an array.'
  },
  {
    id: 129, title: "PHP Foreach", difficulty: "Medium", topic: "php", evalMethod: "regex",
    description: "Iterate over an associative array to get key and value.",
    brokenCode: `foreach ($data in $key => $value) { }`,
    fixedCode: `foreach ($data as $key => $value) { }`,
    testCases: [ { regex: /foreach\s*\(\s*\$data\s+as\s+\$key\s*=>\s*\$value\s*\)/, display: 'Uses as keyword' } ],
    hint: 'The syntax is foreach ($array as $key => $value).'
  }
,
  {
    id: 130, title: "React Context Provider", difficulty: "Medium", topic: "react", evalMethod: "regex",
    description: "Wrap your app with ThemeContext Provider.",
    brokenCode: `function App() {
  return <ThemeContext value="dark"><Main /></ThemeContext>;
}`,
    fixedCode: `function App() {
  return <ThemeContext.Provider value="dark"><Main /></ThemeContext.Provider>;
}`,
    testCases: [ { regex: /<ThemeContext\.Provider/, display: 'Uses Provider property' } ],
    hint: 'Contexts require the .Provider component to pass values down.'
  },
  {
    id: 131, title: "React UseRef Hook", difficulty: "Medium", topic: "react", evalMethod: "regex",
    description: "Initialize a ref to null and attach it to the input.",
    brokenCode: `const inputRef = useRef();
<input ref={inputRef.current} />`,
    fixedCode: `const inputRef = useRef(null);
<input ref={inputRef} />`,
    testCases: [ { regex: /ref=\{inputRef\}/, display: 'Passes the ref object directly' } ],
    hint: 'Pass the ref object itself, not its .current property, to the ref prop.'
  },
  {
    id: 132, title: "CSS Absolute Centering", difficulty: "Hard", topic: "css", evalMethod: "regex",
    description: "Center an absolute element using top, left, and transform.",
    brokenCode: `.modal {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(0, 0);
}`,
    fixedCode: `.modal {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}`,
    testCases: [ { regex: /translate\(-50%,\s*-50%\)/, display: 'Uses correct translate values' } ],
    hint: 'Translate needs negative 50% to pull the element back by half its own width and height.'
  },
  {
    id: 133, title: "CSS Hover State", difficulty: "Easy", topic: "css", evalMethod: "regex",
    description: "Change the button background on hover.",
    brokenCode: `button::hover {
  background: blue;
}`,
    fixedCode: `button:hover {
  background: blue;
}`,
    testCases: [ { regex: /button:hover/, display: 'Uses single colon for pseudo-class' } ],
    hint: 'Pseudo-classes like hover use a single colon, pseudo-elements use double.'
  },
  {
    id: 134, title: "Python Try Except", difficulty: "Medium", topic: "python", evalMethod: "regex",
    description: "Catch a ValueError and print an error message.",
    brokenCode: `try:
    int("abc")
catch ValueError:
    print("Error")`,
    fixedCode: `try:
    int("abc")
except ValueError:
    print("Error")`,
    testCases: [ { regex: /except\s+ValueError:/, display: 'Uses except keyword' } ],
    hint: 'Python uses except instead of catch for exception handling.'
  },
  {
    id: 135, title: "Python Class Init", difficulty: "Medium", topic: "python", evalMethod: "regex",
    description: "Define the constructor method for the class.",
    brokenCode: `class User:
    def init(self, name):
        self.name = name`,
    fixedCode: `class User:
    def __init__(self, name):
        self.name = name`,
    testCases: [ { regex: /def\s+__init__\s*\(/, display: 'Uses dunder init' } ],
    hint: 'Constructor methods in Python require double underscores on both sides.'
  },
  {
    id: 136, title: "SQL Join Clause", difficulty: "Medium", topic: "sql", evalMethod: "regex",
    description: "Perform an INNER JOIN on users and orders.",
    brokenCode: `SELECT * FROM users
INNER orders ON users.id = orders.user_id`,
    fixedCode: `SELECT * FROM users
INNER JOIN orders ON users.id = orders.user_id`,
    testCases: [ { regex: /INNER\s+JOIN\s+orders/, display: 'Includes JOIN keyword' } ],
    hint: 'You must specify JOIN after INNER.'
  },
  {
    id: 137, title: "SQL Group By", difficulty: "Medium", topic: "sql", evalMethod: "regex",
    description: "Count orders per user ID.",
    brokenCode: `SELECT user_id, COUNT(*) FROM orders
ORDER BY user_id`,
    fixedCode: `SELECT user_id, COUNT(*) FROM orders
GROUP BY user_id`,
    testCases: [ { regex: /GROUP\s+BY\s+user_id/, display: 'Uses GROUP BY for aggregation' } ],
    hint: 'When using aggregate functions like COUNT, you must use GROUP BY.'
  },
  {
    id: 138, title: "Node Express Route", difficulty: "Medium", topic: "node", evalMethod: "regex",
    description: "Define a GET route for /api/data.",
    brokenCode: `app.route('/api/data', (req, res) => {
  res.send('ok');
});`,
    fixedCode: `app.get('/api/data', (req, res) => {
  res.send('ok');
});`,
    testCases: [ { regex: /app\.get\s*\('/, display: 'Uses HTTP method explicitly' } ],
    hint: 'Specify the HTTP method like app.get or app.post.'
  },
  {
    id: 139, title: "Node Event Emitter", difficulty: "Hard", topic: "node", evalMethod: "regex",
    description: "Emit a 'ready' event with a payload.",
    brokenCode: `emitter.trigger('ready', { status: 1 });`,
    fixedCode: `emitter.emit('ready', { status: 1 });`,
    testCases: [ { regex: /emitter\.emit\s*\(/, display: 'Uses emit function' } ],
    hint: 'Node.js EventEmitters use the emit() method to fire events.'
  },
  {
    id: 140, title: "Vue Reactive State", difficulty: "Medium", topic: "vue", evalMethod: "regex",
    description: "Create reactive state using Composition API.",
    brokenCode: `const count = reactive(0);`,
    fixedCode: `const count = ref(0);`,
    testCases: [ { regex: /ref\(0\)/, display: 'Uses ref for primitives' } ],
    hint: 'reactive() only works for objects, use ref() for primitive values like numbers.'
  },
  {
    id: 141, title: "Vue Computed Property", difficulty: "Medium", topic: "vue", evalMethod: "regex",
    description: "Create a computed property for double count.",
    brokenCode: `const double = computed(count.value * 2);`,
    fixedCode: `const double = computed(() => count.value * 2);`,
    testCases: [ { regex: /computed\(\s*\(\)\s*=>/, display: 'Passes a getter function' } ],
    hint: 'computed() takes a getter function, not a direct value.'
  },
  {
    id: 142, title: "Docker Workdir", difficulty: "Easy", topic: "docker", evalMethod: "regex",
    description: "Set the working directory to /app.",
    brokenCode: `DIRECTORY /app`,
    fixedCode: `WORKDIR /app`,
    testCases: [ { regex: /WORKDIR\s+\/app/, display: 'Uses correct Dockerfile instruction' } ],
    hint: 'The instruction to set the working directory is WORKDIR.'
  },
  {
    id: 143, title: "Docker Run Command", difficulty: "Medium", topic: "docker", evalMethod: "regex",
    description: "Specify the default command to run node server.js",
    brokenCode: `START ["node", "server.js"]`,
    fixedCode: `CMD ["node", "server.js"]`,
    testCases: [ { regex: /CMD\s+\[/, display: 'Uses CMD instruction' } ],
    hint: 'Use CMD (or ENTRYPOINT) to define the default execution command.'
  },
  {
    id: 144, title: "Git Merge Branch", difficulty: "Medium", topic: "git", evalMethod: "regex",
    description: "Merge the 'feature' branch into the current branch.",
    brokenCode: `git combine feature`,
    fixedCode: `git merge feature`,
    testCases: [ { regex: /git\s+merge\s+feature/, display: 'Uses correct merge command' } ],
    hint: 'The command to integrate changes from another branch is merge.'
  },
  {
    id: 145, title: "Git Add All", difficulty: "Easy", topic: "git", evalMethod: "regex",
    description: "Stage all modified files for commit.",
    brokenCode: `git stage all`,
    fixedCode: `git add .`,
    testCases: [ { regex: /git\s+add\s+\./, display: 'Uses add command with dot' } ],
    hint: 'Use git add with a dot (.) to stage all changes in the current directory.'
  },
  {
    id: 146, title: "HTML Video Tag", difficulty: "Medium", topic: "html", evalMethod: "regex",
    description: "Embed a video and show playback controls.",
    brokenCode: `<video src="vid.mp4" playbar></video>`,
    fixedCode: `<video src="vid.mp4" controls></video>`,
    testCases: [ { regex: /controls/, display: 'Uses the controls attribute' } ],
    hint: 'The attribute to show play/pause controls is simply "controls".'
  },
  {
    id: 147, title: "HTML Form Submit", difficulty: "Easy", topic: "html", evalMethod: "regex",
    description: "Create a button that submits the form.",
    brokenCode: `<button type="send">Submit</button>`,
    fixedCode: `<button type="submit">Submit</button>`,
    testCases: [ { regex: /type="submit"/, display: 'Uses type submit' } ],
    hint: 'The type must be exactly "submit" to trigger a form submission.'
  },
  {
    id: 148, title: "Java Static Method", difficulty: "Medium", topic: "java", evalMethod: "regex",
    description: "Define a static method that returns an integer.",
    brokenCode: `public void static int getNumber() { return 5; }`,
    fixedCode: `public static int getNumber() { return 5; }`,
    testCases: [ { regex: /public\s+static\s+int/, display: 'Correct modifiers order' } ],
    hint: 'Do not include "void" if the method has a return type (int).'
  },
  {
    id: 149, title: "PHP Array Length", difficulty: "Medium", topic: "php", evalMethod: "regex",
    description: "Get the number of items in the $users array.",
    brokenCode: `$len = $users->length;`,
    fixedCode: `$len = count($users);`,
    testCases: [ { regex: /count\(\$users\)/, display: 'Uses count() function' } ],
    hint: 'In PHP, use the count() function to get the length of an array.'
  }

];

export const OPPONENT_NAMES = ['DebugDemon', 'StackOverlord', 'BugSquasher', 'NullPointer', 'SegFault', 'BitFlipper', 'HotFix', 'CodeCrusher', 'RootAccess', 'KernelPanic'];

export const SPEED_PROFILES = {
  beginner: { analyze: [4000, 6000], baseDelays: [25000, 40000, 55000, 75000], label: 'Beginner' },
  chill: { analyze: [3000, 5000], baseDelays: [15000, 28000, 40000, 52000], label: 'Chill' },
  normal: { analyze: [2000, 3000], baseDelays: [10000, 20000, 30000, 40000], label: 'Normal' },
  intense: { analyze: [1000, 2000], baseDelays: [6000, 13000, 20000, 28000], label: 'Intense' },
  insane: { analyze: [500, 1000], baseDelays: [3500, 7500, 12000, 17000], label: 'Insane' },
  godlike: { analyze: [0, 500], baseDelays: [1500, 3500, 6000, 9000], label: 'Godlike' }
};
