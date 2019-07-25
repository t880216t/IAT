function classifier(element) {
  let hash = null;
  const tag = element.tagName.toLowerCase();

  if (tag === 'input') {
    switch (element.type) {
      case 'password':
        hash = { type: 'text', value: '***' };
        break;
      case 'radio':
        hash = { type: 'radio', value: element.value };
        break;
      case 'checkbox':
        hash = { type: 'checkbox', value: element.checked };
        break;
      case 'file':
        hash = { type: 'file', value: element.value };
        break;
      case 'email':
      case 'tel':
      case 'url':
      case 'number':
      case 'search':
      case 'text':
      case 'date':
      case 'datetime-local':
      case 'week':
      case 'month':
      case 'color':
        hash = { type: 'text', value: element.value };
        break;
      case 'submit':
      case 'image':
      case 'range':
      case 'reset':
        hash = { type: element.type };
        break;
      case 'hidden':
      default:
        break;
    }
  } else if (tag === 'textarea') {
    hash = { type: 'text', value: element.value };
  } else if (tag === 'select') {
    hash = { type: 'select', value: element.value };
  } else if (tag === 'a') {
    hash = { type: 'a', value: element.href };
  }
  return hash;
}

if (typeof exports !== 'undefined') exports.classifier = classifier;
