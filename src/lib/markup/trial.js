const interferenceTrial = (stimulus, too_slow, mag) => {
  if (too_slow) {
    return `<div class="beads_container"><h1 class="too_slow">${stimulus}</h1></div>`
  }
  else {
    return `<div class="beads_container"><h1 class="interference" style="font-size: ${mag/100*5}rem">${stimulus}</h1></div>`
  }
}

export default interferenceTrial
