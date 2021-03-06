export async function containsText(component, text) {
  if (Array.isArray(component.props.children)) {
    if (!component.props.children.join("").includes(text)) {
      throw new Error(`Could not find text ${text}`);
    }
  } else if (!component.props.children.includes(text)) {
    throw new Error(`Could not find text ${text}`);
  }
}
