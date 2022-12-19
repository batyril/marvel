export function getValidateDescription(description) {
  return description
    ? `${description.slice(0, 210)}...`
    : 'There is no description for this character';
}
