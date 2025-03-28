export function toTitleCase(string) {
   return string.charAt(0).toUpperCase() + string.slice(1);
}

export function darkenRGB(rgbString, factor = 0.8) {
   // Extract the x, y, z values using regex.
   const regex = /rgb\((\d+),\s*(\d+),\s*(\d+)\)/i;
   const match = rgbString.match(regex);
   if (!match) return rgbString; // If no match, return the original string.
 
   // Parse the RGB components and darken them.
   const r = Math.floor(parseInt(match[1], 10) * factor);
   const g = Math.floor(parseInt(match[2], 10) * factor);
   const b = Math.floor(parseInt(match[3], 10) * factor);
 
   // Return the new rgb string.
   return `rgb(${r}, ${g}, ${b})`;
 } 