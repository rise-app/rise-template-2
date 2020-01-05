let id = 1

export function getId() {
  return `svelte-steps-${id++}`
}

export function getNumber() {
  return id
}
