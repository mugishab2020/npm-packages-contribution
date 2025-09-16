# phone-verifier-rwanda

A simple JavaScript package to **validate and normalize Rwandan phone numbers**.  
Supports both local (`07XXXXXXXX`) and international (`+2507XXXXXXXX` or `2507XXXXXXXX`) formats. Only active prefixes are accepted:  

- MTN: `078`, `079`  
- Airtel: `072`, `073`  

Invalid prefixes or formats will return `false` for validation or `null` for normalization.

---

## Installation

```bash
npm install phone-verifier-rwanda
