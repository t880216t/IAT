/* builder constructs an array of element and its parents
 Example
     <body>
       <div class="d">
         <span class="s" id="s1">
       </div>
     </body>

    [{"span": [{class: "s", {"id": "s1"}]},
     {"div": [{class: "d"}]},
     {"body": [{index: 0}]}]
*/
const builder = {
  // find the position of the element
  // return 0 if element does not have sibling tags
  _getIndex(element) {
    let found = false;
    let count = 0;
    let index = 0;
    const siblings = element.parentNode.childNodes;

    for (let i = 0; i < siblings.length; i++) {
      if (siblings[i] === element) { found = true; }
      if ((siblings[i].nodeType === 1) && (siblings[i].tagName === element.tagName)) {
        count += 1;
        index = !found ? index + 1 : index;
      }
    }
    return count > 1 ? index + 1 : 0;
  },

  // construct a prioritized non empty array of {key, value} object
  // key is the attribute type, value contains int for index, [] for className, string for others
  _buildAttributes(element, selectors) {
    const array = selectors.map((sel) => {
      let attr;
      if (sel === 'className') {
        attr = element.className.length > 0 ? element.className.split(' ') : [];
      } else if (sel === 'index') {
        attr = 1;
        // attr = this._getIndex(element);
      } else { // name, id, for, href, title
        attr = element.getAttribute(sel);
      }
      // [] is required to template string as key
      return attr ? { [`${sel}`]: attr } : null;
    });
    return array.filter(n => n);
  },

  // traverse up the document tree to construct an array containing the element attributes
  build(element, attributesArray, pathList) {
    if (!element) return pathList;
    if (element.nodeType === 9) return pathList;

    const array = this._buildAttributes(element, attributesArray);
    pathList.push({ [`${element.tagName.toLowerCase()}`]: array });
    return this.build(element.parentNode, attributesArray, pathList);
  }
};

if (typeof exports !== 'undefined') exports.builder = builder;
