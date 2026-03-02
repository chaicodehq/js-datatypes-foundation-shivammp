/**
 * 🍽️ Thali Combo Platter - Mixed Methods Capstone
 *
 * Grand Indian Thali restaurant mein combo platter system banana hai.
 * String, Number, Array, aur Object — sab methods mila ke ek complete
 * thali banao. Yeh capstone challenge hai — sab kuch combine karo!
 *
 * Data format: thali = {
 *   name: "Rajasthani Thali",
 *   items: ["dal baati", "churma", "papad"],
 *   price: 250,
 *   isVeg: true
 * }
 *
 * Functions:
 *
 *   1. createThaliDescription(thali)
 *      - Template literal, .join(", "), .toUpperCase(), .toFixed(2) use karo
 *      - Format: "{NAME} (Veg/Non-Veg) - Items: {items joined} - Rs.{price}"
 *      - name ko UPPERCASE karo, price ko 2 decimal places tak
 *      - isVeg true hai toh "Veg", false hai toh "Non-Veg"
 *      - Agar thali object nahi hai ya required fields missing hain, return ""
 *      - Required fields: name (string), items (array), price (number), isVeg (boolean)
 *      - Example: createThaliDescription({name:"Rajasthani Thali", items:["dal","churma"], price:250, isVeg:true})
 *                 => "RAJASTHANI THALI (Veg) - Items: dal, churma - Rs.250.00"
 *
 *   2. getThaliStats(thalis)
 *      - Array of thali objects ka stats nikalo
 *      - .filter() se veg/non-veg count
 *      - .reduce() se average price
 *      - Math.min/Math.max se cheapest/costliest
 *      - .map() se saare names
 *      - Return: { totalThalis, vegCount, nonVegCount, avgPrice (2 decimal string),
 *                  cheapest (number), costliest (number), names (array) }
 *      - Agar thalis array nahi hai ya empty hai, return null
 *
 *   3. searchThaliMenu(thalis, query)
 *      - .filter() + .includes() se search karo (case-insensitive)
 *      - Thali match karti hai agar name ya koi bhi item query include kare
 *      - Agar thalis array nahi hai ya query string nahi hai, return []
 *      - Example: searchThaliMenu(thalis, "dal") => thalis with "dal" in name or items
 *
 *   4. generateThaliReceipt(customerName, thalis)
 *      - Template literals + .map() + .join("\n") + .reduce() se receipt banao
 *      - Format:
 *        "THALI RECEIPT\n---\nCustomer: {NAME}\n{line items}\n---\nTotal: Rs.{total}\nItems: {count}"
 *      - Line item: "- {thali name} x Rs.{price}"
 *      - customerName UPPERCASE mein
 *      - Agar customerName string nahi hai ya thalis array nahi hai/empty hai, return ""
 *
 * @example
 *   createThaliDescription({name:"Rajasthani Thali", items:["dal"], price:250, isVeg:true})
 *   // => "RAJASTHANI THALI (Veg) - Items: dal - Rs.250.00"
 */
export function createThaliDescription(thali) {
  if (typeof thali !== 'object' || thali === null || Array.isArray(thali)) return ""
  if (typeof thali.name !== 'string' || !Array.isArray(thali.items) || typeof thali.price !== 'number' || typeof thali.isVeg !== 'boolean') return ""
  let vegLabel = thali.isVeg ? "Veg" : "Non-Veg"
  return `${thali.name.toUpperCase()} (${vegLabel}) - Items: ${thali.items.join(", ")} - Rs.${thali.price.toFixed(2)}`
}

export function getThaliStats(thalis) {
  if (!Array.isArray(thalis) || thalis.length === 0) return null
  let vegCount = thalis.filter(t => t.isVeg).length
  let nonVegCount = thalis.filter(t => !t.isVeg).length
  let total = thalis.reduce((sum, t) => sum + t.price, 0)
  let avgPrice = (total / thalis.length).toFixed(2)
  let prices = thalis.map(t => t.price)
  let cheapest = Math.min(...prices)
  let costliest = Math.max(...prices)
  let names = thalis.map(t => t.name)
  return {
    totalThalis: thalis.length,
    vegCount,
    nonVegCount,
    avgPrice,
    cheapest,
    costliest,
    names
  }
}

export function searchThaliMenu(thalis, query) {
  if (!Array.isArray(thalis) || typeof query !== 'string') return []
  let lowerQuery = query.toLowerCase()
  return thalis.filter(t => {
    if (t.name.toLowerCase().includes(lowerQuery)) return true
    if (t.items.some(item => item.toLowerCase().includes(lowerQuery))) return true
    return false
  })
}

export function generateThaliReceipt(customerName, thalis) {
  if (typeof customerName !== 'string' || !Array.isArray(thalis) || thalis.length === 0) return ""
  let lines = thalis.map(t => `- ${t.name} x Rs.${t.price}`)
  let total = thalis.reduce((sum, t) => sum + t.price, 0)
  return `THALI RECEIPT\n---\nCustomer: ${customerName.toUpperCase()}\n${lines.join("\n")}\n---\nTotal: Rs.${total}\nItems: ${thalis.length}`
}
