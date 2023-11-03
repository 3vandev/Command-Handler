export function SS(color, message) {
  if(typeof color == 'string') {
    return `§${color}${message}`
  }
  else if(Array.isArray(color)) {
    let colors = '';
    for(const c of color) {
      colors += `§${c}`;
    }
    return `${colors}${message}`;
  }
}